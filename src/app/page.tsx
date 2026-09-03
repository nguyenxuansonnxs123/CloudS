import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Wind, Footprints, Wallet } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { Carousel } from "@/components/Carousel";
import { ScrollRow } from "@/components/ScrollRow";
import { siteConfig } from "@/lib/site-config";
import { products } from "@/lib/products";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const seo = {
    vi: {
      title: "Giày Thể Thao, Sneaker & Mule Nữ Nam Cầu Giấy, Hà Nội",
      description:
        "CloudS bán giày thể thao, giày sneaker, giày mule nữ chính hãng cho sinh viên và giới trẻ khu vực Cầu Giấy, các trường đại học Hà Nội. Thoáng khí, êm chân, giá sinh viên, ship nhanh trong ngày.",
    },
    en: {
      title: "Sneakers & Mules for Women, Men — Cau Giay, Hanoi",
      description:
        "CloudS sells genuine sneakers and mules for students and young people around Cau Giay and Hanoi's university area. Breathable, comfortable, student-friendly prices, same-day shipping.",
    },
  }[locale];
  return { title: seo.title, description: seo.description, alternates: { canonical: siteConfig.url } };
}

const content = {
  vi: {
    usps: [
      {
        icon: Wind,
        title: "Thoáng khí cả ngày",
        detail: "Thân giày sợi Poly/vải dệt giúp chân luôn khô thoáng dù di chuyển liên tục.",
      },
      {
        icon: ShieldCheck,
        title: "Bền, bám chắc",
        detail: "Đế cao su GCR chống mài mòn và chống trơn trượt, an tâm khi đi bộ nhiều.",
      },
      {
        icon: Footprints,
        title: "Êm chân, dễ xỏ",
        detail: "Lót EVA giảm chấn, kiểu mule dễ xỏ nhanh cho buổi sáng vội vã.",
      },
      {
        icon: Wallet,
        title: "Giá hợp lý",
        detail: "Chất lượng ổn định với mức giá dễ tiếp cận hơn các thương hiệu ngoại.",
      },
    ],
    tagline: "Move a little. Feel a lot.",
    h1: "Nhẹ như mây, bước cả ngày.",
    heroP1:
      "CloudS là sneaker hiệu năng cho vận động hàng ngày — thoáng khí, êm chân, dễ đi từ lúc ra khỏi nhà đến khi kết thúc một ngày dài.",
    heroP2:
      "Giày thể thao, giày sneaker, giày mule nữ dành cho sinh viên và giới trẻ khu vực Cầu Giấy, các trường đại học Hà Nội.",
    exploreProducts: "Khám phá sản phẩm",
    openingOffer: "Ưu đãi khai trương",
    posterAlt: "3 lý do chọn CloudS — Bước nhẹ mỗi ngày: nhẹ & thoáng, bền & bám tốt, tối giản dễ phối",
    productsEyebrow: "Sản phẩm",
    productsTitle: "Bộ sưu tập mở màn của CloudS",
    productsDesc: "Mỗi mẫu là một câu trả lời cho một kiểu ngày bận rộn — chọn đôi hợp với nhịp sống của bạn.",
    comingSoonNote: "Sắp có thêm giày búp bê, giày chạy bộ, giày đi bộ, giày tennis —",
    comingSoonLink: "xem trước tại đây",
    lifestyleEyebrow: "Trải nghiệm thực tế",
    lifestyleTitle: "CloudS trong nhịp sống hằng ngày",
    lifestyleDesc: "Đi làm, đi bộ, cà phê cuối tuần — CloudS đồng hành trong mọi khoảnh khắc.",
    lifestyleAlt: "Khoảnh khắc cùng CloudS",
    trustTitle: "Lỡ sai size cũng đừng lo.",
    trustDesc:
      "Chế độ An Tâm Mua Sắm: hoàn tiền 100% nếu sai mô tả, đổi màu/size miễn phí trong 5 ngày, bảo hành 6 tháng lỗi keo đế. Mọi yêu cầu phản hồi trong 24 giờ.",
    trustCta: "Xem chính sách đổi trả",
    clubEyebrow: "CloudS Walking Club",
    clubTitle: "Một cộng đồng nhỏ, cùng nhau bước đều mỗi ngày.",
    clubDesc:
      "CloudS khuyến khích thói quen đi bộ hằng ngày — không chỉ là một đôi giày, mà là động lực để bạn duy trì vận động cùng những người có cùng chí hướng.",
    clubCta: "Tìm hiểu thêm",
    finalTitle: "Sẵn sàng cho một đôi CloudS?",
    finalCta1: "Xem tất cả sản phẩm",
    finalCta2: "Liên hệ tư vấn size",
    heroSlides: [
      { src: "/images/home/hero-grand-opening.webp", alt: "CloudS Grand Opening — Bước nhẹ mỗi ngày" },
      { src: "/images/cloudstride/hero-banner.webp", alt: "CloudStride 1 — Từ sáng đến cuối ngày" },
      { src: "/images/mule-rose/hero-banner.webp", alt: "Cloud Mule 1 Rose — Sáng vội vẫn xỏ giày kịp" },
      {
        src: "/images/mule-vanilla/hero-banner.webp",
        alt: "Cloud Mule 1 Vanilla Cream — Sáng vội vẫn xỏ giày kịp",
      },
      { src: "/images/home/promo-pink-vibes-1.webp", alt: "Cloud Mule 1 Rose — Pink Vibes Only" },
      { src: "/images/home/promo-pink-vibes-2.webp", alt: "Cloud Mule 1 Rose — Năng động mỗi ngày với CloudS" },
      { src: "/images/home/promo-white-mood.webp", alt: "Cloud Mule 1 Vanilla Cream — White Mood Only" },
      { src: "/images/home/promo-pink-steps.webp", alt: "Cloud Mule 1 Rose — Bước nhẹ mỗi ngày" },
    ],
    carouselLabel: "Bộ sưu tập CloudS",
  },
  en: {
    usps: [
      {
        icon: Wind,
        title: "Breathable all day",
        detail: "Poly-mesh/knit upper keeps your feet dry even when you're on the move all day.",
      },
      {
        icon: ShieldCheck,
        title: "Durable, sure grip",
        detail: "GCR rubber outsole resists wear and slipping, reassuring for lots of walking.",
      },
      {
        icon: Footprints,
        title: "Comfortable, easy on",
        detail: "EVA cushioning insole, mule style slips on fast for a rushed morning.",
      },
      {
        icon: Wallet,
        title: "Fair price",
        detail: "Consistent quality at a price more accessible than foreign brands.",
      },
    ],
    tagline: "Move a little. Feel a lot.",
    h1: "Light as a cloud, all day long.",
    heroP1:
      "CloudS is a performance sneaker for everyday movement — breathable, comfortable, easy to wear from the moment you step out to the end of a long day.",
    heroP2: "Sneakers and mules for students and young people around Cau Giay and Hanoi's university area.",
    exploreProducts: "Explore products",
    openingOffer: "Opening offer",
    posterAlt: "3 reasons to choose CloudS — light every day: light & breathable, durable & grippy, easy to style",
    productsEyebrow: "Products",
    productsTitle: "CloudS's opening collection",
    productsDesc: "Each style is an answer for a busy kind of day — pick the pair that fits your pace.",
    comingSoonNote: "Coming soon: ballet flats, running shoes, walking shoes, tennis shoes —",
    comingSoonLink: "preview here",
    lifestyleEyebrow: "Real life",
    lifestyleTitle: "CloudS in everyday life",
    lifestyleDesc: "Work, walks, weekend coffee — CloudS goes with you through every moment.",
    lifestyleAlt: "A moment with CloudS",
    trustTitle: "Picked the wrong size? No worries.",
    trustDesc:
      "Peace of Mind guarantee: 100% refund if not as described, free color/size exchange within 5 days, 6-month warranty on sole defects. We respond to every request within 24 hours.",
    trustCta: "See return policy",
    clubEyebrow: "CloudS Walking Club",
    clubTitle: "A small community, walking steadily together every day.",
    clubDesc:
      "CloudS encourages a daily walking habit — not just a pair of shoes, but motivation to keep moving alongside like-minded people.",
    clubCta: "Learn more",
    finalTitle: "Ready for a pair of CloudS?",
    finalCta1: "See all products",
    finalCta2: "Get size advice",
    heroSlides: [
      { src: "/images/home/hero-grand-opening.webp", alt: "CloudS Grand Opening — light steps every day" },
      { src: "/images/cloudstride/hero-banner.webp", alt: "CloudStride 1 — from morning to night" },
      { src: "/images/mule-rose/hero-banner.webp", alt: "Cloud Mule 1 Rose — slip on even in a rush" },
      { src: "/images/mule-vanilla/hero-banner.webp", alt: "Cloud Mule 1 Vanilla Cream — slip on even in a rush" },
      { src: "/images/home/promo-pink-vibes-1.webp", alt: "Cloud Mule 1 Rose — Pink Vibes Only" },
      { src: "/images/home/promo-pink-vibes-2.webp", alt: "Cloud Mule 1 Rose — energetic every day with CloudS" },
      { src: "/images/home/promo-white-mood.webp", alt: "Cloud Mule 1 Vanilla Cream — White Mood Only" },
      { src: "/images/home/promo-pink-steps.webp", alt: "Cloud Mule 1 Rose — light steps every day" },
    ],
    carouselLabel: "CloudS collection",
  },
};

