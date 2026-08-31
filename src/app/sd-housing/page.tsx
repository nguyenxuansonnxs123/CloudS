import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, MessageCircle, Sunrise } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "SD Housing — Cozy Stay Near West Lake, Hanoi",
  description:
    "A cozy apartment stay at 53E, Alley 31 Xuan Dieu, Tay Ho, Hanoi — steps from West Lake, with a rooftop lake view and a workspace desk.",
};

const MAPS_URL = "https://maps.app.goo.gl/fs2G7ZPzirzc6NX89";

export default function SdHousingPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
            SD Housing
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
            A cozy stay by West Lake, Hanoi
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            A quiet, comfortable apartment at 53E, Alley 31 Xuan Dieu, Tay Ho — just a short walk
            from West Lake, with a rooftop that has a direct lake view.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              href={siteConfig.contact.zaloLink}
              size="lg"
              icon={<MessageCircle className="size-4" aria-hidden />}
              external
            >
              Contact for booking
            </Button>
            <Button href="/sd-housing/neighborhood-guide" variant="ghost" size="lg">
              See the neighborhood guide
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
          <Image
            src="/images/sd-housing/rooftop-view.webp"
            alt="Rooftop terrace at SD Housing with a direct view of West Lake at sunset"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <section className="mt-14 sm:mt-20">
        <SectionHeading eyebrow="Highlight" title="A rooftop with a lake view" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <Sunrise className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-lg text-ink">Rooftop on the 5th floor</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              A direct view of West Lake, with a desk that&apos;s great for working. You&apos;re
              very welcome to come up and enjoy the view anytime.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <MapPin className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-lg text-ink">53E, Alley 31 Xuan Dieu</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              Tay Ho, Hanoi, Vietnam — right in the West Lake area, close to cafés, restaurants
              and a shortcut straight to the lake.
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
        </div>
      </section>

      <div className="mt-14 rounded-3xl border border-line bg-surface p-8 text-center sm:mt-20 sm:p-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          New around here? Check the neighborhood guide
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
          Must-try restaurants and cafés nearby, plus a shortcut straight to West Lake.
        </p>
        <Button href="/sd-housing/neighborhood-guide" size="lg" className="mt-6">
          Open the neighborhood guide
        </Button>
      </div>
    </Container>
  );
}
