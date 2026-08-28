"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";

export function CommissionPaidButton({ orderId, paid }: { orderId: string; paid: boolean }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function toggle() {
    setSaving(true);
    try {
      await fetch(`/api/admin/orders/${orderId}/commission-paid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paid: !paid }),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  if (paid) {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={saving}
        className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink hover:bg-blush-tint disabled:opacity-60"
      >
        <Check className="size-3" aria-hidden />
        Đã trả hoa hồng
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={saving}
      className="inline-flex items-center gap-1 rounded-full border border-rose-ink px-2.5 py-1 text-xs font-medium text-rose-ink hover:bg-rose-ink hover:text-brand-cream disabled:opacity-60"
    >
      {saving ? "Đang lưu..." : "Đánh dấu đã trả"}
    </button>
  );
}
