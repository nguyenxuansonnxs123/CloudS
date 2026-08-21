import type { Metadata } from "next";
import Image from "next/image";
import { Percent, Truck, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Ưu đãi khai trương",
  description: "Ưu đãi khai trương CloudS — giảm giá, miễn phí ship và chính sách an tâm mua hàng.",
};

// Lưu ý: nội dung khuyến mãi mang tính thời điểm (tuần khai trương 20–26/8).
// Cập nhật hoặc gỡ phần "Giảm giá khai trương" sau khi chương trình kết thúc.
const programs = [
  {
    icon: Percent,
    title: "Giảm giá khai trương có giới hạn",
    period: "3 ngày đầu khai trương",
    detail:
      "Giảm 10–15% cho những đơn hàng đầu tiên, áp dụng cho cả hai sản phẩm, trên tất cả các kênh. Ưu đãi giới hạn theo số lượng và thời gian — mốc nào đến trước.",
  },
  {
    icon: Truck,
    title: "Miễn phí ship kênh tự vận hành",
    period: "Tuần khai trương",
    detail:
      "Đặt hàng qua Threads, Instagram hoặc Facebook — CloudS miễn phí ship toàn quốc trong tuần đầu ra mắt.",
  },
  {
    icon: ShieldCheck,
    title: "An tâm mua hàng",
    period: "Xuyên suốt",
    detail:
      "Lỡ sai size cũng đừng lo — CloudS hỗ trợ đổi size trong 5 ngày. Đây không phải một ưu đãi thêm chi phí, mà là cam kết CloudS luôn đi kèm mỗi đơn hàng.",
  },
  {
    icon: Users,
    title: "Giới thiệu bạn bè",
    period: "Từ tuần 2 trở đi, duy trì lâu dài",
    detail:
      "Rủ bạn mua CloudS — cả hai cùng được ưu đãi cho đơn tiếp theo. Nhắn tên người giới thiệu khi đặt hàng qua inbox để CloudS ghi nhận ưu đãi cho cả hai.",
  },
];

export default function PromoPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-dark">
          Khai trương
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          Ưu đãi khai trương CloudS
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          CloudS chính thức ra mắt — đây là những ưu đãi dành riêng cho những khách hàng đầu
          tiên đồng hành cùng CloudS.
        </p>
      </div>

      <div className="relative mt-10 aspect-square max-w-md overflow-hidden rounded-3xl border border-line bg-brand-cream sm:max-w-sm">
        <Image
          src="/images/men/ad-card-full.webp"
          alt="CloudS khai trương — Move a little. Feel a lot."
          fill
          sizes="(min-width: 640px) 384px, 90vw"
          className="object-contain"
          priority
        />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {programs.map(({ icon: Icon, title, period, detail }) => (
          <div key={title} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-blush-dark">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-xl text-ink">{title}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-blush-dark">
              {period}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl bg-brand-black p-8 text-center sm:p-12">
        <h2 className="font-display text-2xl text-brand-cream sm:text-3xl">
          Đừng bỏ lỡ ưu đãi cho đơn đầu tiên
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-brand-cream/70">
          Số lượng ưu đãi có giới hạn theo từng đợt — inbox CloudS ngay để được cập nhật số
          lượng còn lại và tư vấn chọn size phù hợp.
        </p>
        <Button href="/lien-he" variant="secondary" size="lg" className="mt-6">
          Nhắn tin nhận ưu đãi
        </Button>
      </div>
    </Container>
  );
}
