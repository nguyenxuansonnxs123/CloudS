"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus } from "lucide-react";

export function AddAffiliateForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [customerDiscount, setCustomerDiscount] = useState("10000");
  const [commissionPerOrder, setCommissionPerOrder] = useState("30000");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/affiliates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          code,
          customerDiscount: Number(customerDiscount),
          commissionPerOrder: Number(commissionPerOrder),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Tạo affiliate thất bại.");
      }
      setName("");
      setCode("");
      setCustomerDiscount("10000");
      setCommissionPerOrder("30000");
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tạo affiliate thất bại.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-brand-black px-4 py-2 text-sm font-semibold text-brand-cream hover:bg-ink-soft"
      >
        <Plus className="size-4" aria-hidden />
        Thêm affiliate
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div>
        <label htmlFor="aff-name" className="text-xs font-semibold text-ink">
          Tên affiliate
        </label>
        <input
          id="aff-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Đức"
          className="mt-1 w-full rounded-xl border border-line bg-brand-cream px-3 py-2 text-sm text-ink outline-none focus:border-brand-black"
        />
      </div>
      <div>
        <label htmlFor="aff-code" className="text-xs font-semibold text-ink">
          Mã voucher
        </label>
        <input
          id="aff-code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          required
          placeholder="DUC10K"
          className="mt-1 w-full rounded-xl border border-line bg-brand-cream px-3 py-2 text-sm text-ink outline-none focus:border-brand-black"
        />
      </div>
      <div>
        <label htmlFor="aff-discount" className="text-xs font-semibold text-ink">
          Giảm cho khách (đ)
        </label>
        <input
          id="aff-discount"
          type="number"
          min={1000}
          step={1000}
          value={customerDiscount}
          onChange={(e) => setCustomerDiscount(e.target.value)}
          required
          className="mt-1 w-full rounded-xl border border-line bg-brand-cream px-3 py-2 text-sm text-ink outline-none focus:border-brand-black"
        />
      </div>
      <div>
        <label htmlFor="aff-commission" className="text-xs font-semibold text-ink">
          Hoa hồng / đơn (đ)
        </label>
        <input
          id="aff-commission"
          type="number"
          min={1000}
          step={1000}
          value={commissionPerOrder}
          onChange={(e) => setCommissionPerOrder(e.target.value)}
          required
          className="mt-1 w-full rounded-xl border border-line bg-brand-cream px-3 py-2 text-sm text-ink outline-none focus:border-brand-black"
        />
      </div>

      {error && (
        <p role="alert" className="sm:col-span-2 lg:col-span-4 text-xs text-red-600">
          {error}
        </p>
      )}

      <div className="flex gap-2 sm:col-span-2 lg:col-span-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand-black px-5 py-2 text-sm font-semibold text-brand-cream hover:bg-ink-soft disabled:opacity-60"
        >
          {saving ? "Đang lưu..." : "Lưu affiliate"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full border border-line px-5 py-2 text-sm font-medium text-ink hover:border-brand-black"
        >
          Huỷ
        </button>
      </div>
    </form>
  );
}
