"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { Container } from "./Container";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Button } from "./Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-brand-cream/90 backdrop-blur">
      <Container className="flex h-18 items-center justify-between py-3">
        <Link
          href="/"
          className="font-display text-3xl leading-none text-ink"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name}
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

        <div className="hidden md:block">
          <Button href="/san-pham" size="md">
            Mua ngay
          </Button>
        </div>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full border border-line text-ink md:hidden"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
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
