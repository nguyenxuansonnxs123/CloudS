// Các dòng giày sắp ra mắt — hàng chưa về nên chưa lên thành sản phẩm mua được, chỉ hiển thị
// dạng "Sắp ra mắt" để khách quan tâm theo dõi và để phủ từ khoá SEO liên quan.
export type ComingSoonCategory = {
  slug: string;
  name: string;
  description: string;
};

export const comingSoonCategories: ComingSoonCategory[] = [
  {
    slug: "giay-bup-be",
    name: "Giày búp bê",
    description:
      "Giày búp bê nữ dáng tròn, êm chân, dễ phối đồ đi học đi làm — phù hợp sinh viên khu vực Cầu Giấy, Hà Nội.",
  },
  {
    slug: "giay-the-thao",
    name: "Giày thể thao chuyên dụng",
    description:
      "Dòng giày thể thao mới ngoài CloudStride 1 — tối ưu cho vận động cường độ cao hằng ngày.",
  },
  {
    slug: "giay-chay-bo",
    name: "Giày chạy bộ",
    description: "Giày chạy bộ đệm êm, nhẹ chân, hỗ trợ tốt cho các buổi chạy dài và tập luyện.",
  },
  {
    slug: "giay-di-bo",
    name: "Giày đi bộ",
    description: "Giày đi bộ hằng ngày, thoáng khí, êm ái — hợp với nhịp sống di chuyển nhiều của sinh viên.",
  },
  {
    slug: "giay-tennis",
    name: "Giày tennis",
    description: "Giày tennis bám sân tốt, hỗ trợ chuyển hướng nhanh, bền bỉ cho các buổi tập và thi đấu.",
  },
];
