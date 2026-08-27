"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { clsx } from "clsx";
import { Container } from "./Container";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Button } from "./Button";
import { useCart } from "./CartProvider";

function CartLink({ onClick }: { onClick?: () => void }) {
  const { quantity, isHydrated } = useCart();
  return (
    <Link
      href="/gio-hang"
      onClick={onClick}
      aria-label={`Giỏ hàng${quantity > 0 ? `, ${quantity} sản phẩm` : ""}`}
      className="relative flex size-11 items-center justify-center rounded-full border border-line text-ink hover:border-brand-black"
    >
      <ShoppingBag className="size-5" aria-hidden />
      {isHydrated && quantity > 0 && (
        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-rose-ink text-[11px] font-semibold text-brand-cream">
          {quantity > 9 ? "9+" : quantity}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-brand-cream/90 backdrop-blur">
      <Container className="flex h-18 items-center justify-between py-3">
        <Link href="/" onClick={() => setOpen(false)} aria-label={siteConfig.name}>
          <Image
            src="/images/logo-cloudS.png"
            alt={siteConfig.name}
            width={624}
            height={143}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-medium text-ink-soft transition-colors hover:text-ink",
                pathname === link.href && "text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <CartLink />
          <Button href="/san-pham" size="md">
            Mua ngay
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <CartLink />
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full border border-line text-ink"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-line bg-brand-cream md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/san-pham" size="md" className="mt-2 w-full">
              Mua ngay
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
