import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Chính sách đổi trả",
  description:
    "Chính sách đổi trả CloudS — hỗ trợ đổi size trong 5 ngày, chịu trách nhiệm 100% nếu lỗi từ phía shop.",
};

const commitments = [
  "CloudS chịu trách nhiệm 100% nếu lỗi đến từ phía shop (giao sai mẫu/sai size so với đơn, lỗi sản xuất)",
  "CloudS hỗ trợ đổi size trong những ngày đầu nhận hàng nếu khách chọn nhầm, với điều kiện giày còn mới nguyên",
  "Mọi yêu cầu đổi trả được phản hồi trong vòng 24 giờ làm việc, xử lý xong trong 3–5 ngày kể từ khi CloudS nhận lại hàng",
  "CloudS ưu tiên đổi sản phẩm hơn hoàn tiền, để đảm bảo khách luôn có một đôi giày vừa ý",
];

const cases = [
  {
    title: "2.1 — Lỗi từ phía CloudS",
    rows: [
      ["Điều kiện áp dụng", "Giao sai mẫu/sai size so với đơn đặt · Lỗi sản xuất (bung keo, lỗi đường may, lỗi form ngay khi nhận)"],
      ["Thời hạn", "7 ngày kể từ ngày nhận hàng"],
      ["Chi phí vận chuyển", "CloudS chịu 100% phí ship cả hai chiều"],
      ["Hình thức xử lý", "Đổi sản phẩm đúng/mới, hoặc hoàn tiền 100% nếu khách không muốn đổi"],
      ["Thời gian xử lý", "Xác nhận trong 24h, gửi hàng thay thế trong 24–48h sau khi nhận lại hàng lỗi"],
    ],
  },
  {
    title: "2.2 — Đổi size (khách đặt nhầm size)",
    rows: [
      ["Điều kiện áp dụng", "Giày chưa qua sử dụng, còn nguyên tem mác, hộp và phụ kiện đi kèm"],
      ["Thời hạn", "5 ngày kể từ ngày nhận hàng"],
      ["Chi phí vận chuyển", "Mỗi bên chịu 1 chiều: khách chịu phí gửi giày cũ về, CloudS chịu phí gửi giày size mới"],
      ["Hình thức xử lý", "Chỉ đổi sang size khác hoặc sản phẩm khác giá trị tương đương — không hoàn tiền"],
      ["Thời gian xử lý", "Xác nhận trong 24h, gửi giày size mới trong 2–3 ngày sau khi nhận lại hàng cũ"],
    ],
  },
  {
    title: "2.3 — Bảo hành lỗi kỹ thuật sau khi sử dụng",
    rows: [
      ["Điều kiện áp dụng", "Lỗi kỹ thuật không do tác động ngoại lực: bong đế, đứt chỉ tự nhiên trong điều kiện sử dụng bình thường"],
      ["Thời hạn", "6 tháng kể từ ngày nhận hàng"],
      ["Chi phí vận chuyển", "CloudS chịu phí ship chiều trả giày; khách chịu phí gửi giày lỗi đến CloudS"],
      ["Hình thức xử lý", "Sửa chữa (nếu khắc phục được) hoặc đổi sản phẩm cùng mẫu/size; không hoàn tiền"],
      ["Cần cung cấp", "Mã đơn hàng hoặc hoá đơn mua hàng để xác minh; không bắt buộc còn tem/hộp"],
    ],
  },
  {
    title: "2.4 — Đổi ý (không lỗi sản phẩm)",
    rows: [
      [
        "Chi tiết",
        "Mỗi yêu cầu được xem xét theo từng trường hợp cụ thể (còn mới nguyên tem/hộp, lý do hợp lý). Nếu CloudS đồng ý hỗ trợ, khách chịu toàn bộ phí vận chuyển hai chiều.",
      ],
    ],
  },
];

const notApplicable = [
  "Giày đã qua sử dụng, có dấu hiệu đi ngoài trời, bám bẩn, trầy xước do sử dụng",
  "Mất tem mác, hộp hoặc phụ kiện đi kèm (áp dụng cho mục đổi size)",
  "Hư hỏng do tác động bên ngoài: cắt, rách, cháy, ngâm nước, va đập mạnh",
  "Quá thời hạn quy định tương ứng với từng trường hợp",
  "Sản phẩm nhận được từ chương trình affiliate/KOC seeding (hàng tặng)",
];

const process = [
  "Liên hệ CloudS qua kênh đã mua hàng (nhắn tin Shopee/TikTok Shop, inbox Threads/Facebook/Instagram) kèm mã đơn hàng và hình ảnh/video sản phẩm",
  "CloudS xác nhận trường hợp áp dụng và phản hồi hướng xử lý trong 24 giờ làm việc",
  "Khách gửi sản phẩm về theo địa chỉ và hướng dẫn CloudS cung cấp",
  "CloudS kiểm tra hàng nhận lại, xử lý đổi/hoàn tiền theo đúng chính sách, và cập nhật tiến độ cho khách",
];

export default function ReturnPolicyPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-dark">
          An tâm mua hàng
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          Chính sách đổi trả
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Trải nghiệm khách hàng đặt lên hàng đầu — chính sách rõ ràng, công bằng, dễ hiểu.
          CloudS xử lý nhanh khi lỗi thuộc về mình.
        </p>
      </div>

      <div className="mt-10 grid gap-4 rounded-3xl border border-line bg-blush-tint p-6 sm:grid-cols-2 sm:p-8">
        {commitments.map((item) => (
          <p key={item} className="text-sm leading-relaxed text-ink">
            {item}
          </p>
        ))}
      </div>

      <div className="mt-14 space-y-8">
        <SectionHeading eyebrow="Chi tiết" title="Các trường hợp đổi trả" />
        {cases.map((c) => (
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
          <SectionHeading eyebrow="Lưu ý" title="Trường hợp không áp dụng đổi trả" />
          <ul className="mt-6 space-y-2.5">
            {notApplicable.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink-soft" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading eyebrow="Các bước" title="Quy trình đổi trả" />
          <ol className="mt-6 space-y-4">
            {process.map((step, i) => (
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
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Cần hỗ trợ đổi trả?</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
          Với đơn qua Shopee/TikTok Shop, chính sách luôn tuân theo mức tối thiểu mà sàn quy
          định. Với đơn qua Threads/Instagram/Facebook hoặc trực tiếp, chính sách trên áp dụng
          đầy đủ. Thời gian phản hồi cam kết: trong 24 giờ làm việc.
        </p>
        <Button href="/lien-he" size="lg" className="mt-6">
          Liên hệ CloudS
        </Button>
      </div>
    </Container>
  );
}
