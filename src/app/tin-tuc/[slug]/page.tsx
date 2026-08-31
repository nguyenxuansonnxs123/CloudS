import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { newsPosts, getNewsPostBySlug, formatNewsDate } from "@/lib/news";
import { getLocale } from "@/lib/i18n";

const backLabel = { vi: "← Tin tức", en: "← News" };

export function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/tin-tuc/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getNewsPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsPostPage(props: PageProps<"/tin-tuc/[slug]">) {
  const { slug } = await props.params;
  const post = getNewsPostBySlug(slug);
  if (!post) notFound();
  const locale = await getLocale();

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <Link href="/tin-tuc" className="text-sm text-ink-soft hover:text-ink">
          {backLabel[locale]}
        </Link>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-rose-ink">
          {formatNewsDate(post.date)}
        </p>
        <h1 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>

        {post.coverImage && (
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-3xl bg-surface">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 700px, 90vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Container>
  );
}
