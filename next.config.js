const { i18n } = require("./next-i18next.config");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
// const signUpRedirect = process.env.REDIRECT_TO_SIGN_UP
module.exports = withBundleAnalyzer({
  typescript: {
    ignoreBuildErrors: true,
  },
  // Fix to reload page after upgrade account
  // async redirects() {
  //   return [
  //     {
  //       source: '/register',
  //       destination: signUpRedirect,
  //       permanent: true,
  //     },

  //   ]
  // },

  images: {
    domains: [
      "artportabletest.blob.core.windows.net",
      "artportableprod.blob.core.windows.net",
      "artportabletest-cdn.azureedge.net",
      "artportableprod-azurecdn.azureedge.net",
      "images.artworksapp.com",
      "artportable-cdn-edhmaucaccbngbgu.z01.azurefd.net",
    ],
  },
  i18n,
  async rewrites() {
    return [
      {
        // match anything that does not contain @ and redirect to 404
        // TODO: Fix so that only valid characters work and that the @ is missing at the start of the string
        // https://github.com/vercel/next.js/issues/23741
        source: "/profile/:username([^@]{1,}$)",
        destination: "/404", // Matched parameters can be used in the destination /[^@]{1,}$/
      },
      {
        source: "/sv/:path*",
        destination: "/:path*",
        locale: false,
      },
    ];
  },
});
