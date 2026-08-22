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
    zaloNumber: "", // [ĐIỀN SAU] số Zalo/hotline, vd: "0901234567"
    zaloLink: "", // [ĐIỀN SAU] vd: "https://zalo.me/0901234567"
    email: "cskh@clouds.vn", // [ĐIỀN SAU]
  },

  shops: {
    shopee: "", // [ĐIỀN SAU] link gian hàng Shopee
    tiktok: "", // [ĐIỀN SAU] link TikTok Shop
  },

  social: {
    threads: "", // [ĐIỀN SAU]
    instagram: "", // [ĐIỀN SAU]
    facebook: "", // [ĐIỀN SAU]
    tiktok: "", // [ĐIỀN SAU] link trang TikTok (khác TikTok Shop)
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
