import type { Locale } from "@/lib/locale";

// Các dòng giày sắp ra mắt — hàng chưa về nên chưa lên thành sản phẩm mua được, chỉ hiển thị
// dạng "Sắp ra mắt" để khách quan tâm theo dõi và để phủ từ khoá SEO liên quan.
export type ComingSoonCategory = {
  slug: string;
  name: string;
  description: string;
  /** Bản dịch tiếng Anh — slug giữ nguyên. */
  translations?: {
    en: { name: string; description: string };
  };
};

export const comingSoonCategories: ComingSoonCategory[] = [
  {
    slug: "giay-bup-be",
    name: "Giày búp bê",
    description:
      "Giày búp bê nữ dáng tròn, êm chân, dễ phối đồ đi học đi làm — phù hợp sinh viên khu vực Cầu Giấy, Hà Nội.",
    translations: {
      en: {
        name: "Ballet flats",
        description:
          "Round-toe ballet flats for women — comfortable and easy to pair with school or office outfits, made for students around Cau Giay, Hanoi.",
      },
    },
  },
  {
    slug: "giay-the-thao",
    name: "Giày thể thao chuyên dụng",
    description:
      "Dòng giày thể thao mới ngoài CloudStride 1 — tối ưu cho vận động cường độ cao hằng ngày.",
    translations: {
      en: {
        name: "Performance sneakers",
        description:
          "A new sneaker line beyond CloudStride 1 — built for high-intensity everyday activity.",
      },
    },
  },
  {
    slug: "giay-chay-bo",
    name: "Giày chạy bộ",
    description: "Giày chạy bộ đệm êm, nhẹ chân, hỗ trợ tốt cho các buổi chạy dài và tập luyện.",
    translations: {
      en: {
        name: "Running shoes",
        description: "Soft-cushioned, lightweight running shoes that support long runs and training sessions.",
      },
    },
  },
  {
    slug: "giay-di-bo",
    name: "Giày đi bộ",
    description: "Giày đi bộ hằng ngày, thoáng khí, êm ái — hợp với nhịp sống di chuyển nhiều của sinh viên.",
    translations: {
      en: {
        name: "Walking shoes",
        description: "Breathable, comfortable everyday walking shoes — suited to a student's on-the-go lifestyle.",
      },
    },
  },
  {
    slug: "giay-tennis",
    name: "Giày tennis",
    description: "Giày tennis bám sân tốt, hỗ trợ chuyển hướng nhanh, bền bỉ cho các buổi tập và thi đấu.",
    translations: {
      en: {
        name: "Tennis shoes",
        description: "Tennis shoes with strong court grip and quick-turn support, built to last through practice and matches.",
      },
    },
  },
];

/**
 * Trả về category với name/description được thay bằng bản dịch tiếng Anh khi locale là "en".
 * Nếu chưa có bản dịch, giữ nguyên nội dung tiếng Việt gốc (không throw/break).
 */
export function getLocalizedCategory(category: ComingSoonCategory, locale: Locale): ComingSoonCategory {
  const en = category.translations?.en;
  if (locale !== "en" || !en) return category;
  return { ...category, name: en.name, description: en.description };
}
