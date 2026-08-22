"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { autoAppliedVoucherCodes, findVoucher } from "@/lib/vouchers";

// Lưu ý: nơi gọi component này phải khởi tạo `codes` bằng
// `autoAppliedVoucherCodes()` (vd: useState(() => autoAppliedVoucherCodes()))
// để voucher tự động luôn có mặt ngay từ lần render đầu — không dùng effect
// để "vá" sau, tránh setState trong effect và tránh lệch hydrate.
export function VoucherSection({
  codes,
  onChange,
}: {
  codes: string[];
  onChange: (codes: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const autoApplied = autoAppliedVoucherCodes();

  function handleApply() {
    const voucher = findVoucher(input);
    if (!voucher) {
      setError("Mã giảm giá không hợp lệ.");
      return;
    }
    if (codes.includes(voucher.code)) {
      setError("Mã này đã được áp dụng.");
      return;
    }
    onChange([...codes, voucher.code]);
    setInput("");
    setError(null);
  }

  function handleRemove(code: string) {
    if (autoApplied.includes(code)) return; // voucher tự động không thể gỡ
    onChange(codes.filter((c) => c !== code));
  }

  return (
    <div className="rounded-2xl border border-line bg-brand-cream p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-ink">
        <Tag className="size-4 text-rose-ink" aria-hidden />
        Voucher
      </p>

      {codes.length > 0 && (
        <ul className="mt-3 space-y-2">
          {codes.map((code) => {
            const voucher = findVoucher(code);
            const isAuto = autoApplied.includes(code);
            return (
              <li
                key={code}
                className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-rose-ink/40 bg-blush-tint px-3 py-2 text-sm"
              >
                <span className="text-ink">
                  <span className="font-semibold">{code}</span>
                  {voucher && <span className="text-ink-soft"> — {voucher.label}</span>}
                </span>
                {isAuto ? (
                  <span className="shrink-0 text-xs font-medium text-rose-ink">Tự động áp dụng</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRemove(code)}
                    aria-label={`Gỡ mã ${code}`}
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
          placeholder="Nhập mã giảm giá"
          className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-brand-black"
        />
        <button
          type="button"
          onClick={handleApply}
          className="shrink-0 rounded-xl border border-brand-black px-4 py-2 text-sm font-semibold text-ink hover:bg-brand-black hover:text-brand-cream"
        >
          Áp dụng
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
