import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product, formatPrice, getSiblingColorProducts } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const siblings = getSiblingColorProducts(product);

  return (
    <div className="group overflow-hidden rounded-3xl border border-line bg-surface transition-shadow duration-300 hover:shadow-[0_20px_50px_-25px_rgba(23,19,15,0.35)]">
      <Link href={`/san-pham/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-brand-cream">
          <Image
            src={product.images.main}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 90vw"
            className="object-contain p-6 opacity-100 transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            src={product.images.hover}
            alt={`${product.name} — người mẫu mang giày`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 90vw"
            className="object-contain p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-full bg-brand-black px-3 py-1 text-xs font-semibold text-brand-cream">
              {product.shortName}
            </span>
            {product.isNew && (
              <span className="rounded-full bg-rose-ink px-3 py-1 text-xs font-semibold text-brand-cream">
                Mới
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <Link href={`/san-pham/${product.slug}`}>
            <h3 className="font-display text-lg text-ink">{product.name}</h3>
          </Link>
          <p className="mt-1 text-sm text-ink-soft">
            {product.color} · Size {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}
          </p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="font-semibold text-ink">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-ink-soft line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </p>

          {siblings.length > 0 && (
            <div className="mt-3 flex items-center gap-1.5">
              <span
                className="size-5 rounded-full border-2 border-brand-black"
                style={{ backgroundColor: product.colorSwatch }}
                aria-hidden
              />
              {siblings.map((sibling) => (
                <Link
                  key={sibling.slug}
                  href={`/san-pham/${sibling.slug}`}
                  aria-label={`Xem màu ${sibling.color}`}
                  className="size-5 rounded-full border border-line"
                  style={{ backgroundColor: sibling.colorSwatch }}
                />
              ))}
            </div>
          )}
        </div>
        <Link
          href={`/san-pham/${product.slug}`}
          aria-label={`Xem chi tiết ${product.name}`}
          className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-brand-black group-hover:bg-brand-black group-hover:text-brand-cream"
        >
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
