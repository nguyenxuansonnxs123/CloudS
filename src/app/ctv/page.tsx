import type { Metadata } from "next";
import { Camera, MessageCircle, ShieldCheck, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { getProductBySlug, formatPrice, products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { ProductCard } from "@/components/ProductCard";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const seo = {
    vi: {
      title: "Chương Trình Cộng Tác Viên (CTV) — Hoa Hồng Mỗi Đôi Giày",
      description:
        "Làm cộng tác viên bán giày CloudS Mule — không cần vốn, không cần ôm hàng. Hoa hồng 30.000–40.000đ mỗi đôi khi bán trực tiếp, hoặc qua Shopee/TikTok Shop.",
    },
    en: {
      title: "Collaborator Program — Earn Commission on Every Pair",
      description:
        "Become a CloudS Mule sales collaborator — no capital, no inventory to hold. Earn 30,000–40,000₫ commission per pair selling directly, or via Shopee/TikTok Shop.",
    },
  }[locale];
  return { title: seo.title, description: seo.description };
}

const DRIVE_FOLDER_URL =
  "https://drive.google.com/drive/folders/1JvmwrzQoj7X0RnFNKYAQxXytW5xUYQjr?usp=sharing";

const content = {
  vi: {
    heroEyebrow: "Chương trình Cộng tác viên",
    heroH1: "Chương trình Cộng Tác Viên CloudS Mule",
    heroDesc:
      "Không cần vốn, không cần ôm hàng — chỉ cần giới thiệu, mỗi đôi giày bán được bạn nhận hoa hồng ngay.",
    heroNote:
      "Chương trình hiện áp dụng cho dòng Cloud Mule 1 — các dòng sản phẩm khác sẽ có chương trình riêng, cập nhật sau.",
    ctaZalo: "Đăng ký làm CTV qua Zalo",
    ctaViewDetails: "Xem chi tiết chương trình",
    productEyebrow: "Sản phẩm",
    productTitle: "Đôi giày bạn sẽ giới thiệu",
    productDesc:
      "Cloud Mule 1 — sneaker mule không dây buộc gót, xỏ nhanh trong vài giây, đang có 2 màu.",
    productLinkCta: "Xem chi tiết sản phẩm Cloud Mule 1",
    cach1Eyebrow: "Cách 1",
    cach1Title: "Bán trực tiếp qua trang cá nhân",
    cach1Desc:
      "Khách của bạn có 2 cách đặt hàng — cả hai đều được ghi nhận đúng vào doanh số CTV của bạn.",
    orderMethod1:
      "Nhắn trực tiếp với bạn để bạn lên đơn giúp trên website — khách chọn thanh toán COD hoặc chuyển khoản.",
    orderMethod2: "Khách tự vào website đặt hàng và nhập mã CTV riêng của bạn ở bước thanh toán.",
    priceCardCtvLabel: "Đặt qua website, dùng mã CTV",
    priceCardCtvSuffix: "/đôi — giá ưu đãi cho khách của bạn",
    priceCardListedLabel: "Bán ngoài website",
    priceCardListedSuffix: "/đôi — đúng giá niêm yết thông thường",
    commissionTitle: "Hoa hồng tăng dần theo số đôi bán trong tháng",
    tableColPairs: "Số đôi trong tháng",
    tableColRate: "Hoa hồng mỗi đôi",
    commissionTiers: [
      { range: "Đôi thứ 1 – 2", rate: 30000 },
      { range: "Đôi thứ 3 – 10", rate: 35000 },
      { range: "Đôi thứ 11 trở đi", rate: 40000 },
    ],
    exampleIntro: "Ví dụ: trong tháng bạn bán được",
    pairsWord: "đôi",
    exampleCommissionLabel: ", hoa hồng nhận được =",
    cach2Eyebrow: "Cách 2",
    cach2Title: "Bán qua Shopee & TikTok Shop",
    cach2Desc:
      "Đã có kênh bán trên Shopee hoặc TikTok Shop? Quảng bá CloudS qua chương trình tiếp thị liên kết (affiliate) ngay trên sàn.",
    salePriceLabel: "Giá bán trên sàn",
    salePriceSuffix:
      "/đôi — giá khách trả thực tế có thể thấp hơn nếu sàn tự áp voucher, không ảnh hưởng đến hoa hồng của bạn.",
    commissionLabel: "Hoa hồng",
    commissionPercentPrefix: "giá trị đơn hàng — tương đương khoảng",
    commissionPercentSuffix: "/đôi.",
    supportEyebrow: "Đồng hành",
    supportTitle: "CloudS hỗ trợ bạn những gì",
    platformSupport: [
      {
        icon: Camera,
        title: "Kho ảnh & video sản phẩm",
        detail:
          "Ảnh studio, ảnh đời thường và video ngắn sẵn dùng để đăng bài — tải về trong thư mục chung.",
      },
      {
        icon: TrendingUp,
        title: "Theo dõi doanh số minh bạch",
        detail:
          "Mỗi CTV có mã riêng, hệ thống tự ghi nhận số đôi bán được và hoa hồng theo từng đơn.",
      },
      {
        icon: ShieldCheck,
        title: "Hỗ trợ khách của bạn tận tình",
        detail:
          "Khách đặt qua mã CTV được tư vấn size, đổi trả theo đúng Chế độ An Tâm Mua Sắm như khách mua trực tiếp.",
      },
    ],
    galleryLinkCta: "Xem kho ảnh & video mẫu",
    closingTitle: "Đăng ký làm CTV ngay hôm nay",
    closingDesc: "Nhắn Zalo cho CloudS để nhận mã CTV riêng, kho ảnh/video và bắt đầu bán ngay hôm nay.",
    closingCta: "Đăng ký qua Zalo",
  },
  en: {
    heroEyebrow: "Collaborator Program",
    heroH1: "CloudS Mule Collaborator Program",
    heroDesc:
      "No capital needed, no inventory to hold — just refer, and you earn commission on every pair sold.",
    heroNote:
      "This program currently applies to the Cloud Mule 1 line — other product lines will get their own program, coming soon.",
    ctaZalo: "Sign Up as a Collaborator via Zalo",
    ctaViewDetails: "See Program Details",
    productEyebrow: "Product",
    productTitle: "The Shoes You'll Be Promoting",
    productDesc:
      "Cloud Mule 1 — a backless slip-on sneaker mule you can step into in seconds, now in 2 colors.",
    productLinkCta: "See Cloud Mule 1 Product Details",
    cach1Eyebrow: "Method 1",
    cach1Title: "Sell Directly Through Your Own Page",
    cach1Desc:
      "Your customers can order in 2 ways — both are tracked accurately toward your collaborator sales.",
    orderMethod1:
      "Message you directly so you can place the order for them on the website — customers choose COD or bank transfer.",
    orderMethod2:
      "Customers order on the website themselves and enter your personal collaborator code at checkout.",
    priceCardCtvLabel: "Ordered via website, using collaborator code",
    priceCardCtvSuffix: "/pair — special price for your customers",
    priceCardListedLabel: "Sold outside the website",
    priceCardListedSuffix: "/pair — standard listed price",
    commissionTitle: "Commission Increases With Your Monthly Sales Volume",
    tableColPairs: "Pairs Sold This Month",
    tableColRate: "Commission per Pair",
    commissionTiers: [
      { range: "Pairs 1 – 2", rate: 30000 },
      { range: "Pairs 3 – 10", rate: 35000 },
      { range: "Pair 11 onward", rate: 40000 },
    ],
    exampleIntro: "Example: if you sell",
    pairsWord: "pairs",
    exampleCommissionLabel: "in a month, your commission =",
    cach2Eyebrow: "Method 2",
    cach2Title: "Sell via Shopee & TikTok Shop",
    cach2Desc:
      "Already selling on Shopee or TikTok Shop? Promote CloudS through their affiliate marketing program right on the platform.",
    salePriceLabel: "Marketplace Selling Price",
    salePriceSuffix:
      "/pair — the price customers actually pay may be lower if the platform applies its own vouchers, which doesn't affect your commission.",
    commissionLabel: "Commission",
    commissionPercentPrefix: "of order value — roughly",
    commissionPercentSuffix: "/pair.",
    supportEyebrow: "Support",
    supportTitle: "What CloudS Provides for You",
    platformSupport: [
      {
        icon: Camera,
        title: "Product Photo & Video Library",
        detail:
          "Studio shots, everyday photos, and short videos ready to post — download them from the shared folder.",
      },
      {
        icon: TrendingUp,
        title: "Transparent Sales Tracking",
        detail:
          "Every collaborator gets their own code, and the system automatically tracks pairs sold and commission per order.",
      },
      {
        icon: ShieldCheck,
        title: "Dedicated Support for Your Customers",
        detail:
          "Customers who order with your collaborator code get sizing advice and returns/exchanges under the same Peace of Mind Shopping policy as customers who buy directly.",
      },
    ],
    galleryLinkCta: "See Sample Photo & Video Library",
    closingTitle: "Sign Up as a Collaborator Today",
    closingDesc:
      "Message CloudS on Zalo to get your personal collaborator code, the photo/video library, and start selling today.",
    closingCta: "Sign Up via Zalo",
  },
};

export default async function CtvPage() {
  const locale = await getLocale();
  const t = content[locale];

  const muleProduct = getProductBySlug("cloud-mule-1-rose");
  const muleProducts = products.filter((p) => p.silhouette === "cloud-mule-1");
  const listedPrice = muleProduct?.price ?? 229000;
  const ctvDiscount = 10000;
  const ctvPrice = listedPrice - ctvDiscount;
  const shopeeTiktokPrice = 260000;
  const shopeeTiktokCommission = Math.round(shopeeTiktokPrice * 0.1);

  const exampleOrders = 12;
  const exampleCommission =
    2 * t.commissionTiers[0].rate + 8 * t.commissionTiers[1].rate + 2 * t.commissionTiers[2].rate;

  return (
    <Container className="py-14 sm:py-20">
      {/* Hero */}
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
          {t.heroEyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {t.heroH1}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">{t.heroDesc}</p>
        <p className="mt-2 text-sm text-ink-soft">{t.heroNote}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={siteConfig.contact.zaloLink} size="lg" external>
            {t.ctaZalo}
          </Button>
          <Button href="#cach-1" variant="ghost" size="lg">
            {t.ctaViewDetails}
          </Button>
        </div>
      </div>

      {/* Giới thiệu sản phẩm */}
      <section className="mt-14 sm:mt-20">
        <SectionHeading
          eyebrow={t.productEyebrow}
          title={t.productTitle}
          description={t.productDesc}
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {muleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <Button href="/san-pham/cloud-mule-1-rose" variant="ghost" className="mt-8">
          {t.productLinkCta}
        </Button>
      </section>

      {/* Cách 1 */}
      <section id="cach-1" className="mt-14 scroll-mt-24 sm:mt-20">
        <SectionHeading
          eyebrow={t.cach1Eyebrow}
          title={t.cach1Title}
          description={t.cach1Desc}
        />

        <ul className="mt-8 space-y-2.5 text-sm leading-relaxed text-ink-soft">
          <li className="flex gap-2.5">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-ink" />
            {t.orderMethod1}
          </li>
          <li className="flex gap-2.5">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-ink" />
            {t.orderMethod2}
          </li>
        </ul>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {t.priceCardCtvLabel}
            </p>
            <p className="mt-2 font-display text-2xl text-ink">{formatPrice(ctvPrice)}</p>
            <p className="mt-1 text-xs text-ink-soft">{t.priceCardCtvSuffix}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {t.priceCardListedLabel}
            </p>
            <p className="mt-2 font-display text-2xl text-ink">{formatPrice(listedPrice)}</p>
            <p className="mt-1 text-xs text-ink-soft">{t.priceCardListedSuffix}</p>
          </div>
        </div>

        <h3 className="mt-10 font-display text-lg text-ink">{t.commissionTitle}</h3>
        <div className="mt-4 max-w-md overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-cream text-left">
                <th className="px-5 py-3 font-semibold text-ink">{t.tableColPairs}</th>
                <th className="px-5 py-3 font-semibold text-ink">{t.tableColRate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {t.commissionTiers.map((tier) => (
                <tr key={tier.range}>
                  <td className="px-5 py-3 text-ink">{tier.range}</td>
                  <td className="px-5 py-3 text-ink-soft">{formatPrice(tier.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
          {t.exampleIntro} {exampleOrders} {t.pairsWord}
          {t.exampleCommissionLabel} (2 {t.pairsWord} ×{" "}
          {formatPrice(t.commissionTiers[0].rate)}) + (8 {t.pairsWord} ×{" "}
          {formatPrice(t.commissionTiers[1].rate)}) + (2 {t.pairsWord} ×{" "}
          {formatPrice(t.commissionTiers[2].rate)}) ={" "}
          <span className="font-semibold text-ink">{formatPrice(exampleCommission)}</span>.
        </p>
      </section>

      {/* Cách 2 */}
      <section className="mt-14 sm:mt-20">
        <SectionHeading
          eyebrow={t.cach2Eyebrow}
          title={t.cach2Title}
          description={t.cach2Desc}
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <ShoppingBag className="size-5" aria-hidden />
            </span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {t.salePriceLabel}
            </p>
            <p className="mt-1 font-display text-2xl text-ink">{formatPrice(shopeeTiktokPrice)}</p>
            <p className="mt-1 text-xs text-ink-soft">{t.salePriceSuffix}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <TrendingUp className="size-5" aria-hidden />
            </span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              {t.commissionLabel}
            </p>
            <p className="mt-1 font-display text-2xl text-ink">10%</p>
            <p className="mt-1 text-xs text-ink-soft">
              {t.commissionPercentPrefix} {formatPrice(shopeeTiktokCommission)}
              {t.commissionPercentSuffix}
            </p>
          </div>
        </div>
      </section>

      {/* CloudS hỗ trợ CTV */}
      <section className="mt-14 sm:mt-20">
        <SectionHeading eyebrow={t.supportEyebrow} title={t.supportTitle} />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {t.platformSupport.map(({ icon: Icon, title, detail }) => (
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
          {t.galleryLinkCta}
        </Button>
      </section>

      {/* CTA cuối */}
      <div className="mt-14 rounded-3xl bg-brand-black p-8 text-center sm:mt-20 sm:p-12">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-cream/10 text-brand-cream">
          <Users className="size-6" aria-hidden />
        </span>
        <h2 className="mt-4 font-display text-2xl text-brand-cream sm:text-3xl">
          {t.closingTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-brand-cream/70">
          {t.closingDesc}
        </p>
        <Button
          href={siteConfig.contact.zaloLink}
          variant="secondary"
          size="lg"
          className="mt-6"
          icon={<MessageCircle className="size-4" aria-hidden />}
          external
        >
          {t.closingCta}
        </Button>
      </div>
    </Container>
  );
}
