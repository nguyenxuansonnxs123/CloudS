import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "clouds_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 giờ

function getSecret() {
  // Bắt buộc phải đặt ADMIN_SESSION_SECRET trong production — xem .env.example.
  return process.env.ADMIN_SESSION_SECRET || "dev-only-insecure-secret";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (sign(payload) !== signature) return false;
  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  return true;
}

/** Kiểm tra request có cookie phiên admin hợp lệ không — dùng trong các API route /api/admin/*. */
export function isAuthorizedRequest(request: Request): boolean {
  const token = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_COOKIE_NAME}=`))
    ?.split("=")[1];
  return verifySessionToken(token);
}
