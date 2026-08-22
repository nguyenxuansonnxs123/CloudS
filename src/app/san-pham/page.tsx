import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Toàn bộ sản phẩm giày CloudS — CloudStride 1 và Cloud Mule 1 cho vận động hàng ngày.",
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
    </Container>
  );
}
