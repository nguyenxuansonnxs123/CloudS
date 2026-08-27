export type NewsPost = {
  slug: string;
  title: string;
  /** ISO date, vd "2026-08-27" */
  date: string;
  excerpt: string;
  /** Mỗi phần tử là một đoạn văn */
  content: string[];
  coverImage?: string;
};

// Thêm bài mới bằng cách thêm phần tử vào mảng này (mới nhất để đầu mảng).
export const newsPosts: NewsPost[] = [];

export function getNewsPostBySlug(slug: string) {
  return newsPosts.find((p) => p.slug === slug);
}

export function formatNewsDate(date: string) {
  return new Date(date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
