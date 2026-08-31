"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { clsx } from "clsx";
import { useCart } from "./CartProvider";
import { useLocale } from "./LocaleProvider";
import type { Product } from "@/lib/products";

const content = {
  vi: {
    outOfStockBadge: "Hết hàng",
    outOfStockNote: "Sản phẩm này tạm hết hàng. Nhắn Zalo để CloudS báo khi có hàng trở lại.",
    outOfStockCta: "Nhắn Zalo khi có hàng",
    sizeLabel: "Size có sẵn",
    sizeError: "Vui lòng chọn size trước khi thêm vào giỏ.",
    sizeHelpPrefix: "Chưa chắc size của mình? Xem",
    sizeHelpLink: "hướng dẫn chọn size",
    sizeHelpSuffix: "hoặc nhắn Zalo để được tư vấn.",
    decreaseQuantity: "Giảm số lượng",
    increaseQuantity: "Tăng số lượng",
    added: "Đã thêm vào giỏ",
    addToCart: "Thêm vào giỏ hàng",
    buyNow: "Mua ngay",
  },
  en: {
    outOfStockBadge: "Out of stock",
    outOfStockNote: "This product is temporarily out of stock. Message us on Zalo and we'll let you know when it's back.",
    outOfStockCta: "Message on Zalo when back in stock",
    sizeLabel: "Available sizes",
    sizeError: "Please select a size before adding to cart.",
    sizeHelpPrefix: "Not sure about your size? See the",
    sizeHelpLink: "size guide",
    sizeHelpSuffix: "or message us on Zalo for advice.",
    decreaseQuantity: "Decrease quantity",
    increaseQuantity: "Increase quantity",
    added: "Added to cart",
    addToCart: "Add to cart",
    buyNow: "Buy now",
  },
};

export function AddToCartForm({ product }: { product: Product }) {
  const { addItem } = useCart();
  const locale = useLocale();
  const t = content[locale];
  const outOfStock = product.inStock === false;
  const router = useRouter();
  const [size, setSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  function handleAdd() {
    if (!size) {
      setError(true);
      return;
    }
    addItem({
      slug: product.slug,
      name: product.name,
      color: product.color,
      size,
      price: product.price,
      quantity,
      image: product.images.main,
      sku: product.skuBySize?.[size],
    });
    setAdded(true);
    setError(false);
    window.setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    if (!size) {
      setError(true);
      return;
    }
    addItem({
      slug: product.slug,
      name: product.name,
      color: product.color,
      size,
      price: product.price,
      quantity,
      image: product.images.main,
      sku: product.skuBySize?.[size],
    });
    router.push("/gio-hang");
  }

  if (outOfStock) {
    return (
      <div className="mt-6">
        <span className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {t.outOfStockBadge}
        </span>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.outOfStockNote}</p>
        <a
          href="/lien-he"
          className="mt-4 flex h-13 w-full items-center justify-center rounded-full border border-brand-black text-base font-semibold text-ink transition-colors hover:bg-brand-black hover:text-brand-cream"
        >
          {t.outOfStockCta}
        </a>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-ink">{t.sizeLabel}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {product.sizes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setSize(s);
              setError(false);
            }}
            aria-pressed={size === s}
            className={clsx(
              "flex h-11 min-w-11 items-center justify-center rounded-full border px-3 text-sm font-medium transition-colors",
              size === s
                ? "border-brand-black bg-brand-black text-brand-cream"
                : "border-line text-ink hover:border-brand-black"
            )}
          >
            {s}
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{t.sizeError}</p>}
      <p className="mt-2 text-xs text-ink-soft">
        {t.sizeHelpPrefix}{" "}
        <a href="#size" className="underline underline-offset-2">
          {t.sizeHelpLink}
        </a>{" "}
        {t.sizeHelpSuffix}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex items-center rounded-full border border-line">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label={t.decreaseQuantity}
            className="flex size-11 items-center justify-center text-ink"
          >
            <Minus className="size-4" aria-hidden />
          </button>
          <span className="w-8 text-center text-sm font-medium text-ink" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            aria-label={t.increaseQuantity}
            className="flex size-11 items-center justify-center text-ink"
          >
            <Plus className="size-4" aria-hidden />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-brand-black px-5 text-sm font-semibold text-ink transition-colors hover:bg-brand-black hover:text-brand-cream"
        >
          {added ? <Check className="size-4" aria-hidden /> : <ShoppingBag className="size-4" aria-hidden />}
          {added ? t.added : t.addToCart}
        </button>
      </div>

      <button
        type="button"
        onClick={handleBuyNow}
        className="mt-3 flex h-13 w-full items-center justify-center rounded-full bg-brand-black text-base font-semibold text-brand-cream transition-colors hover:bg-ink-soft"
      >
        {t.buyNow}
      </button>
    </div>
  );
}
