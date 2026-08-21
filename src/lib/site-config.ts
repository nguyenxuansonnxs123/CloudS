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
} as const;

export const navLinks = [
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/ve-clouds", label: "Về CloudS" },
  { href: "/uu-dai-khai-truong", label: "Ưu đãi khai trương" },
  { href: "/chinh-sach-doi-tra", label: "Chính sách đổi trả" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;
