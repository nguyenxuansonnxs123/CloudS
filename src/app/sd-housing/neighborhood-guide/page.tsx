import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Neighborhood Guide — SD Housing",
  description:
    "Tips near SD Housing, 53E Alley 31 Xuan Dieu, Tay Ho — must-try restaurants and cafés, a shortcut to West Lake, and our rooftop lake view.",
};

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

export default function NeighborhoodGuidePage() {
  return (
    <Container className="py-14 sm:py-20">
      <Link
        href="/sd-housing"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to SD Housing
      </Link>

      <div className="mt-4 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
          Neighborhood guide
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          Tips near SD Housing
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          A few favorite spots and shortcuts around our place at 53E, Alley 31 Xuan Dieu, Tay
          Ho, Hanoi.
        </p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-ink underline underline-offset-4"
        >
          View on Google Maps
        </a>
      </div>

      {/* Shortcut */}
      <section className="mt-14 sm:mt-20">
        <SectionHeading
          eyebrow="Getting around"
          title="Shortcut to West Lake"
          description="There's a shortcut to West Lake right near our apartment — you'll find it between house No. 57 and No. 59 on Alley 31 Xuan Dieu."
        />
        <div className="relative mt-6 aspect-[720/1059] max-w-sm overflow-hidden rounded-3xl border border-line">
          <Image
            src="/images/sd-housing/shortcut-map.webp"
            alt="Map showing the shortcut to West Lake near SD Housing, between house No. 57 and No. 59 on Alley 31 Xuan Dieu"
            fill
            sizes="(min-width: 640px) 384px, 90vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Rooftop */}
      <section className="mt-14 sm:mt-20">
        <SectionHeading eyebrow="At home" title="Our rooftop, direct lake view" />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
            <Image
              src="/images/sd-housing/rooftop-view.webp"
              alt="Rooftop terrace at SD Housing with a direct view of West Lake at sunset"
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover"
            />
          </div>
          <p className="text-sm leading-relaxed text-ink-soft">
            We have a rooftop on the fifth floor with a direct view of West Lake, and there&apos;s
            also a desk suitable for working. You&apos;re very welcome to come up and enjoy the
            view anytime.
          </p>
        </div>
      </section>

      {/* Restaurants */}
      <section className="mt-14 sm:mt-20">
        <SectionHeading
          eyebrow="Eat & drink"
          title="Must-try restaurants & eateries in West Lake"
          description="A few well-known spots near our place — feel free to explore more of the area too."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="bg-brand-cream text-left">
                  <th className="px-5 py-3 font-semibold text-ink">Restaurant / Eatery</th>
                  <th className="px-5 py-3 font-semibold text-ink">Address</th>
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
