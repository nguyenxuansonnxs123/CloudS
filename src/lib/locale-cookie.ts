import { LOCALE_COOKIE, type Locale } from "./locale";

/** Ghi cookie ngôn ngữ ở client — tách khỏi component để tránh cảnh báo "immutability" của
 * eslint-plugin-react-hooks khi gán document.cookie trực tiếp trong handler component. */
export function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
