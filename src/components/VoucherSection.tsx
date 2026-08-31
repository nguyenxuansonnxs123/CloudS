"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import type { ResolvedVoucher } from "@/lib/vouchers";
import { useDictionary } from "./LocaleProvider";

// Lưu ý: nơi gọi component này phải khởi tạo `vouchers` bằng danh sách voucher tự động (vd
// `useState(() => autoAppliedResolvedVouchers())`) để voucher tự động luôn có mặt ngay từ lần
// render đầu — không dùng effect để "vá" sau, tránh setState trong effect và tránh lệch hydrate.
export function VoucherSection({
  vouchers,
  onChange,
}: {
  vouchers: ResolvedVoucher[];
  onChange: (vouchers: ResolvedVoucher[]) => void;
}) {
  const t = useDictionary();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  async function handleApply() {
    const code = input.trim();
    if (!code) return;
    if (vouchers.some((v) => v.code === code.toUpperCase())) {
      setError(t.voucher.alreadyApplied);
      return;
    }

    setChecking(true);
    setError(null);
    try {
      const res = await fetch(`/api/vouchers/resolve?code=${encodeURIComponent(code)}`);
      if (!res.ok) {
        setError(t.voucher.invalid);
        return;
      }
      const resolved: ResolvedVoucher = await res.json();

      if (resolved.kind === "affiliate_discount" && vouchers.some((v) => v.kind === "affiliate_discount")) {
        setError(t.voucher.onlyOneReferral);
        return;
      }

      onChange([...vouchers, resolved]);
      setInput("");
    } catch {
      setError(t.voucher.checkFailed);
    } finally {
      setChecking(false);
    }
  }

  function handleRemove(code: string) {
    const voucher = vouchers.find((v) => v.code === code);
    if (voucher?.kind === "free_shipping") return; // voucher tự động không thể gỡ
    onChange(vouchers.filter((v) => v.code !== code));
  }

  return (
    <div className="rounded-2xl border border-line bg-brand-cream p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-ink">
        <Tag className="size-4 text-rose-ink" aria-hidden />
        {t.voucher.title}
      </p>

      {vouchers.length > 0 && (
        <ul className="mt-3 space-y-2">
          {vouchers.map((voucher) => {
            const isAuto = voucher.kind === "free_shipping";
            return (
              <li
                key={voucher.code}
                className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-rose-ink/40 bg-blush-tint px-3 py-2 text-sm"
              >
                <span className="text-ink">
                  <span className="font-semibold">{voucher.code}</span>
                  <span className="text-ink-soft"> — {voucher.label}</span>
                </span>
                {isAuto ? (
                  <span className="shrink-0 text-xs font-medium text-rose-ink">{t.voucher.autoApplied}</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRemove(voucher.code)}
                    aria-label={t.voucher.remove(voucher.code)}
                    className="flex size-6 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-surface hover:text-ink"
                  >
                    <X className="size-3.5" aria-hidden />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          placeholder={t.voucher.placeholder}
          className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-black"
        />
        <button
          type="button"
          onClick={handleApply}
          disabled={checking}
          className="shrink-0 rounded-xl border border-brand-black px-4 py-2 text-sm font-semibold text-ink hover:bg-brand-black hover:text-brand-cream disabled:opacity-60"
        >
          {checking ? t.voucher.checking : t.voucher.apply}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
