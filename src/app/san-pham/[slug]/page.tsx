import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/Container";
import { BuyActions } from "@/components/BuyActions";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { formatPrice, getProductBySlug, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/san-pham/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage(props: PageProps<"/san-pham/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const otherProduct = products.find((p) => p.slug !== product.slug);

  return (
    <>
      <Container className="py-10 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-brand-cream">
              <Image
                src={product.images.main}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-contain p-8"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {product.images.gallery.map((src) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-brand-cream"
                >
                  <Image
                    src={src}
                    alt={`${product.name} — chi tiết`}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-dark">
              {product.shortName}
            </p>
            <h1 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-lg font-semibold text-ink">{formatPrice(product.price)}</p>
            <p className="mt-4 leading-relaxed text-ink-soft">{product.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <span
                className="size-6 rounded-full border border-line"
                style={{ backgroundColor: product.colorSwatch }}
                aria-hidden
              />
              <span className="text-sm text-ink">Màu {product.color}</span>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-ink">Size có sẵn</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="flex h-11 min-w-11 items-center justify-center rounded-full border border-line px-3 text-sm font-medium text-ink"
                  >
                    {size}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-ink-soft">
                Chưa chắc size của mình? Nhắn Zalo để được tư vấn size trước khi đặt.
              </p>
            </div>

            <BuyActions size="lg" className="mt-8" />

            <ul className="mt-8 space-y-2.5 border-t border-line pt-6 text-sm text-ink-soft">
              {product.usps.map((usp) => (
                <li key={usp} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-blush-dark" aria-hidden />
                  {usp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Features */}
      <section className="border-y border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <SectionHeading eyebrow="Chi tiết sản phẩm" title="Vì sao CloudS đi cả ngày vẫn êm" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-line bg-brand-cream p-6">
                <h3 className="font-display text-lg text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Lifestyle */}
      {product.images.lifestyle.length > 0 && (
        <section className="bg-brand-cream">
          <Container className="py-14 sm:py-20">
            <div
              className={`grid gap-4 ${
                product.images.lifestyle.length > 1 ? "sm:grid-cols-2" : "sm:grid-cols-1"
              }`}
            >
              {product.images.lifestyle.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={src}
                    alt={`${product.name} — trải nghiệm thực tế`}
                    fill
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Care instructions */}
      <section className="bg-surface">
        <Container className="py-14 sm:py-20">
          <SectionHeading eyebrow="Bảo quản" title="Giữ đôi CloudS luôn như mới" />
          <ul className="mt-6 max-w-2xl space-y-2.5 text-sm text-ink-soft">
            {product.care.map((tip) => (
              <li key={tip} className="flex gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blush-dark" />
                {tip}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Cross-sell */}
      {otherProduct && (
        <section className="border-t border-line bg-brand-cream">
          <Container className="py-14 sm:py-20">
            <SectionHeading eyebrow="Có thể bạn quan tâm" title="Khám phá đôi còn lại" />
            <div className="mt-8 max-w-md">
              <ProductCard product={otherProduct} />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
