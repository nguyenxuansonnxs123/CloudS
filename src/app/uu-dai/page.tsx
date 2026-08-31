import type { Metadata } from "next";
import Image from "next/image";
import { Percent, Truck, ShieldCheck, Users, Sparkles } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const seo = {
    vi: {
      title: "Ưu đãi & Đổi trả",
      description:
        "Toàn bộ ưu đãi tại CloudS — khai trương, giới thiệu bạn bè — và chính sách đổi trả, Chế độ An Tâm Mua Sắm.",
    },
    en: {
      title: "Offers & Returns",
      description:
        "All CloudS offers — grand opening, refer a friend — plus our return policy and Peace of Mind Shopping guarantee.",
    },
  }[locale];
  return { title: seo.title, description: seo.description };
}

// Lưu ý: "Ưu đãi khai trương" bên dưới mang tính thời điểm (tuần 20–26/8).
// Sau khi hết hạn, gỡ khối "Đang diễn ra" và chỉ giữ lại các ưu đãi dài hạn.
const content = {
  vi: {
    eyebrow: "Ưu đãi",
    h1: "Ưu đãi & Đổi trả tại CloudS",
    intro:
      "Từ ưu đãi khai trương cho những khách hàng đầu tiên, đến chính sách đổi trả và các quyền lợi CloudS duy trì lâu dài — tất cả ở một chỗ.",
    ongoingTitle: "Đang diễn ra — Khai trương",
    heroAlt: "CloudS Grand Opening — Bước nhẹ mỗi ngày",
    discountTitle: "Giảm giá khai trương",
    discountTag: "3 ngày đầu khai trương",
    discountDesc:
      "Giảm 10–15% cho những đơn hàng đầu tiên, áp dụng cho cả 3 sản phẩm, trên mọi kênh. Giới hạn theo số lượng và thời gian — mốc nào đến trước.",
    shipTitle: "Miễn phí ship",
    shipTag: "Tuần khai trương",
    shipDesc:
      "Đặt hàng qua Threads, Instagram hoặc Facebook — CloudS miễn phí ship toàn quốc trong tuần đầu ra mắt.",
    longTermTitle: "Áp dụng lâu dài",
    referTitle: "Giới thiệu bạn bè",
    referDesc:
      "Rủ bạn mua CloudS — cả hai cùng được ưu đãi cho đơn tiếp theo. Nhắn tên người giới thiệu khi đặt hàng qua inbox để CloudS ghi nhận ưu đãi cho cả hai.",
    referCta: "Nhắn tin để tham gia",
    peaceTitle: "Chế độ An Tâm Mua Sắm",
    peaceDesc:
      "Hoàn tiền 100% nếu sản phẩm không đúng mô tả, đổi màu/size miễn phí, bảo hành 6 tháng lỗi keo đế — không phải một ưu đãi tạm thời, mà là cam kết đi kèm mọi đơn hàng.",
    peaceCta: "Xem chi tiết chính sách",
    ctaTitle: "Đừng bỏ lỡ ưu đãi cho đơn đầu tiên",
    ctaDesc:
      "Số lượng ưu đãi khai trương có giới hạn — inbox CloudS ngay để được cập nhật số lượng còn lại và tư vấn chọn size phù hợp.",
    ctaButton: "Nhắn tin nhận ưu đãi",
  },
  en: {
    eyebrow: "Offers",
    h1: "Offers & Returns at CloudS",
    intro:
      "From our grand opening offers for early customers, to our return policy and the perks CloudS keeps in place long-term — all in one place.",
    ongoingTitle: "Happening now — Grand opening",
    heroAlt: "CloudS Grand Opening — Step light every day",
    discountTitle: "Grand opening discount",
    discountTag: "First 3 days of opening",
    discountDesc:
      "10–15% off first orders, on all 3 products, across every channel. Limited by quantity and time — whichever comes first.",
    shipTitle: "Free shipping",
    shipTag: "Opening week",
    shipDesc:
      "Order via Threads, Instagram, or Facebook — CloudS ships free nationwide during launch week.",
    longTermTitle: "Ongoing offers",
    referTitle: "Refer a friend",
    referDesc:
      "Invite a friend to shop CloudS — you both get a discount on your next order. Mention your referrer's name when ordering via inbox so CloudS can credit the offer to both of you.",
    referCta: "Message us to join",
    peaceTitle: "Peace of Mind Shopping",
    peaceDesc:
      "100% refund if a product doesn't match its description, free color/size exchanges, 6-month warranty on sole adhesive defects — not a temporary offer, but a commitment that comes with every order.",
    peaceCta: "See full policy",
    ctaTitle: "Don't miss the offer for your first order",
    ctaDesc:
      "Grand opening offers are limited in quantity — inbox CloudS now for the latest availability and help finding the right size.",
    ctaButton: "Message us for offers",
  },
};

export default async function PromotionsPage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
          {t.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {t.h1}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {t.intro}
        </p>
      </div>

      {/* Đang diễn ra */}
      <section className="mt-12">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="size-5 text-rose-ink" aria-hidden />
          <h2 className="font-display text-2xl text-ink">{t.ongoingTitle}</h2>
        </div>

        <div className="grid gap-6 rounded-3xl border border-line bg-blush-tint p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-cream">
            <Image
              src="/images/home/hero-grand-opening.webp"
              alt={t.heroAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-top"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <span className="flex size-10 items-center justify-center rounded-full bg-surface text-rose-ink">
                <Percent className="size-5" aria-hidden />
              </span>
              <h3 className="mt-3 font-display text-lg text-ink">{t.discountTitle}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-rose-ink">
                {t.discountTag}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {t.discountDesc}
              </p>
            </div>
            <div>
              <span className="flex size-10 items-center justify-center rounded-full bg-surface text-rose-ink">
                <Truck className="size-5" aria-hidden />
              </span>
              <h3 className="mt-3 font-display text-lg text-ink">{t.shipTitle}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-rose-ink">
                {t.shipTag}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {t.shipDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Áp dụng lâu dài */}
      <section className="mt-14">
        <h2 className="mb-6 font-display text-2xl text-ink">{t.longTermTitle}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <Users className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-xl text-ink">{t.referTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {t.referDesc}
            </p>
            <Button href="/lien-he" variant="ghost" className="mt-6">
              {t.referCta}
            </Button>
          </div>
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <ShieldCheck className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-xl text-ink">{t.peaceTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {t.peaceDesc}
            </p>
            <Button href="/chinh-sach-doi-tra" variant="ghost" className="mt-6">
              {t.peaceCta}
            </Button>
          </div>
        </div>
      </section>

      <div className="mt-14 rounded-3xl bg-brand-black p-8 text-center sm:p-12">
        <h2 className="font-display text-2xl text-brand-cream sm:text-3xl">
          {t.ctaTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-brand-cream/70">
          {t.ctaDesc}
        </p>
        <Button href="/lien-he" variant="secondary" size="lg" className="mt-6">
          {t.ctaButton}
        </Button>
      </div>
    </Container>
  );
}
