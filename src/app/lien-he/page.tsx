import type { Metadata } from "next";
import { Mail, MessageCircle, ShoppingBag } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { FacebookIcon, InstagramIcon, ThreadsIcon, TikTokIcon } from "@/components/SocialIcons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ CloudS qua Zalo, Shopee, TikTok Shop hoặc mạng xã hội để được tư vấn đặt hàng.",
};

const channels = [
  {
    icon: MessageCircle,
    title: "Zalo / Hotline",
    detail: siteConfig.contact.zaloNumber || "Đang cập nhật",
    links: (
      [
        siteConfig.contact.zaloLink && { label: "Nhắn số 1", href: siteConfig.contact.zaloLink as string },
        siteConfig.contact.zaloLink2 && { label: "Nhắn số 2", href: siteConfig.contact.zaloLink2 as string },
      ] as ({ label: string; href: string } | false)[]
    ).filter((l): l is { label: string; href: string } => Boolean(l)),
  },
  {
    icon: ShoppingBag,
    title: "Shopee",
    detail: "Đặt hàng trực tiếp trên gian hàng Shopee",
    links: siteConfig.shops.shopee ? [{ label: "Xem gian hàng", href: siteConfig.shops.shopee }] : [],
  },
  {
    icon: ShoppingBag,
    title: "TikTok Shop",
    detail: "Đặt hàng qua TikTok Shop CloudS",
    links: siteConfig.shops.tiktok ? [{ label: "Xem gian hàng", href: siteConfig.shops.tiktok }] : [],
  },
  {
    icon: Mail,
    title: "Email",
    detail: siteConfig.contact.email,
    links: [{ label: "Gửi email", href: `mailto:${siteConfig.contact.email}` }],
  },
];

export default function ContactPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
          Liên hệ
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          Cần tư vấn? Nhắn CloudS ngay.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Đội ngũ CloudS phản hồi trong vòng 15–30 phút trong giờ hành chính. Gửi kèm mã đơn
          hàng nếu bạn cần hỗ trợ đổi trả, hoặc thông tin size/chiều cao cân nặng nếu cần tư
          vấn chọn giày.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {channels.map(({ icon: Icon, title, detail, links }) => (
          <div key={title} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-lg text-ink">{title}</h3>
            <p className="mt-1 text-sm text-ink-soft">{detail}</p>
            {links.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-semibold text-ink underline underline-offset-4"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-xs text-ink-soft">Đang cập nhật kênh liên hệ này.</p>
            )}
          </div>
        ))}
      </div>

      <section className="mt-14">
        <SectionHeading eyebrow="Kết nối" title="Theo dõi CloudS trên mạng xã hội" />
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={siteConfig.social.facebook || "#"}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink hover:border-ink"
          >
            <FacebookIcon className="size-4" /> Facebook
          </a>
          <a
            href={siteConfig.social.instagram || "#"}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink hover:border-ink"
          >
            <InstagramIcon className="size-4" /> Instagram
          </a>
          <a
            href={siteConfig.social.threads || "#"}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink hover:border-ink"
          >
            <ThreadsIcon className="size-4" /> Threads
          </a>
          <a
            href={siteConfig.social.tiktok || "#"}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink hover:border-ink"
          >
            <TikTokIcon className="size-4" /> TikTok
          </a>
        </div>
      </section>
    </Container>
  );
}
