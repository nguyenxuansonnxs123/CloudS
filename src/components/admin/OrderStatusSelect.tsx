"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { OrderStatus } from "@/lib/orders-store";

const labels: Record<OrderStatus, string> = {
  moi: "Mới",
  da_xu_ly: "Đã xử lý",
  da_huy: "Đã huỷ",
};

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const router = useRouter();
  const [current, setCurrent] = useState(status);
  const [saving, setSaving] = useState(false);

  async function handleChange(next: OrderStatus) {
    setCurrent(next);
    setSaving(true);
    try {
      await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={current}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value as OrderStatus)}
      className="rounded-full border border-line bg-brand-cream px-3 py-1.5 text-xs font-medium text-ink outline-none focus:border-brand-black disabled:opacity-60"
    >
      {(Object.keys(labels) as OrderStatus[]).map((key) => (
        <option key={key} value={key}>
          {labels[key]}
        </option>
      ))}
    </select>
  );
}
