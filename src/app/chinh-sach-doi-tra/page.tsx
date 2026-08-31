import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const seo = {
    vi: {
      title: "Chính sách đổi trả & bảo hành",
      description:
        "Chế độ An Tâm Mua Sắm tại CloudS — hoàn tiền 100% nếu sai mô tả, đổi màu/size miễn phí, bảo hành 6 tháng lỗi keo đế.",
    },
    en: {
      title: "Return & Warranty Policy",
      description:
        "CloudS's Peace of Mind Shopping — 100% refund for mismatched items, free color/size exchanges, 6-month warranty on sole adhesive defects.",
    },
  }[locale];
  return { title: seo.title, description: seo.description };
}

const content = {
  vi: {
    eyebrow: "Chế độ An Tâm Mua Sắm",
    h1: "Chính sách đổi trả & bảo hành",
    intro:
      "Trải nghiệm khách hàng đặt lên hàng đầu — chính sách rõ ràng, công bằng, dễ hiểu. CloudS xử lý nhanh khi lỗi thuộc về mình, và đồng hành cùng bạn suốt 6 tháng bảo hành.",
    heroImgAlt: "Chế độ bảo hành An Tâm Mua Sắm tại CloudS",
    commitments: [
      "Hoàn tiền 100% nếu sản phẩm không đúng như mô tả (giao sai mẫu, lỗi sản xuất, hình ảnh không đúng thực tế)",
      "Hỗ trợ đổi màu, đổi size, hoặc hoàn tiền nếu sản phẩm không giống ảnh/sai kích cỡ — miễn phí đổi phân loại, khách chỉ chịu phí vận chuyển ước tính ~35.000đ",
      "Bảo hành 6 tháng miễn phí cho lỗi đường keo đế, CloudS hỗ trợ 50% chi phí vận chuyển khi bảo hành",
      "Dịch vụ thay vải giày mới khi cần, không giới hạn thời gian, chi phí chỉ từ 230.000đ tuỳ tình trạng",
      "Mọi yêu cầu đổi trả/bảo hành được phản hồi trong vòng 24 giờ làm việc, xử lý xong trong 3–5 ngày",
    ],
    commitmentsNote:
      "Lưu ý: khách hàng vui lòng KHÔNG tự sửa chữa/bảo hành giày tại nhà — việc này có thể làm mất hiệu lực bảo hành.",
    casesEyebrow: "Chi tiết",
    casesTitle: "Các trường hợp đổi trả & bảo hành",
    cases: [
      {
        title: "2.1 — Sản phẩm không đúng mô tả / lỗi từ CloudS",
        rows: [
          ["Điều kiện áp dụng", "Giao sai mẫu/sai size so với đơn · Lỗi sản xuất (bung keo, lỗi đường may, lỗi form ngay khi nhận) · Sản phẩm không giống mô tả/hình ảnh trên gian hàng"],
          ["Thời hạn", "7 ngày kể từ ngày nhận hàng"],
          ["Chi phí vận chuyển", "CloudS chịu 100% phí ship cả hai chiều"],
          ["Hình thức xử lý", "Hoàn tiền 100%, hoặc đổi sản phẩm đúng/mới nếu khách muốn tiếp tục mua"],
          ["Thời gian xử lý", "Xác nhận trong 24h, hoàn tiền hoặc gửi hàng thay thế trong 24–48h sau khi nhận lại hàng"],
        ],
      },
      {
        title: "2.2 — Đổi màu / đổi size",
        rows: [
          ["Điều kiện áp dụng", "Giày chưa qua sử dụng (chưa đi ra ngoài), còn nguyên tem mác, hộp và phụ kiện đi kèm"],
          ["Thời hạn", "5 ngày kể từ ngày nhận hàng"],
          ["Chi phí vận chuyển", "Miễn phí đổi phân loại — khách chỉ chịu phí vận chuyển ước tính ~35.000đ"],
          ["Hình thức xử lý", "Đổi sang màu/size khác hoặc sản phẩm giá trị tương đương; nếu hết phân loại phù hợp, CloudS hoàn tiền 100%"],
          ["Thời gian xử lý", "Xác nhận trong 24h, gửi hàng đổi trong 2–3 ngày sau khi nhận lại hàng cũ (tuỳ tồn kho)"],
        ],
      },
      {
        title: "2.3 — Bảo hành 6 tháng — lỗi đường keo đế",
        rows: [
          ["Điều kiện áp dụng", "Lỗi kỹ thuật ở đường keo đế (bong/hở keo) phát sinh khi sử dụng bình thường, không do tác động ngoại lực"],
          ["Thời hạn", "6 tháng kể từ ngày nhận hàng"],
          ["Chi phí vận chuyển", "CloudS hỗ trợ 50% chi phí vận chuyển hai chiều, khách chịu 50% còn lại"],
          ["Hình thức xử lý", "Sửa chữa/dán lại đường keo miễn phí; không hoàn tiền, không tính là đổi trả"],
          ["Cần cung cấp", "Mã đơn hàng hoặc hoá đơn mua hàng để xác minh"],
        ],
      },
      {
        title: "2.4 — Dịch vụ thay vải giày",
        rows: [
          ["Điều kiện áp dụng", "Vải giày hư hỏng do dùng lâu ngày (không phải lỗi kỹ thuật keo đế) — dịch vụ sửa chữa có phí, không phải bảo hành miễn phí"],
          ["Thời hạn", "Không giới hạn thời gian — áp dụng bất cứ khi nào khách cần"],
          ["Chi phí", "Từ 230.000đ, tuỳ tình trạng thực tế khi kiểm tra"],
          ["Chi phí vận chuyển", "Khách chịu chi phí vận chuyển hai chiều cho dịch vụ này"],
          ["Hình thức xử lý", "CloudS báo giá cụ thể sau khi kiểm tra giày, khách xác nhận trước khi thay vải"],
        ],
      },
      {
        title: "2.5 — Đổi ý (không lỗi sản phẩm)",
        rows: [
          [
            "Chi tiết",
            "Mỗi yêu cầu được xem xét theo từng trường hợp cụ thể (còn mới nguyên tem/hộp, lý do hợp lý). Nếu CloudS đồng ý hỗ trợ, khách chịu toàn bộ phí vận chuyển hai chiều.",
          ],
        ],
      },
    ],
    notApplicableEyebrow: "Lưu ý",
    notApplicableTitle: "Trường hợp không áp dụng",
    notApplicable: [
      "Giày đã qua sử dụng, có dấu hiệu đi ngoài trời, bám bẩn, trầy xước do sử dụng (áp dụng cho mục 2.1, 2.2)",
      "Mất tem mác, hộp hoặc phụ kiện đi kèm (áp dụng cho mục 2.2 — đổi màu/size)",
      "Hư hỏng do tác động bên ngoài: cắt, rách, cháy, ngâm nước, va đập mạnh",
      "Khách tự ý sửa chữa, tháo lắp, hoặc \"tự bảo hành\" giày tại nhà — làm mất hiệu lực bảo hành ở mục 2.3",
      "Quá thời hạn quy định tương ứng với từng trường hợp ở mục 2",
      "Sản phẩm nhận được từ chương trình affiliate/KOC seeding (hàng tặng)",
    ],
    processEyebrow: "Các bước",
    processTitle: "Quy trình đổi trả / bảo hành",
    process: [
      "Liên hệ CloudS qua kênh đã mua hàng (nhắn tin Shopee/TikTok Shop, inbox Threads/Facebook/Instagram) kèm mã đơn hàng và hình ảnh/video sản phẩm",
      "CloudS xác nhận trường hợp áp dụng (mục 2.1 đến 2.5) và phản hồi hướng xử lý trong 24 giờ làm việc",
      "Khách gửi sản phẩm về theo địa chỉ và hướng dẫn CloudS cung cấp",
      "CloudS kiểm tra hàng nhận lại, xử lý đổi/hoàn tiền/bảo hành theo đúng chính sách, và cập nhật tiến độ cho khách",
    ],
    ctaTitle: "Cần hỗ trợ đổi trả?",
    ctaDesc:
      "Với đơn qua Shopee/TikTok Shop, chính sách luôn tuân theo mức tối thiểu mà sàn quy định. Với đơn qua Threads/Instagram/Facebook hoặc trực tiếp, chính sách trên áp dụng đầy đủ. Thời gian phản hồi cam kết: trong 24 giờ làm việc.",
    ctaButton: "Liên hệ CloudS",
  },
  en: {
    eyebrow: "Peace of Mind Shopping",
    h1: "Return & Warranty Policy",
    intro:
      "Customer experience comes first — a policy that's clear, fair, and easy to understand. CloudS resolves issues quickly when the fault is ours, and stands by you throughout your 6-month warranty.",
    heroImgAlt: "CloudS Peace of Mind Shopping warranty",
    commitments: [
      "100% refund if a product doesn't match its description (wrong item shipped, manufacturing defect, photos not matching the actual product)",
      "Color/size exchange or refund support if the product doesn't match photos or is the wrong size — free variant exchange, customer only covers an estimated ~35,000₫ shipping fee",
      "Free 6-month warranty for sole adhesive defects, CloudS covers 50% of shipping costs for warranty claims",
      "Shoe fabric replacement service whenever needed, no time limit, cost starting from just 230,000₫ depending on condition",
      "Every return/warranty request is answered within 24 business hours and resolved within 3–5 days",
    ],
    commitmentsNote:
      "Note: please do NOT repair or attempt to self-warranty your shoes at home — doing so may void the warranty.",
    casesEyebrow: "Details",
    casesTitle: "Return & Warranty Cases",
    cases: [
      {
        title: "2.1 — Product doesn't match description / CloudS error",
        rows: [
          ["Eligibility conditions", "Wrong item/size shipped versus the order · Manufacturing defect (glue separation, stitching error, shape defect noticed on arrival) · Product doesn't match the listing's description/photos"],
          ["Time limit", "7 days from the date of delivery"],
          ["Shipping cost", "CloudS covers 100% of shipping both ways"],
          ["Resolution", "100% refund, or exchange for the correct/new item if the customer wants to continue the purchase"],
          ["Processing time", "Confirmed within 24 hours; refund or replacement shipped within 24–48 hours after CloudS receives the returned item"],
        ],
      },
      {
        title: "2.2 — Color / size exchange",
        rows: [
          ["Eligibility conditions", "Shoes unused (never worn outdoors), with tags, box, and accessories intact"],
          ["Time limit", "5 days from the date of delivery"],
          ["Shipping cost", "Free variant exchange — customer only covers an estimated ~35,000₫ shipping fee"],
          ["Resolution", "Exchange for a different color/size or a product of equivalent value; if no matching variant is in stock, CloudS issues a 100% refund"],
          ["Processing time", "Confirmed within 24 hours; replacement shipped within 2–3 days after the original item is received back (subject to stock)"],
        ],
      },
      {
        title: "2.3 — 6-month warranty — sole adhesive defects",
        rows: [
          ["Eligibility conditions", "Technical defect in the sole adhesive (peeling/separating glue) occurring under normal use, not caused by external force"],
          ["Time limit", "6 months from the date of delivery"],
          ["Shipping cost", "CloudS covers 50% of round-trip shipping costs, customer covers the remaining 50%"],
          ["Resolution", "Free repair/re-gluing of the sole; not eligible for refund, not counted as a return"],
          ["Required documentation", "Order code or purchase receipt required for verification"],
        ],
      },
      {
        title: "2.4 — Shoe fabric replacement service",
        rows: [
          ["Eligibility conditions", "Shoe fabric worn from extended use (not a sole adhesive defect) — a paid repair service, not a free warranty"],
          ["Time limit", "No time limit — available whenever the customer needs it"],
          ["Cost", "From 230,000₫, depending on actual condition upon inspection"],
          ["Shipping cost", "Customer covers round-trip shipping costs for this service"],
          ["Resolution", "CloudS provides a specific quote after inspecting the shoes, customer confirms before the fabric is replaced"],
        ],
      },
      {
        title: "2.5 — Change of mind (no product defect)",
        rows: [
          [
            "Details",
            "Each request is reviewed case by case (item must be unused with tags/box intact, with a reasonable reason). If CloudS agrees to assist, the customer covers all round-trip shipping costs.",
          ],
        ],
      },
    ],
    notApplicableEyebrow: "Please note",
    notApplicableTitle: "When This Doesn't Apply",
    notApplicable: [
      "Shoes that have been worn, show signs of outdoor use, dirt, or scuffing from use (applies to sections 2.1, 2.2)",
      "Missing tags, box, or included accessories (applies to section 2.2 — color/size exchange)",
      "Damage from external causes: cutting, tearing, burning, water submersion, heavy impact",
      "Customer repairing, disassembling, or attempting a \"DIY warranty fix\" on the shoes at home — this voids the warranty under section 2.3",
      "Past the time limit specified for the relevant case in section 2",
      "Products received through affiliate/KOC seeding programs (gifted items)",
    ],
    processEyebrow: "Steps",
    processTitle: "Return / Warranty Process",
    process: [
      "Contact CloudS through the channel you purchased from (Shopee/TikTok Shop chat, Threads/Facebook/Instagram inbox) with your order code and photos/video of the product",
      "CloudS confirms which case applies (sections 2.1 to 2.5) and responds with the resolution within 24 business hours",
      "Customer ships the product back to the address and following the instructions CloudS provides",
      "CloudS inspects the returned item, processes the exchange/refund/warranty according to policy, and keeps the customer updated on progress",
    ],
    ctaTitle: "Need help with a return?",
    ctaDesc:
      "For orders through Shopee/TikTok Shop, our policy always follows the platform's minimum required standards. For orders through Threads/Instagram/Facebook or direct purchases, the policy above applies in full. Our committed response time: within 24 business hours.",
    ctaButton: "Contact CloudS",
  },
};

