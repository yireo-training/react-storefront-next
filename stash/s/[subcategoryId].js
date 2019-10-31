import React, { useCallback } from 'react'
import { Typography, Grid, Container } from '@material-ui/core'
import ResponsiveTiles from './node_modules/react-storefront/ResponsiveTiles'
import ProductItem from '../../src/ProductItem'
import fetch from 'cross-fetch'
import ShowMore from './node_modules/react-storefront/ShowMore'
import Head from 'next/head'
import BackToTop from './node_modules/react-storefront/BackToTop'
import fetchProps from '../../pages/p/node_modules/react-storefront/props/fetchProps'
import useLazyStore from '../../pages/p/node_modules/react-storefront/hooks/useLazyStore'
import Skeleton from './node_modules/react-storefront/Skeleton'

const Subcategory = lazyProps => {
  const store = useLazyStore(lazyProps, { page: 0 })

  const { subcategory, loading } = store

  const fetchMore = useCallback(async () => {
    const { subcategory, page } = store

    const more = await fetch(`/api/s/${subcategory.id}?page=${store.page + 1}`).then(res =>
      res.json()
    )

    Object.assign(store, {
      page: page + 1,
      subcategory: {
        ...subcategory,
        products: subcategory.products.concat(more.products)
      }
    })
  })

  // console.log('render subcategory', subcategory && subcategory.id)

  return (
    <Container maxWidth="lg">
      <Head>{loading ? null : <title>{subcategory.title}</title>}</Head>
      <BackToTop />
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" variant="h6">
            {!loading ? subcategory.name : <Skeleton style={{ height: 16 }} />}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {!loading ? (
            <ResponsiveTiles>
              {subcategory.products.map((product, i) => (
                <ProductItem key={product.id} product={product} index={i} />
              ))}
            </ResponsiveTiles>
          ) : (
            <ResponsiveTiles>
              {(() => {
                const tiles = []
                for (let i = 0; i < 10; i++) {
                  tiles.push(
                    <div key={i}>
                      <Skeleton style={{ height: 200 }} />
                      <Skeleton style={{ height: 16 }} />
                      <Skeleton style={{ height: 16 }} />
                      <Skeleton style={{ height: 16 }} />
                    </div>
                  )
                }
                return tiles
              })()}
            </ResponsiveTiles>
          )}
        </Grid>
        <Grid item xs={12}>
          <ShowMore loadMore={fetchMore} />
        </Grid>
      </Grid>
    </Container>
  )
}

Subcategory.getInitialProps = fetchProps(
  ({ query }) => `http://localhost:3000/api/s/${query.subcategoryId}`
)

export const config = { amp: 'hybrid' }
export default Subcategory
