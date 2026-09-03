import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ShieldCheck } from "lucide-react";
import { Container } from "@/components/Container";
import { BuyActions } from "@/components/BuyActions";
import { AddToCartForm } from "@/components/AddToCartForm";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Carousel } from "@/components/Carousel";
import { ScrollRow } from "@/components/ScrollRow";
import { siteConfig } from "@/lib/site-config";
import {
  formatPrice,
  getLocalizedProduct,
  getProductBySlug,
  getSiblingColorProducts,
  products,
  sizeGuide,
} from "@/lib/products";
import { getLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/san-pham/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const rawProduct = getProductBySlug(slug);
  if (!rawProduct) return {};
  const locale = await getLocale();
  const product = getLocalizedProduct(rawProduct, locale);
  const url = `${siteConfig.url}/san-pham/${product.slug}`;
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title: product.name,
      description: product.description,
      url,
      images: [{ url: product.images.gallery[0] }],
      type: "website",
    },
  };
}

const content = {
  vi: {
    sectionNav: [
      { href: "#thong-tin", label: "Thông tin sản phẩm" },
      { href: "#size", label: "Hướng dẫn chọn size" },
      { href: "#bao-hanh", label: "Bảo hành & đổi trả" },
    ],
    newBadge: "Mới",
    openingDiscountBadge: "Giảm giá khai trương",
    colorSectionTitle: "Màu sắc",
    currentColorAriaLabel: (color: string) => `Màu hiện tại: ${color}`,
    switchColorAriaLabel: (color: string) => `Đổi sang màu ${color}`,
    colorLabel: (color: string) => `Màu ${color}`,
    otherChannels: "Hoặc mua qua kênh khác",
    warrantyInlineText:
      "Chế độ An Tâm Mua Sắm — hoàn tiền 100% nếu sai mô tả, bảo hành 6 tháng lỗi keo đế.",
    featuresEyebrow: "Chi tiết sản phẩm",
    featuresTitle: "Vì sao CloudS đáng để đầu tư",
    lifestyleEyebrow: "Trải nghiệm thực tế",
    lifestyleTitle: "CloudS trong đời sống hằng ngày",
    lifestyleAlt: (name: string) => `${name} — trải nghiệm thực tế`,
    sizeGuideEyebrow: "Size guide",
    sizeGuideTitle: "Hướng dẫn chọn size",
    sizeGuideDescription:
      "Bảng quy đổi chiều dài chân tham khảo — nếu số đo của bạn nằm giữa hai mốc, nên chọn size lớn hơn.",
    sizeColumn: "Size",
    footLengthColumn: "Chiều dài chân",
    careTitle: "Cách bảo quản",
    warrantyTitle: "Chế độ An Tâm Mua Sắm",
    warrantyDescription:
      "Hoàn tiền 100% nếu sản phẩm không đúng mô tả, đổi màu/size miễn phí trong 5 ngày, bảo hành 6 tháng lỗi đường keo đế. Mọi yêu cầu phản hồi trong 24 giờ làm việc.",
    warrantyCta: "Xem chính sách đầy đủ",
    crossSellEyebrow: "Có thể bạn quan tâm",
    crossSellTitle: "Khám phá thêm sản phẩm CloudS",
    galleryAriaLabel: (name: string) => `Ảnh sản phẩm ${name}`,
  },
  en: {
    sectionNav: [
      { href: "#thong-tin", label: "Product details" },
      { href: "#size", label: "Size guide" },
      { href: "#bao-hanh", label: "Warranty & returns" },
    ],
    newBadge: "New",
    openingDiscountBadge: "Opening discount",
    colorSectionTitle: "Color",
    currentColorAriaLabel: (color: string) => `Current color: ${color}`,
    switchColorAriaLabel: (color: string) => `Switch to ${color}`,
    colorLabel: (color: string) => `Color: ${color}`,
    otherChannels: "Or buy through another channel",
    warrantyInlineText:
      "Peace of Mind guarantee — 100% refund if not as described, 6-month warranty on sole defects.",
    featuresEyebrow: "Product details",
    featuresTitle: "Why CloudS is worth it",
    lifestyleEyebrow: "Real life",
    lifestyleTitle: "CloudS in everyday life",
    lifestyleAlt: (name: string) => `${name} — real-life photos`,
    sizeGuideEyebrow: "Size guide",
    sizeGuideTitle: "How to pick your size",
    sizeGuideDescription:
      "Reference chart for foot length — if your measurement falls between two sizes, go with the larger one.",
    sizeColumn: "Size",
    footLengthColumn: "Foot length",
    careTitle: "Care instructions",
    warrantyTitle: "Peace of Mind guarantee",
    warrantyDescription:
      "100% refund if the product doesn't match its description, free color/size exchange within 5 days, 6-month warranty on sole defects. We respond to every request within 24 business hours.",
    warrantyCta: "See full policy",
    crossSellEyebrow: "You might also like",
    crossSellTitle: "Explore more from CloudS",
    galleryAriaLabel: (name: string) => `Product photos of ${name}`,
  },
};

