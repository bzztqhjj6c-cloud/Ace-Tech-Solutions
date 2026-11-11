import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.90"],
  serverExternalPackages: ["sanity", "@sanity/vision", "@sanity/icons"],
  // Lettertypen en logo voor de deelafbeeldingen (opengraph-image) meeleveren.
  outputFileTracingIncludes: {
    "/**": ["./src/assets/fonts/**", "./public/ace-flex-solutions-header-transparant.svg"],
  },
  experimental: {
    serverActions: {
      // Ruimte voor een cv van max. 4 MB bij een sollicitatie (plus formulierdata).
      // Vercel accepteert verzoeken tot 4,5 MB, dus hoger heeft geen zin.
      bodySizeLimit: "4.5mb",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
