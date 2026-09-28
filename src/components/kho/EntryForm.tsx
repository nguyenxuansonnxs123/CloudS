"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { OPERATORS, SKUS, TX_TYPE_LABEL, WAREHOUSES, type TxType } from "@/lib/inventory-config";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-line bg-brand-cream px-4 py-2.5 text-sm text-ink outline-none focus:border-brand-black";

function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T | "";
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="mt-1.5 flex gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={clsx(
            "flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
            value === o.value
              ? "border-brand-black bg-brand-black text-brand-cream"
              : "border-line bg-brand-cream text-ink hover:border-brand-black"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function EntryForm() {
  const router = useRouter();
  const [type, setType] = useState<TxType>("in");
  const [warehouseId, setWarehouseId] = useState<string>(WAREHOUSES[0].id);
  const [sku, setSku] = useState<string>(SKUS[0].code);
  const [qty, setQty] = useState("");
  const [operator, setOperator] = useState<string>("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!operator) {
      setError("Vui lòng chọn người nhập dữ liệu (Sơn hoặc Tùng).");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/kho/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, sku, warehouseId, qty: Number(qty), operator, note }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Ghi phiếu thất bại.");
      setSuccess(`Đã ghi phiếu ${TX_TYPE_LABEL[type].toLowerCase()}: ${qty} đôi ${sku}.`);
      setQty("");
      setNote("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ghi phiếu thất bại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
      <h2 className="font-display text-xl text-ink">Ghi phiếu nhập / xuất</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <span className="block text-sm font-semibold text-ink">Loại phiếu</span>
          <Segmented<TxType>
            label="Loại phiếu"
            value={type}
            onChange={setType}
            options={[
              { value: "in", label: TX_TYPE_LABEL.in },
              { value: "out", label: TX_TYPE_LABEL.out },
            ]}
          />
        </div>

        <div>
          <span className="block text-sm font-semibold text-ink">Người nhập dữ liệu</span>
          <Segmented<string>
            label="Người nhập dữ liệu"
            value={operator}
            onChange={setOperator}
            options={OPERATORS.map((o) => ({ value: o, label: o }))}
          />
        </div>

        <div>
          <label htmlFor="warehouse" className="block text-sm font-semibold text-ink">
            Kho
          </label>
          <select id="warehouse" value={warehouseId} onChange={(e) => setWarehouseId(e.target.value)} className={fieldClass}>
            {WAREHOUSES.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sku" className="block text-sm font-semibold text-ink">
            Mã hàng
          </label>
          <select id="sku" value={sku} onChange={(e) => setSku(e.target.value)} className={fieldClass}>
            {SKUS.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code} — {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="qty" className="block text-sm font-semibold text-ink">
            Số lượng (đôi)
          </label>
          <input
            id="qty"
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            required
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-semibold text-ink">
            Ghi chú (không bắt buộc)
          </label>
          <input
            id="note"
            type="text"
            maxLength={200}
            placeholder="VD: tồn đầu kỳ, giao đơn CLS-XXXXXX..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      {success && (
        <p role="status" className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 flex h-11 w-full items-center justify-center rounded-full bg-brand-black text-sm font-semibold text-brand-cream hover:bg-ink-soft disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {submitting ? "Đang ghi..." : `Ghi phiếu ${TX_TYPE_LABEL[type].toLowerCase()}`}
      </button>
    </form>
  );
}
