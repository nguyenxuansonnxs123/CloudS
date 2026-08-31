import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { LocaleProvider } from "@/components/LocaleProvider";
import { siteConfig } from "@/lib/site-config";
import { getLocale } from "@/lib/i18n";

// Font phần chữ nội dung/UI — khớp Wilson.com (bản thân họ dùng GT America, một font trả phí).
// Archivo là grotesque sans cùng nhóm phong cách, có sẵn subset "vietnamese" đầy đủ dấu.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

// Font tiêu đề lớn — khớp Wilson.com (bản thân họ dùng Argent CF, serif mảnh trả phí).
// Fraunces là serif editorial cùng tinh thần, hỗ trợ dải weight mảnh và subset "vietnamese".
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

const seoContent = {
  vi: {
    title: "Giày Sneaker & Mule Nữ, Nam CloudS — Cầu Giấy, Hà Nội",
    description:
      "CloudS — giày thể thao, giày sneaker, giày mule cho sinh viên & giới trẻ khu vực Cầu Giấy và các trường đại học Hà Nội. Thoáng khí, êm chân, giá sinh viên, ship nhanh trong ngày.",
    keywords: [
      "giày thể thao",
      "giày sneaker",
      "giày mule",
      "giày sục nữ",
      "giày thể thao Cầu Giấy",
      "giày sneaker sinh viên Hà Nội",
      "giày mule nữ giá rẻ",
    ],
    ogLocale: "vi_VN",
  },
  en: {
    title: "CloudS Sneakers & Mules — Cau Giay, Hanoi",
    description:
      "CloudS — sneakers and mules for students & young people around Cau Giay and Hanoi's university area. Breathable, comfortable, student-friendly prices, same-day shipping.",
    keywords: ["sneakers", "mules", "CloudS shoes", "sneakers Hanoi", "mules for women", "Cau Giay shoes"],
    ogLocale: "en_US",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = seoContent[locale];
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t.title,
      template: `%s — ${siteConfig.name}`,
    },
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: t.ogLocale,
      type: "website",
    },
  };
}

// Organization + ShoeStore (LocalBusiness) schema (JSON-LD) cho 3 địa điểm cửa hàng CloudS tại Hà Nội.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/images/logo-cloudS.png`,
      description: seoContent.vi.description,
      sameAs: [
        siteConfig.social.threads,
        siteConfig.social.tiktok,
        siteConfig.shops.shopee,
        siteConfig.social.facebook,
        siteConfig.social.instagram,
      ].filter(Boolean),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: siteConfig.contact.email,
        url: `${siteConfig.url}/lien-he`,
      },
    },
    ...siteConfig.storeLocations.map((store, i) => ({
      "@type": "ShoeStore",
      "@id": `${siteConfig.url}/#store-${i + 1}`,
      name: store.name,
      url: `${siteConfig.url}/lien-he`,
      telephone: siteConfig.contact.zaloNumber.split(" hoặc ")[0],
      parentOrganization: { "@id": `${siteConfig.url}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: store.streetAddress,
        addressLocality: store.district,
        addressRegion: "Hà Nội",
        addressCountry: "VN",
      },
    })),
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${archivo.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LocaleProvider locale={locale}>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
