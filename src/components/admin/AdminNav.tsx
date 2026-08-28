import Link from "next/link";

export function AdminNav({ active }: { active: "orders" | "affiliates" }) {
  const linkClass = (key: typeof active) =>
    `rounded-full px-4 py-1.5 text-sm font-medium ${
      active === key ? "bg-brand-black text-brand-cream" : "text-ink-soft hover:text-ink"
    }`;

  return (
    <nav className="flex gap-2">
      <Link href="/admin/orders" className={linkClass("orders")}>
        Đơn hàng
      </Link>
      <Link href="/admin/affiliates" className={linkClass("affiliates")}>
        Affiliate
      </Link>
    </nav>
  );
}
