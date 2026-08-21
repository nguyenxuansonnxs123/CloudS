# CloudS — Website chính thức

Website thương hiệu CloudS (giày thể thao & sneaker cho vận động hàng ngày), xây dựng bằng
[Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS v4). Trang web tập trung
giới thiệu thương hiệu và sản phẩm, dẫn khách hàng sang Shopee/TikTok Shop hoặc Zalo để đặt
hàng — CloudS hiện chưa có giỏ hàng/thanh toán riêng trên site.

## Cấu trúc dự án

```
src/
  app/                  Các trang (App Router) — mỗi thư mục là 1 route
    page.tsx            Trang chủ
    san-pham/           Danh sách & chi tiết sản phẩm
    ve-clouds/           Giới thiệu thương hiệu
    chinh-sach-doi-tra/  Chính sách đổi trả
    uu-dai-khai-truong/  Ưu đãi khai trương
    lien-he/             Liên hệ
  components/           Các component dùng chung (Header, Footer, Button, ProductCard...)
  lib/
    site-config.ts      *** Cấu hình trung tâm: link Shopee/TikTok, Zalo, social, domain ***
    products.ts         Dữ liệu 2 sản phẩm (giá, size, mô tả, ảnh)
public/images/          Ảnh sản phẩm & thương hiệu (đã tối ưu sang .webp)
scripts/prep-images.mjs  Script đã dùng để cắt/tối ưu ảnh gốc từ "CloudS Ảnh"
```

## Việc cần làm trước khi ra mắt chính thức

Mở [`src/lib/site-config.ts`](src/lib/site-config.ts) và điền các giá trị còn đánh dấu
`[ĐIỀN SAU]` / chuỗi rỗng `""`:

- `url` — tên miền thật sau khi trỏ DNS trên Hostinger
- `contact.zaloNumber` / `contact.zaloLink` — số Zalo/hotline CloudS
- `shops.shopee` / `shops.tiktok` — link gian hàng Shopee và TikTok Shop
- `social.threads` / `social.instagram` / `social.facebook` / `social.tiktok`
- `business.legalName` — tên công ty pháp lý (hiển thị ở footer)

Cho đến khi điền, các nút "Mua trên Shopee/TikTok" và social icon sẽ tự động dẫn về trang
Liên hệ thay vì link chết.

Ngoài ra, trang [Ưu đãi khai trương](src/app/uu-dai-khai-truong/page.tsx) chứa nội dung
khuyến mãi có giới hạn thời gian (tuần 20–26/8) — cập nhật hoặc gỡ phần giảm giá sau khi
chương trình kết thúc.

## Chạy thử ở máy local

Yêu cầu Node.js 20.9 trở lên.

```bash
npm install
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
VPS. Chọn 1 trong 2 cách sau.

### Cách 1 — Node.js App trên hPanel (đơn giản, khuyến nghị)

1. Vào **hPanel → Websites → chọn domain → Advanced → Node.js**.
2. Bấm **Create Application**, chọn phiên bản Node.js ≥ 20.9, đặt **Application root** là thư
   mục bạn sẽ deploy code vào (vd: `clouds-website`), **Application startup file** đặt là
   `node_modules/next/dist/bin/next` với **Application mode**: production.
3. Kết nối domain với Application root ở bước trên.
4. Đưa code lên server: dùng Git (hPanel có tính năng "Deploy from Git" — trỏ vào repo GitHub
   vừa tạo ở trên) hoặc upload qua File Manager/FTP.
5. Trong hPanel Node.js app, bấm **NPM Install** để cài dependencies, sau đó chạy **Run Script**
   với lệnh `build` (`npm run build`).
6. Đặt **Startup command**/**Application entrypoint** để chạy `npm run start` (hoặc file
   `node_modules/next/dist/bin/next` với argument `start`). Next.js tự đọc biến môi trường
   `PORT` mà Hostinger cấp — không cần chỉnh gì thêm.
7. Bấm **Restart** — Hostinger sẽ tự giữ ứng dụng chạy (tương đương một process manager).

### Cách 2 — VPS Hostinger + PM2

```bash
# Trên VPS, lần đầu deploy
git clone https://github.com/<username-github-cua-ban>/clouds-website.git
cd clouds-website
npm ci
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

## Cập nhật nội dung sau này

- **Sửa giá/size/mô tả sản phẩm**: sửa trực tiếp trong `src/lib/products.ts`.
- **Thêm sản phẩm mới**: thêm một object mới vào mảng `products` trong `src/lib/products.ts`
  và bỏ ảnh tương ứng vào `public/images/`.
- **Đổi ảnh**: thay file trong `public/images/` (giữ nguyên tên hoặc cập nhật đường dẫn trong
  `products.ts`). Nên dùng định dạng `.webp` để trang tải nhanh.
- **Sửa chính sách/nội dung tĩnh**: sửa trực tiếp trong các file `page.tsx` tương ứng ở
  `src/app/`.
