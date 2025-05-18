const { i18n } = require("./next-i18next.config");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains:
      process.env.NODE_ENV === "production"
        ? [
            "artportabletest.blob.core.windows.net",
            "artportableprod.blob.core.windows.net",
          ]
        : [],
    loader: "default",
  },
  i18n,
  async rewrites() {
    return [
      {
        source: "/profile/:username([^@]{1,}$)",
        destination: "/404",
      },
      {
        source: "/sv/:path*",
        destination: "/:path*",
        locale: false,
      },
    ];
  },
});
