# CloudS — Website chính thức

Website thương hiệu CloudS (giày thể thao & sneaker cho vận động hàng ngày), xây dựng bằng
[Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS v4). Khách hàng có thể mua
trực tiếp trên web (giỏ hàng → thanh toán COD hoặc chuyển khoản QR) hoặc qua Shopee/TikTok Shop.

## Cấu trúc dự án

```
src/
  app/
    page.tsx                    Trang chủ
    san-pham/                   Danh sách & chi tiết sản phẩm (thêm vào giỏ, mua ngay)
    gio-hang/                   Giỏ hàng
    thanh-toan/                 Form checkout (thông tin nhận hàng + phương thức thanh toán)
    dat-hang-thanh-cong/[id]/   Xác nhận đơn hàng + mã QR chuyển khoản (nếu chọn bank transfer)
    admin/orders/               Trang quản trị đơn hàng (có mật khẩu — xem bên dưới)
    admin/login/                Đăng nhập quản trị
    api/orders/                 API tạo đơn hàng (validate + tính giá lại từ server)
    api/admin/                  API đăng nhập/đăng xuất/đổi trạng thái đơn
    ve-clouds/                  Giới thiệu thương hiệu
    chinh-sach-doi-tra/         Chính sách đổi trả — Chế độ An Tâm Mua Sắm
    uu-dai/                     Ưu đãi (khai trương + ưu đãi dài hạn)
    lien-he/                    Liên hệ
  components/                   Header, Footer, ProductCard, AddToCartForm, CartProvider...
  lib/
    site-config.ts              *** Cấu hình trung tâm: Shopee/TikTok, Zalo, bank QR, phí ship ***
    products.ts                 Dữ liệu sản phẩm (CloudStride 1, Cloud Mule 1 Rose/Vanilla Cream)
    orders-store.ts             Lưu đơn hàng vào data/orders.json (server-side, không có DB ngoài)
    order-email.ts              Gửi email báo đơn hàng mới (SMTP, tuỳ chọn)
    admin-auth.ts                Xác thực phiên đăng nhập trang quản trị
  proxy.ts                      Bảo vệ /admin/* — chặn nếu chưa đăng nhập
data/orders.json                Toàn bộ đơn hàng (tự tạo khi có đơn đầu tiên — KHÔNG commit git)
public/images/                  Ảnh sản phẩm & thương hiệu (đã tối ưu sang .webp)
scripts/prep-images-v3.mjs      Script gần nhất dùng để xử lý ảnh gốc từ "CloudS Ảnh"
```

## Việc cần làm trước khi ra mắt chính thức

### 1. `src/lib/site-config.ts`

Điền các giá trị còn đánh dấu `[ĐIỀN SAU]` / chuỗi rỗng `""`:

- `url` — tên miền thật sau khi trỏ DNS trên Hostinger
- `contact.zaloNumber` / `contact.zaloLink` — số Zalo/hotline CloudS
- `shops.shopee` / `shops.tiktok` — link gian hàng Shopee và TikTok Shop
- `social.threads` / `social.instagram` / `social.facebook` / `social.tiktok`
- `business.legalName` — tên công ty pháp lý (hiển thị ở footer)
- `bank.bin` / `bank.accountNumber` / `bank.accountName` — **bắt buộc để nút "Chuyển khoản
  ngân hàng" hiện được mã QR**. Tra mã BIN ngân hàng tại https://api.vietqr.io/v2/banks (ví dụ
  Vietcombank = `970436`, Techcombank = `970407`, ACB = `970416`...). `accountName` viết KHÔNG
  DẤU, in hoa, đúng như trên tài khoản ngân hàng.
- `shippingFee` — phí ship cố định 35.000đ/đơn (mức giảm giá thực tế do voucher quyết định,
  xem mục Voucher bên dưới).

### Voucher (`src/lib/vouchers.ts`)

Khách nhập mã ở mục "Voucher" trong giỏ hàng/checkout. Hiện có 1 voucher `FREESHIP` với
`autoApply: true` — tự động áp dụng cho mọi đơn, khách không cần nhập, không thể gỡ. Khi hết
chương trình khai trương, xoá voucher này (hoặc đổi `autoApply` thành `false`) khỏi mảng
`vouchers`. Thêm voucher mới bằng cách thêm object vào mảng này — mã giảm giá luôn được **xác
thực và tính lại ở server** (`/api/orders`), không tin dữ liệu từ trình duyệt.

### Địa chỉ (Tỉnh/Thành phố — Phường/Xã)

