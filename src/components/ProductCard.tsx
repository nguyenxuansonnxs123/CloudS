import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product, formatPrice } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group block overflow-hidden rounded-3xl border border-line bg-surface transition-shadow duration-300 hover:shadow-[0_20px_50px_-25px_rgba(23,19,15,0.35)]"
    >
      <div className="relative aspect-square overflow-hidden bg-brand-cream">
        <Image
          src={product.images.main}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-brand-black px-3 py-1 text-xs font-semibold text-brand-cream">
          {product.shortName}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <h3 className="font-display text-lg text-ink">{product.name}</h3>
          <p className="mt-1 text-sm text-ink-soft">{product.color} · Size {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}</p>
          <p className="mt-2 font-semibold text-ink">{formatPrice(product.price)}</p>
        </div>
        <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-brand-black group-hover:bg-brand-black group-hover:text-brand-cream">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
