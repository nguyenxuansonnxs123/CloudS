import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const SRC = "D:/Claude website/CloudS Ảnh";
const OUT = "D:/Claude website/clouds-website/public/images";

async function meta(file) {
  const m = await sharp(file).metadata();
  console.log(file, m.width, m.height);
  return m;
}

async function run() {
  // --- MEN ---
  // Hero banner "TU SANG DEN CUOI NGAY" - use as-is, just re-encode to webp, capped width
  await sharp(path.join(SRC, "Hoạt_động_của_Nam.png_202608191213.jpeg"))
    .resize({ width: 2000, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, "men/hero-banner.webp"));

  // Running man lifestyle (branded tank+shorts) - as-is
  await sharp(path.join(SRC, "CLSV1/With_big_summer_races_in_202607221624.jpeg"))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, "men/lifestyle-running.webp"));

  // Detail grid 1 (den ngoai / than giay) - as-is, full canvas
  const d1 = await meta(path.join(SRC, "CLSV1/vn-11134207-81ztc-mp7cx1gz92ioa9.webp_2K_202607221234.jpeg"));
  await sharp(path.join(SRC, "CLSV1/vn-11134207-81ztc-mp7cx1gz92ioa9.webp_2K_202607221234.jpeg"))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, "men/detail-sole-upper.webp"));

  // Crop just the clean floating shoe (top-right area, no text) from d1 for an isolated product shot
  // d1 canvas ~2048x2048; floating shoe occupies roughly x:1000-2048 y:0-950
  await sharp(path.join(SRC, "CLSV1/vn-11134207-81ztc-mp7cx1gz92ioa9.webp_2K_202607221234.jpeg"))
    .extract({ left: Math.round(d1.width * 0.49), top: 0, width: Math.round(d1.width * 0.51), height: Math.round(d1.height * 0.47) })
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(path.join(OUT, "men/product-isolated-1.webp"));

  // Detail grid 2 (de giay / chat lieu upper / lot giay eva / phong cach) - as-is
  await sharp(path.join(SRC, "CLSV1/vn-11134207-820l4-mhvno8waj9c8a7.webp_2K_202607221510.jpeg"))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, "men/detail-features.webp"));

  // Shopee ad card - crop the left "walking model" panel (clean lifestyle photo, rounded rect inset)
  const ad = await meta(path.join(SRC, "CLSV1/Shopee_advertisement_shoes_replace_2K_202607221601.jpeg"));
  await sharp(path.join(SRC, "CLSV1/Shopee_advertisement_shoes_replace_2K_202607221601.jpeg"))
    .extract({ left: Math.round(ad.width * 0.06), top: Math.round(ad.height * 0.185), width: Math.round(ad.width * 0.47), height: Math.round(ad.height * 0.72) })
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, "men/lifestyle-walking.webp"));

  // Full ad card (with badges) - keep as-is too, useful for promo sections
  await sharp(path.join(SRC, "CLSV1/Shopee_advertisement_shoes_replace_2K_202607221601.jpeg"))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, "men/ad-card-full.webp"));

  // --- WOMEN ---
  await sharp(path.join(SRC, "CLSV2/image.png_2K_202608151725.jpeg"))
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, "women/lifestyle-leg.webp"));

  await sharp(path.join(SRC, "CLSV2/giay-mule-trang-shopee-900x900.png_2K_202608152320.jpeg"))
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(path.join(OUT, "women/product-pair-1.webp"));

  await sharp(path.join(SRC, "CLSV2/giay-hong-shopee-900x900.png_202608181613.jpeg"))
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(path.join(OUT, "women/product-pair-2.webp"));

  await sharp(path.join(SRC, "CLSV2/image.png_202608181612.jpeg"))
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(path.join(OUT, "women/product-pair-3.webp"));

  console.log("Done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
