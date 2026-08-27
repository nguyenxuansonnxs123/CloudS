import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { siteConfig } from "@/lib/site-config";

// Font UI chính toàn site — khớp Discovery Expedition (bản thân họ dùng Pretendard, vốn lấy
// phần Latin từ Inter). Dùng thẳng Inter để nhìn giống hệt nhưng đảm bảo dấu tiếng Việt hiển
// thị đúng (Pretendard thiếu khối Latin Extended Additional mà tiếng Việt cần).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

// Chỉ dùng riêng cho wordmark "CloudS" — giữ đúng kiểu chữ tròn trong bộ nhận diện gốc.
const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "vietnamese"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${inter.variable} ${baloo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-ink">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
