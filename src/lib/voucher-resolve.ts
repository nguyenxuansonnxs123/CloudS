// Server-only: import findAffiliateByCode (dùng node:fs) nên KHÔNG được import file này từ
// component client — chỉ dùng trong API route / server component. Client tra mã qua
// GET /api/vouchers/resolve thay vì gọi thẳng hàm này.
import { findAffiliateByCode } from "./affiliates-store";
import { findVoucher, type ResolvedVoucher } from "./vouchers";

/**
 * Tra một mã bất kỳ khách nhập ở ô voucher — kiểm tra voucher tĩnh (FREESHIP...) trước, nếu
 * không khớp thì tra tiếp trong danh sách mã affiliate (mỗi affiliate có 1 mã riêng, giảm giá
 * cho khách + ghi nhận hoa hồng cho affiliate đó khi đơn được xác nhận). Đây là nguồn tin cậy
 * duy nhất khi tạo đơn thật trên server — không tin dữ liệu voucher client tự tính.
 */
export async function resolveVoucherCode(code: string): Promise<ResolvedVoucher | null> {
  const staticVoucher = findVoucher(code);
  if (staticVoucher) {
    return { code: staticVoucher.code, label: staticVoucher.label, kind: "free_shipping" };
  }

  const affiliate = await findAffiliateByCode(code);
  if (affiliate && affiliate.active) {
    return {
      code: affiliate.code,
      label: `Mã giới thiệu ${affiliate.name} — giảm ${affiliate.customerDiscount.toLocaleString("vi-VN")}đ`,
      kind: "affiliate_discount",
      amount: affiliate.customerDiscount,
    };
  }

  return null;
}
