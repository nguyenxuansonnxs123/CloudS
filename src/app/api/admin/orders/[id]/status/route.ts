import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";
import { updateOrderStatus, type OrderStatus } from "@/lib/orders-store";

const VALID_STATUSES: OrderStatus[] = ["moi", "da_xu_ly", "da_huy"];

export async function POST(request: Request, context: RouteContext<"/api/admin/orders/[id]/status">) {
  const token = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_COOKIE_NAME}=`))
    ?.split("=")[1];

  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const status = body?.status as OrderStatus;

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Trạng thái không hợp lệ." }, { status: 400 });
  }

  await updateOrderStatus(id, status);
  return NextResponse.json({ ok: true });
}
