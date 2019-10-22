import cheerio from 'cheerio'
import ReactDOMServer from 'react-dom/server'

export default async function renderAmp(document) {
  const head = ReactDOMServer.renderToString(document.head)

  console.log('head', head)

  const $ = cheerio.load(document.html)
  // $('img').attr({ height: '64', width: '64' })
  document.html = $('body').html()
  document.head = <head dangerouslySetInnerHtml={{ _html: head }} />

  return document
}
