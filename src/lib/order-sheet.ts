import type { Order } from "./orders-store";
import { formatPrice } from "./products";

// Google Form "CloudS - Theo doi don hang" — mỗi lần submit sẽ ghi 1 dòng vào Google Sheet
// phản hồi liên kết với form này. Không cần OAuth/service account vì Form nhận submit công khai.
const GOOGLE_FORM_ID = "1FAIpQLSeTzhRKB4c8YfNsDGePNmQrKXFmx5g3ZD0tyN8HtYW9CQVtbA";
const FORM_RESPONSE_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

// entry.* lấy từ input ẩn của form live — khớp đúng thứ tự câu hỏi đã tạo trong Google Form.
const ENTRY = {
  orderCode: "entry.568889385",
  customerName: "entry.763544874",
  phone: "entry.756217290",
  total: "entry.981408834",
  paymentMethod: "entry.365792066",
  address: "entry.339951282",
  note: "entry.1138264613",
  skuList: "entry.1869711418",
  email: "entry.1290051458",
} as const;

function skuListText(order: Order) {
  return order.items
    .map((item) => `${item.sku ?? `${item.slug}-${item.size}`} x${item.quantity}`)
    .join(", ");
}

// Ghi đơn hàng vào Google Sheet theo dõi — lỗi ở đây không được làm hỏng luồng đặt hàng của
// khách (đơn vẫn lưu ở /admin/orders dù bước này thất bại).
export async function submitOrderToSheet(order: Order) {
  try {
    const data = new URLSearchParams({
      [ENTRY.orderCode]: order.code,
      [ENTRY.customerName]: order.customer.name,
      [ENTRY.phone]: order.customer.phone,
      [ENTRY.total]: formatPrice(order.total),
      [ENTRY.paymentMethod]: order.paymentMethod === "cod" ? "COD" : "Chuyển khoản",
      [ENTRY.address]: order.customer.address,
      [ENTRY.note]: order.customer.note || "",
      [ENTRY.skuList]: skuListText(order),
      [ENTRY.email]: order.customer.email,
    });

    await fetch(FORM_RESPONSE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString(),
    });
  } catch (err) {
    console.error("[order-sheet] Ghi vào Google Sheet thất bại:", err);
  }
}
