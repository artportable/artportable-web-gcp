const { i18n } = require('./next-i18next.config')
module.exports = {
  images: {
    domains: ['artportable-images.s3.eu-north-1.amazonaws.com'],
  },
  i18n,
  async rewrites() {
    return [
      {
        // match anything that does not contain @ and redirect to 404
        // TODO: Fix so that only valid characters work and that the @ is missing at the start of the string
        // https://github.com/vercel/next.js/issues/23741
        source: '/:username([^@]{1,}$)',
        destination: '/404', // Matched parameters can be used in the destination /[^@]{1,}$/
      },
    ]
  },
}
