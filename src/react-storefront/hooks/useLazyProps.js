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
export default function useLazyProps(props) {
  const { skeletonProps } = useContext(PWAContext)
  const [store, setStore] = useState({ loading: true, props: skeletonProps || {} })

  useEffect(() => {
    if (props.lazy && props.lazy.then) {
      props.lazy.then(props => {
        setStore({ loading: false, props })
      })
    }
  }, [])

  if (props.lazy && props.lazy.then) {
    return store
  } else {
    return { loading: false, props: props }
  }
}
