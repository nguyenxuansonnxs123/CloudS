import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { listAffiliates } from "@/lib/affiliates-store";
import { listOrders } from "@/lib/orders-store";
import { formatPrice } from "@/lib/products";
import { AdminNav } from "@/components/admin/AdminNav";
import { AddAffiliateForm } from "@/components/admin/AddAffiliateForm";
import { AffiliateRowActions } from "@/components/admin/AffiliateRowActions";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Quản trị affiliate",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAffiliatesPage() {
  const [affiliates, orders] = await Promise.all([listAffiliates(), listOrders()]);

  const statsByCode = new Map<string, { orderCount: number; unpaidTotal: number; paidTotal: number }>();
  for (const order of orders) {
    if (!order.affiliateCode || !order.affiliateCommission) continue;
    // Chỉ tính hoa hồng cho đơn đã xác nhận thanh toán thành công (COD hoặc chuyển khoản đã nhận tiền).
    if (!order.paymentConfirmed) continue;
    const stats = statsByCode.get(order.affiliateCode) ?? { orderCount: 0, unpaidTotal: 0, paidTotal: 0 };
    stats.orderCount += 1;
    if (order.affiliateCommissionPaid) {
      stats.paidTotal += order.affiliateCommission;
    } else {
      stats.unpaidTotal += order.affiliateCommission;
    }
    statsByCode.set(order.affiliateCode, stats);
  }

  return (
    <Container className="py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink sm:text-3xl">Affiliate ({affiliates.length})</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Quản lý mã voucher affiliate và theo dõi công nợ hoa hồng.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AdminNav active="affiliates" />
          <LogoutButton />
        </div>
      </div>

      <div className="mt-6">
        <AddAffiliateForm />
      </div>

      {affiliates.length === 0 ? (
        <p className="mt-10 text-sm text-ink-soft">Chưa có affiliate nào.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface text-left">
                <th className="px-4 py-3 font-semibold text-ink">Affiliate</th>
                <th className="px-4 py-3 font-semibold text-ink">Mã voucher</th>
                <th className="px-4 py-3 text-right font-semibold text-ink">Giảm cho khách</th>
                <th className="px-4 py-3 text-right font-semibold text-ink">Hoa hồng/đơn</th>
                <th className="px-4 py-3 text-right font-semibold text-ink">Số đơn</th>
                <th className="px-4 py-3 text-right font-semibold text-ink">Chưa trả</th>
                <th className="px-4 py-3 text-right font-semibold text-ink">Đã trả</th>
                <th className="px-4 py-3 font-semibold text-ink">Trạng thái</th>
                <th className="px-4 py-3 font-semibold text-ink">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {affiliates.map((a) => {
                const stats = statsByCode.get(a.code) ?? { orderCount: 0, unpaidTotal: 0, paidTotal: 0 };
                return (
                  <tr key={a.id}>
                    <td className="px-4 py-3 font-medium text-ink">{a.name}</td>
                    <td className="px-4 py-3 text-ink-soft">{a.code}</td>
                    <td className="px-4 py-3 text-right text-ink-soft">{formatPrice(a.customerDiscount)}</td>
                    <td className="px-4 py-3 text-right text-ink-soft">{formatPrice(a.commissionPerOrder)}</td>
                    <td className="px-4 py-3 text-right text-ink-soft">{stats.orderCount}</td>
                    <td className="px-4 py-3 text-right font-medium text-rose-ink">
                      {stats.unpaidTotal > 0 ? formatPrice(stats.unpaidTotal) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-ink-soft">
                      {stats.paidTotal > 0 ? formatPrice(stats.paidTotal) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {a.active ? (
                        <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink">
                          Hoạt động
                        </span>
                      ) : (
                        <span className="rounded-full bg-blush-tint px-2.5 py-0.5 text-xs font-medium text-ink-soft">
                          Tạm dừng
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <AffiliateRowActions id={a.id} active={a.active} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-xs text-ink-soft">
        Cột &ldquo;Chưa trả&rdquo; chỉ tính đơn đã xác nhận thanh toán thành công. Sang trang{" "}
        <span className="font-medium text-ink">Đơn hàng</span> để đánh dấu đã trả hoa hồng cho từng đơn.
      </p>
    </Container>
  );
}
