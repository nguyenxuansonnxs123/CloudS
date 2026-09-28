import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập quản lý kho",
  robots: { index: false, follow: false },
};

export default function KhoLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
