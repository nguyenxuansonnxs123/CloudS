import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import {
  OPERATORS,
  SKUS,
  WAREHOUSES,
  computeStock,
  warehouseName,
  type InventoryTx,
  type Operator,
  type SkuCode,
  type TxType,
  type WarehouseId,
} from "./inventory-config";

// Dùng chung thư mục dữ liệu với đơn hàng (ORDERS_DATA_DIR). Trên Hostinger PHẢI đặt biến này trỏ
// ra ngoài vùng deploy, nếu không file tồn kho sẽ mất sau mỗi lần deploy — xem .env.example.
const DATA_DIR = process.env.ORDERS_DATA_DIR || path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "inventory.json");

export const isStorageDurable = () => Boolean(process.env.ORDERS_DATA_DIR) || process.env.NODE_ENV !== "production";

let writeQueue: Promise<unknown> = Promise.resolve();

async function readAll(): Promise<InventoryTx[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as InventoryTx[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err; // file hỏng/không đọc được: báo lỗi thay vì âm thầm coi như kho trống rồi ghi đè
  }
}

async function writeAll(all: InventoryTx[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(all, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

function enqueue<T>(job: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(job);
  writeQueue = run.catch(() => undefined);
  return run;
}

export async function listTransactions(): Promise<InventoryTx[]> {
  return readAll(); // mới nhất ở đầu
}

export type NewTxInput = {
  type: TxType;
  sku: string;
  warehouseId: string;
  qty: number;
  operator: string;
  note: string;
};

export function addTransaction(input: NewTxInput): Promise<InventoryTx> {
  if (input.type !== "in" && input.type !== "out") throw new Error("Loại phiếu không hợp lệ.");
  const sku = SKUS.find((s) => s.code === input.sku)?.code;
  if (!sku) throw new Error("Mã hàng không hợp lệ.");
  const warehouseId = WAREHOUSES.find((w) => w.id === input.warehouseId)?.id;
  if (!warehouseId) throw new Error("Kho không hợp lệ.");
  const operator = OPERATORS.find((o) => o === input.operator);
  if (!operator) throw new Error("Vui lòng chọn người nhập dữ liệu.");
  if (!Number.isInteger(input.qty) || input.qty < 1 || input.qty > 100000) {
    throw new Error("Số lượng phải là số nguyên từ 1 trở lên.");
  }
  const note = input.note.trim().slice(0, 200);

  return enqueue(async () => {
    const all = await readAll();
    if (input.type === "out") {
      const available = computeStock(all)[sku][warehouseId];
      if (input.qty > available) {
        throw new Error(`${warehouseName(warehouseId)} chỉ còn ${available} đôi ${sku}, không thể xuất ${input.qty}.`);
      }
    }
    const tx: InventoryTx = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      type: input.type,
      sku: sku as SkuCode,
      warehouseId: warehouseId as WarehouseId,
      qty: input.qty,
      operator: operator as Operator,
      note,
    };
    all.unshift(tx);
    await writeAll(all);
    return tx;
  });
}

export function voidTransaction(id: string, by: string): Promise<InventoryTx> {
  const operator = OPERATORS.find((o) => o === by);
  if (!operator) throw new Error("Vui lòng chọn người thực hiện hủy phiếu.");

  return enqueue(async () => {
    const all = await readAll();
    const tx = all.find((t) => t.id === id);
    if (!tx) throw new Error("Không tìm thấy phiếu.");
    if (tx.voided) throw new Error("Phiếu này đã được hủy trước đó.");
    if (tx.type === "in") {
      const after = computeStock(all)[tx.sku][tx.warehouseId] - tx.qty;
      if (after < 0) {
        throw new Error(
          `Không thể hủy phiếu nhập này: ${warehouseName(tx.warehouseId)} đã xuất bớt hàng, hủy sẽ làm tồn kho âm.`
        );
      }
    }
    tx.voided = { at: new Date().toISOString(), by: operator };
    await writeAll(all);
    return tx;
  });
}
