import { cookies } from "next/headers";
import { LOCALE_COOKIE, defaultLocale, type Locale } from "./locale";

export type { Locale };
export { LOCALE_COOKIE, defaultLocale };

function normalizeLocale(value: string | undefined): Locale {
  return value === "en" ? "en" : defaultLocale;
}

/** Đọc locale hiện tại từ cookie — chỉ dùng trong Server Component / Route Handler. */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return normalizeLocale(store.get(LOCALE_COOKIE)?.value);
}
