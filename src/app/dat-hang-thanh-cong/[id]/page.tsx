import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/Container";
import { getOrderById } from "@/lib/orders-store";
import { formatPrice } from "@/lib/products";
import { siteConfig, isBankConfigured } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = locale === "en" ? "Order placed successfully" : "Đặt hàng thành công";
  return { title, robots: { index: false } };
}

export const dynamic = "force-dynamic";

const content = {
  vi: {
    successTitle: "Đặt hàng thành công!",
    successDetail: (code: React.ReactNode) => (
      <>
        Mã đơn hàng của bạn là <span className="font-semibold text-ink">{code}</span>. CloudS sẽ
        liên hệ xác nhận trong vòng 24 giờ làm việc.
      </>
    ),
    orderDetailTitle: "Chi tiết đơn hàng",
    subtotal: "Tạm tính",
    shippingFee: "Phí vận chuyển",
    voucherDiscount: "Giảm giá voucher",
    referralDiscount: "Giảm giá mã giới thiệu",
    total: "Tổng cộng",
    recipient: "Người nhận:",
    phone: "SĐT:",
    address: "Địa chỉ:",
    payment: "Thanh toán:",
    paymentCod: "Thanh toán khi nhận hàng (COD)",
    paymentBankTransfer: "Chuyển khoản ngân hàng",
    scanToTransferTitle: "Quét mã để chuyển khoản",
    scanToTransferDetail: "Vui lòng chuyển đúng số tiền — nội dung chuyển khoản đã có sẵn mã đơn hàng.",
    qrAlt: (code: string) => `Mã QR chuyển khoản đơn hàng ${code}`,
    transferContent: "Nội dung chuyển khoản:",
    afterTransferNote: "Sau khi CloudS xác nhận đã nhận được tiền, bạn sẽ nhận email cảm ơn kèm xác nhận đơn hàng.",
    bankInfoPending: "CloudS sẽ gửi thông tin chuyển khoản cho bạn qua điện thoại/email trong thời gian sớm nhất.",
    continueShopping: "Tiếp tục mua sắm",
    contactCloudS: "Liên hệ CloudS",
  },
  en: {
    successTitle: "Order placed successfully!",
    successDetail: (code: React.ReactNode) => (
      <>
        Your order code is <span className="font-semibold text-ink">{code}</span>. CloudS will
        contact you to confirm within 24 business hours.
      </>
    ),
    orderDetailTitle: "Order details",
    subtotal: "Subtotal",
    shippingFee: "Shipping fee",
    voucherDiscount: "Voucher discount",
    referralDiscount: "Referral code discount",
    total: "Total",
    recipient: "Recipient:",
    phone: "Phone:",
    address: "Address:",
    payment: "Payment:",
    paymentCod: "Cash on delivery (COD)",
    paymentBankTransfer: "Bank transfer",
    scanToTransferTitle: "Scan to transfer",
    scanToTransferDetail: "Please transfer the exact amount — the transfer note already includes your order code.",
    qrAlt: (code: string) => `Bank transfer QR code for order ${code}`,
    transferContent: "Transfer note:",
    afterTransferNote: "Once CloudS confirms receipt of payment, you'll get a thank-you email with your order confirmation.",
    bankInfoPending: "CloudS will send you the bank transfer details by phone/email as soon as possible.",
    continueShopping: "Continue shopping",
    contactCloudS: "Contact CloudS",
  },
} satisfies Record<Locale, unknown>;

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

  const locale = await getLocale();
  const c = content[locale];
  const showBankQr = order.paymentMethod === "bank_transfer" && isBankConfigured();

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-lg text-center">
        <CheckCircle2 className="mx-auto size-12 text-rose-ink" aria-hidden />
        <h1 className="mt-4 font-display text-3xl text-ink">{c.successTitle}</h1>
        <p className="mt-2 text-sm text-ink-soft">{c.successDetail(order.code)}</p>
      </div>

      <div className="mx-auto mt-10 max-w-lg rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-display text-lg text-ink">{c.orderDetailTitle}</h2>
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
            <dt className="text-ink-soft">{c.subtotal}</dt>
            <dd className="text-ink">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">{c.shippingFee}</dt>
            <dd className="text-ink">{formatPrice(order.shippingFee)}</dd>
          </div>
          {order.shippingDiscount > 0 && (
            <div className="flex justify-between">
              <dt className="text-rose-ink">
                {c.voucherDiscount}{order.appliedVouchers.length > 0 && ` (${order.appliedVouchers.join(", ")})`}
              </dt>
              <dd className="text-rose-ink">-{formatPrice(order.shippingDiscount)}</dd>
            </div>
          )}
          {!!order.affiliateDiscount && order.affiliateDiscount > 0 && (
            <div className="flex justify-between">
              <dt className="text-rose-ink">{c.referralDiscount} ({order.affiliateCode})</dt>
              <dd className="text-rose-ink">-{formatPrice(order.affiliateDiscount)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
            <dt className="text-ink">{c.total}</dt>
            <dd className="text-ink">{formatPrice(order.total)}</dd>
          </div>
        </dl>

        <div className="mt-6 space-y-1 border-t border-line pt-4 text-sm text-ink-soft">
          <p>
            <span className="font-semibold text-ink">{c.recipient}</span> {order.customer.name}
          </p>
          <p>
            <span className="font-semibold text-ink">{c.phone}</span> {order.customer.phone}
          </p>
          <p>
            <span className="font-semibold text-ink">{c.address}</span> {order.customer.address}
          </p>
          <p>
            <span className="font-semibold text-ink">{c.payment}</span>{" "}
            {order.paymentMethod === "cod" ? c.paymentCod : c.paymentBankTransfer}
          </p>
        </div>
      </div>

      {order.paymentMethod === "bank_transfer" && (
        <div className="mx-auto mt-6 max-w-lg rounded-3xl border border-line bg-blush-tint p-6 text-center sm:p-8">
          {showBankQr ? (
            <>
              <h2 className="font-display text-lg text-ink">{c.scanToTransferTitle}</h2>
              <p className="mt-1 text-sm text-ink-soft">{c.scanToTransferDetail}</p>
              <div className="relative mx-auto mt-4 aspect-square w-64 overflow-hidden rounded-2xl bg-white">
                <Image
                  src={buildVietQrUrl(order.total, order.code)}
                  alt={c.qrAlt(order.code)}
                  fill
                  sizes="256px"
                  className="object-contain p-3"
                  unoptimized
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-ink">{formatPrice(order.total)}</p>
              <p className="text-xs text-ink-soft">{c.transferContent} {order.code}</p>
              <p className="mt-3 text-xs text-ink-soft">{c.afterTransferNote}</p>
            </>
          ) : (
            <p className="text-sm text-ink-soft">{c.bankInfoPending}</p>
          )}
        </div>
      )}

      <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
        <Link
          href="/san-pham"
          className="flex h-12 flex-1 items-center justify-center rounded-full border border-line text-sm font-medium text-ink hover:border-brand-black"
        >
          {c.continueShopping}
        </Link>
        <Link
          href="/lien-he"
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-brand-black text-sm font-semibold text-brand-cream hover:bg-ink-soft"
        >
          {c.contactCloudS}
        </Link>
      </div>
    </Container>
  );
}
