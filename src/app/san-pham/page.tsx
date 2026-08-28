import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { comingSoonCategories } from "@/lib/coming-soon";

export const metadata: Metadata = {
  title: "Giày Thể Thao, Sneaker & Mule Nữ — Toàn Bộ Sản Phẩm",
  description:
    "Toàn bộ giày thể thao, giày sneaker, giày mule nữ CloudS — CloudStride 1 và Cloud Mule 1, phù hợp sinh viên khu vực Cầu Giấy, Hà Nội cho vận động hàng ngày.",
};

export default function ProductsPage() {
  return (
    <Container className="py-14 sm:py-20">
      <SectionHeading
        eyebrow="Sản phẩm"
        title="Toàn bộ sản phẩm CloudS"
        description="CloudStride 1 cho những ngày di chuyển nhiều, Cloud Mule 1 cho buổi sáng vội vã — chọn đôi hợp với nhịp sống của bạn."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <section id="sap-ra-mat" className="mt-16 scroll-mt-24 border-t border-line pt-14 sm:mt-20 sm:pt-20">
        <SectionHeading
          eyebrow="Sắp ra mắt"
          title="CloudS sắp có thêm nhiều dòng giày mới"
          description="Hàng đang về — để lại thông tin qua Zalo hoặc theo dõi mạng xã hội để nhận thông báo ngay khi mở bán."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoonCategories.map((item) => (
            <div
              key={item.slug}
              className="rounded-2xl border border-dashed border-line bg-surface p-6"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-tint px-3 py-1 text-xs font-semibold text-rose-ink">
                <Clock className="size-3.5" aria-hidden />
                Sắp ra mắt
              </span>
              <h3 className="mt-4 font-display text-lg text-ink">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
