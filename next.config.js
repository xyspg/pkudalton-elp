module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "zh", "ja"],
    defaultLocale: "zh",
    localeDetection: false,
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
  },};
