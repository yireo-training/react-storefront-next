import React from 'react'
import { Typography, Grid, Container } from '@material-ui/core'
import ResponsiveTiles from '../../src/react-storefront/ResponsiveTiles'
import ProductItem from './_ProductItem'
import fetch from 'cross-fetch'
import ShowMore from '../../src/react-storefront/ShowMore'
import Head from 'next/head'
import BackToTop from '../../src/react-storefront/BackToTop'
import fetchProps from '../../src/react-storefront/props/fetchProps'
import useLazyStore from 'react-storefront/hooks/useLazyStore'
import withHistoryCache from 'react-storefront/router/withHistoryCache'
import { useObserver } from 'mobx-react'
import Skeleton from 'react-storefront/Skeleton'
import useTraceUpdate from 'react-storefront/hooks/useTraceUpdate'

const Subcategory = lazyProps => {
  const store = useLazyStore(lazyProps, { page: 0 })

  return useObserver(() => {
    async function fetchMore() {
      const more = await fetch(`/api/s/${subcategory.id}?page=${page + 1}`).then(res => res.json())

      Object.assign(subcategory, {
        page: page + 1,
        products: subcategory.products.concat(more.products)
      })
    }

    const { subcategory, loading } = store

    console.log('render subcategory', subcategory && subcategory.id)

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
  })
}

Subcategory.getInitialProps = ({ query }) => {
  return fetchProps(`http://localhost:3000/api/s/${query.subcategoryId}`)
}

export const config = { amp: 'hybrid' }
export default Subcategory
