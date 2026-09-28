// Cấu hình quản lý tồn kho nội bộ (/kho). File này an toàn để import cả ở client.
// Muốn thêm kho / mã hàng / người nhập mới: chỉ cần thêm một dòng vào các mảng dưới đây.

export const WAREHOUSES = [
  { id: "my-dinh", name: "Kho Mỹ Đình" },
  { id: "thang-long-1", name: "Kho Thăng Long Number 1" },
  { id: "cho-ha-dong", name: "Kho Chợ Hà Đông" },
  { id: "anh-quy-cho-xanh", name: "Kho anh Quý - Chợ Xanh" },
] as const;

export const SKUS = [
  { code: "CLSV1-BLA-41", label: "CloudStride 1 · Đen · Size 41" },
  { code: "CLSV1-BLA-42", label: "CloudStride 1 · Đen · Size 42" },
  { code: "CLSV1-BLA-43", label: "CloudStride 1 · Đen · Size 43" },
] as const;

export const OPERATORS = ["Sơn", "Tùng"] as const;

export type WarehouseId = (typeof WAREHOUSES)[number]["id"];
export type SkuCode = (typeof SKUS)[number]["code"];
export type Operator = (typeof OPERATORS)[number];
export type TxType = "in" | "out";

export const TX_TYPE_LABEL: Record<TxType, string> = {
  in: "Nhập kho",
  out: "Xuất kho",
};

export function warehouseName(id: string) {
  return WAREHOUSES.find((w) => w.id === id)?.name ?? id;
}

export type InventoryTx = {
  id: string;
  createdAt: string;
  type: TxType;
  sku: SkuCode;
  warehouseId: WarehouseId;
  qty: number;
  operator: Operator;
  note: string;
  /** Phiếu bị hủy vẫn được giữ lại để đối chiếu, nhưng không tính vào tồn kho. */
  voided?: { at: string; by: Operator };
};

/** Tồn kho theo [mã hàng][kho], chỉ tính các phiếu chưa bị hủy. */
export type StockMatrix = Record<SkuCode, Record<WarehouseId, number>>;

export function emptyStock(): StockMatrix {
  const stock = {} as StockMatrix;
  for (const sku of SKUS) {
    stock[sku.code] = {} as Record<WarehouseId, number>;
    for (const w of WAREHOUSES) stock[sku.code][w.id] = 0;
  }
  return stock;
}

export function computeStock(transactions: InventoryTx[]): StockMatrix {
  const stock = emptyStock();
  for (const tx of transactions) {
    if (tx.voided) continue;
    stock[tx.sku][tx.warehouseId] += tx.type === "in" ? tx.qty : -tx.qty;
  }
  return stock;
}
