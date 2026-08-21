export type Product = {
  slug: string;
  name: string;
  shortName: string;
  gender: "nam" | "nu";
  price: number;
  compareAtPrice?: number;
  sizes: string[];
  color: string;
  colorSwatch: string;
  tagline: string;
  description: string;
  usps: string[];
  features: { title: string; detail: string }[];
  images: {
    main: string;
    gallery: string[];
    lifestyle: string[];
  };
  care: string[];
};

export const products: Product[] = [
  {
    slug: "clouds-performance-nam",
    name: "CloudS Performance — Giày thể thao Nam",
    shortName: "Đôi 1 — Nam",
    gender: "nam",
    price: 360000,
    sizes: ["41", "42", "43"],
    color: "Đen",
    colorSwatch: "#17130f",
    tagline: "Từ sáng đến cuối ngày — đi làm, đi bộ, gặp gỡ bạn bè.",
    description:
      "Giày thể thao hiệu năng dành cho vận động hàng ngày. Đế cao su GCR chống mài mòn và chống trơn trượt, thân giày sợi Poly thoáng khí giữ chân luôn khô thoáng, lót giày EVA giảm chấn êm ái suốt cả ngày di chuyển.",
    usps: [
      "Thoáng khí, thoải mái cả ngày nhờ thân giày sợi Poly",
      "Đế GCR bền, chống mài mòn, chống trơn trượt",
      "Lót giày EVA massage chân, giảm chấn hiệu quả",
      "Phong cách tối giản — đi học, đi làm, đi chơi, đi tập",
    ],
    features: [
      {
        title: "Phần đế ngoài",
        detail: "Cao su GCR, chống mài mòn, chống trơn trượt.",
      },
      {
        title: "Thân giày",
        detail: "Chất liệu sợi Poly thoáng khí, thoải mái.",
      },
      {
        title: "Chất liệu upper",
        detail: "Vải dệt + TPU ép nhiệt, chống thấm nhẹ.",
      },
      {
        title: "Lót giày EVA",
        detail: "Massage chân, giảm chấn hiệu quả suốt cả ngày.",
      },
    ],
    images: {
      main: "/images/men/product-clean.webp",
      gallery: [
        "/images/men/detail-sole-upper.webp",
        "/images/men/detail-features.webp",
      ],
      lifestyle: ["/images/men/lifestyle-walking.webp", "/images/men/lifestyle-running.webp"],
    },
    care: [
      "Lau sạch bụi bẩn bằng khăn ẩm sau khi sử dụng ngoài trời",
      "Không giặt máy — giặt tay nhẹ nhàng và phơi nơi thoáng gió, tránh nắng gắt",
      "Nhét giấy/form giữ dáng khi không sử dụng trong thời gian dài",
    ],
  },
  {
    slug: "clouds-mule-nu",
    name: "CloudS Mule — Sneaker Nữ",
    shortName: "Đôi 1 — Nữ",
    gender: "nu",
    price: 260000,
    sizes: ["36", "37", "38"],
    color: "Hồng phấn",
    colorSwatch: "#e7b7ae",
    tagline: "Xỏ vào là đi — dễ dàng cho mỗi buổi sáng vội vã.",
    description:
      "Sneaker mule phong cách tối giản, thiết kế không dây buộc gót giúp xỏ nhanh trong vài giây. Tông màu hồng phấn trung tính, dễ phối với hầu hết trang phục đi làm, đi học hay đi chơi hàng ngày.",
    usps: [
      "Dễ xỏ, dễ đi — tiết kiệm thời gian mỗi buổi sáng",
      "Tông hồng phấn trung tính, dễ phối nhiều outfit",
      "Phong cách tối giản, gọn gàng cả khi đi làm",
      "Êm chân, phù hợp di chuyển nhiều trong ngày",
    ],
    features: [
      {
        title: "Kiểu dáng mule",
        detail: "Không dây buộc gót, xỏ nhanh chỉ trong vài giây.",
      },
      {
        title: "Tông màu trung tính",
        detail: "Hồng phấn nhẹ nhàng, dễ phối đồ hàng ngày.",
      },
      {
        title: "Đế êm nhẹ",
        detail: "Thoải mái cho cả ngày di chuyển, đi làm, đi học.",
      },
    ],
    images: {
      main: "/images/women/product-pair-1.webp",
      gallery: ["/images/women/product-pair-2.webp", "/images/women/product-pair-3.webp"],
      lifestyle: ["/images/women/lifestyle-leg.webp"],
    },
    care: [
      "Lau sạch bụi bẩn bằng khăn ẩm, tránh ngâm nước",
      "Không giặt máy — giặt tay nhẹ nhàng và phơi nơi thoáng gió",
      "Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp làm phai màu",
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}
