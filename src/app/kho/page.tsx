import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EntryForm } from "@/components/kho/EntryForm";
import { HistoryTable } from "@/components/kho/HistoryTable";
import { KhoLogoutButton } from "@/components/kho/KhoLogoutButton";
import { SKUS, WAREHOUSES, computeStock } from "@/lib/inventory-config";
import { isStorageDurable, listTransactions } from "@/lib/inventory-store";

export const metadata: Metadata = {
  title: "Quản lý tồn kho",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function KhoPage() {
  const transactions = await listTransactions();
  const stock = computeStock(transactions);

  const warehouseTotals = WAREHOUSES.map((w) => SKUS.reduce((sum, s) => sum + stock[s.code][w.id], 0));
  const grandTotal = warehouseTotals.reduce((a, b) => a + b, 0);

  return (
    <Container className="py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink sm:text-3xl">Quản lý tồn kho</h1>
          <p className="mt-1 text-sm text-ink-soft">Theo dõi nhập / xuất CloudStride 1 (đen) tại 4 kho.</p>
        </div>
        <KhoLogoutButton />
      </div>

      {!isStorageDurable() && (
        <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Cảnh báo: máy chủ chưa cấu hình <code>ORDERS_DATA_DIR</code> nên dữ liệu kho có thể bị mất sau mỗi lần cập nhật
          website. Hãy báo người quản trị hosting cấu hình trước khi nhập số liệu thật.
        </p>
      )}

      <section className="mt-8">
        <h2 className="font-display text-xl text-ink">Tồn kho hiện tại (đôi)</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface text-left">
                <th className="px-4 py-3 font-semibold text-ink">Mã hàng</th>
                {WAREHOUSES.map((w) => (
                  <th key={w.id} className="px-4 py-3 text-right font-semibold text-ink">
                    {w.name}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold text-ink">Tổng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {SKUS.map((s) => {
                const total = WAREHOUSES.reduce((sum, w) => sum + stock[s.code][w.id], 0);
                return (
                  <tr key={s.code}>
                    <td className="px-4 py-3">
                      <span className="font-medium text-ink">{s.code}</span>
                      <span className="block text-xs text-ink-soft">{s.label}</span>
                    </td>
                    {WAREHOUSES.map((w) => (
                      <td key={w.id} className="px-4 py-3 text-right text-ink">
                        {stock[s.code][w.id]}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right font-semibold text-ink">{total}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-line bg-surface">
                <td className="px-4 py-3 font-semibold text-ink">Tổng cộng</td>
                {warehouseTotals.map((total, i) => (
                  <td key={WAREHOUSES[i].id} className="px-4 py-3 text-right font-semibold text-ink">
                    {total}
                  </td>
                ))}
                <td className="px-4 py-3 text-right font-semibold text-ink">{grandTotal}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <div className="mt-10">
        <EntryForm />
      </div>

      <div className="mt-12">
        <HistoryTable transactions={transactions} />
      </div>
    </Container>
  );
}
