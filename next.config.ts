import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    //dizendo que essa url é confiavel, pois é daonde esta vindo a imagem do restaurant fsw
    remotePatterns: [{ hostname: "u9a6wmr3as.ufs.sh" }],
  },
};

export default nextConfig;
