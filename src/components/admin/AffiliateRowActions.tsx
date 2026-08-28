"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AffiliateRowActions({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function toggleActive() {
    setSaving(true);
    try {
      await fetch(`/api/admin/affiliates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Xoá affiliate này? Mã voucher sẽ ngừng hoạt động, các đơn cũ vẫn giữ nguyên dữ liệu.")) return;
    setSaving(true);
    try {
      await fetch(`/api/admin/affiliates/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={toggleActive}
        disabled={saving}
        className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink hover:border-brand-black disabled:opacity-60"
      >
        {active ? "Tạm dừng" : "Kích hoạt lại"}
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={saving}
        className="rounded-full border border-line px-3 py-1 text-xs font-medium text-red-600 hover:border-red-400 disabled:opacity-60"
      >
        Xoá
      </button>
    </div>
  );
}
