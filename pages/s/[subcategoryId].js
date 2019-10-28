import React from 'react'
import { Typography, Grid, Container, Hidden } from '@material-ui/core'
import ResponsiveTiles from 'react-storefront/ResponsiveTiles'
import ProductItem from '../../src/ProductItem'
import ShowMore from 'react-storefront/ShowMore'
import Head from 'next/head'
import BackToTop from 'react-storefront/BackToTop'
import fetchProps from 'react-storefront/props/fetchProps'
import useSearchResultsStore from 'react-storefront/hooks/useSearchResultsStore'
import { useObserver } from 'mobx-react'
import Skeleton from 'react-storefront/Skeleton'
import FilterButton from 'react-storefront/filter/FilterButton'
import Filter from 'react-storefront/filter/Filter'
import { Hbox } from 'react-storefront/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import qs from 'qs'
import LoadMask from 'react-storefront/LoadMask'

import useTraceUpdate from 'react-storefront/hooks/useTraceUpdate'

const useStyles = makeStyles(theme => ({
  sideBar: {
    margin: theme.spacing(0, 4, 0, 0),
    width: 300
  }
}))

const Subcategory = lazyProps => {
  const store = useSearchResultsStore(lazyProps)

  return useObserver(() => {
    const classes = useStyles()
    const theme = useTheme()
    const { pageData, loading } = store

    return (
      <Container maxWidth="lg">
        <Head>{loading ? null : <title>{pageData.title}</title>}</Head>
        <BackToTop />
        <Hbox align="flex-start">
          <Hidden implementation="css" xsDown>
            <Filter store={store} classes={{ root: classes.sideBar }} expandAll submitOnChange />
          </Hidden>
          <Grid container style={{ position: 'relative' }}>
            <LoadMask show={store.reloading} transparent align="top" />
            <Grid item xs={12}>
              <Typography component="h1" variant="h6" gutterBottom>
                {pageData.name || <Skeleton style={{ height: 16 }} />}
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ paddingRight: theme.spacing(1) }}>
              <Hidden implementation="css" smUp>
                <FilterButton style={{ width: '100%' }} store={store} />
              </Hidden>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="caption">
                {pageData.total} total {pageData.total === 1 ? 'item' : 'items'}
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
              <ShowMore loadMore={store.actions.fetchMore} />
            </Grid>
          </Grid>
        </Hbox>
      </Container>
    )
  })
}

Subcategory.getInitialProps = fetchProps(
  ({ query }) =>
    `http://localhost:3000/api/s/${query.subcategoryId}${qs.stringify(query, {
      addQueryPrefix: true
    })}`
)

export const config = { amp: 'hybrid' }
export default Subcategory
