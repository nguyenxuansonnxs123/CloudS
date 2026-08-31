import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { comingSoonCategories, getLocalizedCategory } from "@/lib/coming-soon";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const seo = {
    vi: {
      title: "Giày Thể Thao, Sneaker & Mule Nữ — Toàn Bộ Sản Phẩm",
      description:
        "Toàn bộ giày thể thao, giày sneaker, giày mule nữ CloudS — CloudStride 1 và Cloud Mule 1, phù hợp sinh viên khu vực Cầu Giấy, Hà Nội cho vận động hàng ngày.",
    },
    en: {
      title: "Sneakers & Mules for Women — All Products",
      description:
        "All CloudS sneakers and mules — CloudStride 1 and Cloud Mule 1, made for students around Cau Giay, Hanoi and everyday movement.",
    },
  }[locale];
  return { title: seo.title, description: seo.description };
}

const content = {
  vi: {
    eyebrow: "Sản phẩm",
    title: "Toàn bộ sản phẩm CloudS",
    description:
      "CloudStride 1 cho những ngày di chuyển nhiều, Cloud Mule 1 cho buổi sáng vội vã — chọn đôi hợp với nhịp sống của bạn.",
    comingSoonEyebrow: "Sắp ra mắt",
    comingSoonTitle: "CloudS sắp có thêm nhiều dòng giày mới",
    comingSoonDescription:
      "Hàng đang về — để lại thông tin qua Zalo hoặc theo dõi mạng xã hội để nhận thông báo ngay khi mở bán.",
    comingSoonPill: "Sắp ra mắt",
  },
  en: {
    eyebrow: "Products",
    title: "All CloudS products",
    description:
      "CloudStride 1 for days full of moving around, Cloud Mule 1 for rushed mornings — pick the pair that fits your pace.",
    comingSoonEyebrow: "Coming soon",
    comingSoonTitle: "More CloudS styles are on the way",
    comingSoonDescription:
      "New stock is on its way — message us on Zalo or follow our socials to hear the moment it launches.",
    comingSoonPill: "Coming soon",
  },
};

export default async function ProductsPage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <Container className="py-14 sm:py-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <section id="sap-ra-mat" className="mt-16 scroll-mt-24 border-t border-line pt-14 sm:mt-20 sm:pt-20">
        <SectionHeading
          eyebrow={t.comingSoonEyebrow}
          title={t.comingSoonTitle}
          description={t.comingSoonDescription}
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoonCategories.map((rawItem) => {
            const item = getLocalizedCategory(rawItem, locale);
            return (
              <div
                key={item.slug}
                className="rounded-2xl border border-dashed border-line bg-surface p-6"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-tint px-3 py-1 text-xs font-semibold text-rose-ink">
                  <Clock className="size-3.5" aria-hidden />
                  {t.comingSoonPill}
                </span>
                <h3 className="mt-4 font-display text-lg text-ink">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
