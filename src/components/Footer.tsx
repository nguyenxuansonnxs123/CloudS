import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Container } from "./Container";
import { FacebookIcon, InstagramIcon, ThreadsIcon } from "./SocialIcons";
import { navLinks, siteConfig } from "@/lib/site-config";

const year = new Date().getFullYear();

function isLegalNameSet(name: string) {
  return Boolean(name) && !name.startsWith("[");
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Image
            src="/images/logo-cloudS.png"
            alt={siteConfig.name}
            width={1135}
            height={189}
            className="h-7 w-auto"
          />
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Điều hướng</p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-soft hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Kênh mua hàng</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            <li>
              <a
                href={siteConfig.shops.shopee || "/lien-he"}
                className="hover:text-ink"
                target={siteConfig.shops.shopee ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                Shopee
              </a>
            </li>
            <li>
              <a
                href={siteConfig.shops.tiktok || "/lien-he"}
                className="hover:text-ink"
                target={siteConfig.shops.tiktok ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                TikTok Shop
              </a>
            </li>
            <li>
              <Link href="/lien-he" className="hover:text-ink">
                Tư vấn qua Zalo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Kết nối</p>
          <div className="mt-4 flex gap-3">
            <a
              href={siteConfig.social.facebook || "#"}
              aria-label="Facebook CloudS"
              className="flex size-10 items-center justify-center rounded-full border border-line text-ink-soft hover:border-ink hover:text-ink"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={siteConfig.social.instagram || "#"}
              aria-label="Instagram CloudS"
              className="flex size-10 items-center justify-center rounded-full border border-line text-ink-soft hover:border-ink hover:text-ink"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={siteConfig.social.threads || "#"}
              aria-label="Threads CloudS"
              target={siteConfig.social.threads ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-full border border-line text-ink-soft hover:border-ink hover:text-ink"
            >
              <ThreadsIcon className="size-4" />
            </a>
            <a
              href={siteConfig.contact.zaloLink || "/lien-he"}
              aria-label="Zalo CloudS"
              className="flex size-10 items-center justify-center rounded-full border border-line text-ink-soft hover:border-ink hover:text-ink"
            >
              <MessageCircle className="size-4" aria-hidden />
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              aria-label="Email CloudS"
              className="flex size-10 items-center justify-center rounded-full border border-line text-ink-soft hover:border-ink hover:text-ink"
            >
              <Mail className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
            {isLegalNameSet(siteConfig.business.legalName) && `. ${siteConfig.business.legalName}`}.
          </p>
          <p>Được xây dựng cho những bước chân nhẹ tênh mỗi ngày.</p>
        </Container>
      </div>
    </footer>
  );
}
