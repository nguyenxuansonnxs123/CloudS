"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Locale } from "@/lib/locale";
import { setLocaleCookie } from "@/lib/locale-cookie";
import { useLocale } from "./LocaleProvider";

const options: { code: Locale; label: string }[] = [
  { code: "vi", label: "VI" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [optimisticLocale, setOptimisticLocale] = useState<Locale | null>(null);
  const current = optimisticLocale ?? locale;

  function switchTo(next: Locale) {
    if (next === current) return;
    setLocaleCookie(next);
    setOptimisticLocale(next);
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border border-line p-0.5 text-xs font-semibold ${className ?? ""}`}
      role="group"
      aria-label="Language / Ngôn ngữ"
    >
      {options.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => switchTo(opt.code)}
          disabled={pending}
          aria-pressed={current === opt.code}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            current === opt.code
              ? "bg-brand-black text-brand-cream"
              : "text-ink-soft hover:text-ink"
          } disabled:opacity-60`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
