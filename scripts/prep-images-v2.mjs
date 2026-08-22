import sharp from "sharp";
import path from "node:path";

const SRC = "D:/Claude website/CloudS Ảnh";
const OUT = "D:/Claude website/clouds-website/public/images";

async function conv(src, out, { width = 1600, quality = 84 } = {}) {
  await sharp(path.join(SRC, src))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(path.join(OUT, out));
}

async function run() {
  // ---------- HOME / SHARED POSTERS ----------
  await conv("Ảnh Poster/ChatGPT Image 17_47_27 21 thg 8, 2026.png", "home/hero-grand-opening.webp", { width: 2000, quality: 88 });
  await conv("Ảnh Poster/Lý do lựa chọn.png", "home/features-3-reasons.webp", { width: 2000, quality: 88 });
  await conv("Ảnh Poster/ChatGPT Image 16_22_00 21 thg 8, 2026.png", "home/policy-peace-of-mind.webp", { width: 1800, quality: 88 });

  // ---------- CLOUDSTRIDE 1 (men) ----------
  await conv("Ảnh Poster/Hoạt_động_của_Nam.png_202608191213.jpeg_2K_202608211551.jpeg", "cloudstride/hero-banner.webp", { width: 2000, quality: 86 });
  const csGallery = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
  for (let i = 0; i < csGallery.length; i++) {
    await conv(`Ảnh sản phẩm/Ảnh Sản Phẩm 1 - CloudStride 1/${csGallery[i]}`, `cloudstride/gallery-${i + 1}.webp`, { width: 1400, quality: 88 });
  }
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 1 - CloudStride 1/7.jpeg", "cloudstride/lifestyle-1.webp", { width: 1400 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 1 - CloudStride 1/8.jpeg", "cloudstride/lifestyle-2.webp", { width: 1400 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 1 - CloudStride 1/9.jpeg", "cloudstride/lifestyle-3.webp", { width: 1400 });
  await conv("Ảnh bổ sung/CloudStride1/ChatGPT_Image_23_14_17_21_thg_202608221226.jpeg", "cloudstride/lifestyle-4.webp", { width: 1400 });
  await conv("Ảnh bổ sung/CloudStride1/3.1.jpeg", "cloudstride/lifestyle-5.webp", { width: 1400 });

  // ---------- CLOUD MULE 1 — ROSE ----------
  await conv("Ảnh Poster/Hoạt_động_nữ_giày_hồng.png_202608201237.jpeg", "mule-rose/hero-banner.webp", { width: 2000, quality: 86 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 2 - Cloud Mule 1 Rose/1.jpeg", "mule-rose/gallery-1.webp", { width: 1400, quality: 88 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 2 - Cloud Mule 1 Rose/2.jpeg", "mule-rose/gallery-2.webp", { width: 1400, quality: 88 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 2 - Cloud Mule 1 Rose/3.jpeg", "mule-rose/gallery-3.webp", { width: 1400, quality: 88 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 2 - Cloud Mule 1 Rose/5.jpeg", "mule-rose/lifestyle-1.webp", { width: 1400 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 2 - Cloud Mule 1 Rose/6.jpeg", "mule-rose/lifestyle-2.webp", { width: 1400 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 2 - Cloud Mule 1 Rose/7.jpeg", "mule-rose/lifestyle-3.webp", { width: 1400 });
  await conv("Ảnh bổ sung/Ảnh Sản Phẩm 2 - Cloud Mule 1 Rose/Snap-Insta.to_621169963_18137132728491981_5222753202944481342_n.jpg_202608221213.jpeg", "mule-rose/lifestyle-4.webp", { width: 1400 });

  // ---------- CLOUD MULE 1 — VANILLA CREAM ----------
  await conv("Ảnh Poster/Hoạt_động_nữ_giày_trắng.png_202608191213.jpeg_2K_202608211550.jpeg", "mule-vanilla/hero-banner.webp", { width: 2000, quality: 86 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 3 - Cloud Mule 1 Vanilla Cream/2.jpeg", "mule-vanilla/gallery-1.webp", { width: 1400, quality: 88 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 3 - Cloud Mule 1 Vanilla Cream/3.jpeg", "mule-vanilla/gallery-2.webp", { width: 1400, quality: 88 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 3 - Cloud Mule 1 Vanilla Cream/4.jpeg", "mule-vanilla/gallery-3.webp", { width: 1400, quality: 88 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 3 - Cloud Mule 1 Vanilla Cream/Final 3.jpeg", "mule-vanilla/lifestyle-1.webp", { width: 1400 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 3 - Cloud Mule 1 Vanilla Cream/Final_5.jpeg_202608191213.jpeg", "mule-vanilla/lifestyle-2.webp", { width: 1400 });
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 3 - Cloud Mule 1 Vanilla Cream/Final_6.jpeg_202608191213.jpeg", "mule-vanilla/lifestyle-3.webp", { width: 1400 });

  console.log("Done v2.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
