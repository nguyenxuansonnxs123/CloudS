import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

export type Affiliate = {
  id: string;
  name: string;
  /** Mã voucher khách nhập khi đặt hàng — luôn lưu dạng chữ hoa, không dấu cách. */
  code: string;
  /** Số tiền giảm cho khách khi áp dụng mã, đơn vị VNĐ. */
  customerDiscount: number;
  /** Hoa hồng trả cho affiliate mỗi đơn áp dụng mã, đơn vị VNĐ. */
  commissionPerOrder: number;
  active: boolean;
  createdAt: string;
};

// Dùng chung thư mục dữ liệu bền vững với orders-store.ts — xem giải thích đầy đủ ở đó về lý
// do bắt buộc phải đặt ORDERS_DATA_DIR trên Hostinger (nếu không sẽ mất dữ liệu mỗi lần deploy).
const DATA_DIR = process.env.ORDERS_DATA_DIR || path.join(process.cwd(), "data");
const AFFILIATES_FILE = path.join(DATA_DIR, "affiliates.json");

let writeQueue: Promise<unknown> = Promise.resolve();

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(AFFILIATES_FILE);
  } catch {
    await fs.writeFile(AFFILIATES_FILE, "[]", "utf8");
  }
}

async function readAll(): Promise<Affiliate[]> {
  await ensureStore();
  const raw = await fs.readFile(AFFILIATES_FILE, "utf8");
  try {
    return JSON.parse(raw) as Affiliate[];
  } catch {
    return [];
  }
}

async function writeAll(all: Affiliate[]) {
  await fs.writeFile(AFFILIATES_FILE, JSON.stringify(all, null, 2), "utf8");
}

function normalizeCode(code: string) {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}

export async function listAffiliates(): Promise<Affiliate[]> {
  return readAll();
}

export async function findAffiliateByCode(code: string): Promise<Affiliate | undefined> {
  const normalized = normalizeCode(code);
  const all = await readAll();
  return all.find((a) => a.code === normalized);
}

export async function createAffiliate(input: {
  name: string;
  code: string;
  customerDiscount: number;
  commissionPerOrder: number;
}): Promise<Affiliate> {
  const affiliate: Affiliate = {
    id: randomUUID(),
    name: input.name.trim(),
    code: normalizeCode(input.code),
    customerDiscount: input.customerDiscount,
    commissionPerOrder: input.commissionPerOrder,
    active: true,
    createdAt: new Date().toISOString(),
  };

  let result: Affiliate = affiliate;
  writeQueue = writeQueue.then(async () => {
    const all = await readAll();
    if (all.some((a) => a.code === affiliate.code)) {
      throw new Error("Mã voucher này đã được dùng cho affiliate khác.");
    }
    all.unshift(affiliate);
    await writeAll(all);
    result = affiliate;
  });
  await writeQueue;
  return result;
}

export async function updateAffiliate(
  id: string,
  patch: Partial<Pick<Affiliate, "name" | "customerDiscount" | "commissionPerOrder" | "active">>
): Promise<Affiliate | undefined> {
  let updated: Affiliate | undefined;
  writeQueue = writeQueue.then(async () => {
    const all = await readAll();
    const affiliate = all.find((a) => a.id === id);
    if (affiliate) {
      Object.assign(affiliate, patch);
      updated = affiliate;
    }
    await writeAll(all);
  });
  await writeQueue;
  return updated;
}

export async function deleteAffiliate(id: string): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    const all = await readAll();
    await writeAll(all.filter((a) => a.id !== id));
  });
  await writeQueue;
}
