import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";
import { confirmOrderPayment } from "@/lib/orders-store";
import { sendCustomerThankYouEmail } from "@/lib/order-email";
import { submitOrderToSheet } from "@/lib/order-sheet";

export async function POST(
  request: Request,
  context: RouteContext<"/api/admin/orders/[id]/confirm-payment">
) {
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
  const order = await confirmOrderPayment(id);
  if (!order) {
    return NextResponse.json({ error: "Không tìm thấy đơn hàng." }, { status: 404 });
  }

  // Admin đã tự kiểm tra tài khoản ngân hàng trước khi bấm xác nhận — giờ mới tính đơn thành
  // công: ghi vào Google Sheet theo dõi và gửi email cảm ơn khách.
  void submitOrderToSheet(order);
  void sendCustomerThankYouEmail(order);

  return NextResponse.json({ ok: true });
}
