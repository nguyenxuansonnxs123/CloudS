import type { Locale } from "./locale";

export type Voucher = {
  code: string;
  label: string;
  /** Nhãn tiếng Anh — nếu bỏ trống thì dùng luôn `label` (tiếng Việt) cho cả 2 locale. */
  labelEn?: string;
  kind: "free_shipping";
  /** Tự động áp dụng cho mọi đơn hàng, khách không cần nhập mã. */
  autoApply?: boolean;
};

export const vouchers: Voucher[] = [
  {
    code: "FREESHIP",
    label: "Miễn phí vận chuyển — ưu đãi khai trương",
    labelEn: "Free shipping — opening offer",
    kind: "free_shipping",
    autoApply: true,
  },
];

function localizedLabel(voucher: Voucher, locale: Locale) {
  return locale === "en" && voucher.labelEn ? voucher.labelEn : voucher.label;
}

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

export type ResolvedVoucher =
  | { code: string; label: string; kind: "free_shipping" }
  | { code: string; label: string; kind: "affiliate_discount"; amount: number };

/** Voucher tự động áp dụng, ở dạng ResolvedVoucher — dùng để khởi tạo state ban đầu của
 * VoucherSection mà không cần gọi API (voucher tĩnh nên tra được ngay, đồng bộ). */
export function autoAppliedResolvedVouchers(locale: Locale = "vi"): ResolvedVoucher[] {
  return vouchers
    .filter((v) => v.autoApply)
    .map((v) => ({ code: v.code, label: localizedLabel(v, locale), kind: v.kind }));
}
