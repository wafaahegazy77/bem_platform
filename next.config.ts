import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    reactCompiler: true,
    trailingSlash: true,

    experimental: {
        cpus: 1,
    },

    images: {
        unoptimized: true,
    },
};

export default withNextIntl(nextConfig);