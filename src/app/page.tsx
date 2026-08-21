import Image from "next/image";
import { ArrowRight, ShieldCheck, Wind, Footprints, Wallet } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

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

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-brand-cream">
        <Container className="grid gap-10 pb-14 pt-14 sm:pt-20">
          <div className="max-w-2xl animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-dark">
              {siteConfig.tagline}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] text-ink sm:text-6xl">
              Nhẹ như mây,
              <br />
              bước cả ngày.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
              CloudS là sneaker hiệu năng cho vận động hàng ngày — thoáng khí, êm chân,
              dễ đi từ lúc ra khỏi nhà đến khi kết thúc một ngày dài.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/san-pham" size="lg" icon={<ArrowRight className="size-4" aria-hidden />}>
                Khám phá sản phẩm
              </Button>
              <Button href="/uu-dai-khai-truong" variant="ghost" size="lg">
                Ưu đãi khai trương
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-line">
            <Image
              src="/images/men/hero-banner.webp"
              alt="CloudS — từ sáng đến cuối ngày: đi làm, đi bộ, gặp gỡ bạn bè"
              width={1636}
              height={785}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </Container>
      </section>

      {/* USPs */}
      <section className="border-y border-line bg-surface">
        <Container className="grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map(({ icon: Icon, title, detail }) => (
            <div key={title}>
              <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-blush-dark">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{detail}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Featured products */}
      <section className="bg-brand-cream">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="Sản phẩm"
            title="Hai đôi mở màn của CloudS"
            description="Mỗi mẫu là một câu trả lời cho một kiểu ngày bận rộn — chọn đôi hợp với nhịp sống của bạn."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Lifestyle / positioning */}
      <section className="bg-surface">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="/images/men/lifestyle-running.webp"
                alt="Vận động cùng CloudS Performance"
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="/images/women/lifestyle-leg.webp"
                alt="CloudS Mule — dễ xỏ, dễ đi mỗi ngày"
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Định vị"
              title="Hiệu năng cho vận động hàng ngày"
              description="Không phải giày thời trang thuần tuý — CloudS lấy sự thoải mái khi di chuyển, đi bộ nhiều trong ngày làm gốc. Phong cách tối giản, dễ phối đồ là điểm cộng thêm."
            />
            <ul className="mt-6 space-y-3 text-sm text-ink-soft">
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-blush-dark" />
                Đi làm, đi học, đi bộ, gặp gỡ bạn bè — một đôi là đủ cho cả ngày.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-blush-dark" />
                Bằng chứng thực tế qua trải nghiệm thật, không chỉ lời quảng cáo.
              </li>
              <li className="flex gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-blush-dark" />
                Đa dạng size — Nam 41–43, Nữ 36–38.
              </li>
            </ul>
            <Button href="/ve-clouds" variant="ghost" className="mt-8">
              Tìm hiểu về CloudS
            </Button>
          </div>
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
              CloudS hỗ trợ đổi size trong 5 ngày đầu nhận hàng, và chịu trách nhiệm 100%
              nếu lỗi đến từ phía shop. Mọi yêu cầu được phản hồi trong vòng 24 giờ làm việc.
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
