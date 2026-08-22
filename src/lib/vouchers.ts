export type Voucher = {
  code: string;
  label: string;
  kind: "free_shipping";
  /** Tự động áp dụng cho mọi đơn hàng, khách không cần nhập mã. */
  autoApply?: boolean;
};

export const vouchers: Voucher[] = [
  {
    code: "FREESHIP",
    label: "Miễn phí vận chuyển — ưu đãi khai trương",
    kind: "free_shipping",
    autoApply: true,
  },
];

export function findVoucher(code: string): Voucher | undefined {
  const normalized = code.trim().toUpperCase();
  return vouchers.find((v) => v.code === normalized);
}

export function autoAppliedVoucherCodes(): string[] {
  return vouchers.filter((v) => v.autoApply).map((v) => v.code);
}

/** Tính tổng giảm giá phí ship từ danh sách mã đã áp dụng — dùng ở cả client (hiển thị) và server (tính giá thật). */
export function shippingDiscountFor(codes: string[], shippingFee: number): number {
  const applied = new Set(codes.map((c) => c.trim().toUpperCase()));
  const hasFreeShip = vouchers.some((v) => v.kind === "free_shipping" && applied.has(v.code));
  return hasFreeShip ? shippingFee : 0;
}
