import sharp from "sharp";
import path from "node:path";

const SRC = "D:/Claude website/CloudS Ảnh";
const OUT = "D:/Claude website/clouds-website/public/images";

async function conv(src, out, { width = 1400, quality = 86 } = {}) {
  await sharp(path.join(SRC, src))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(path.join(OUT, out));
}

async function run() {
  // ---------- CLOUDSTRIDE — new white-bg model shot into gallery, new lifestyle ----------
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 1 - CloudStride 1/7.jpeg", "cloudstride/gallery-model.webp");
  await conv("Ảnh bổ sung/CloudStride1/Final 1.1.jpeg", "cloudstride/lifestyle-6.webp");
  await conv("Ảnh bổ sung/CloudStride1/Final 2.1.jpeg", "cloudstride/lifestyle-7.webp");

  // ---------- MULE ROSE — new white-bg model shots into gallery, new lifestyle ----------
  await conv("Ảnh bổ sung/Ảnh Sản Phẩm 2 - Cloud Mule 1 Rose/image.png_202608221214.jpeg", "mule-rose/gallery-model-1.webp");
  await conv("Ảnh bổ sung/Ảnh Sản Phẩm 2 - Cloud Mule 1 Rose/image.png_202608221214 (1).jpeg", "mule-rose/gallery-model-2.webp");
  await conv("Ảnh bổ sung/Ảnh Sản Phẩm 2 - Cloud Mule 1 Rose/image.png_202608221219.jpeg", "mule-rose/gallery-model-3.webp");
  await conv("Ảnh bổ sung/Ảnh Sản Phẩm 2 - Cloud Mule 1 Rose/image.png_202608221118.jpeg", "mule-rose/lifestyle-5.webp");
  await conv("Ảnh bổ sung/Ảnh Sản Phẩm 2 - Cloud Mule 1 Rose/5.jpeg", "mule-rose/lifestyle-6.webp");

  // ---------- MULE VANILLA — move white-bg shot into gallery, add real-bg lifestyle ----------
  await conv("Ảnh sản phẩm/Ảnh Sản Phẩm 3 - Cloud Mule 1 Vanilla Cream/Final 3.jpeg", "mule-vanilla/gallery-model.webp");
  await conv("Ảnh bổ sung/Ảnh Sản Phẩm 3 - Cloud Mule 1 Vanilla Cream/Final 1.jpeg", "mule-vanilla/lifestyle-4.webp");
  await conv("Ảnh bổ sung/Ảnh Sản Phẩm 3 - Cloud Mule 1 Vanilla Cream/Final 5.jpeg", "mule-vanilla/lifestyle-5.webp");
  await conv("Ảnh bổ sung/Ảnh Sản Phẩm 3 - Cloud Mule 1 Vanilla Cream/Final 6.jpeg", "mule-vanilla/lifestyle-6.webp");

  console.log("Done v3.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
