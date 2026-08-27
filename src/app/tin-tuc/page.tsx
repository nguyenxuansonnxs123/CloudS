import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { newsPosts, formatNewsDate } from "@/lib/news";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Tin tức và thông tin mới nhất từ CloudS.",
};

export default function NewsPage() {
  return (
    <Container className="py-14 sm:py-20">
      <SectionHeading
        eyebrow="Chia sẻ"
        title="Tin tức từ CloudS"
        description="Cập nhật mới nhất về sản phẩm, ưu đãi và các hoạt động của CloudS."
      />

      {newsPosts.length === 0 ? (
        <p className="mt-10 text-sm text-ink-soft">Chưa có tin tức nào — quay lại sau nhé.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/tin-tuc/${post.slug}`}
              className="group overflow-hidden rounded-3xl border border-line bg-surface transition-shadow duration-300 hover:shadow-[0_20px_50px_-25px_rgba(23,19,15,0.35)]"
            >
              {post.coverImage && (
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-cream">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 90vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-ink">
                  {formatNewsDate(post.date)}
                </p>
                <h3 className="mt-2 font-display text-lg text-ink">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
