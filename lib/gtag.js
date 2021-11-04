export const GA_TRACKING_ID = 'G-7N46RQM0SC'

//https://developers.google.com/analytics/devguids/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

//https://developers.google.com/analytics/devguids/collection/gtagjs/pages
export const event = ({ action, category, label, value}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}