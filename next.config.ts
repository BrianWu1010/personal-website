import type { NextConfig } from "next";
import { profile } from "./src/data/resume";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: profile.resumePdf, destination: profile.resumePdfSource }];
  },
};

export default nextConfig;
