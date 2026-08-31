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
      title: "Về CloudS — Giày Thể Thao, Sneaker Cho Sinh Viên Hà Nội",
      description:
        "CloudS là thương hiệu giày thể thao & sneaker tập trung vào performance daily walking, đồng hành cùng sinh viên và giới trẻ khu vực Cầu Giấy, các trường đại học Hà Nội.",
    },
    en: {
      title: "About CloudS — Sneakers for Students in Hanoi",
      description:
        "CloudS is a sneaker brand built around performance daily walking, made for students and young people around Cau Giay and Hanoi's university area.",
    },
  }[locale];
  return { title: seo.title, description: seo.description };
}

const content = {
  vi: {
    eyebrow: "Về CloudS",
    h1: "Hiệu năng cho vận động hàng ngày.",
    intro: (
      <>
        CloudS là thương hiệu giày thể thao &amp; sneaker nữ tập trung vào{" "}
        <em className="not-italic font-semibold text-ink">performance daily walking</em> —
        hiệu năng cho vận động hàng ngày, dễ mặc dễ đi. Khác với các thương hiệu thời trang
        thuần lifestyle, CloudS lấy sự thoải mái khi di chuyển, đi bộ nhiều trong ngày làm
        gốc — phong cách tối giản, dễ phối đồ là điểm cộng thêm.
      </>
    ),
    galleryAlt: "Chi tiết CloudStride 1",
    forYouEyebrow: "CloudS phù hợp với bạn nếu",
    forYouTitle: "Bạn di chuyển nhiều mỗi ngày",
    forYou: [
      "Đi làm, đi học, di chuyển hoặc đứng nhiều trong ngày",
      "Coi trọng sự thoải mái ngang với thẩm mỹ",
      "Muốn một đôi giày mặc cả ngày mà không đau chân",
      "Thích phong cách tối giản, dễ phối nhiều outfit",
    ],
    missionEyebrow: "Sứ mệnh",
    missionTitle: "Mỗi đôi CloudS là một bằng chứng thực tế",
    missionDesc:
      "Mỗi video, mỗi bài đăng của CloudS là một bằng chứng rằng đôi giày này “đi được cả ngày không mỏi” — chúng tôi ưu tiên trải nghiệm thật hơn là lời quảng cáo.",
    clubEyebrow: "CloudS Walking Club",
    clubTitle: "Một thói quen nhỏ, duy trì mỗi ngày.",
    clubDesc:
      "Với dòng CloudStride, chúng tôi không chỉ bán một đôi giày — chúng tôi muốn khuyến khích thói quen đi bộ hằng ngày. CloudS Walking Club là nơi các thành viên chia sẻ hành trình đi bộ, hỏi đáp về chọn giày đúng form, và cùng nhau giữ động lực vận động — thay vì đi một mình rồi dễ bỏ cuộc.",
    howToJoinTitle: "Cách tham gia",
    howToJoin: [
      "Theo dõi CloudS trên Threads/TikTok để cập nhật lịch đi bộ nhóm",
      "Chia sẻ hành trình đi bộ của bạn kèm hashtag riêng của CloudS",
      "Tham gia buổi đi bộ cuối tuần cùng cộng đồng và affiliate CloudS",
    ],
    joinCta: "Nhắn tin tham gia",
  },
  en: {
    eyebrow: "About CloudS",
    h1: "Performance for everyday movement.",
    intro: (
      <>
        CloudS is a women&apos;s sneaker brand built around{" "}
        <em className="not-italic font-semibold text-ink">performance daily walking</em> —
        performance for everyday movement, easy to wear, easy to walk in. Unlike brands that
        chase pure lifestyle fashion, CloudS starts from comfort during movement and long days
        of walking — a minimal, easy-to-style look comes as a bonus, not the foundation.
      </>
    ),
    galleryAlt: "CloudStride 1 detail",
    forYouEyebrow: "CloudS is right for you if",
    forYouTitle: "You're on the move every day",
    forYou: [
      "You work, study, commute, or stand for long stretches of the day",
      "You value comfort just as much as style",
      "You want a pair you can wear all day without sore feet",
      "You love a minimal look that's easy to style with any outfit",
    ],
    missionEyebrow: "Mission",
    missionTitle: "Every pair of CloudS is real-world proof",
    missionDesc:
      "Every video, every post from CloudS is proof that these shoes can go \"all day without tiring\" — we care more about real experience than marketing claims.",
    clubEyebrow: "CloudS Walking Club",
    clubTitle: "One small habit, kept up every day.",
    clubDesc:
      "With the CloudStride line, we're not just selling a pair of shoes — we want to encourage a daily walking habit. CloudS Walking Club is where members share their walking journeys, ask about finding the right fit, and keep each other motivated to move — instead of going it alone and giving up.",
    howToJoinTitle: "How to join",
    howToJoin: [
      "Follow CloudS on Threads/TikTok for group walk schedules",
      "Share your walking journey with CloudS's own hashtag",
      "Join weekend walks with the community and CloudS affiliates",
    ],
    joinCta: "Message us to join",
  },
};

export default async function AboutPage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <>
      <section className="bg-brand-cream">
        <Container className="py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-ink">
              {t.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              {t.h1}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              {t.intro}
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
                alt={t.galleryAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow={t.forYouEyebrow}
                title={t.forYouTitle}
              />
              <ul className="mt-6 space-y-3">
                {t.forYou.map((item) => (
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
            eyebrow={t.missionEyebrow}
            title={t.missionTitle}
            description={t.missionDesc}
          />
        </Container>
      </section>

      <section className="bg-brand-black">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blush">
              {t.clubEyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-brand-cream sm:text-4xl">
              {t.clubTitle}
            </h2>
            <p className="mt-4 leading-relaxed text-brand-cream/70">
              {t.clubDesc}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="font-display text-xl text-brand-cream">{t.howToJoinTitle}</h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-cream/70">
              {t.howToJoin.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Button href="/lien-he" variant="secondary" className="mt-6">
              {t.joinCta}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
