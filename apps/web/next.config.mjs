const isPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isPages ? "/state-kit" : "",
  assetPrefix: isPages ? "/state-kit/" : "",
  images: { unoptimized: true },
};

export default nextConfig;
