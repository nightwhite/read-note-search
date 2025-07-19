import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI开发脚手架",
    short_name: "AI脚手架",
    description: "基于 Next.js 15 + React 19 + TypeScript 的现代化前端开发脚手架",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    categories: ["developer-tools", "productivity"],
  }
}
