"use client";

import { useRouter } from "next/navigation";

export function KhoLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/kho/logout", { method: "POST" });
    router.push("/kho/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:border-brand-black"
    >
      Đăng xuất
    </button>
  );
}
