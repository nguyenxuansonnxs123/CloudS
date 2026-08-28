import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Về CloudS — Giày Thể Thao, Sneaker Cho Sinh Viên Hà Nội",
  description:
    "CloudS là thương hiệu giày thể thao & sneaker tập trung vào performance daily walking, đồng hành cùng sinh viên và giới trẻ khu vực Cầu Giấy, các trường đại học Hà Nội.",
};

const forYou = [
  "Đi làm, đi học, di chuyển hoặc đứng nhiều trong ngày",
  "Coi trọng sự thoải mái ngang với thẩm mỹ",
  "Muốn một đôi giày mặc cả ngày mà không đau chân",
  "Thích phong cách tối giản, dễ phối nhiều outfit",
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-cream">
        <Container className="py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
              Về CloudS
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Hiệu năng cho vận động hàng ngày.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              CloudS là thương hiệu giày thể thao &amp; sneaker nữ tập trung vào{" "}
              <em className="not-italic font-semibold text-ink">performance daily walking</em> —
              hiệu năng cho vận động hàng ngày, dễ mặc dễ đi. Khác với các thương hiệu thời trang
              thuần lifestyle, CloudS lấy sự thoải mái khi di chuyển, đi bộ nhiều trong ngày làm
              gốc — phong cách tối giản, dễ phối đồ là điểm cộng thêm.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/cloudstride/gallery-4.webp"
                alt="Chi tiết CloudStride 1"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="CloudS phù hợp với bạn nếu"
                title="Bạn di chuyển nhiều mỗi ngày"
              />
              <ul className="mt-6 space-y-3">
                {forYou.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink-soft sm:text-base">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blush-dark" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-cream">
        <Container className="py-14 sm:py-20">
          <SectionHeading
            eyebrow="Sứ mệnh"
            title="Mỗi đôi CloudS là một bằng chứng thực tế"
            description="Mỗi video, mỗi bài đăng của CloudS là một bằng chứng rằng đôi giày này “đi được cả ngày không mỏi” — chúng tôi ưu tiên trải nghiệm thật hơn là lời quảng cáo."
          />
        </Container>
      </section>

      <section className="bg-brand-black">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush">
              CloudS Walking Club
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-brand-cream sm:text-4xl">
              Một thói quen nhỏ, duy trì mỗi ngày.
            </h2>
            <p className="mt-4 leading-relaxed text-brand-cream/70">
              Với dòng CloudStride, chúng tôi không chỉ bán một đôi giày — chúng tôi muốn
              khuyến khích thói quen đi bộ hằng ngày. CloudS Walking Club là nơi các thành viên
              chia sẻ hành trình đi bộ, hỏi đáp về chọn giày đúng form, và cùng nhau giữ động lực
              vận động — thay vì đi một mình rồi dễ bỏ cuộc.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="font-display text-xl text-brand-cream">Cách tham gia</h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-cream/70">
              <li>Theo dõi CloudS trên Threads/TikTok để cập nhật lịch đi bộ nhóm</li>
              <li>Chia sẻ hành trình đi bộ của bạn kèm hashtag riêng của CloudS</li>
              <li>Tham gia buổi đi bộ cuối tuần cùng cộng đồng và affiliate CloudS</li>
            </ul>
            <Button href="/lien-he" variant="secondary" className="mt-6">
              Nhắn tin tham gia
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
