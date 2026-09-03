import type { Locale } from "@/lib/locale";

export type SizedImage = { src: string; width: number; height: number };
export type SizedVideo = { src: string; poster: string; width: number; height: number };

export type Product = {
  slug: string;
  silhouette: "cloudstride-1" | "cloud-mule-1";
  name: string;
  shortName: string;
  gender: "nam" | "nu";
  isNew?: boolean;
  /** false = tạm hết hàng — ẩn nút thêm giỏ hàng/mua ngay, hiện nhãn "Hết hàng". Mặc định true. */
  inStock?: boolean;
  price: number;
  /** Giá gốc trước giảm — nếu có, hiển thị gạch ngang bên cạnh giá bán (ưu đãi khai trương). */
  compareAtPrice?: number;
  /** Link Shopee/TikTok riêng cho sản phẩm này — nếu trống, dùng link shop chung ở site-config. */
  shopeeUrl?: string;
  tiktokUrl?: string;
  sizes: string[];
  /** Mã SKU quản lý kho theo từng size — khớp file tồn kho nội bộ (định dạng MÃSP-MÀU-SIZE). */
  skuBySize?: Record<string, string>;
  color: string;
  colorSwatch: string;
  tagline: string;
  description: string;
  usps: string[];
  features: { title: string; detail: string }[];
  images: {
    main: string;
    /** Ảnh hiện khi hover vào thẻ sản phẩm — người mẫu đang mang giày */
    hover: string;
    /** Ảnh vuông trong gallery chính (fill + object-contain, không crop) */
    gallery: string[];
    /** Ảnh trải nghiệm thực tế — giữ nguyên kích thước gốc để không bị crop */
    lifestyle: SizedImage[];
    /** Video ngắn thực tế (unboxing, thử giày...) — hiện cùng hàng với lifestyle */
    videos?: SizedVideo[];
  };
  care: string[];
  /** slug của các phiên bản màu khác cùng dáng giày, để hiện swatch chuyển đổi */
  colorOptions: string[];
  /** Bản dịch tiếng Anh cho các trường nội dung — name/shortName giữ nguyên (tên thương hiệu/SKU). */
  translations?: {
    en: {
      tagline: string;
      description: string;
      usps: string[];
      features: { title: string; detail: string }[];
      care: string[];
      /** Chỉ cần khi color là từ tiếng Việt thường (vd "Đen") — màu kiểu tên riêng như "Rose",
       * "Vanilla Cream" thì bỏ trống, giữ nguyên. */
      colorEn?: string;
    };
  };
};

