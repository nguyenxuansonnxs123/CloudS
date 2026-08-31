import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const seo = {
    vi: {
      title: "Cẩm Nang Khu Vực — SD Housing",
      description:
        "Mẹo hay gần SD Housing, số 53E Ngõ 31 Xuân Diệu, Tây Hồ — nhà hàng, quán cà phê nên thử, lối tắt ra Hồ Tây, và sân thượng nhìn hồ của chúng tôi.",
    },
    en: {
      title: "Neighborhood Guide — SD Housing",
      description:
        "Tips near SD Housing, 53E Alley 31 Xuan Dieu, Tay Ho — must-try restaurants and cafés, a shortcut to West Lake, and our rooftop lake view.",
    },
  }[locale];
  return { title: seo.title, description: seo.description };
}

const MAPS_URL = "https://maps.app.goo.gl/fs2G7ZPzirzc6NX89";

const restaurants = [
  { name: "Maii Bistro", address: "46 Tay Ho Street, Quang An Ward, Tay Ho District, Hanoi" },
  {
    name: "Chào Bạn – Vietnamese Restaurant",
    address: "Villa 28, Alley 11 To Ngoc Van Street, Quang An Ward, Tay Ho District, Hanoi",
  },
  { name: "Chops Tay Ho", address: "4 Quang An Street, Tay Ho District, Hanoi" },
  {
    name: "La Libra Steak House West Lake",
    address: "481 Lac Long Quan Street, Xuan La Ward, Tay Ho District, Hanoi",
  },
  { name: "Hanoi Taco Bar", address: "166 Tu Hoa Street, Quang An Ward, Tay Ho District, Hanoi" },
  {
    name: "Habibi Halal Lebanese Cuisine",
    address: "70 Alley 31 Xuan Dieu Street, Quang An Ward, Tay Ho District, Hanoi",
  },
  {
    name: "BAO WOW",
    address: "No. 31A, Alley 12 Dang Thai Mai Street, Quang An Ward, Tay Ho District, Hanoi",
  },
  {
    name: "Café Du Lac (InterContinental Westlake)",
    address: "5 Tu Hoa Street, Quang An Ward, Tay Ho District, Hanoi",
  },
  { name: "Lá Studio", address: "44 Alley 31 Xuan Dieu Street, Quang An Ward, Tay Ho District, Hanoi" },
  {
    name: "Xoài Đu Bistro & Café",
    address: "19 Alley 5 Tu Hoa Street, Quang An Ward, Tay Ho District, Hanoi",
  },
  { name: "Pépé La Poule", address: "22 Quang Khanh Street, Quang An Ward, Tay Ho District, Hanoi" },
  {
    name: "Mizumi Westlake (Fraser Suites)",
    address: "Fraser Suites Westlake, 51 Xuan Dieu Street, Tay Ho District, Hanoi",
  },
];

