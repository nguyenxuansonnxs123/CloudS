"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { clsx } from "clsx";
import { useLocale } from "./LocaleProvider";

const labels = {
  vi: {
    prev: "Ảnh trước",
    next: "Ảnh tiếp theo",
    goTo: (i: number) => `Đến ảnh ${i}`,
    pause: "Tạm dừng trình chiếu",
    play: "Tiếp tục trình chiếu",
    viewImage: (i: number) => `Xem ảnh ${i}`,
  },
  en: {
    prev: "Previous image",
    next: "Next image",
    goTo: (i: number) => `Go to image ${i}`,
    pause: "Pause slideshow",
    play: "Resume slideshow",
    viewImage: (i: number) => `View image ${i}`,
  },
};

type CarouselProps = {
  slides: React.ReactNode[];
  thumbnails?: React.ReactNode[];
  autoPlayMs?: number;
  aspectClassName?: string;
  className?: string;
  slideClassName?: string;
  ariaLabel: string;
};

export function Carousel({
  slides,
  thumbnails,
  autoPlayMs,
  aspectClassName = "aspect-square",
  className,
  slideClassName,
  ariaLabel,
}: CarouselProps) {
  const t = labels[useLocale()];
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(Boolean(autoPlayMs));
  const isProgrammaticScroll = useRef(false);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (i + slides.length) % slides.length;
    isProgrammaticScroll.current = true;
    track.scrollTo({ left: track.clientWidth * clamped, behavior: "smooth" });
    setIndex(clamped);
    window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 500);
  }, [slides.length]);

  // Autoplay
  useEffect(() => {
    if (!autoPlayMs || !playing || slides.length <= 1) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      scrollToIndex(index + 1);
    }, autoPlayMs);
    return () => window.clearInterval(id);
  }, [autoPlayMs, playing, index, slides.length, scrollToIndex]);

  // Keep index in sync with manual swipe/scroll
  const handleScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return;
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    setIndex((prev) => (i !== prev ? i : prev));
  }, []);

  if (slides.length === 0) return null;

  return (
    <div className={clsx("group relative", className)}>
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        onScroll={handleScroll}
        className={clsx(
          "flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          aspectClassName
        )}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={clsx("w-full shrink-0 snap-center snap-always", slideClassName)}
            aria-hidden={i !== index}
          >
            {slide}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToIndex(index - 1)}
            aria-label={t.prev}
            className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink opacity-0 shadow-sm transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(index + 1)}
            aria-label={t.next}
            className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink opacity-0 shadow-sm transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>

          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={t.goTo(i + 1)}
                aria-current={i === index}
                className={clsx(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-6 bg-brand-black" : "w-2 bg-brand-black/30"
                )}
              />
            ))}
            {autoPlayMs && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? t.pause : t.play}
                className="ml-2 flex size-7 items-center justify-center rounded-full bg-surface/90 text-ink"
              >
                {playing ? <Pause className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}
              </button>
            )}
          </div>
        </>
      )}

      {thumbnails && thumbnails.length > 1 && (
        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {thumbnails.map((thumb, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={t.viewImage(i + 1)}
              aria-current={i === index}
              className={clsx(
                "size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors sm:size-20",
                i === index ? "border-brand-black" : "border-line"
              )}
            >
              {thumb}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
