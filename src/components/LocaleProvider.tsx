"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/locale";
import { getDictionary } from "@/lib/dictionaries";

const LocaleContext = createContext<Locale>("vi");

// Nhận `locale` mới nhất từ Server Component cha (đọc cookie) mỗi lần render — sau khi
// LanguageSwitcher gọi router.refresh(), toàn bộ cây Server Component chạy lại với cookie mới
// và giá trị này tự động cập nhật theo, không cần state riêng ở client.
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useDictionary() {
  return getDictionary(useLocale());
}
