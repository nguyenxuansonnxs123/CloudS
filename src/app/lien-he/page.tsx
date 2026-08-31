import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, ShoppingBag } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { FacebookIcon, InstagramIcon, ThreadsIcon, TikTokIcon } from "@/components/SocialIcons";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const seo = {
    vi: {
      title: "Liên Hệ CloudS — Tư Vấn Giày Tại Cầu Giấy, Hà Nội",
      description:
        "Liên hệ CloudS qua Zalo, Shopee, TikTok Shop hoặc mạng xã hội để được tư vấn chọn giày thể thao, sneaker, mule — giao hàng nhanh khu vực Cầu Giấy, Hà Nội.",
    },
    en: {
      title: "Contact CloudS — Sneaker Advice in Cau Giay, Hanoi",
      description:
        "Reach CloudS via Zalo, Shopee, TikTok Shop, or social media for advice on sneakers, mules, and everyday shoes — fast delivery around Cau Giay, Hanoi.",
    },
  }[locale];
  return { title: seo.title, description: seo.description };
}

// Địa chỉ chi nhánh được latinh hoá cho bản EN — tên chi nhánh (proper noun) giữ nguyên tiếng Việt.
const storeAddressEn: Record<string, { street: string; district: string }> = {
  "CloudS Hoàng Quốc Việt": { street: "47, Alley 5 Hoang Quoc Viet", district: "Cau Giay" },
  "CloudS Xuân Diệu": { street: "53E, Alley 31 Xuan Dieu", district: "Tay Ho" },
  "CloudS Nguyễn Ngọc Vũ": { street: "25A, Alley 103/189 Nguyen Ngoc Vu", district: "Cau Giay" },
};

const content = {
  vi: {
    eyebrow: "Liên hệ",
    h1: "Cần tư vấn? Nhắn CloudS ngay.",
    intro:
      "Đội ngũ CloudS phản hồi trong vòng 15–30 phút trong giờ hành chính. Gửi kèm mã đơn hàng nếu bạn cần hỗ trợ đổi trả, hoặc thông tin size/chiều cao cân nặng nếu cần tư vấn chọn giày.",
    channels: {
      zalo: { title: "Zalo / Hotline", fallback: "Đang cập nhật" },
      shopee: { title: "Shopee", detail: "Đặt hàng trực tiếp trên gian hàng Shopee" },
      tiktok: { title: "TikTok Shop", detail: "Đặt hàng qua TikTok Shop CloudS" },
      email: { title: "Email" },
    },
    labels: {
      msg1: "Nhắn số 1",
      msg2: "Nhắn số 2",
      viewShop: "Xem gian hàng",
      sendEmail: "Gửi email",
      updating: "Đang cập nhật kênh liên hệ này.",
    },
    branchEyebrow: "Chi nhánh",
    branchTitle: "Chi nhánh CloudS (Spirit) tại Hà Nội",
    branchDesc: "3 chi nhánh của CloudS (Spirit) tại Cầu Giấy và Tây Hồ, Hà Nội.",
    connectEyebrow: "Kết nối",
    connectTitle: "Theo dõi CloudS trên mạng xã hội",
    hanoiSuffix: "Hà Nội",
  },
  en: {
    eyebrow: "Contact",
    h1: "Need advice? Message CloudS now.",
    intro:
      "The CloudS team replies within 15–30 minutes during business hours. Include your order code if you need help with an exchange or return, or your usual size and height/weight if you'd like fitting advice.",
    channels: {
      zalo: { title: "Zalo / Hotline", fallback: "Coming soon" },
      shopee: { title: "Shopee", detail: "Order directly from our Shopee store" },
      tiktok: { title: "TikTok Shop", detail: "Order through CloudS's TikTok Shop" },
      email: { title: "Email" },
    },
    labels: {
      msg1: "Message 1",
      msg2: "Message 2",
      viewShop: "View store",
      sendEmail: "Send an email",
      updating: "This contact channel is coming soon.",
    },
    branchEyebrow: "Our stores",
    branchTitle: "CloudS (Spirit) stores in Hanoi",
    branchDesc: "3 CloudS (Spirit) stores across Cau Giay and Tay Ho, Hanoi.",
    connectEyebrow: "Connect",
    connectTitle: "Follow CloudS on social media",
    hanoiSuffix: "Hanoi",
  },
};

export default async function ContactPage() {
  const locale = await getLocale();
  const t = content[locale];

  const channels = [
    {
      icon: MessageCircle,
      title: t.channels.zalo.title,
      detail: siteConfig.contact.zaloNumber || t.channels.zalo.fallback,
      links: (
        [
          siteConfig.contact.zaloLink && { label: t.labels.msg1, href: siteConfig.contact.zaloLink as string },
          siteConfig.contact.zaloLink2 && { label: t.labels.msg2, href: siteConfig.contact.zaloLink2 as string },
        ] as ({ label: string; href: string } | false)[]
      ).filter((l): l is { label: string; href: string } => Boolean(l)),
    },
    {
      icon: ShoppingBag,
      title: t.channels.shopee.title,
      detail: t.channels.shopee.detail,
      links: siteConfig.shops.shopee ? [{ label: t.labels.viewShop, href: siteConfig.shops.shopee }] : [],
    },
    {
      icon: ShoppingBag,
      title: t.channels.tiktok.title,
      detail: t.channels.tiktok.detail,
      links: siteConfig.shops.tiktok ? [{ label: t.labels.viewShop, href: siteConfig.shops.tiktok }] : [],
    },
    {
      icon: Mail,
      title: t.channels.email.title,
      detail: siteConfig.contact.email,
      links: [{ label: t.labels.sendEmail, href: `mailto:${siteConfig.contact.email}` }],
    },
  ];

  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
          {t.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {t.h1}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {t.intro}
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
              <p className="mt-4 text-xs text-ink-soft">{t.labels.updating}</p>
            )}
          </div>
        ))}
      </div>

      <section className="mt-14">
        <SectionHeading
          eyebrow={t.branchEyebrow}
          title={t.branchTitle}
          description={t.branchDesc}
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.storeLocations.map((store) => {
            const en = storeAddressEn[store.name];
            const street = locale === "en" && en ? en.street : store.streetAddress;
            const district = locale === "en" && en ? en.district : store.district;
            return (
              <li
                key={store.name}
                className="flex gap-3 rounded-2xl border border-line bg-surface p-5"
              >
                <MapPin className="mt-0.5 size-5 shrink-0 text-rose-ink" aria-hidden />
                <div>
                  <p className="font-display text-base text-ink">{store.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {street}, {district}, {t.hanoiSuffix}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-14">
        <SectionHeading eyebrow={t.connectEyebrow} title={t.connectTitle} />
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
