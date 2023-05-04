module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "zh", "ja"],
    defaultLocale: "zh",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_HOST,
        port: '',
        pathname: '/**',
      },
    ],
  },
};
