"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { clsx } from "clsx";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site-config";
import { Button } from "./Button";
import { useCart } from "./CartProvider";
import { useDictionary } from "./LocaleProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getNavLinks } from "@/lib/nav";

function CartLink({ onClick, label }: { onClick?: () => void; label: string }) {
  const { quantity, isHydrated } = useCart();
  return (
    <Link
      href="/gio-hang"
      onClick={onClick}
      aria-label={`${label}${quantity > 0 ? `, ${quantity}` : ""}`}
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
  const t = useDictionary();
  const navLinks = getNavLinks(t);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-brand-cream/90 backdrop-blur">
      <Container className="flex h-18 items-center justify-between py-3">
        <Link href="/" onClick={() => setOpen(false)} aria-label={siteConfig.name}>
          <Image
            src="/images/logo-cloudS.png"
            alt={siteConfig.name}
            width={1135}
            height={189}
            priority
            className="h-7 w-auto sm:h-8"
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
          <LanguageSwitcher />
          <CartLink label={t.nav.cart} />
          <Button href="/san-pham" size="md">
            {t.nav.buyNow}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <CartLink label={t.nav.cart} />
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full border border-line text-ink"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
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
            <div className="mt-2 flex items-center justify-between px-3">
              <LanguageSwitcher />
            </div>
            <Button href="/san-pham" size="md" className="mt-2 w-full">
              {t.nav.buyNow}
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
