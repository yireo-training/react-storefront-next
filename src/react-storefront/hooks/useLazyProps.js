import { useEffect, useState, useContext } from 'react'
import PWAContext from '../PWAContext'

/**
 * Creates an observable store with an `update(data)` method that can be used
 * to update multiple properties at once.
 * @param {Object} props The pageProps, which may have a `lazy` promise that resolves to the final props
 * @param {Function} render A function to render page content.  The function will be called first with any skeletonProps
 *  defined on the `Link` that was clicked, then called again once the final props are fetched from the server
 *
 * Example:
 *
 * ```js
 *  function Product(props) {
 *    return useLazyProps(props, ({ loading, props: { product } }) => {
 *      return (
 *        <Container maxWidth="lg">
 *          <Typography varniant="h6" component="h1">{product.name}</Typography>
 *          { loading ? <Skeleton/> : <ProductBody/> }
 *        </Container>
 *      )
 *    })
 *  }
 * ```
 */
export default function useLazyProps(props, updateState) {
  const { skeletonProps } = useContext(PWAContext)

  const isLazy = props.lazy && props.lazy.then ? true : false

  let state = []

  if (!updateState) {
    // if updateState is not provided, create out own internal state
    state = useState(() => ({
      loading: isLazy,
      props: isLazy ? skeletonProps || {} : props
    }))
    updateState = state[1]
  }

  useEffect(() => {
    if (isLazy) {
      const { lazy } = props

      lazy.then(props => {
        updateState({ ...props, loading: false })
      })
    }
  }, [props])

  return state[0]
}
