// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (pathname === '/service-worker.js') {
      app.serveStatic(req, res, path.join(__dirname, '.next', 'service-worker.js'))
    } else if (pathname === '/pages-manifest.json') {
      app.serveStatic(req, res, path.join(__dirname, '.next', 'server', 'pages-manifest.json'))
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})

const ServiceWorker = app => (req, res) => {
  const filePath = join(__dirname, '../', '.next', 'service-worker.js')
}
