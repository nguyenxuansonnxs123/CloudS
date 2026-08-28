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

export const metadata: Metadata = {
  title: "Giày Thể Thao, Sneaker & Mule Nữ Nam Cầu Giấy, Hà Nội",
  description:
    "CloudS bán giày thể thao, giày sneaker, giày mule nữ chính hãng cho sinh viên và giới trẻ khu vực Cầu Giấy, các trường đại học Hà Nội. Thoáng khí, êm chân, giá sinh viên, ship nhanh trong ngày.",
  alternates: { canonical: siteConfig.url },
};

const usps = [
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
];

const heroSlides = [
  {
    src: "/images/home/hero-grand-opening.webp",
    alt: "CloudS Grand Opening — Bước nhẹ mỗi ngày",
  },
  {
    src: "/images/cloudstride/hero-banner.webp",
    alt: "CloudStride 1 — Từ sáng đến cuối ngày",
  },
  {
    src: "/images/mule-rose/hero-banner.webp",
    alt: "Cloud Mule 1 Rose — Sáng vội vẫn xỏ giày kịp",
  },
  {
    src: "/images/mule-vanilla/hero-banner.webp",
    alt: "Cloud Mule 1 Vanilla Cream — Sáng vội vẫn xỏ giày kịp",
  },
];

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

export default function HomePage() {
  return (
    <>
      {/* Hero slideshow */}
      <section className="bg-brand-cream">
        <Container className="pb-10 pt-8 sm:pt-12">
          <Carousel
            ariaLabel="Bộ sưu tập CloudS"
            aspectClassName="aspect-[4/5] sm:aspect-[16/9]"
            className="overflow-hidden rounded-3xl border border-line"
            autoPlayMs={5500}
            slides={heroSlides.map((slide) => (
              <div key={slide.src} className="relative size-full bg-brand-cream">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={slide.src === heroSlides[0].src}
                />
              </div>
            ))}
          />
        </Container>
        <Container className="pb-14 text-center sm:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
            Move a little. Feel a lot.
          </p>
          <h1 className="mx-auto mt-3 max-w-xl font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
            Nhẹ như mây, bước cả ngày.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            CloudS là sneaker hiệu năng cho vận động hàng ngày — thoáng khí, êm chân, dễ đi
            từ lúc ra khỏi nhà đến khi kết thúc một ngày dài.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-soft/80">
            Giày thể thao, giày sneaker, giày mule nữ dành cho sinh viên và giới trẻ khu vực
            Cầu Giấy, các trường đại học Hà Nội.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/san-pham" size="lg" icon={<ArrowRight className="size-4" aria-hidden />}>
              Khám phá sản phẩm
            </Button>
            <Button href="/uu-dai" variant="ghost" size="lg">
              Ưu đãi khai trương
            </Button>
          </div>
        </Container>
      </section>

      {/* USPs */}
      <section className="border-y border-line bg-surface">
        <Container className="grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map(({ icon: Icon, title, detail }) => (
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
              alt="3 lý do chọn CloudS — Bước nhẹ mỗi ngày: nhẹ & thoáng, bền & bám tốt, tối giản dễ phối"
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
          <SectionHeading
            eyebrow="Sản phẩm"
            title="Bộ sưu tập mở màn của CloudS"
            description="Mỗi mẫu là một câu trả lời cho một kiểu ngày bận rộn — chọn đôi hợp với nhịp sống của bạn."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-soft">
            Sắp có thêm giày búp bê, giày chạy bộ, giày đi bộ, giày tennis —{" "}
            <Link href="/san-pham#sap-ra-mat" className="font-semibold text-ink underline underline-offset-4">
              xem trước tại đây
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* Lifestyle gallery strip */}
      <section className="bg-brand-cream">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="Trải nghiệm thực tế"
            title="CloudS trong nhịp sống hằng ngày"
            description="Đi làm, đi bộ, cà phê cuối tuần — CloudS đồng hành trong mọi khoảnh khắc."
          />
          <ScrollRow className="mt-8">
            {lifestyleGallery.map((img) => (
              <div
                key={img.src}
                className="relative h-64 shrink-0 snap-start overflow-hidden rounded-3xl sm:h-80"
                style={{ aspectRatio: `${img.width} / ${img.height}` }}
              >
                <Image
                  src={img.src}
                  alt="Khoảnh khắc cùng CloudS"
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
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Lỡ sai size cũng đừng lo.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
              Chế độ An Tâm Mua Sắm: hoàn tiền 100% nếu sai mô tả, đổi màu/size miễn phí
              trong 5 ngày, bảo hành 6 tháng lỗi keo đế. Mọi yêu cầu phản hồi trong 24 giờ.
            </p>
          </div>
          <div className="sm:justify-self-end">
            <Button href="/chinh-sach-doi-tra" variant="primary" size="lg">
              Xem chính sách đổi trả
            </Button>
          </div>
        </Container>
      </section>

      {/* Walking club teaser */}
      <section className="bg-brand-black">
        <Container className="py-16 text-center sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush">
            CloudS Walking Club
          </p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl leading-tight text-brand-cream sm:text-4xl">
            Một cộng đồng nhỏ, cùng nhau bước đều mỗi ngày.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-brand-cream/70">
            CloudS khuyến khích thói quen đi bộ hằng ngày — không chỉ là một đôi giày,
            mà là động lực để bạn duy trì vận động cùng những người có cùng chí hướng.
          </p>
          <Button href="/ve-clouds" variant="secondary" size="lg" className="mt-8">
            Tìm hiểu thêm
          </Button>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-cream">
        <Container className="flex flex-col items-center gap-5 py-16 text-center sm:py-20">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Sẵn sàng cho một đôi CloudS?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/san-pham" size="lg">
              Xem tất cả sản phẩm
            </Button>
            <Button href="/lien-he" variant="ghost" size="lg">
              Liên hệ tư vấn size
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
