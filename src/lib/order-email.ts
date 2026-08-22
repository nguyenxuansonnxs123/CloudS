import nodemailer from "nodemailer";
import type { Order } from "./orders-store";
import { formatPrice } from "./products";

// Gửi email báo đơn hàng mới cho CloudS — cần cấu hình biến môi trường SMTP
// (xem .env.example). Nếu chưa cấu hình, hàm này sẽ bỏ qua và chỉ ghi log,
// KHÔNG làm hỏng luồng đặt hàng của khách (đơn vẫn được lưu vào /admin/orders).
export async function sendOrderNotificationEmail(order: Order) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ORDER_NOTIFICATION_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ORDER_NOTIFICATION_EMAIL) {
    console.warn(
      `[order-email] Chưa cấu hình SMTP — bỏ qua gửi email cho đơn ${order.code}. Xem .env.example.`
    );
    return { sent: false as const };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 465,
      secure: Number(SMTP_PORT) !== 587,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const itemsHtml = order.items
      .map(
        (item) =>
          `<tr><td>${item.name} (${item.color}, size ${item.size}) x${item.quantity}</td><td style="text-align:right">${formatPrice(item.price * item.quantity)}</td></tr>`
      )
      .join("");

    await transporter.sendMail({
      from: `"CloudS Website" <${SMTP_USER}>`,
      to: ORDER_NOTIFICATION_EMAIL,
      subject: `Đơn hàng mới ${order.code} — ${order.customer.name}`,
      html: `
        <h2>Đơn hàng mới: ${order.code}</h2>
        <p><strong>Khách hàng:</strong> ${order.customer.name}</p>
        <p><strong>SĐT:</strong> ${order.customer.phone}</p>
        <p><strong>Email:</strong> ${order.customer.email}</p>
        <p><strong>Địa chỉ:</strong> ${order.customer.address}</p>
        <p><strong>Ghi chú:</strong> ${order.customer.note || "(không có)"}</p>
        <p><strong>Thanh toán:</strong> ${order.paymentMethod === "cod" ? "COD" : "Chuyển khoản"}</p>
        <table cellpadding="6" style="border-collapse:collapse;width:100%">
          ${itemsHtml}
          <tr><td>Phí ship</td><td style="text-align:right">${formatPrice(order.shippingFee)}</td></tr>
          ${order.shippingDiscount > 0 ? `<tr><td>Ưu đãi ship</td><td style="text-align:right">-${formatPrice(order.shippingDiscount)}</td></tr>` : ""}
          <tr><td><strong>Tổng cộng</strong></td><td style="text-align:right"><strong>${formatPrice(order.total)}</strong></td></tr>
        </table>
        <p>Xem chi tiết tại trang quản trị /admin/orders.</p>
      `,
    });
    return { sent: true as const };
  } catch (err) {
    console.error("[order-email] Gửi email thất bại:", err);
    return { sent: false as const };
  }
}