export default async function ReturnPolicyPage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <>
      <Container className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
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
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
            <Image
              src="/images/home/policy-peace-of-mind.webp"
              alt={t.heroImgAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mt-10 grid gap-4 rounded-3xl border border-line bg-blush-tint p-6 sm:grid-cols-2 sm:p-8">
          {t.commitments.map((item) => (
            <p key={item} className="text-sm leading-relaxed text-ink">
              {item}
            </p>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-soft">
          {t.commitmentsNote}
        </p>

        <div className="mt-14 space-y-8">
          <SectionHeading eyebrow={t.casesEyebrow} title={t.casesTitle} />
          {t.cases.map((c) => (
            <div key={c.title} className="overflow-hidden rounded-2xl border border-line">
              <div className="bg-surface px-6 py-4">
                <h3 className="font-display text-lg text-ink">{c.title}</h3>
              </div>
              <div className="divide-y divide-line">
                {c.rows.map(([label, value]) => (
                  <div key={label} className="grid gap-1 px-6 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
                    <p className="text-sm font-semibold text-ink">{label}</p>
                    <p className="text-sm leading-relaxed text-ink-soft">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t.notApplicableEyebrow} title={t.notApplicableTitle} />
            <ul className="mt-6 space-y-2.5">
              {t.notApplicable.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink-soft" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow={t.processEyebrow} title={t.processTitle} />
            <ol className="mt-6 space-y-4">
              {t.process.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-black text-xs font-semibold text-brand-cream">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-ink-soft">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-14 rounded-3xl border border-line bg-surface p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
            {t.ctaDesc}
          </p>
          <Button href="/lien-he" size="lg" className="mt-6">
            {t.ctaButton}
          </Button>
        </div>
      </Container>
    </>
  );
}
