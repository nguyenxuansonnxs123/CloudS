// Tách khỏi i18n.ts vì file đó import "next/headers" (server-only) — file này an toàn để
// import từ cả Client Component (LanguageSwitcher, locale-cookie.ts, dictionaries.ts).
export type Locale = "vi" | "en";
export const LOCALE_COOKIE = "cloudsvn_locale";
export const defaultLocale: Locale = "vi";
