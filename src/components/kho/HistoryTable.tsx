"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import {
  OPERATORS,
  SKUS,
  TX_TYPE_LABEL,
  WAREHOUSES,
  warehouseName,
  type InventoryTx,
} from "@/lib/inventory-config";

const dateFormat = new Intl.DateTimeFormat("vi-VN", {
  timeZone: "Asia/Ho_Chi_Minh",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const filterClass =
  "rounded-xl border border-line bg-brand-cream px-3 py-2 text-sm text-ink outline-none focus:border-brand-black";

export function HistoryTable({ transactions }: { transactions: InventoryTx[] }) {
  const router = useRouter();
  const [warehouse, setWarehouse] = useState("");
  const [sku, setSku] = useState("");
  const [type, setType] = useState("");
  const [operator, setOperator] = useState("");
  const [voidingId, setVoidingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      transactions.filter(
        (t) =>
          (!warehouse || t.warehouseId === warehouse) &&
          (!sku || t.sku === sku) &&
          (!type || t.type === type) &&
          (!operator || t.operator === operator)
      ),
    [transactions, warehouse, sku, type, operator]
  );

  async function handleVoid(id: string, by: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/kho/transactions/${id}/void`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ by }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Hủy phiếu thất bại.");
      setVoidingId(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hủy phiếu thất bại.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-xl text-ink">Lịch sử nhập / xuất ({rows.length})</h2>
        <div className="flex flex-wrap gap-2">
          <select aria-label="Lọc theo kho" value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className={filterClass}>
            <option value="">Tất cả kho</option>
            {WAREHOUSES.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
          <select aria-label="Lọc theo mã hàng" value={sku} onChange={(e) => setSku(e.target.value)} className={filterClass}>
            <option value="">Tất cả mã</option>
            {SKUS.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code}
              </option>
            ))}
          </select>
          <select aria-label="Lọc theo loại phiếu" value={type} onChange={(e) => setType(e.target.value)} className={filterClass}>
            <option value="">Nhập + Xuất</option>
            <option value="in">{TX_TYPE_LABEL.in}</option>
            <option value="out">{TX_TYPE_LABEL.out}</option>
          </select>
          <select aria-label="Lọc theo người nhập" value={operator} onChange={(e) => setOperator(e.target.value)} className={filterClass}>
            <option value="">Mọi người nhập</option>
            {OPERATORS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-ink-soft">
          {transactions.length === 0 ? "Chưa có phiếu nào. Hãy ghi phiếu nhập đầu tiên ở trên." : "Không có phiếu nào khớp bộ lọc."}
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface text-left">
                <th className="px-4 py-3 font-semibold text-ink">Thời gian</th>
                <th className="px-4 py-3 font-semibold text-ink">Loại</th>
                <th className="px-4 py-3 font-semibold text-ink">Kho</th>
                <th className="px-4 py-3 font-semibold text-ink">Mã hàng</th>
                <th className="px-4 py-3 text-right font-semibold text-ink">SL</th>
                <th className="px-4 py-3 font-semibold text-ink">Người nhập</th>
                <th className="px-4 py-3 font-semibold text-ink">Ghi chú</th>
                <th className="px-4 py-3 font-semibold text-ink"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((t) => (
                <tr key={t.id} className={clsx(t.voided && "text-ink-soft/60")}>
                  <td className="whitespace-nowrap px-4 py-3">{dateFormat.format(new Date(t.createdAt))}</td>
                  <td className="px-4 py-3">
                    <span
                      className={clsx(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        t.type === "in" ? "bg-green-50 text-green-800" : "bg-blush-tint text-rose-ink"
                      )}
                    >
                      {TX_TYPE_LABEL[t.type]}
                    </span>
                  </td>
                  <td className="px-4 py-3">{warehouseName(t.warehouseId)}</td>
                  <td className="whitespace-nowrap px-4 py-3">{t.sku}</td>
                  <td className={clsx("px-4 py-3 text-right font-semibold", t.voided && "line-through")}>
                    {t.type === "in" ? "+" : "−"}
                    {t.qty}
                  </td>
                  <td className="px-4 py-3">{t.operator}</td>
                  <td className="px-4 py-3">
                    {t.note}
                    {t.voided && (
                      <span className="block text-xs">
                        Đã hủy bởi {t.voided.by} · {dateFormat.format(new Date(t.voided.at))}
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {!t.voided &&
                      (voidingId === t.id ? (
                        <span className="flex items-center gap-1.5 text-xs">
                          <span className="text-ink-soft">Ai hủy?</span>
                          {OPERATORS.map((o) => (
                            <button
                              key={o}
                              type="button"
                              disabled={busy}
                              onClick={() => handleVoid(t.id, o)}
                              className="rounded-full border border-line px-2.5 py-1 font-medium text-ink hover:border-brand-black disabled:opacity-60"
                            >
                              {o}
                            </button>
                          ))}
                          <button type="button" onClick={() => setVoidingId(null)} className="px-1 text-ink-soft hover:text-ink">
                            Bỏ
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setError(null);
                            setVoidingId(t.id);
                          }}
                          className="text-xs font-medium text-ink-soft underline underline-offset-4 hover:text-ink"
                        >
                          Hủy phiếu
                        </button>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
