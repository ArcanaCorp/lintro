/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    allowedDevOrigins: [
        "192.168.18.10"
    ],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ui-avatars.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "bqysvpbbnwbcwyalahqi.supabase.co",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