const content = {
  vi: {
    backLink: "Quay lại SD Housing",
    eyebrow: "Cẩm nang khu vực",
    h1: "Mẹo hay gần SD Housing",
    intro:
      "Một vài địa điểm yêu thích và lối tắt quanh chỗ ở của chúng tôi tại số 53E, Ngõ 31 Xuân Diệu, Tây Hồ, Hà Nội.",
    mapsLink: "Xem trên Google Maps",
    shortcutEyebrow: "Di chuyển",
    shortcutTitle: "Lối tắt ra Hồ Tây",
    shortcutDesc:
      "Có một lối tắt ra Hồ Tây ngay gần căn hộ của chúng tôi — bạn sẽ thấy nó nằm giữa số nhà 57 và 59 trên Ngõ 31 Xuân Diệu.",
    shortcutImageAlt:
      "Bản đồ chỉ lối tắt ra Hồ Tây gần SD Housing, giữa số nhà 57 và 59 trên Ngõ 31 Xuân Diệu",
    rooftopEyebrow: "Tại nhà",
    rooftopTitle: "Sân thượng của chúng tôi, nhìn thẳng ra hồ",
    rooftopImageAlt: "Sân thượng tại SD Housing với tầm nhìn thẳng ra Hồ Tây lúc hoàng hôn",
    rooftopDesc:
      "Chúng tôi có một sân thượng ở tầng năm với tầm nhìn thẳng ra Hồ Tây, và cũng có bàn làm việc phù hợp để làm việc. Bạn thoải mái lên đây ngắm cảnh bất cứ lúc nào.",
    eatEyebrow: "Ăn uống",
    eatTitle: "Nhà hàng & quán ăn nên thử ở khu Hồ Tây",
    eatDesc: "Một vài địa điểm nổi tiếng gần chỗ ở của chúng tôi — bạn cũng có thể tự do khám phá thêm khu vực này.",
    tableHeaderName: "Nhà hàng / Quán ăn",
    tableHeaderAddress: "Địa chỉ",
  },
  en: {
    backLink: "Back to SD Housing",
    eyebrow: "Neighborhood guide",
    h1: "Tips near SD Housing",
    intro:
      "A few favorite spots and shortcuts around our place at 53E, Alley 31 Xuan Dieu, Tay Ho, Hanoi.",
    mapsLink: "View on Google Maps",
    shortcutEyebrow: "Getting around",
    shortcutTitle: "Shortcut to West Lake",
    shortcutDesc:
      "There's a shortcut to West Lake right near our apartment — you'll find it between house No. 57 and No. 59 on Alley 31 Xuan Dieu.",
    shortcutImageAlt:
      "Map showing the shortcut to West Lake near SD Housing, between house No. 57 and No. 59 on Alley 31 Xuan Dieu",
    rooftopEyebrow: "At home",
    rooftopTitle: "Our rooftop, direct lake view",
    rooftopImageAlt: "Rooftop terrace at SD Housing with a direct view of West Lake at sunset",
    rooftopDesc:
      "We have a rooftop on the fifth floor with a direct view of West Lake, and there's also a desk suitable for working. You're very welcome to come up and enjoy the view anytime.",
    eatEyebrow: "Eat & drink",
    eatTitle: "Must-try restaurants & eateries in West Lake",
    eatDesc: "A few well-known spots near our place — feel free to explore more of the area too.",
    tableHeaderName: "Restaurant / Eatery",
    tableHeaderAddress: "Address",
  },
};

export default async function NeighborhoodGuidePage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <Container className="py-14 sm:py-20">
      <Link
        href="/sd-housing"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {t.backLink}
      </Link>

      <div className="mt-4 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
          {t.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">{t.h1}</h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">{t.intro}</p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-ink underline underline-offset-4"
        >
          {t.mapsLink}
        </a>
      </div>

      {/* Shortcut */}
      <section className="mt-14 sm:mt-20">
        <SectionHeading
          eyebrow={t.shortcutEyebrow}
          title={t.shortcutTitle}
          description={t.shortcutDesc}
        />
        <div className="relative mt-6 aspect-[720/1059] max-w-sm overflow-hidden rounded-3xl border border-line">
          <Image
            src="/images/sd-housing/shortcut-map.webp"
            alt={t.shortcutImageAlt}
            fill
            sizes="(min-width: 640px) 384px, 90vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Rooftop */}
      <section className="mt-14 sm:mt-20">
        <SectionHeading eyebrow={t.rooftopEyebrow} title={t.rooftopTitle} />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
            <Image
              src="/images/sd-housing/rooftop-view.webp"
              alt={t.rooftopImageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover"
            />
          </div>
          <p className="text-sm leading-relaxed text-ink-soft">{t.rooftopDesc}</p>
        </div>
      </section>

      {/* Restaurants */}
      <section className="mt-14 sm:mt-20">
        <SectionHeading eyebrow={t.eatEyebrow} title={t.eatTitle} description={t.eatDesc} />
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="bg-brand-cream text-left">
                  <th className="px-5 py-3 font-semibold text-ink">{t.tableHeaderName}</th>
                  <th className="px-5 py-3 font-semibold text-ink">{t.tableHeaderAddress}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {restaurants.map((r) => (
                  <tr key={r.name}>
                    <td className="px-5 py-3 text-ink">{r.name}</td>
                    <td className="px-5 py-3 text-ink-soft">{r.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Container>
  );
}
