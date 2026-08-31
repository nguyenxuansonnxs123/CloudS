"use client";

import { MessageCircle, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useLocale } from "./LocaleProvider";
import { Button } from "./Button";

const content = {
  vi: {
    shopee: "Mua trên Shopee",
    tiktok: "Mua trên TikTok Shop",
    zalo: "Tư vấn qua Zalo",
    fallbackNote: "* Link mua hàng sẽ được cập nhật khi CloudS cung cấp — hiện đang dẫn tới trang Liên hệ.",
  },
  en: {
    shopee: "Buy on Shopee",
    tiktok: "Buy on TikTok Shop",
    zalo: "Chat with us on Zalo",
    fallbackNote: "* Purchase links will be updated once CloudS provides them — currently linking to the Contact page.",
  },
};

// Nút mua hàng dùng chung: dẫn sang Shopee/TikTok Shop, hoặc nhắn Zalo nếu chưa có link sàn.
// shopeeUrl/tiktokUrl: link riêng của một sản phẩm — nếu có sẽ ưu tiên hơn link shop chung.
export function BuyActions({
  size = "md",
  className,
  shopeeUrl,
  tiktokUrl,
}: {
  size?: "md" | "lg";
  className?: string;
  shopeeUrl?: string;
  tiktokUrl?: string;
}) {
  const locale = useLocale();
  const t = content[locale];
  const { shopee, tiktok } = siteConfig.shops;
  const { zaloLink, zaloNumber } = siteConfig.contact;

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        <Button
          href={shopeeUrl || shopee || "#"}
          variant="primary"
          size={size}
          icon={<ShoppingBag className="size-4" aria-hidden />}
        >
          {t.shopee}
        </Button>
        <Button
          href={tiktokUrl || tiktok || "#"}
          variant="secondary"
          size={size}
          icon={<ShoppingBag className="size-4" aria-hidden />}
        >
          {t.tiktok}
        </Button>
        <Button
          href={zaloLink || "/lien-he"}
          variant="ghost"
          size={size}
          icon={<MessageCircle className="size-4" aria-hidden />}
        >
          {t.zalo}
        </Button>
      </div>
      {!shopeeUrl && !shopee && !tiktokUrl && !tiktok && !zaloNumber && (
        <p className="mt-2 text-xs text-ink-soft">{t.fallbackNote}</p>
      )}
    </div>
  );
}