Form checkout dùng dữ liệu hành chính Việt Nam sau sáp nhập 1/7/2025 (2 cấp, không còn quận/
huyện), lấy từ [provinces.open-api.vn](https://provinces.open-api.vn) và đã lưu tĩnh tại
`public/data/vn-address.json` (không gọi API ngoài lúc chạy). Nếu sau này có thay đổi địa giới
hành chính, chạy lại script tương tự trong lịch sử commit để cập nhật file này.

Cho đến khi điền, nút "Mua trên Shopee/TikTok" và social icon tự dẫn về trang Liên hệ; đơn
chuyển khoản chưa có QR sẽ hiển thị "CloudS sẽ gửi thông tin chuyển khoản sau" thay vì lỗi.

### 2. Biến môi trường (bắt buộc để dùng giỏ hàng/trang quản trị)

Sao chép [`.env.example`](.env.example) thành `.env.local` (chạy local) hoặc khai báo trực tiếp
trong hPanel (Node.js App → Environment Variables) khi deploy:

| Biến | Bắt buộc | Mô tả |
|---|---|---|
| `ADMIN_PASSWORD` | Có | Mật khẩu đăng nhập `/admin/orders`. Không đặt thì trang quản trị sẽ luôn từ chối đăng nhập. |
| `ADMIN_SESSION_SECRET` | Có (production) | Chuỗi ngẫu nhiên dài, dùng ký phiên đăng nhập. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `ORDER_NOTIFICATION_EMAIL` | Không | Nếu điền đủ, mỗi đơn hàng mới sẽ gửi email báo về `ORDER_NOTIFICATION_EMAIL`. Có thể dùng Gmail + [Mật khẩu ứng dụng](https://myaccount.google.com/apppasswords). Nếu bỏ trống, đơn hàng vẫn được lưu bình thường ở `/admin/orders`, chỉ là không gửi email. |

### 3. Trang Ưu đãi

Trang [Ưu đãi](src/app/uu-dai/page.tsx) có khối "Đang diễn ra" chứa nội dung khuyến mãi có giới
hạn thời gian (tuần 20–26/8) — gỡ hoặc cập nhật sau khi chương trình khai trương kết thúc.

## Quản lý đơn hàng

- Xem đơn tại `/admin/orders` (đăng nhập bằng `ADMIN_PASSWORD`).
- Đơn hàng lưu trong `data/orders.json` trên server — **đây là dữ liệu thật, không nằm trong
  git**. Nên sao lưu định kỳ file này (tải về qua File Manager/FTP) để không mất dữ liệu khi
  deploy lại hoặc đổi server.
- Giá tiền luôn được **tính lại từ server** dựa trên `products.ts` khi tạo đơn — dữ liệu giá
  gửi từ trình duyệt không được tin tưởng, tránh gian lận giá.

## Chạy thử ở máy local

Yêu cầu Node.js 20.9 trở lên.

```bash
npm install
cp .env.example .env.local   # rồi điền ADMIN_PASSWORD để test trang quản trị
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

Kiểm tra build production trước khi deploy:

```bash
npm run build
npm run start
```

## Đưa code lên GitHub

```bash
cd "clouds-website"
git init
git add .
git commit -m "Khởi tạo website CloudS"
```

Sau đó vào [github.com/new](https://github.com/new), tạo một repository **rỗng** (không tick
"Add README") tên ví dụ `clouds-website`, rồi chạy:

```bash
git remote add origin https://github.com/<username-github-cua-ban>/clouds-website.git
git branch -M main
git push -u origin main
```

## Deploy lên Hostinger

Hostinger hỗ trợ chạy ứng dụng Node.js thật qua hPanel (gói Business/Cloud trở lên) hoặc qua
VPS. Chọn 1 trong 2 cách sau. **Nhớ khai báo biến môi trường ở mục 2 phía trên** trước khi chạy
thật, nếu không giỏ hàng/trang quản trị sẽ không hoạt động đầy đủ.

> **Lưu ý nền tảng (đã gặp thực tế)**: hạ tầng Node.js App của hPanel dùng glibc cũ hơn mức
> Next.js 16 cần cho binary gốc (native) của Turbopack/SWC, nên `next build` mặc định (Turbopack)
> sẽ báo lỗi kiểu `GLIBC_2.29' not found` rồi `Turbopack is not supported on this platform`. Vì
> vậy script `build` trong `package.json` đã cố định dùng `next build --webpack` (webpack vẫn
> chạy được qua SWC bản WASM dự phòng). Không cần chỉnh gì thêm, chỉ cần biết lý do nếu thấy build
> log nhắc tới Turbopack/GLIBC. `next.config.ts` cũng được đổi thành `next.config.mjs` (JavaScript
> thuần) vì bản TypeScript cần SWC để đọc, dễ lỗi thêm ở đúng bước nạp config trên nền tảng này.

### Cách 1 — Node.js App trên hPanel (đơn giản, khuyến nghị)

1. Vào **hPanel → Websites → chọn domain → Advanced → Node.js**.
2. Bấm **Create Application**, chọn phiên bản Node.js ≥ 20.9, đặt **Application root** là thư
   mục bạn sẽ deploy code vào (vd: `clouds-website`), **Application startup file** đặt là
   `node_modules/next/dist/bin/next` với **Application mode**: production.
3. Trong mục **Environment Variables**, thêm `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, và các
   biến SMTP nếu dùng.
4. Kết nối domain với Application root ở bước trên.
5. Đưa code lên server: dùng Git (hPanel có tính năng "Deploy from Git" — trỏ vào repo GitHub
   vừa tạo ở trên) hoặc upload qua File Manager/FTP.
6. Trong hPanel Node.js app, bấm **NPM Install** để cài dependencies, sau đó chạy **Run Script**
   với lệnh `build` (`npm run build`).
7. Đặt **Startup command**/**Application entrypoint** để chạy `npm run start` (hoặc file
   `node_modules/next/dist/bin/next` với argument `start`). Next.js tự đọc biến môi trường
   `PORT` mà Hostinger cấp — không cần chỉnh gì thêm.
8. Bấm **Restart** — Hostinger sẽ tự giữ ứng dụng chạy (tương đương một process manager).

> **Lưu ý CDN cache (đã gặp thực tế)**: Hostinger tự bật một lớp CDN (`hcdn`) phía trước domain,
> cache HTML tới 1 năm (`Cache-Control: s-maxage=31536000`) và **không tự xoá khi deploy code
> mới** — sau khi build xong vẫn có thể thấy bản cũ trên `https://<domain>/`. Vào **hPanel →
> Websites → chọn domain → Hiệu suất → CDN → Xóa bộ nhớ đệm** sau mỗi lần deploy có thay đổi
> hiển thị (đổi text, ảnh, style...) để chắc chắn khách thấy bản mới ngay. Có thể kiểm tra
> nhanh bằng `curl -sD - https://<domain>/ | grep -i "x-hcdn-cache-status\|age:"` — nếu thấy
> `HIT` kèm `age` lớn thì đang dính cache cũ.

### Cách 2 — VPS Hostinger + PM2

```bash
# Trên VPS, lần đầu deploy
git clone https://github.com/<username-github-cua-ban>/clouds-website.git
cd clouds-website
npm ci
cp .env.example .env.local   # rồi điền giá trị thật — KHÔNG commit file này
npm run build
npm install -g pm2   # nếu chưa có PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup          # để PM2 tự khởi động cùng server
```

Cấu hình Nginx/reverse proxy trỏ domain vào cổng 3000 (đã khai báo sẵn trong
`ecosystem.config.js`), hoặc đổi biến `PORT` nếu Hostinger yêu cầu cổng khác.

Từ lần deploy sau, mỗi khi có thay đổi:

```bash
git pull
npm ci
npm run build
pm2 restart clouds-website
```

`data/orders.json` nằm ngoài git nên sẽ **không bị mất** khi `git pull` — chỉ cần không xoá thư
mục `data/` trên server.

## Cập nhật nội dung sau này

- **Sửa giá/size/mô tả sản phẩm**: sửa trực tiếp trong `src/lib/products.ts`.
- **Thêm sản phẩm mới**: thêm một object mới vào mảng `products` trong `src/lib/products.ts`
  và bỏ ảnh tương ứng vào `public/images/`.
- **Đổi ảnh**: thay file trong `public/images/` (giữ nguyên tên hoặc cập nhật đường dẫn trong
  `products.ts`). Nên dùng định dạng `.webp` để trang tải nhanh. Nếu thay ảnh cùng tên file lúc
  server đang chạy mà không thấy cập nhật, xoá thư mục cache `.next/dev/cache/images` (local)
  hoặc khởi động lại ứng dụng (production) rồi tải lại trang.
- **Sửa chính sách/nội dung tĩnh**: sửa trực tiếp trong các file `page.tsx` tương ứng ở
  `src/app/`.
- **Đổi phí ship**: sửa `shippingFee` trong `src/lib/site-config.ts`.
- **Tắt voucher freeship / thêm voucher mới**: sửa mảng `vouchers` trong `src/lib/vouchers.ts`.
