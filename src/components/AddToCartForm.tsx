"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { clsx } from "clsx";
import { useCart } from "./CartProvider";
import type { Product } from "@/lib/products";

export function AddToCartForm({ product }: { product: Product }) {
  const { addItem } = useCart();
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

  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-ink">Size có sẵn</p>
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
      {error && <p className="mt-2 text-xs text-red-600">Vui lòng chọn size trước khi thêm vào giỏ.</p>}
      <p className="mt-2 text-xs text-ink-soft">
        Chưa chắc size của mình? Xem{" "}
        <a href="#size" className="underline underline-offset-2">
          hướng dẫn chọn size
        </a>{" "}
        hoặc nhắn Zalo để được tư vấn.
      </p>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex items-center rounded-full border border-line">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Giảm số lượng"
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
            aria-label="Tăng số lượng"
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
          {added ? "Đã thêm vào giỏ" : "Thêm vào giỏ hàng"}
        </button>
      </div>

      <button
        type="button"
        onClick={handleBuyNow}
        className="mt-3 flex h-13 w-full items-center justify-center rounded-full bg-brand-black text-base font-semibold text-brand-cream transition-colors hover:bg-ink-soft"
      >
        Mua ngay
      </button>
    </div>
  );
}
