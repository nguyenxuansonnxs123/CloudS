import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

// Đăng nhập riêng cho khu vực quản lý kho (/kho), tách biệt hoàn toàn với /admin để nhân viên
// kho không xem được đơn hàng/thông tin khách. Mật khẩu chỉ lưu dưới dạng hash scrypt có salt.
export const KHO_COOKIE_NAME = "clouds_kho_session";
const KHO_USERNAME = "quanlykho";
const KHO_PASSWORD_HASH =
  "scrypt$3cbc1653509eaef138f6095662a05fe8$57b84ee36f2c0224cec03e8f3281b48a017e3ea36a9636188a6addcd1979e79b";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 giờ

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-only-insecure-secret";
}

function sign(value: string) {
  // Gắn hash mật khẩu vào chữ ký: đổi mật khẩu sẽ làm mọi phiên đăng nhập cũ hết hiệu lực ngay.
  return createHmac("sha256", getSecret()).update(`kho:${KHO_PASSWORD_HASH}:${value}`).digest("hex");
}

function safeEqual(a: Buffer, b: Buffer) {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function checkKhoCredentials(username: string, password: string) {
  const [, saltHex, hashHex] = KHO_PASSWORD_HASH.split("$");
  const expected = Buffer.from(hashHex, "hex");
  const actual = scryptSync(password, Buffer.from(saltHex, "hex"), expected.length);
  const passwordOk = safeEqual(actual, expected);
  const userOk = safeEqual(Buffer.from(username.trim().toLowerCase()), Buffer.from(KHO_USERNAME));
  return passwordOk && userOk;
}

export function createKhoSessionToken() {
  const payload = `${Date.now() + SESSION_TTL_MS}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyKhoSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (sign(payload) !== signature) return false;
  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() <= expires;
}

/** Dùng trong các API route /api/kho/* (proxy chỉ chặn các trang /kho, không chặn API). */
export function isKhoAuthorizedRequest(request: Request): boolean {
  const token = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${KHO_COOKIE_NAME}=`))
    ?.split("=")[1];
  return verifyKhoSessionToken(token);
}

// Chặn dò mật khẩu: tối đa 5 lần sai / 15 phút cho mỗi IP (lưu trong bộ nhớ tiến trình).
const MAX_FAILED = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failures = new Map<string, { count: number; first: number }>();

export function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

export function isLoginBlocked(ip: string) {
  const entry = failures.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    failures.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILED;
}

export function recordLoginFailure(ip: string) {
  const entry = failures.get(ip);
  if (!entry || Date.now() - entry.first > WINDOW_MS) {
    failures.set(ip, { count: 1, first: Date.now() });
  } else {
    entry.count += 1;
  }
}

export function clearLoginFailures(ip: string) {
  failures.delete(ip);
}
