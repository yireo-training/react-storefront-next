import React, { forwardRef, useContext, useEffect, useRef } from 'react'
import NextLink from 'next/link'
import PWAContext from './PWAContext'
import PropTypes from 'prop-types'
import useIntersectionObserver from './hooks/useIntersectionObserver'
import { prefetch as doPrefetch } from './serviceWorker'

/**
 * Use this component for all Links in your React Storefront app.  You can
 * pass props to display on the next page while data is loading from the server
 * using the `skeletonProps` prop. This component accepts all props that would
 * normally be passed to a Next.js `Link` component.
 *
 * Example:
 *
 * ```js
 *  <Link
 *    href="/p/[productId]"
 *    as="/p/1"
 *    skeletonProps={{
 *      product: {
 *        id: '1',
 *        name: 'Product 1'
 *      }
 *    }}
 *  >
 *    Product 1
 *  </Link>
 * ```
 */
const Link = forwardRef(function(props, ref) {
  const { as, href, prefetch, skeletonProps, onClick, anchorProps, ...other } = props
  const internalRef = useRef(null)
  const app = useContext(PWAContext)

  ref = ref || internalRef

  function handleClick(...args) {
    if (onClick) {
      onClick(...args)
    }
    app.skeletonProps = skeletonProps
  }

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

  return (
    <NextLink href={href} prefetch={false} as={as}>
      <a ref={ref} {...other} onClick={handleClick} />
    </NextLink>
  )
})

Link.propTypes = {
  /**
   * Props to pass to the next component being rendered.  These are generally displayed
   * in the skeleton while data is being fetched from the server.
   */
  skeletonProps: PropTypes.object
}

export default Link
