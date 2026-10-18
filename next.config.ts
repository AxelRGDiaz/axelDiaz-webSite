import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  experimental: {
    optimizeCss: true,
  },
  // Las rutas del diseño anterior ahora son secciones de la página principal
  async redirects() {
    return [
      { source: "/projects", destination: "/#misiones", permanent: true },
      { source: "/projects/mobysuite-features", destination: "/#historia", permanent: true },
      { source: "/career", destination: "/#historia", permanent: true },
      { source: "/lab", destination: "/#inventario", permanent: true },
      { source: "/contact", destination: "/#guardar", permanent: true },
      { source: "/cv", destination: "/cv.pdf", permanent: true },
    ]
  },
}

export default nextConfig
