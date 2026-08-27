import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { CartItem } from "./cart";

export type OrderStatus = "moi" | "da_xu_ly" | "da_huy";
export type PaymentMethod = "cod" | "bank_transfer";

export type Order = {
  id: string;
  code: string; // mã đơn ngắn hiển thị cho khách, vd CLS-A1B2C3
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    note: string;
  };
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  shippingDiscount: number;
  appliedVouchers: string[];
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  /** Đơn COD coi như xác nhận ngay (thu tiền khi giao); đơn chuyển khoản chờ admin xác nhận đã
   * nhận được tiền trước khi tính là thành công (ghi Google Sheet + gửi email cảm ơn khách). */
  paymentConfirmed: boolean;
};

// QUAN TRỌNG: Hostinger Node.js App deploy vào một thư mục phiên bản MỚI mỗi lần (kiểu
// symlink "current" trỏ sang thư mục versions/<id>), nên bất kỳ file nào không nằm trong Git
// (như data/orders.json) sẽ bị mất trắng sau mỗi lần deploy nếu ghi trong process.cwd(). Đặt
// biến môi trường ORDERS_DATA_DIR trỏ tới một thư mục NẰM NGOÀI vùng deploy (vd thư mục
// "persistent-data" cùng cấp với "hbuilds" trên server) để dữ liệu đơn hàng sống sót qua các
// lần deploy. Khi chưa đặt biến này (vd chạy dev cục bộ), vẫn dùng ./data như trước.
const DATA_DIR = process.env.ORDERS_DATA_DIR || path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

// Hàng đợi ghi tuần tự để tránh 2 request ghi đè lẫn nhau khi xử lý đồng thời.
let writeQueue: Promise<unknown> = Promise.resolve();

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, "[]", "utf8");
  }
}

async function readAll(): Promise<Order[]> {
  await ensureStore();
  const raw = await fs.readFile(ORDERS_FILE, "utf8");
  try {
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

function generateOrderCode() {
  return "CLS-" + randomUUID().slice(0, 6).toUpperCase();
}

export async function createOrder(input: {
  customer: Order["customer"];
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  shippingDiscount: number;
  appliedVouchers: string[];
  total: number;
  paymentMethod: PaymentMethod;
}): Promise<Order> {
  const order: Order = {
    id: randomUUID(),
    code: generateOrderCode(),
    createdAt: new Date().toISOString(),
    status: "moi",
    // COD thu tiền khi giao nên coi như đã xác nhận ngay; chuyển khoản chờ admin xác nhận.
    paymentConfirmed: input.paymentMethod === "cod",
    ...input,
  };

  writeQueue = writeQueue.then(async () => {
    const all = await readAll();
    all.unshift(order);
    await fs.writeFile(ORDERS_FILE, JSON.stringify(all, null, 2), "utf8");
  });
  await writeQueue;

  return order;
}

export async function listOrders(): Promise<Order[]> {
  return readAll();
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const all = await readAll();
  return all.find((o) => o.id === id);
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    const all = await readAll();
    const order = all.find((o) => o.id === id);
    if (order) order.status = status;
    await fs.writeFile(ORDERS_FILE, JSON.stringify(all, null, 2), "utf8");
  });
  await writeQueue;
}

// Admin bấm xác nhận sau khi tự kiểm tra đã nhận được tiền chuyển khoản trong tài khoản ngân
// hàng — trả về order đã cập nhật để gọi tiếp Google Sheet + email cảm ơn khách.
export async function confirmOrderPayment(id: string): Promise<Order | undefined> {
  let updated: Order | undefined;
  writeQueue = writeQueue.then(async () => {
    const all = await readAll();
    const order = all.find((o) => o.id === id);
    if (order) {
      order.paymentConfirmed = true;
      updated = order;
    }
    await fs.writeFile(ORDERS_FILE, JSON.stringify(all, null, 2), "utf8");
  });
  await writeQueue;
  return updated;
}
