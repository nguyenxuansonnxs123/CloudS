import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description: "Toàn bộ sản phẩm giày CloudS — sneaker nam và nữ cho vận động hàng ngày.",
};

export default function ProductsPage() {
  return (
    <Container className="py-14 sm:py-20">
      <SectionHeading
        eyebrow="Sản phẩm"
        title="Toàn bộ sản phẩm CloudS"
        description="Hai mẫu mở màn — mỗi đôi được thiết kế cho một nhịp sống khác nhau, cùng chung một tiêu chí: thoải mái suốt cả ngày."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </Container>
  );
}
