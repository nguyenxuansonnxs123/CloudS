import type { Metadata } from "next";
import { Camera, MessageCircle, ShieldCheck, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { getProductBySlug, formatPrice, products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Chương Trình Cộng Tác Viên (CTV) — Hoa Hồng Mỗi Đôi Giày",
  description:
    "Làm cộng tác viên bán giày CloudS Mule — không cần vốn, không cần ôm hàng. Hoa hồng 30.000–40.000đ mỗi đôi khi bán trực tiếp, hoặc qua Shopee/TikTok Shop.",
};

const DRIVE_FOLDER_URL =
  "https://drive.google.com/drive/folders/1JvmwrzQoj7X0RnFNKYAQxXytW5xUYQjr?usp=sharing";

const commissionTiers = [
  { range: "Đôi thứ 1 – 2", rate: 30000 },
  { range: "Đôi thứ 3 – 10", rate: 35000 },
  { range: "Đôi thứ 11 trở đi", rate: 40000 },
];

const platformSupport = [
  {
    icon: Camera,
    title: "Kho ảnh & video sản phẩm",
    detail: "Ảnh studio, ảnh đời thường và video ngắn sẵn dùng để đăng bài — tải về trong thư mục chung.",
  },
  {
    icon: TrendingUp,
    title: "Theo dõi doanh số minh bạch",
    detail: "Mỗi CTV có mã riêng, hệ thống tự ghi nhận số đôi bán được và hoa hồng theo từng đơn.",
  },
  {
    icon: ShieldCheck,
    title: "Hỗ trợ khách của bạn tận tình",
    detail: "Khách đặt qua mã CTV được tư vấn size, đổi trả theo đúng Chế độ An Tâm Mua Sắm như khách mua trực tiếp.",
  },
];

export default function CtvPage() {
  const muleProduct = getProductBySlug("cloud-mule-1-rose");
  const muleProducts = products.filter((p) => p.silhouette === "cloud-mule-1");
  const listedPrice = muleProduct?.price ?? 229000;
  const ctvDiscount = 10000;
  const ctvPrice = listedPrice - ctvDiscount;
  const shopeeTiktokPrice = 260000;
  const shopeeTiktokCommission = Math.round(shopeeTiktokPrice * 0.1);

  const exampleOrders = 12;
  const exampleCommission =
    2 * commissionTiers[0].rate + 8 * commissionTiers[1].rate + 2 * commissionTiers[2].rate;

  return (
    <Container className="py-14 sm:py-20">
      {/* Hero */}
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
          Chương trình Cộng tác viên
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          Chương trình Cộng Tác Viên CloudS Mule
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Không cần vốn, không cần ôm hàng — chỉ cần giới thiệu, mỗi đôi giày bán được bạn nhận
          hoa hồng ngay.
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          Chương trình hiện áp dụng cho dòng Cloud Mule 1 — các dòng sản phẩm khác sẽ có chương
          trình riêng, cập nhật sau.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={siteConfig.contact.zaloLink} size="lg" external>
            Đăng ký làm CTV qua Zalo
          </Button>
          <Button href="#cach-1" variant="ghost" size="lg">
            Xem chi tiết chương trình
          </Button>
        </div>
      </div>

      {/* Giới thiệu sản phẩm */}
      <section className="mt-14 sm:mt-20">
        <SectionHeading
          eyebrow="Sản phẩm"
          title="Đôi giày bạn sẽ giới thiệu"
          description="Cloud Mule 1 — sneaker mule không dây buộc gót, xỏ nhanh trong vài giây, đang có 2 màu."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {muleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <Button href="/san-pham/cloud-mule-1-rose" variant="ghost" className="mt-8">
          Xem chi tiết sản phẩm Cloud Mule 1
        </Button>
      </section>

      {/* Cách 1 */}
      <section id="cach-1" className="mt-14 scroll-mt-24 sm:mt-20">
        <SectionHeading
          eyebrow="Cách 1"
          title="Bán trực tiếp qua trang cá nhân"
          description="Khách của bạn có 2 cách đặt hàng — cả hai đều được ghi nhận đúng vào doanh số CTV của bạn."
        />

        <ul className="mt-8 space-y-2.5 text-sm leading-relaxed text-ink-soft">
          <li className="flex gap-2.5">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-ink" />
            Nhắn trực tiếp với bạn để bạn lên đơn giúp trên website — khách chọn thanh toán COD
            hoặc chuyển khoản.
          </li>
          <li className="flex gap-2.5">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-ink" />
            Khách tự vào website đặt hàng và nhập mã CTV riêng của bạn ở bước thanh toán.
          </li>
        </ul>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Đặt qua website, dùng mã CTV
            </p>
            <p className="mt-2 font-display text-2xl text-ink">{formatPrice(ctvPrice)}</p>
            <p className="mt-1 text-xs text-ink-soft">/đôi — giá ưu đãi cho khách của bạn</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Bán ngoài website
            </p>
            <p className="mt-2 font-display text-2xl text-ink">{formatPrice(listedPrice)}</p>
            <p className="mt-1 text-xs text-ink-soft">/đôi — đúng giá niêm yết thông thường</p>
          </div>
        </div>

        <h3 className="mt-10 font-display text-lg text-ink">
          Hoa hồng tăng dần theo số đôi bán trong tháng
        </h3>
        <div className="mt-4 max-w-md overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-cream text-left">
                <th className="px-5 py-3 font-semibold text-ink">Số đôi trong tháng</th>
                <th className="px-5 py-3 font-semibold text-ink">Hoa hồng mỗi đôi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {commissionTiers.map((tier) => (
                <tr key={tier.range}>
                  <td className="px-5 py-3 text-ink">{tier.range}</td>
                  <td className="px-5 py-3 text-ink-soft">{formatPrice(tier.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
          Ví dụ: trong tháng bạn bán được {exampleOrders} đôi, hoa hồng nhận được = (2 đôi ×{" "}
          {formatPrice(commissionTiers[0].rate)}) + (8 đôi × {formatPrice(commissionTiers[1].rate)}) + (2 đôi ×{" "}
          {formatPrice(commissionTiers[2].rate)}) ={" "}
          <span className="font-semibold text-ink">{formatPrice(exampleCommission)}</span>.
        </p>
      </section>

      {/* Cách 2 */}
      <section className="mt-14 sm:mt-20">
        <SectionHeading
          eyebrow="Cách 2"
          title="Bán qua Shopee & TikTok Shop"
          description="Đã có kênh bán trên Shopee hoặc TikTok Shop? Quảng bá CloudS qua chương trình tiếp thị liên kết (affiliate) ngay trên sàn."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <ShoppingBag className="size-5" aria-hidden />
            </span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Giá bán trên sàn
            </p>
            <p className="mt-1 font-display text-2xl text-ink">{formatPrice(shopeeTiktokPrice)}</p>
            <p className="mt-1 text-xs text-ink-soft">
              /đôi — giá khách trả thực tế có thể thấp hơn nếu sàn tự áp voucher, không ảnh hưởng
              đến hoa hồng của bạn.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <TrendingUp className="size-5" aria-hidden />
            </span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Hoa hồng
            </p>
            <p className="mt-1 font-display text-2xl text-ink">10%</p>
            <p className="mt-1 text-xs text-ink-soft">
              giá trị đơn hàng — tương đương khoảng {formatPrice(shopeeTiktokCommission)}/đôi.
            </p>
          </div>
        </div>
      </section>

      {/* CloudS hỗ trợ CTV */}
      <section className="mt-14 sm:mt-20">
        <SectionHeading eyebrow="Đồng hành" title="CloudS hỗ trợ bạn những gì" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {platformSupport.map(({ icon: Icon, title, detail }) => (
            <div key={title}>
              <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{detail}</p>
            </div>
          ))}
        </div>
        <Button href={DRIVE_FOLDER_URL} variant="ghost" className="mt-8" external>
          Xem kho ảnh & video mẫu
        </Button>
      </section>

      {/* CTA cuối */}
      <div className="mt-14 rounded-3xl bg-brand-black p-8 text-center sm:mt-20 sm:p-12">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-cream/10 text-brand-cream">
          <Users className="size-6" aria-hidden />
        </span>
        <h2 className="mt-4 font-display text-2xl text-brand-cream sm:text-3xl">
          Đăng ký làm CTV ngay hôm nay
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-brand-cream/70">
          Nhắn Zalo cho CloudS để nhận mã CTV riêng, kho ảnh/video và bắt đầu bán ngay hôm nay.
        </p>
        <Button
          href={siteConfig.contact.zaloLink}
          variant="secondary"
          size="lg"
          className="mt-6"
          icon={<MessageCircle className="size-4" aria-hidden />}
          external
        >
          Đăng ký qua Zalo
        </Button>
      </div>
    </Container>
  );
}
