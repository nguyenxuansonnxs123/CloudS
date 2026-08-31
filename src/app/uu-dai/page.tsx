import type { Metadata } from "next";
import Image from "next/image";
import { Percent, Truck, ShieldCheck, Users, Sparkles } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Ưu đãi & Đổi trả",
  description:
    "Toàn bộ ưu đãi tại CloudS — khai trương, giới thiệu bạn bè — và chính sách đổi trả, Chế độ An Tâm Mua Sắm.",
};

// Lưu ý: "Ưu đãi khai trương" bên dưới mang tính thời điểm (tuần 20–26/8).
// Sau khi hết hạn, gỡ khối "Đang diễn ra" và chỉ giữ lại các ưu đãi dài hạn.
export default function PromotionsPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
          Ưu đãi
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          Ưu đãi & Đổi trả tại CloudS
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Từ ưu đãi khai trương cho những khách hàng đầu tiên, đến chính sách đổi trả và các
          quyền lợi CloudS duy trì lâu dài — tất cả ở một chỗ.
        </p>
      </div>

      {/* Đang diễn ra */}
      <section className="mt-12">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="size-5 text-rose-ink" aria-hidden />
          <h2 className="font-display text-2xl text-ink">Đang diễn ra — Khai trương</h2>
        </div>

        <div className="grid gap-6 rounded-3xl border border-line bg-blush-tint p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-cream">
            <Image
              src="/images/home/hero-grand-opening.webp"
              alt="CloudS Grand Opening — Bước nhẹ mỗi ngày"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-top"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <span className="flex size-10 items-center justify-center rounded-full bg-surface text-rose-ink">
                <Percent className="size-5" aria-hidden />
              </span>
              <h3 className="mt-3 font-display text-lg text-ink">Giảm giá khai trương</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-rose-ink">
                3 ngày đầu khai trương
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Giảm 10–15% cho những đơn hàng đầu tiên, áp dụng cho cả 3 sản phẩm, trên mọi
                kênh. Giới hạn theo số lượng và thời gian — mốc nào đến trước.
              </p>
            </div>
            <div>
              <span className="flex size-10 items-center justify-center rounded-full bg-surface text-rose-ink">
                <Truck className="size-5" aria-hidden />
              </span>
              <h3 className="mt-3 font-display text-lg text-ink">Miễn phí ship</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-rose-ink">
                Tuần khai trương
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Đặt hàng qua Threads, Instagram hoặc Facebook — CloudS miễn phí ship toàn quốc
                trong tuần đầu ra mắt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Áp dụng lâu dài */}
      <section className="mt-14">
        <h2 className="mb-6 font-display text-2xl text-ink">Áp dụng lâu dài</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <Users className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-xl text-ink">Giới thiệu bạn bè</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Rủ bạn mua CloudS — cả hai cùng được ưu đãi cho đơn tiếp theo. Nhắn tên người
              giới thiệu khi đặt hàng qua inbox để CloudS ghi nhận ưu đãi cho cả hai.
            </p>
            <Button href="/lien-he" variant="ghost" className="mt-6">
              Nhắn tin để tham gia
            </Button>
          </div>
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <span className="flex size-11 items-center justify-center rounded-full bg-blush-tint text-rose-ink">
              <ShieldCheck className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-xl text-ink">Chế độ An Tâm Mua Sắm</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Hoàn tiền 100% nếu sản phẩm không đúng mô tả, đổi màu/size miễn phí, bảo hành 6
              tháng lỗi keo đế — không phải một ưu đãi tạm thời, mà là cam kết đi kèm mọi đơn
              hàng.
            </p>
            <Button href="/chinh-sach-doi-tra" variant="ghost" className="mt-6">
              Xem chi tiết chính sách
            </Button>
          </div>
        </div>
      </section>

      <div className="mt-14 rounded-3xl bg-brand-black p-8 text-center sm:p-12">
        <h2 className="font-display text-2xl text-brand-cream sm:text-3xl">
          Đừng bỏ lỡ ưu đãi cho đơn đầu tiên
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-brand-cream/70">
          Số lượng ưu đãi khai trương có giới hạn — inbox CloudS ngay để được cập nhật số
          lượng còn lại và tư vấn chọn size phù hợp.
        </p>
        <Button href="/lien-he" variant="secondary" size="lg" className="mt-6">
          Nhắn tin nhận ưu đãi
        </Button>
      </div>
    </Container>
  );
}