export const products: Product[] = [
  {
    slug: "cloudstride-1",
    silhouette: "cloudstride-1",
    name: "CloudStride 1",
    shortName: "CloudStride 1",
    gender: "nam",
    inStock: false,
    price: 360000,
    sizes: ["41", "42", "43"],
    skuBySize: { "41": "CLSV1-Bla-41", "42": "CLSV1-Bla-42", "43": "CLSV1-Bla-43" },
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
        title: "Đế ngoài GCR",
        detail: "Cao su GCR chống mài mòn, chống trơn trượt — an tâm khi đi bộ nhiều.",
      },
      {
        title: "Thân giày thoáng khí",
        detail: "Chất liệu sợi Poly dệt thoáng khí, giữ chân khô thoáng cả ngày.",
      },
      {
        title: "Lót giày EVA",
        detail: "Massage chân, giảm chấn hiệu quả, êm suốt hành trình dài.",
      },
      {
        title: "Phong cách đa dụng",
        detail: "Đi học, đi làm, đi chơi, đi tập — một đôi cho mọi hoạt động hằng ngày.",
      },
    ],
    images: {
      main: "/images/cloudstride/gallery-1.webp",
      hover: "/images/cloudstride/gallery-model.webp",
      gallery: [
        "/images/cloudstride/gallery-1.webp",
        "/images/cloudstride/gallery-model.webp",
        "/images/cloudstride/gallery-3.webp",
        "/images/cloudstride/gallery-5.webp",
        "/images/cloudstride/gallery-6.webp",
        "/images/cloudstride/gallery-4.webp",
      ],
      lifestyle: [
        { src: "/images/cloudstride/lifestyle-2.webp", width: 1400, height: 1400 },
        { src: "/images/cloudstride/lifestyle-3.webp", width: 972, height: 972 },
        { src: "/images/cloudstride/lifestyle-4.webp", width: 1024, height: 1024 },
        { src: "/images/cloudstride/lifestyle-5.webp", width: 1400, height: 2488 },
        { src: "/images/cloudstride/lifestyle-6.webp", width: 1400, height: 2488 },
        { src: "/images/cloudstride/lifestyle-7.webp", width: 1400, height: 2488 },
      ],
    },
    care: [
      "Lau sạch bụi bẩn bằng khăn ẩm sau khi sử dụng ngoài trời",
      "Không giặt máy — giặt tay nhẹ nhàng và phơi nơi thoáng gió, tránh nắng gắt",
      "Nhét giấy/form giữ dáng khi không sử dụng trong thời gian dài",
    ],
    colorOptions: [],
    translations: {
      en: {
        colorEn: "Black",
        tagline: "From morning to night — for work, walking, and hanging out with friends.",
        description:
          "A performance sneaker built for everyday movement. The GCR rubber outsole resists wear and slipping, the breathable poly-mesh upper keeps your feet dry, and the cushioned EVA insole stays comfortable through a long day on your feet.",
        usps: [
          "Breathable poly-mesh upper keeps you comfortable all day",
          "Durable GCR outsole resists wear and slipping",
          "Cushioned EVA insole massages your feet and absorbs impact",
          "Minimalist style — for school, work, hanging out, or workouts",
        ],
        features: [
          {
            title: "GCR outsole",
            detail: "Wear-resistant, slip-resistant GCR rubber — walk with confidence, however far.",
          },
          {
            title: "Breathable upper",
            detail: "Breathable woven poly-mesh keeps your feet dry all day long.",
          },
          {
            title: "EVA insole",
            detail: "Massages your feet and cushions every step, comfortable mile after mile.",
          },
          {
            title: "Versatile style",
            detail: "School, work, hangouts, workouts — one pair for everything you do.",
          },
        ],
        care: [
          "Wipe off dirt with a damp cloth after wearing outdoors",
          "Do not machine wash — hand wash gently and air-dry in the shade, away from direct sun",
          "Stuff with paper or a shoe form to keep their shape during long-term storage",
        ],
      },
    },
  },
  {
    slug: "cloud-mule-1-rose",
    silhouette: "cloud-mule-1",
    name: "Giày Sục Đạp Gót Nữ Mule Sneaker GGOBK CloudS Vải Lưới Thoáng Khí, Êm Chân, Thời Trang – Màu Hồng Rose",
    shortName: "Cloud Mule 1",
    gender: "nu",
    price: 229000,
    compareAtPrice: 280000,
    shopeeUrl: "https://vn.shp.ee/bs4fXcMs",
    tiktokUrl: "https://vt.tiktok.com/ZS9Bkg84GC48H-LGpeB/",
    sizes: ["36", "37", "38"],
    skuBySize: {
      "36": "CLSV2-P-36",
      "37": "CLSV2-P-37",
      "38": "CLSV2-P-38",
    },
    color: "Rose",
    colorSwatch: "#dba3a0",
    tagline: "Sáng vội vẫn xỏ giày kịp — đi làm, đi chơi, cà phê.",
    description:
      "Sneaker mule phong cách tối giản, thiết kế không dây buộc gót giúp xỏ nhanh trong vài giây. Tông hồng Rose nhẹ nhàng, dễ phối với hầu hết trang phục đi làm, đi học hay đi chơi hàng ngày.",
    usps: [
      "Dễ xỏ, dễ đi — tiết kiệm thời gian mỗi buổi sáng",
      "Tông hồng Rose nhẹ nhàng, dễ phối nhiều outfit",
      "Phong cách tối giản, gọn gàng cả khi đi làm",
      "Êm chân, phù hợp di chuyển nhiều trong ngày",
    ],
    features: [
      {
        title: "Kiểu dáng mule",
        detail: "Không dây buộc gót, xỏ nhanh chỉ trong vài giây.",
      },
      {
        title: "Tông Rose nhẹ nhàng",
        detail: "Hồng phấn trung tính, dễ phối đồ hàng ngày.",
      },
      {
        title: "Đế êm nhẹ",
        detail: "Thoải mái cho cả ngày di chuyển, đi làm, đi học.",
      },
    ],
    images: {
      main: "/images/mule-rose/gallery-2.webp",
      hover: "/images/mule-rose/gallery-model-1.webp",
      gallery: [
        "/images/mule-rose/gallery-2.webp",
        "/images/mule-rose/gallery-3.webp",
        "/images/mule-rose/gallery-1.webp",
        "/images/mule-rose/gallery-model-1.webp",
        "/images/mule-rose/gallery-model-2.webp",
        "/images/mule-rose/gallery-model-3.webp",
      ],
      lifestyle: [
        { src: "/images/mule-rose/lifestyle-1.webp", width: 1400, height: 1221 },
        { src: "/images/mule-rose/lifestyle-2.webp", width: 1400, height: 1867 },
        { src: "/images/mule-rose/lifestyle-3.webp", width: 1400, height: 1221 },
        { src: "/images/mule-rose/lifestyle-4.webp", width: 1024, height: 1024 },
        { src: "/images/mule-rose/lifestyle-5.webp", width: 1024, height: 1024 },
        { src: "/images/mule-rose/lifestyle-6.webp", width: 1024, height: 1024 },
        { src: "/images/mule-rose/lifestyle-7.webp", width: 1400, height: 1867 },
        { src: "/images/mule-rose/lifestyle-8.webp", width: 1400, height: 1006 },
        { src: "/images/mule-rose/lifestyle-9.webp", width: 1400, height: 2087 },
        { src: "/images/mule-rose/lifestyle-10.webp", width: 1400, height: 1400 },
        { src: "/images/mule-rose/lifestyle-11.webp", width: 1400, height: 1400 },
      ],
      videos: [
        { src: "/videos/mule-two-colors.mp4", poster: "/images/mule-rose/video-poster.webp", width: 720, height: 1280 },
      ],
    },
    care: [
      "Lau sạch bụi bẩn bằng khăn ẩm, tránh ngâm nước",
      "Không giặt máy — giặt tay nhẹ nhàng và phơi nơi thoáng gió",
      "Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp làm phai màu",
    ],
    colorOptions: ["cloud-mule-1-vanilla-cream"],
    translations: {
      en: {
        tagline: "Even a rushed morning, you'll still make it out the door — for work, outings, and coffee runs.",
        description:
          "A minimalist mule sneaker with a backless, laceless design you can slip on in seconds. The soft Rose tone pairs easily with almost anything you wear to work, school, or a day out.",
        usps: [
          "Slip on in seconds — saves you time every morning",
          "Soft Rose tone pairs easily with a wide range of outfits",
          "Minimalist, polished style — works even for the office",
          "Comfortable underfoot, made for a day full of moving around",
        ],
        features: [
          {
            title: "Mule silhouette",
            detail: "Backless and laceless — on your feet in seconds.",
          },
          {
            title: "Soft Rose tone",
            detail: "A neutral blush pink that pairs easily with everyday outfits.",
          },
          {
            title: "Light, cushioned sole",
            detail: "Comfortable for a full day on your feet, at work or school.",
          },
        ],
        care: [
          "Wipe off dirt with a damp cloth — avoid soaking in water",
          "Do not machine wash — hand wash gently and air-dry in a well-ventilated spot",
          "Store somewhere dry, away from direct sunlight, to prevent fading",
        ],
      },
    },
  },
  {
    slug: "cloud-mule-1-vanilla-cream",
    silhouette: "cloud-mule-1",
    name: "Giày Sục Đạp Gót Nữ Mule Sneaker GGOBK CloudS Vải Lưới Thoáng Khí, Êm Chân, Thời Trang – Trắng Vanilla Cream",
    shortName: "Cloud Mule 1",
    gender: "nu",
    isNew: true,
    price: 229000,
    compareAtPrice: 280000,
    shopeeUrl: "https://vn.shp.ee/bs4fXcMs",
    tiktokUrl: "https://vt.tiktok.com/ZS9Bkg84GC48H-LGpeB/",
    sizes: ["36", "37", "38"],
    skuBySize: { "36": "CLSV2-W-36", "37": "CLSV2-W-37", "38": "CLSV2-W-38" },
    color: "Vanilla Cream",
    colorSwatch: "#efe6d8",
    tagline: "Sáng vội vẫn xỏ giày kịp — một đôi nhẹ nhàng cho mọi lịch trình.",
    description:
      "Sneaker mule phong cách tối giản, thiết kế không dây buộc gót giúp xỏ nhanh trong vài giây. Tông Vanilla Cream sáng, trung tính tuyệt đối, phối được với gần như mọi trang phục hàng ngày.",
    usps: [
      "Dễ xỏ, dễ đi — tiết kiệm thời gian mỗi buổi sáng",
      "Tông Vanilla Cream sáng, trung tính, dễ phối mọi outfit",
      "Phong cách tối giản, gọn gàng cả khi đi làm",
      "Êm chân, phù hợp di chuyển nhiều trong ngày",
    ],
    features: [
      {
        title: "Kiểu dáng mule",
        detail: "Không dây buộc gót, xỏ nhanh chỉ trong vài giây.",
      },
      {
        title: "Tông Vanilla Cream",
        detail: "Sáng, trung tính tuyệt đối — dễ phối mọi outfit.",
      },
      {
        title: "Đế êm nhẹ",
        detail: "Thoải mái cho cả ngày di chuyển, đi làm, đi học.",
      },
    ],
    images: {
      main: "/images/mule-vanilla/gallery-1.webp",
      hover: "/images/mule-vanilla/gallery-model.webp",
      gallery: [
        "/images/mule-vanilla/gallery-1.webp",
        "/images/mule-vanilla/gallery-2.webp",
        "/images/mule-vanilla/gallery-3.webp",
        "/images/mule-vanilla/gallery-model.webp",
      ],
      lifestyle: [
        { src: "/images/mule-vanilla/lifestyle-2.webp", width: 896, height: 1195 },
        { src: "/images/mule-vanilla/lifestyle-3.webp", width: 896, height: 1195 },
        { src: "/images/mule-vanilla/lifestyle-4.webp", width: 1400, height: 1867 },
        { src: "/images/mule-vanilla/lifestyle-5.webp", width: 1400, height: 1867 },
        { src: "/images/mule-vanilla/lifestyle-6.webp", width: 1400, height: 1867 },
      ],
      videos: [
        { src: "/videos/mule-two-colors.mp4", poster: "/images/mule-vanilla/video-poster-1.webp", width: 720, height: 1280 },
        { src: "/videos/mule-vanilla-selfie.mp4", poster: "/images/mule-vanilla/video-poster-2.webp", width: 720, height: 1280 },
      ],
    },
    care: [
      "Lau sạch bụi bẩn bằng khăn ẩm, tránh ngâm nước",
      "Không giặt máy — giặt tay nhẹ nhàng và phơi nơi thoáng gió",
      "Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp làm phai màu (đặc biệt tông sáng)",
    ],
    colorOptions: ["cloud-mule-1-rose"],
    translations: {
      en: {
        tagline: "Even a rushed morning, you'll still make it out the door — an easygoing pair for any schedule.",
        description:
          "A minimalist mule sneaker with a backless, laceless design you can slip on in seconds. The light, perfectly neutral Vanilla Cream tone goes with almost anything in your everyday wardrobe.",
        usps: [
          "Slip on in seconds — saves you time every morning",
          "Light, neutral Vanilla Cream tone pairs with any outfit",
          "Minimalist, polished style — works even for the office",
          "Comfortable underfoot, made for a day full of moving around",
        ],
        features: [
          {
            title: "Mule silhouette",
            detail: "Backless and laceless — on your feet in seconds.",
          },
          {
            title: "Vanilla Cream tone",
            detail: "Light and perfectly neutral — pairs with any outfit.",
          },
          {
            title: "Light, cushioned sole",
            detail: "Comfortable for a full day on your feet, at work or school.",
          },
        ],
        care: [
          "Wipe off dirt with a damp cloth — avoid soaking in water",
          "Do not machine wash — hand wash gently and air-dry in a well-ventilated spot",
          "Store somewhere dry, away from direct sunlight, to prevent fading (especially on light tones)",
        ],
      },
    },
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

/**
 * Trả về sản phẩm với các trường nội dung (tagline/description/usps/features/care) được thay
 * bằng bản dịch tiếng Anh khi locale là "en" — name/shortName/color giữ nguyên. Nếu chưa có bản
 * dịch, giữ nguyên nội dung tiếng Việt gốc (không throw/break).
 */
export function getLocalizedProduct(product: Product, locale: Locale): Product {
  const en = product.translations?.en;
  if (locale !== "en" || !en) return product;
  return {
    ...product,
    tagline: en.tagline,
    description: en.description,
    usps: en.usps,
    features: en.features,
    care: en.care,
    color: en.colorEn ?? product.color,
  };
}

export function getSiblingColorProducts(product: Product) {
  return product.colorOptions
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));
}

export function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

/** Bảng quy đổi size EU sang chiều dài chân tham khảo (không phải số đo riêng của CloudS). */
export const sizeGuide: { size: string; footLengthCm: string }[] = [
  { size: "36", footLengthCm: "22.5 – 23.0 cm" },
  { size: "37", footLengthCm: "23.0 – 23.5 cm" },
  { size: "38", footLengthCm: "23.5 – 24.0 cm" },
  { size: "41", footLengthCm: "26.0 – 26.5 cm" },
  { size: "42", footLengthCm: "26.5 – 27.0 cm" },
  { size: "43", footLengthCm: "27.0 – 27.5 cm" },
];
