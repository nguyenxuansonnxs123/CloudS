import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { listOrders } from "@/lib/orders-store";
import { formatPrice } from "@/lib/products";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";
import { PaymentConfirmButton } from "@/components/admin/PaymentConfirmButton";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Quản trị đơn hàng",
  robots: { index: false },
};

// Trang admin đọc dữ liệu trực tiếp từ file mỗi lần tải — không cache tĩnh.
export const dynamic = "force-dynamic";

const paymentLabels = {
  cod: "COD",
  bank_transfer: "Chuyển khoản",
};

export default async function AdminOrdersPage() {
  const orders = await listOrders();

  return (
    <Container className="py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink sm:text-3xl">Đơn hàng ({orders.length})</h1>
          <p className="mt-1 text-sm text-ink-soft">Danh sách đơn đặt qua website, mới nhất trước.</p>
        </div>
        <LogoutButton />
      </div>

      {orders.length === 0 ? (
        <p className="mt-10 text-sm text-ink-soft">Chưa có đơn hàng nào.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-line bg-surface text-left">
                <th className="px-4 py-3 font-semibold text-ink">Mã đơn</th>
                <th className="px-4 py-3 font-semibold text-ink">Thời gian</th>
                <th className="px-4 py-3 font-semibold text-ink">Khách hàng</th>
                <th className="px-4 py-3 font-semibold text-ink">Sản phẩm</th>
                <th className="px-4 py-3 font-semibold text-ink">Thanh toán</th>
                <th className="px-4 py-3 text-right font-semibold text-ink">Tổng tiền</th>
                <th className="px-4 py-3 font-semibold text-ink">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 font-medium text-ink">{order.code}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    {new Date(order.createdAt).toLocaleString("vi-VN")}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">
                    <div className="font-medium text-ink">{order.customer.name}</div>
                    <div>{order.customer.phone}</div>
                    <div className="max-w-[220px] truncate" title={order.customer.address}>
                      {order.customer.address}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">
                    {order.items.map((item) => (
                      <div key={`${item.slug}-${item.size}`}>
                        {item.name} ({item.size}) x{item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">
                    <div>{paymentLabels[order.paymentMethod]}</div>
                    {order.paymentMethod === "bank_transfer" &&
                      (order.paymentConfirmed ? (
                        <span className="mt-1 inline-block rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink">
                          Đã nhận tiền
                        </span>
                      ) : (
                        <div className="mt-1">
                          <PaymentConfirmButton orderId={order.id} />
                        </div>
                      ))}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-ink">{formatPrice(order.total)}</td>
                  <td className="px-4 py-3">
                    <OrderStatusSelect orderId={order.id} status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
}
