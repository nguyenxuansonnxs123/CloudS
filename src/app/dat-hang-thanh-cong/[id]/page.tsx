import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { getOrderById } from "@/lib/orders-store";
import { formatPrice } from "@/lib/products";
import { siteConfig, isBankConfigured } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Đặt hàng thành công",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

function buildVietQrUrl(amount: number, addInfo: string) {
  const { bin, accountNumber, accountName } = siteConfig.bank;
  const params = new URLSearchParams({
    amount: String(amount),
    addInfo,
    accountName,
  });
  return `https://img.vietqr.io/image/${bin}-${accountNumber}-compact2.png?${params.toString()}`;
}

export default async function OrderSuccessPage(props: PageProps<"/dat-hang-thanh-cong/[id]">) {
  const { id } = await props.params;
  const order = await getOrderById(id);
  if (!order) notFound();

  const showBankQr = order.paymentMethod === "bank_transfer" && isBankConfigured();

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-lg text-center">
        <CheckCircle2 className="mx-auto size-12 text-rose-ink" aria-hidden />
        <h1 className="mt-4 font-display text-3xl text-ink">Đặt hàng thành công!</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Mã đơn hàng của bạn là <span className="font-semibold text-ink">{order.code}</span>. CloudS sẽ
          liên hệ xác nhận trong vòng 24 giờ làm việc.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-display text-lg text-ink">Chi tiết đơn hàng</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {order.items.map((item) => (
            <li key={`${item.slug}-${item.size}`} className="flex justify-between text-ink-soft">
              <span>
                {item.name} ({item.color}, size {item.size}) x{item.quantity}
              </span>
              <span className="text-ink">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-soft">Tạm tính</dt>
            <dd className="text-ink">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Phí vận chuyển</dt>
            <dd className="text-ink">{formatPrice(order.shippingFee)}</dd>
          </div>
          {order.shippingDiscount > 0 && (
            <div className="flex justify-between">
              <dt className="text-rose-ink">
                Giảm giá voucher{order.appliedVouchers.length > 0 && ` (${order.appliedVouchers.join(", ")})`}
              </dt>
              <dd className="text-rose-ink">-{formatPrice(order.shippingDiscount)}</dd>
            </div>
          )}
          {!!order.affiliateDiscount && order.affiliateDiscount > 0 && (
            <div className="flex justify-between">
              <dt className="text-rose-ink">Giảm giá mã giới thiệu ({order.affiliateCode})</dt>
              <dd className="text-rose-ink">-{formatPrice(order.affiliateDiscount)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
            <dt className="text-ink">Tổng cộng</dt>
            <dd className="text-ink">{formatPrice(order.total)}</dd>
          </div>
        </dl>

        <div className="mt-6 space-y-1 border-t border-line pt-4 text-sm text-ink-soft">
          <p>
            <span className="font-semibold text-ink">Người nhận:</span> {order.customer.name}
          </p>
          <p>
            <span className="font-semibold text-ink">SĐT:</span> {order.customer.phone}
          </p>
          <p>
            <span className="font-semibold text-ink">Địa chỉ:</span> {order.customer.address}
          </p>
          <p>
            <span className="font-semibold text-ink">Thanh toán:</span>{" "}
            {order.paymentMethod === "cod" ? "Thanh toán khi nhận hàng (COD)" : "Chuyển khoản ngân hàng"}
          </p>
        </div>
      </div>

      {order.paymentMethod === "bank_transfer" && (
        <div className="mx-auto mt-6 max-w-lg rounded-3xl border border-line bg-blush-tint p-6 text-center sm:p-8">
          {showBankQr ? (
            <>
              <h2 className="font-display text-lg text-ink">Quét mã để chuyển khoản</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Vui lòng chuyển đúng số tiền — nội dung chuyển khoản đã có sẵn mã đơn hàng.
              </p>
              <div className="relative mx-auto mt-4 aspect-square w-64 overflow-hidden rounded-2xl bg-white">
                <Image
                  src={buildVietQrUrl(order.total, order.code)}
                  alt={`Mã QR chuyển khoản đơn hàng ${order.code}`}
                  fill
                  sizes="256px"
                  className="object-contain p-3"
                  unoptimized
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-ink">{formatPrice(order.total)}</p>
              <p className="text-xs text-ink-soft">Nội dung chuyển khoản: {order.code}</p>
              <p className="mt-3 text-xs text-ink-soft">
                Sau khi CloudS xác nhận đã nhận được tiền, bạn sẽ nhận email cảm ơn kèm xác nhận đơn hàng.
              </p>
            </>
          ) : (
            <p className="text-sm text-ink-soft">
              CloudS sẽ gửi thông tin chuyển khoản cho bạn qua điện thoại/email trong thời gian sớm nhất.
            </p>
          )}
        </div>
      )}

      <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
        <Link
          href="/san-pham"
          className="flex h-12 flex-1 items-center justify-center rounded-full border border-line text-sm font-medium text-ink hover:border-brand-black"
        >
          Tiếp tục mua sắm
        </Link>
        <Link
          href="/lien-he"
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-brand-black text-sm font-semibold text-brand-cream hover:bg-ink-soft"
        >
          Liên hệ CloudS
        </Link>
      </div>
    </Container>
  );
}
