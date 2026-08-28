"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Container } from "@/components/Container";
import { useCart } from "@/components/CartProvider";
import { VoucherSection } from "@/components/VoucherSection";
import { cartItemKey } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { autoAppliedResolvedVouchers, shippingDiscountFor, type ResolvedVoucher } from "@/lib/vouchers";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, isHydrated } = useCart();
  const [vouchers, setVouchers] = useState<ResolvedVoucher[]>(() => autoAppliedResolvedVouchers());
  const shippingFee = siteConfig.shippingFee;
  const shippingDiscount = shippingDiscountFor(vouchers.map((v) => v.code), shippingFee);
  const affiliateDiscount = vouchers.reduce(
    (sum, v) => sum + (v.kind === "affiliate_discount" ? v.amount : 0),
    0
  );
  const total = subtotal + shippingFee - shippingDiscount - affiliateDiscount;

  if (!isHydrated) {
    return <div className="py-20" />;
  }

  if (items.length === 0) {
    return (
      <Container className="flex flex-col items-center gap-4 py-24 text-center">
        <ShoppingBag className="size-10 text-ink-soft" aria-hidden />
        <h1 className="font-display text-2xl text-ink">Giỏ hàng đang trống</h1>
        <p className="max-w-sm text-sm text-ink-soft">
          Khám phá sản phẩm CloudS và thêm đôi giày yêu thích vào giỏ hàng của bạn.
        </p>
        <Link
          href="/san-pham"
          className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-brand-black px-6 text-sm font-semibold text-brand-cream hover:bg-ink-soft"
        >
          Xem sản phẩm
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-14 sm:py-20">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Giỏ hàng của bạn</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-6">
          {items.map((item) => {
            const key = cartItemKey(item.slug, item.size);
            return (
              <li key={key} className="flex gap-4 border-b border-line pb-6">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-brand-cream sm:size-28">
                  <Image src={item.image} alt={item.name} fill sizes="112px" className="object-contain p-2" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/san-pham/${item.slug}`} className="font-display text-base text-ink hover:underline">
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm text-ink-soft">
                        {item.color} · Size {item.size}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug, item.size)}
                      aria-label={`Xoá ${item.name} khỏi giỏ hàng`}
                      className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-surface hover:text-ink"
                    >
                      <Trash2 className="size-4" aria-hidden />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-line">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                        aria-label="Giảm số lượng"
                        className="flex size-9 items-center justify-center text-ink"
                      >
                        <Minus className="size-3.5" aria-hidden />
                      </button>
                      <span className="w-7 text-center text-sm font-medium text-ink" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                        aria-label="Tăng số lượng"
                        className="flex size-9 items-center justify-center text-ink"
                      >
                        <Plus className="size-3.5" aria-hidden />
                      </button>
                    </div>
                    <p className="font-semibold text-ink">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="h-fit space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6">
            <h2 className="font-display text-lg text-ink">Tóm tắt đơn hàng</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Tạm tính</dt>
                <dd className="text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Phí vận chuyển</dt>
                <dd className="text-ink">{formatPrice(shippingFee)}</dd>
              </div>
              {shippingDiscount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-rose-ink">Giảm giá voucher</dt>
                  <dd className="text-rose-ink">-{formatPrice(shippingDiscount)}</dd>
                </div>
              )}
              {affiliateDiscount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-rose-ink">Giảm giá mã giới thiệu</dt>
                  <dd className="text-rose-ink">-{formatPrice(affiliateDiscount)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
                <dt className="text-ink">Tổng cộng</dt>
                <dd className="text-ink">{formatPrice(total)}</dd>
              </div>
            </dl>
            <Link
              href="/thanh-toan"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-brand-black text-sm font-semibold text-brand-cream hover:bg-ink-soft"
            >
              Tiến hành đặt hàng
            </Link>
            <Link
              href="/san-pham"
              className="mt-3 flex h-12 w-full items-center justify-center rounded-full border border-line text-sm font-medium text-ink hover:border-brand-black"
            >
              Tiếp tục mua sắm
            </Link>
          </div>

          <VoucherSection vouchers={vouchers} onChange={setVouchers} />
        </div>
      </div>
    </Container>
  );
}
