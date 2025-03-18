import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/dl8u2hb0x/image/upload/**",
            },
        ],
    },
};

export default nextConfig;