export default async function ProductPage(props: PageProps<"/san-pham/[slug]">) {
  const { slug } = await props.params;
  const rawProduct = getProductBySlug(slug);
  if (!rawProduct) notFound();

  const locale = await getLocale();
  const t = content[locale];
  const product = getLocalizedProduct(rawProduct, locale);

  const siblingColors = getSiblingColorProducts(product);
  const otherProducts = products.filter((p) => p.silhouette !== product.silhouette);
  const productSizeGuide = sizeGuide.filter((s) => product.sizes.includes(s.size));

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.gallery.map((src) => `${siteConfig.url}${src}`),
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/san-pham/${product.slug}`,
      priceCurrency: "VND",
      price: product.price,
      availability:
        product.inStock === false
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Container className="py-8 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <Carousel
              ariaLabel={t.galleryAriaLabel(product.name)}
              aspectClassName="aspect-square"
              className="overflow-hidden rounded-3xl border border-line bg-brand-cream"
              slides={product.images.gallery.map((src, i) => (
                <div key={src} className="relative size-full">
                  <Image
                    src={src}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-contain p-6"
                    priority={i === 0}
                  />
                </div>
              ))}
              thumbnails={product.images.gallery.map((src) => (
                <div key={src} className="relative size-full bg-brand-cream">
                  <Image src={src} alt="" fill sizes="80px" className="object-contain p-1" />
                </div>
              ))}
            />
          </div>

          {/* Info */}
          <div>
            <nav className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-xs font-medium text-ink-soft">
              {t.sectionNav.map((s) => (
                <a key={s.href} href={s.href} className="hover:text-ink">
                  {s.label}
                </a>
              ))}
            </nav>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
              {product.shortName}
              {product.isNew && ` · ${t.newBadge}`}
            </p>
            <h1 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 flex items-baseline gap-3">
              <span className="text-lg font-semibold text-ink">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-base text-ink-soft line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="rounded-full bg-rose-ink px-2.5 py-0.5 text-xs font-semibold text-brand-cream">
                    {t.openingDiscountBadge}
                  </span>
                </>
              )}
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">{product.description}</p>

            {siblingColors.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-ink">{t.colorSectionTitle}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="flex size-9 items-center justify-center rounded-full border-2 border-brand-black"
                    style={{ backgroundColor: product.colorSwatch }}
                    aria-label={t.currentColorAriaLabel(product.color)}
                  />
                  {siblingColors.map((sibling) => (
                    <a
                      key={sibling.slug}
                      href={`/san-pham/${sibling.slug}`}
                      className="size-9 rounded-full border border-line transition-transform hover:scale-105"
                      style={{ backgroundColor: sibling.colorSwatch }}
                      aria-label={t.switchColorAriaLabel(sibling.color)}
                    />
                  ))}
                </div>
              </div>
            )}
            {siblingColors.length === 0 && (
              <div className="mt-6 flex items-center gap-3">
                <span
                  className="size-6 rounded-full border border-line"
                  style={{ backgroundColor: product.colorSwatch }}
                  aria-hidden
                />
                <span className="text-sm text-ink">{t.colorLabel(product.color)}</span>
              </div>
            )}

            <AddToCartForm product={product} />

            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {t.otherChannels}
            </p>
            <BuyActions
              size="lg"
              className="mt-3"
              shopeeUrl={product.shopeeUrl}
              tiktokUrl={product.tiktokUrl}
            />

            <ul className="mt-8 space-y-2.5 border-t border-line pt-6 text-sm text-ink-soft">
              {product.usps.map((usp) => (
                <li key={usp} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-rose-ink" aria-hidden />
                  {usp}
                </li>
              ))}
            </ul>

            <a
              href="#bao-hanh"
              className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-blush-tint px-4 py-3 text-sm text-ink hover:border-brand-black"
            >
              <ShieldCheck className="size-5 shrink-0 text-rose-ink" aria-hidden />
              {t.warrantyInlineText}
            </a>
          </div>
        </div>
      </Container>

      {/* Features */}
      <section id="thong-tin" className="scroll-mt-24 border-y border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <SectionHeading eyebrow={t.featuresEyebrow} title={t.featuresTitle} />
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

      {/* Lifestyle gallery */}
      {(product.images.lifestyle.length > 0 || (product.images.videos?.length ?? 0) > 0) && (
        <section className="bg-brand-cream">
          <Container className="py-14 sm:py-20">
            <SectionHeading eyebrow={t.lifestyleEyebrow} title={t.lifestyleTitle} />
            <ScrollRow className="mt-8">
              {product.images.lifestyle.map((img) => (
                <div
                  key={img.src}
                  className="relative h-72 shrink-0 snap-start overflow-hidden rounded-3xl sm:h-96"
                  style={{ aspectRatio: `${img.width} / ${img.height}` }}
                >
                  <Image
                    src={img.src}
                    alt={t.lifestyleAlt(product.name)}
                    fill
                    sizes="(min-width: 640px) 400px, 300px"
                    className="object-cover"
                  />
                </div>
              ))}
              {product.images.videos?.map((video) => (
                <video
                  key={video.src}
                  className="h-72 shrink-0 snap-start rounded-3xl object-cover sm:h-96"
                  style={{ aspectRatio: `${video.width} / ${video.height}` }}
                  src={video.src}
                  poster={video.poster}
                  controls
                  playsInline
                  preload="none"
                />
              ))}
            </ScrollRow>
          </Container>
        </section>
      )}

      {/* Size guide */}
      <section id="size" className="scroll-mt-24 border-y border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <SectionHeading
            eyebrow={t.sizeGuideEyebrow}
            title={t.sizeGuideTitle}
            description={t.sizeGuideDescription}
          />
          <div className="mt-8 max-w-md overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-cream text-left">
                  <th className="px-5 py-3 font-semibold text-ink">{t.sizeColumn}</th>
                  <th className="px-5 py-3 font-semibold text-ink">{t.footLengthColumn}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {productSizeGuide.map((row) => (
                  <tr key={row.size}>
                    <td className="px-5 py-3 text-ink">{row.size}</td>
                    <td className="px-5 py-3 text-ink-soft">{row.footLengthCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h3 className="font-display text-lg text-ink">{t.careTitle}</h3>
            <ul className="mt-4 max-w-2xl space-y-2.5 text-sm text-ink-soft">
              {product.care.map((tip) => (
                <li key={tip} className="flex gap-2.5">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-ink" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Warranty teaser */}
      <section id="bao-hanh" className="scroll-mt-24 bg-blush-tint">
        <Container className="py-14 text-center sm:py-20">
          <ShieldCheck className="mx-auto size-10 text-rose-ink" aria-hidden />
          <h2 className="mt-4 font-display text-2xl text-ink sm:text-3xl">{t.warrantyTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
            {t.warrantyDescription}
          </p>
          <a
            href="/chinh-sach-doi-tra"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-brand-black px-6 text-sm font-semibold text-brand-cream hover:bg-ink-soft"
          >
            {t.warrantyCta}
          </a>
        </Container>
      </section>

      {/* Cross-sell */}
      {otherProducts.length > 0 && (
        <section className="border-t border-line bg-surface">
          <Container className="py-14 sm:py-20">
            <SectionHeading eyebrow={t.crossSellEyebrow} title={t.crossSellTitle} />
            <ScrollRow className="mt-8">
              {otherProducts.map((p) => (
                <div key={p.slug} className="w-64 shrink-0 snap-start sm:w-80">
                  <ProductCard product={p} />
                </div>
              ))}
            </ScrollRow>
          </Container>
        </section>
      )}
    </>
  );
}
