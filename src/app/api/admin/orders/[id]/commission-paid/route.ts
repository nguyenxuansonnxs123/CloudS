import { NextResponse } from "next/server";
import { isAuthorizedRequest } from "@/lib/admin-auth";
import { setAffiliateCommissionPaid } from "@/lib/orders-store";

export async function POST(
  request: Request,
  context: RouteContext<"/api/admin/orders/[id]/commission-paid">
) {
  if (!isAuthorizedRequest(request)) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const paid = body?.paid !== false;

  const order = await setAffiliateCommissionPaid(id, paid);
  if (!order) return NextResponse.json({ error: "Không tìm thấy đơn hàng." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
