import getRoutes from 'react-storefront/server/getRoutes'
import fs from 'fs'
import path from 'path'

export default function routes(req, res) {
  try {
    const manifest = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), '.next', 'server', 'pages-manifest.json'), 'utf-8')
    )
    res.end(JSON.stringify(getRoutes(manifest)))
  } catch (e) {
    console.error(e)
    res.end('{}')
  }
}
