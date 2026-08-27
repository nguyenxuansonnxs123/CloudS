"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";

export function PaymentConfirmButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleConfirm() {
    if (!confirm("Xác nhận bạn đã kiểm tra và nhận được tiền chuyển khoản cho đơn này?")) return;
    setSaving(true);
    try {
      await fetch(`/api/admin/orders/${orderId}/confirm-payment`, { method: "POST" });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleConfirm}
      disabled={saving}
      className="inline-flex items-center gap-1 rounded-full border border-rose-ink px-2.5 py-1 text-xs font-medium text-rose-ink hover:bg-rose-ink hover:text-brand-cream disabled:opacity-60"
    >
      <Check className="size-3" aria-hidden />
      {saving ? "Đang lưu..." : "Xác nhận đã nhận tiền"}
    </button>
  );
}
