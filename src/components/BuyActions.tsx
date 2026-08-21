import { MessageCircle, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "./Button";

// Nút mua hàng dùng chung: dẫn sang Shopee/TikTok Shop, hoặc nhắn Zalo nếu chưa có link sàn.
export function BuyActions({
  size = "md",
  className,
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const { shopee, tiktok } = siteConfig.shops;
  const { zaloLink, zaloNumber } = siteConfig.contact;

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        <Button
          href={shopee || "#"}
          variant="primary"
          size={size}
          icon={<ShoppingBag className="size-4" aria-hidden />}
        >
          Mua trên Shopee
        </Button>
        <Button
          href={tiktok || "#"}
          variant="secondary"
          size={size}
          icon={<ShoppingBag className="size-4" aria-hidden />}
        >
          Mua trên TikTok Shop
        </Button>
        <Button
          href={zaloLink || "/lien-he"}
          variant="ghost"
          size={size}
          icon={<MessageCircle className="size-4" aria-hidden />}
        >
          Đặt hàng qua Zalo
        </Button>
      </div>
      {!shopee && !tiktok && !zaloNumber && (
        <p className="mt-2 text-xs text-ink-soft">
          * Link mua hàng sẽ được cập nhật khi CloudS cung cấp — hiện đang dẫn tới trang Liên hệ.
        </p>
      )}
    </div>
  );
}
