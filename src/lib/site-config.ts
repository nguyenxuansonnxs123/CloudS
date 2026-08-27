// Trung tâm cấu hình của website CloudS.
// Các giá trị đánh dấu "[ĐIỀN SAU]" là placeholder — cập nhật trước khi ra mắt chính thức.

export const siteConfig = {
  name: "CloudS",
  tagline: "Move a little. Feel a lot.",
  taglineVi: "Nhẹ như mây, bước cả ngày",
  description:
    "CloudS — sneaker hiệu năng cho vận động hàng ngày. Nhẹ, êm, dễ đi từ sáng đến cuối ngày.",
  url: "https://clouds.vn", // [ĐIỀN SAU] domain thật khi đã mua trên Hostinger

  contact: {
    zaloNumber: "0969 699 297 hoặc 0854 125 647",
    zaloLink: "https://zalo.me/84969699297", // số chính, dùng cho nút "Tư vấn qua Zalo"
    zaloLink2: "https://zalo.me/84854125647", // số phụ — chỉ hiện thêm ở trang Liên hệ
    email: "cloudsco2026@gmail.com",
  },

  shops: {
    shopee: "https://shopee.vn/shop/1817956475",
    tiktok: "https://www.tiktok.com/@clouds9544", // trang TikTok chung — cập nhật thành link TikTok Shop riêng nếu có sau này
  },

  social: {
    threads: "", // [ĐIỀN SAU]
    instagram: "", // [ĐIỀN SAU]
    facebook: "", // [ĐIỀN SAU]
    tiktok: "https://www.tiktok.com/@clouds9544",
  },

  business: {
    legalName: "[ĐIỀN SAU — tên công ty pháp lý]",
    address: "Việt Nam",
  },

  // Phí ship cố định — mức giảm giá thực tế do voucher quyết định, xem src/lib/vouchers.ts
  // (voucher FREESHIP đang tự động áp dụng, giảm hết phí ship cho mọi đơn).
  shippingFee: 35000,

  // Thông tin nhận chuyển khoản để sinh mã QR (VietQR — miễn phí, không cần API key).
  // Tra mã BIN ngân hàng tại https://api.vietqr.io/v2/banks — vd Vietcombank=970436, Techcombank=970407.
  bank: {
    bin: "", // [ĐIỀN SAU] mã BIN ngân hàng
    accountNumber: "", // [ĐIỀN SAU] số tài khoản
    accountName: "", // [ĐIỀN SAU] tên chủ tài khoản (KHÔNG DẤU, in hoa)
  },
} as const;

export function isBankConfigured() {
  return Boolean(siteConfig.bank.bin && siteConfig.bank.accountNumber && siteConfig.bank.accountName);
}

export const navLinks = [
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/ve-clouds", label: "Về CloudS" },
  { href: "/uu-dai", label: "Ưu đãi" },
  { href: "/chinh-sach-doi-tra", label: "Chính sách đổi trả" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;
