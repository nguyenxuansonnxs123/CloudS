import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, MessageCircle, Sunrise } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const seo = {
    vi: {
      title: "SD Housing — Chỗ Ở Ấm Cúng Gần Hồ Tây, Hà Nội",
      description:
        "Một căn hộ ấm cúng tại số 53E, Ngõ 31 Xuân Diệu, Tây Hồ, Hà Nội — chỉ vài bước từ Hồ Tây, có sân thượng nhìn ra hồ và bàn làm việc.",
    },
    en: {
      title: "SD Housing — Cozy Stay Near West Lake, Hanoi",
      description:
        "A cozy apartment stay at 53E, Alley 31 Xuan Dieu, Tay Ho, Hanoi — steps from West Lake, with a rooftop lake view and a workspace desk.",
    },
  }[locale];
  return { title: seo.title, description: seo.description };
}

const MAPS_URL = "https://maps.app.goo.gl/fs2G7ZPzirzc6NX89";

const content = {
  vi: {
    eyebrow: "SD Housing",
    h1: "Một chỗ ở ấm cúng bên Hồ Tây, Hà Nội",
    intro:
      "Một căn hộ yên tĩnh, thoải mái tại số 53E, Ngõ 31 Xuân Diệu, Tây Hồ — chỉ vài bước chân từ Hồ Tây, với sân thượng nhìn thẳng ra mặt hồ.",
    contactCta: "Liên hệ đặt phòng",
    guideCta: "Xem cẩm nang khu vực",
    heroImageAlt: "Sân thượng tại SD Housing với tầm nhìn thẳng ra Hồ Tây lúc hoàng hôn",
    highlightEyebrow: "Điểm nổi bật",
    highlightTitle: "Sân thượng nhìn ra hồ",
    rooftopTitle: "Sân thượng tầng 5",
    rooftopDesc:
      "Tầm nhìn thẳng ra Hồ Tây, có bàn làm việc rất thích hợp để làm việc. Bạn thoải mái lên đây ngắm cảnh bất cứ lúc nào.",
    addressTitle: "53E, Ngõ 31 Xuân Diệu",
    addressDesc:
      "Tây Hồ, Hà Nội — ngay trong khu vực Hồ Tây, gần các quán cà phê, nhà hàng và có lối tắt đi thẳng ra hồ.",
    mapsLink: "Xem trên Google Maps",
    guideBannerTitle: "Mới đến đây? Xem cẩm nang khu vực",
    guideBannerDesc:
      "Các nhà hàng, quán cà phê nên thử gần đây, cùng lối tắt đi thẳng ra Hồ Tây.",
    guideBannerCta: "Mở cẩm nang khu vực",
  },
  en: {
    eyebrow: "SD Housing",
    h1: "A cozy stay by West Lake, Hanoi",
    intro:
      "A quiet, comfortable apartment at 53E, Alley 31 Xuan Dieu, Tay Ho — just a short walk from West Lake, with a rooftop that has a direct lake view.",
    contactCta: "Contact for booking",
    guideCta: "See the neighborhood guide",
    heroImageAlt: "Rooftop terrace at SD Housing with a direct view of West Lake at sunset",
    highlightEyebrow: "Highlight",
    highlightTitle: "A rooftop with a lake view",
    rooftopTitle: "Rooftop on the 5th floor",
    rooftopDesc:
      "A direct view of West Lake, with a desk that's great for working. You're very welcome to come up and enjoy the view anytime.",
    addressTitle: "53E, Alley 31 Xuan Dieu",
    addressDesc:
      "Tay Ho, Hanoi, Vietnam — right in the West Lake area, close to cafés, restaurants and a shortcut straight to the lake.",
    mapsLink: "View on Google Maps",
    guideBannerTitle: "New around here? Check the neighborhood guide",
    guideBannerDesc: "Must-try restaurants and cafés nearby, plus a shortcut straight to West Lake.",
    guideBannerCta: "Open the neighborhood guide",
  },
};

export default async function SdHousingPage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <Container className="py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {t.h1}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{t.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              href={siteConfig.contact.zaloLink}
              size="lg"
              icon={<MessageCircle className="size-4" aria-hidden />}
              external
            >
              {t.contactCta}
            </Button>
            <Button href="/sd-housing/neighborhood-guide" variant="ghost" size="lg">
              {t.guideCta}
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
          <Image
            src="/images/sd-housing/rooftop-view.webp"
            alt={t.heroImageAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <section className="mt-14 sm:mt-20">
        <SectionHeading eyebrow={t.highlightEyebrow} title={t.highlightTitle} />
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <Sunrise className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-lg text-ink">{t.rooftopTitle}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{t.rooftopDesc}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <MapPin className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-lg text-ink">{t.addressTitle}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{t.addressDesc}</p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-ink underline underline-offset-4"
            >
              {t.mapsLink}
            </a>
          </div>
        </div>
      </section>

      <div className="mt-14 rounded-3xl border border-line bg-surface p-8 text-center sm:mt-20 sm:p-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">{t.guideBannerTitle}</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
          {t.guideBannerDesc}
        </p>
        <Button href="/sd-housing/neighborhood-guide" size="lg" className="mt-6">
          {t.guideBannerCta}
        </Button>
      </div>
    </Container>
  );
}
