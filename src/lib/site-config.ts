// Trung tâm cấu hình của website CloudS.
// Các giá trị đánh dấu "[ĐIỀN SAU]" là placeholder — cập nhật trước khi ra mắt chính thức.

export const siteConfig = {
  name: "CloudS (Spirit)",
  tagline: "Move a little. Feel a lot.",
  taglineVi: "Nhẹ như mây, bước cả ngày",
  description:
    "CloudS — sneaker hiệu năng cho vận động hàng ngày. Nhẹ, êm, dễ đi từ sáng đến cuối ngày.",
  url: "https://cloudsvn.net",

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
    threads: "https://www.threads.com/@clouds_vn_store",
    instagram: "", // [ĐIỀN SAU]
    facebook: "", // [ĐIỀN SAU]
    tiktok: "https://www.tiktok.com/@clouds9544",
  },

  business: {
    legalName: "[ĐIỀN SAU — tên công ty pháp lý]",
    address: "Việt Nam",
  },

  // 3 địa điểm cửa hàng CloudS tại Hà Nội — dùng cho LocalBusiness schema (SEO local) và trang Liên hệ.
  storeLocations: [
    {
      name: "CloudS Hoàng Quốc Việt",
      streetAddress: "Số 47, Ngõ 5 Hoàng Quốc Việt",
      district: "Cầu Giấy",
    },
    {
      name: "CloudS Xuân Diệu",
      streetAddress: "Số nhà 53E, Ngõ 31 Xuân Diệu",
      district: "Tây Hồ",
    },
    {
      name: "CloudS Nguyễn Ngọc Vũ",
      streetAddress: "Số nhà 25A, Ngách 103/Ngõ 189 Nguyễn Ngọc Vũ",
      district: "Cầu Giấy",
    },
  ],

  // Phí ship cố định — mức giảm giá thực tế do voucher quyết định, xem src/lib/vouchers.ts
  // (voucher FREESHIP đang tự động áp dụng, giảm hết phí ship cho mọi đơn).
  shippingFee: 35000,

  // Thông tin nhận chuyển khoản để sinh mã QR (VietQR — miễn phí, không cần API key).
  // Tra mã BIN ngân hàng tại https://api.vietqr.io/v2/banks — vd Vietcombank=970436, Techcombank=970407.
  bank: {
    bin: "970436", // Vietcombank
    accountNumber: "1065877399",
    accountName: "HKD BON MUA AN YEN",
  },
} as const;

export function isBankConfigured() {
  return Boolean(siteConfig.bank.bin && siteConfig.bank.accountNumber && siteConfig.bank.accountName);
}

export const navLinks = [
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/ve-clouds", label: "Về CloudS" },
  { href: "/uu-dai", label: "Ưu đãi" },
  { href: "/ctv", label: "Cộng tác viên" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/chinh-sach-doi-tra", label: "Chính sách đổi trả" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;
