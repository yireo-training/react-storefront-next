import React, { forwardRef, useContext, useRef, useEffect } from 'react'
import NextLink from 'next/link'
import LinkContext from './LinkContext'
import PropTypes from 'prop-types'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import { prefetch as doPrefetch } from '../serviceWorker'
import withDefaultHandler from '../utils/withDefaultHandler'

/**
 * Use this component for all Links in your React Storefront app.  You can
 * pass props to display on the next page while data is loading from the server
 * using the `pageData` prop. This component accepts all props that would
 * normally be passed to a Next.js `Link` component.  All other props are spread
 * to the underlying HTML anchor element.
 *
 * Example:
 *
 * ```js
 * import Link from 'react-storefront/link/Link'
 *
 * <Link href="/p/[productId]" as={`/p/${product.id}`} pageData={{ product }}>
 *   {product.name}
 * </Link>
 * ```
 */
const Link = forwardRef(function(props, ref) {
  const { as, href, prefetch, pageData, onClick, anchorProps, ...other } = props
  const internalRef = useRef(null)
  const linkPageData = useContext(LinkContext)

  ref = ref || internalRef

  const handleClick = withDefaultHandler(onClick, () => {
    if (linkPageData) {
      linkPageData.current = pageData
    }
  })

  useIntersectionObserver(
    () => (as && prefetch === 'visible' ? ref : null),
    (visible, disconnect) => {
      if (visible) {
        disconnect()
        doPrefetch(`/api${as}`)
      }
    },
    [as, prefetch]
  )

  useEffect(() => {
    if (prefetch === 'always') {
      doPrefetch(`/api${as}`)
    }
  }, [as])

  return (
    <NextLink href={href} prefetch={false} as={as}>
      <a ref={ref} {...other} onClick={handleClick} />
    </NextLink>
  )
})

Link.propTypes = {
  /**
   * The URL path for the underlying anchor element's href.  This is required for dynamic routes.
   */
  as: PropTypes.string,

  /**
   * The next.js route pattern
   */
  href: PropTypes.string.isRequired,

  /**
   * Set to `visible` to prefetch the JSON data for the destination page component when the link
   * is scrolled into the viewport.  Set to `always` to prefetch the data immediately. Set to
   * `false` to never prefetch.
   */
  prefetch: PropTypes.oneOf(['always', 'visible', false]),

  /**
   * Data to be added to the `pageData` key returned by `react-storefront/hooks/useLazyStore` in the
   * destination page component.  Use this to display partial data in the skeleton while the full dataset
   * is fetched from the server.
   */
  pageData: PropTypes.object
}

export default Link
