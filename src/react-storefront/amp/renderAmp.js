import cheerio from 'cheerio'
import ReactDOMServer from 'react-dom/server'

export default async function renderAmp(document) {
  // $('img').attr({ height: '64', width: '64' })
  // document.html = $('body').html()

  console.log('head', head)

  const $ = cheerio.load(document.html)

  // Add ⚡ to html
  $('html').attr('⚡', '')

  // remove default css rendering
  $('#ssr-css').remove()

  $('*[amp-bind]').each((i, el) => {
    const $el = $(el)
    const expressions = $el.attr('amp-bind').split(/,\s*/)

    for (let expression of expressions) {
      const [name, value] = expression.split('=>')
      $el.attr(`[${name}]`, value)
    }

    $el.removeAttr('amp-bind')
  })

  $('img').each((i, img) => {
    const $img = $(img)
    const $ampImg = $('<amp-img layout="intrinsic"></amp-img>')

    if ($img.attr('src')) $ampImg.attr('src', $img.attr('src'))
    if ($img.attr('alt')) $ampImg.attr('alt', $img.attr('alt'))
    if ($img.attr('height')) $ampImg.attr('height', $img.attr('height'))
    if ($img.attr('width')) $ampImg.attr('width', $img.attr('width'))
    if ($img.attr('data-height')) $ampImg.attr('height', $img.attr('data-height'))
    if ($img.attr('data-width')) $ampImg.attr('width', $img.attr('data-width'))

    for (let name in img.attribs) {
      if (name.startsWith('data-amp-')) {
        $ampImg.attr(name.replace(/^data-amp-/, ''), img.attribs[name])
      }
    }

    $img.replaceWith($ampImg)
  })

  // replace attr="true" with attr
  $('*').each((i, el) => {
    const $el = $(el)
    for (let name in el.attribs) {
      const value = el.attribs[name]
      if (value === 'true') {
        $el.attr(name, '')
      }
    }
  })

  // remove focusable attribute on all svg elements
  $('svg[focusable]').removeAttr('focusable')
  $('svg[xlink]').removeAttr('xlink')

  // material-ui puts this on tab underlines
  $('div[direction]').removeAttr('direction')

  // move amp-sidebar into direct child of body
  const sidebar = $('amp-sidebar').get()
  if (sidebar) {
    $(sidebar).remove()
    $('body').append(sidebar)
  }

  let styleId = 0
  const inlineStyles = new Map()

  // move all inline styles to classes in the main style tag
  $('*[style]').each((i, el) => {
    const $el = $(el)
    const style = $el.attr('style')
    let className = inlineStyles.get(style)

    if (!className) {
      className = `mi${styleId++}`
      inlineStyles.set(style, className)
      //styles.push(`.${className} {${style}}`)
    }
    $el.removeAttr('style')
    $el.addClass(className)
  })

  document.html = $.html()

  document.head.push(
    <meta
      key={'amp-google-client-id-api'}
      name="amp-google-client-id-api"
      content="googleanalytics"
    />,
    <script
      async
      custom-element="amp-analytics"
      src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
    />
  )

  return document
}
