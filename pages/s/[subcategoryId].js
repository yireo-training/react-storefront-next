import React, { useCallback } from 'react'
import { Typography, Grid, Container } from '@material-ui/core'
import ResponsiveTiles from 'react-storefront/ResponsiveTiles'
import ProductItem from '../../src/ProductItem'
import fetch from 'cross-fetch'
import ShowMore from 'react-storefront/ShowMore'
import Head from 'next/head'
import BackToTop from 'react-storefront/BackToTop'
import fetchProps from 'react-storefront/props/fetchProps'
import useLazyStore from 'react-storefront/hooks/useLazyStore'
import { useObserver } from 'mobx-react'
import Skeleton from 'react-storefront/Skeleton'
import { runInAction } from 'mobx'

import useTraceUpdate from 'react-storefront/hooks/useTraceUpdate'

const Subcategory = lazyProps => {
  const store = useLazyStore(lazyProps, { page: 0 })

  return useObserver(() => {
    const { pageData, loading } = store

    const fetchMore = useCallback(async () => {
      const { pageData, page } = store

      const more = await fetch(`/api/s/${pageData.id}?page=${store.page + 1}`).then(res =>
        res.json()
      )

      runInAction(() => {
        Object.assign(store, {
          page: page + 1,
          pageData: {
            ...pageData,
            products: pageData.products.concat(more.products)
          }
        })
      })
    })

    console.log('render subcategory', pageData && pageData.id)

    return (
      <Container maxWidth="lg">
        <Head>{loading ? null : <title>{pageData.title}</title>}</Head>
        <BackToTop />
        <Grid container>
          <Grid item xs={12}>
            <Typography component="h1" variant="h6">
              {!loading ? pageData.name : <Skeleton style={{ height: 16 }} />}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {!loading ? (
              <ResponsiveTiles>
                {pageData.products.map((product, i) => (
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
  })
}

Subcategory.getInitialProps = fetchProps(
  ({ query }) => `http://localhost:3000/api/s/${query.subcategoryId}`
)

export const config = { amp: 'hybrid' }
export default Subcategory
