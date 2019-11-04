[
  { pattern: /^_error(?:\/)?$/i, page: require('../.next/serverless/_error.js').default },
  { pattern: /^api\/p\/([^\/]+?)(?:\/)?$/i, page: require('../.next/serverless/api/p/[productId].js').default },
  { pattern: /^api\/p\/images(?:\/)?$/i, page: require('../.next/serverless/api/p/images.js').default },
  { pattern: /^api\/routes(?:\/)?$/i, page: require('../.next/serverless/api/routes.js').default },
  { pattern: /^api\/s\/([^\/]+?)(?:\/)?$/i, page: require('../.next/serverless/api/s/[subcategoryId].js').default },
  { pattern: /^api\/search(?:\/)?$/i, page: require('../.next/serverless/api/search.js').default },
  { pattern: /^api\/suggestions(?:\/)?$/i, page: require('../.next/serverless/api/suggestions.js').default },
  { pattern: /^appShell(?:\/)?$/i, page: require('../.next/serverless/appShell.js').default },
  { pattern: /^index(?:\/)?$/i, page: require('../.next/serverless/index.js').default },
  { pattern: /^p\/([^\/]+?)(?:\/)?$/i, page: require('../.next/serverless/p/[productId].js').default },
  { pattern: /^s\/([^\/]+?)(?:\/)?$/i, page: require('../.next/serverless/s/[subcategoryId].js').default }
]