const lifestyleGallery = [
  { src: "/images/cloudstride/gallery-model.webp", width: 1400, height: 1400 },
  { src: "/images/mule-rose/gallery-model-1.webp", width: 1024, height: 1024 },
  { src: "/images/mule-vanilla/gallery-model.webp", width: 1400, height: 1867 },
  { src: "/images/cloudstride/lifestyle-5.webp", width: 1400, height: 2488 },
  { src: "/images/mule-rose/lifestyle-2.webp", width: 1400, height: 1867 },
  { src: "/images/mule-vanilla/lifestyle-4.webp", width: 1400, height: 1867 },
  { src: "/images/cloudstride/lifestyle-4.webp", width: 1024, height: 1024 },
  { src: "/images/mule-rose/lifestyle-6.webp", width: 1024, height: 1024 },
];

export default async function HomePage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <>
      {/* Hero slideshow */}
      <section className="bg-brand-cream">
        <Container className="pb-10 pt-8 sm:pt-12">
          <Carousel
            ariaLabel={t.carouselLabel}
            aspectClassName="aspect-[4/5] sm:aspect-[16/9]"
            className="overflow-hidden rounded-3xl border border-line"
            autoPlayMs={5500}
            slides={t.heroSlides.map((slide) => (
              <div key={slide.src} className="relative size-full bg-brand-cream">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={slide.src === t.heroSlides[0].src}
                />
              </div>
            ))}
          />
        </Container>
        <Container className="pb-14 text-center sm:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
            {t.tagline}
          </p>
          <h1 className="mx-auto mt-3 max-w-xl font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
            {t.h1}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            {t.heroP1}
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-soft/80">
            {t.heroP2}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/san-pham" size="lg" icon={<ArrowRight className="size-4" aria-hidden />}>
              {t.exploreProducts}
            </Button>
            <Button href="/uu-dai" variant="ghost" size="lg">
              {t.openingOffer}
            </Button>
          </div>
        </Container>
      </section>

      {/* USPs */}
      <section className="border-y border-line bg-surface">
        <Container className="grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {t.usps.map(({ icon: Icon, title, detail }) => (
            <div key={title}>
              <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{detail}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* 3 lý do chọn CloudS — poster */}
      <section className="bg-brand-cream">
        <Container className="py-14 sm:py-20">
          <div className="overflow-hidden rounded-3xl border border-line">
            <Image
              src="/images/home/features-3-reasons.webp"
              alt={t.posterAlt}
              width={2000}
              height={780}
              className="h-auto w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Featured products */}
      <section className="bg-surface">
        <Container className="py-16 sm:py-24">
          <SectionHeading eyebrow={t.productsEyebrow} title={t.productsTitle} description={t.productsDesc} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-soft">
            {t.comingSoonNote}{" "}
            <Link href="/san-pham#sap-ra-mat" className="font-semibold text-ink underline underline-offset-4">
              {t.comingSoonLink}
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* Lifestyle gallery strip */}
      <section className="bg-brand-cream">
        <Container className="py-16 sm:py-24">
          <SectionHeading eyebrow={t.lifestyleEyebrow} title={t.lifestyleTitle} description={t.lifestyleDesc} />
          <ScrollRow className="mt-8">
            {lifestyleGallery.map((img) => (
              <div
                key={img.src}
                className="relative h-64 shrink-0 snap-start overflow-hidden rounded-3xl sm:h-80"
                style={{ aspectRatio: `${img.width} / ${img.height}` }}
              >
                <Image
                  src={img.src}
                  alt={t.lifestyleAlt}
                  fill
                  sizes="(min-width: 640px) 320px, 256px"
                  className="object-cover"
                />
              </div>
            ))}
          </ScrollRow>
        </Container>
      </section>

      {/* Trust / return policy teaser */}
      <section className="border-y border-line bg-blush-tint">
        <Container className="grid gap-8 py-14 sm:grid-cols-[1.4fr_1fr] sm:items-center">
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">{t.trustTitle}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">{t.trustDesc}</p>
          </div>
          <div className="sm:justify-self-end">
            <Button href="/chinh-sach-doi-tra" variant="primary" size="lg">
              {t.trustCta}
            </Button>
          </div>
        </Container>
      </section>

      {/* Walking club teaser */}
      <section className="bg-brand-black">
        <Container className="py-16 text-center sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush">{t.clubEyebrow}</p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl leading-tight text-brand-cream sm:text-4xl">
            {t.clubTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-brand-cream/70">{t.clubDesc}</p>
          <Button href="/ve-clouds" variant="secondary" size="lg" className="mt-8">
            {t.clubCta}
          </Button>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-cream">
        <Container className="flex flex-col items-center gap-5 py-16 text-center sm:py-20">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">{t.finalTitle}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/san-pham" size="lg">
              {t.finalCta1}
            </Button>
            <Button href="/lien-he" variant="ghost" size="lg">
              {t.finalCta2}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
