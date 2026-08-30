import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { products } from "@/lib/products";
import { newsPosts } from "@/lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/san-pham",
    "/ve-clouds",
    "/uu-dai",
    "/ctv",
    "/tin-tuc",
    "/chinh-sach-doi-tra",
    "/lien-he",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteConfig.url}/san-pham/${p.slug}`,
    lastModified: new Date(),
  }));

  const newsRoutes = newsPosts.map((p) => ({
    url: `${siteConfig.url}/tin-tuc/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...productRoutes, ...newsRoutes];
}
