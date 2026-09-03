import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Carousel } from "@/components/Carousel";
import { newsPosts, getNewsPostBySlug, getLocalizedPost, formatNewsDate, type NewsBlock } from "@/lib/news";
import { getLocale } from "@/lib/i18n";

const backLabel = { vi: "← Tin tức", en: "← News" };
const galleryLabel = { vi: "Ảnh sự kiện", en: "Event photos" };

export function generateStaticParams() {
  return newsPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/tin-tuc/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const raw = getNewsPostBySlug(slug);
  if (!raw) return {};
  const locale = await getLocale();
  const post = getLocalizedPost(raw, locale);
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function Block({ block, locale }: { block: NewsBlock; locale: "vi" | "en" }) {
  switch (block.type) {
    case "heading": {
      const Tag = block.level === 3 ? "h3" : "h2";
      return (
        <Tag
          className={
            block.level === 3
              ? "mt-8 font-display text-xl text-ink"
              : "mt-10 font-display text-2xl text-ink"
          }
        >
          {block.text}
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p>
          {block.text}
          {block.links?.map((link, i) => (
            <span key={link.href}>
              {" "}
              <Link
                href={link.href}
                className="font-semibold text-ink underline underline-offset-4"
              >
                {link.text}
              </Link>
              {i < block.links!.length - 1 && ","}
            </span>
          ))}
        </p>
      );
    case "note":
      return (
        <div className="rounded-2xl border border-dashed border-rose-ink/40 bg-blush-tint px-5 py-4 text-sm text-ink">
          {block.text}
        </div>
      );
    case "list":
      return (
        <ul className="space-y-3">
          {block.items.map((item, i) =>
            item.image ? (
              <li
                key={i}
                className="overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <div className="relative aspect-[16/10] w-full bg-brand-cream">
                  <Image
                    src={item.image}
                    alt={item.title ?? ""}
                    fill
                    sizes="(min-width: 640px) 700px, 90vw"
                    className="object-cover"
                  />
                </div>
                <span className="block p-4 sm:p-5">
                  {item.title && <span className="font-semibold text-ink">{item.title}</span>}
                  {item.title && item.text && " — "}
                  {item.text}
                </span>
              </li>
            ) : (
              <li key={i} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-rose-ink" />
                <span>
                  {item.title && <span className="font-semibold text-ink">{item.title}</span>}
                  {item.title && item.text && " — "}
                  {item.text}
                </span>
              </li>
            )
          )}
        </ul>
      );
    case "gallery":
      return (
        <div>
          <Carousel
            ariaLabel={galleryLabel[locale]}
            aspectClassName="aspect-[4/3]"
            className="overflow-hidden rounded-3xl border border-line"
            autoPlayMs={4500}
            slides={block.images.map((img) => (
              <div key={img.src} className="relative size-full bg-brand-cream">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 700px, 90vw"
                  className="object-cover"
                />
              </div>
            ))}
          />
          {block.credit && <p className="mt-2 text-xs text-ink-soft/70">{block.credit}</p>}
        </div>
      );
  }
}

export default async function NewsPostPage(props: PageProps<"/tin-tuc/[slug]">) {
  const { slug } = await props.params;
  const raw = getNewsPostBySlug(slug);
  if (!raw) notFound();
  const locale = await getLocale();
  const post = getLocalizedPost(raw, locale);

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <Link href="/tin-tuc" className="text-sm text-ink-soft hover:text-ink">
          {backLabel[locale]}
        </Link>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-rose-ink">
          {formatNewsDate(post.date, locale)}
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
          {post.content.map((block, i) => (
            <Block key={i} block={block} locale={locale} />
          ))}
        </div>
      </div>
    </Container>
  );
}
