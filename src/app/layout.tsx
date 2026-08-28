import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { siteConfig } from "@/lib/site-config";

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

const seoTitle = "Giày Sneaker & Mule Nữ, Nam CloudS — Cầu Giấy, Hà Nội";
const seoDescription =
  "CloudS — giày thể thao, giày sneaker, giày mule cho sinh viên & giới trẻ khu vực Cầu Giấy và các trường đại học Hà Nội. Thoáng khí, êm chân, giá sinh viên, ship nhanh trong ngày.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: seoTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: seoDescription,
  keywords: [
    "giày thể thao",
    "giày sneaker",
    "giày mule",
    "giày sục nữ",
    "giày thể thao Cầu Giấy",
    "giày sneaker sinh viên Hà Nội",
    "giày mule nữ giá rẻ",
  ],
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "vi_VN",
    type: "website",
  },
};

// Organization schema (JSON-LD) — chưa dùng LocalBusiness/địa chỉ vì hiện chưa có địa chỉ cửa
// hàng vật lý xác thực; thêm sau khi có địa chỉ thật để tránh khai báo sai lệch với Google.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo-cloudS.png`,
  description: seoDescription,
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${archivo.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
