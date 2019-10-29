import React from 'react'
import { Typography, Grid, Container, Hidden } from '@material-ui/core'
import ResponsiveTiles from 'react-storefront/ResponsiveTiles'
import ProductItem from '../../src/ProductItem'
import ShowMore from 'react-storefront/search/ShowMore'
import Head from 'next/head'
import BackToTop from 'react-storefront/BackToTop'
import fetchProps from 'react-storefront/props/fetchProps'
import Skeleton from 'react-storefront/Skeleton'
import { Hbox } from 'react-storefront/Box'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import qs from 'qs'
import LoadMask from 'react-storefront/LoadMask'
import useSearchResultsStore from 'react-storefront/search/useSearchResultsStore'
import FilterButton from 'react-storefront/search/FilterButton'
import Filter from 'react-storefront/search/Filter'
import SearchResultsProvider from 'react-storefront/search/SearchResultsProvider'

const useStyles = makeStyles(theme => ({
  sideBar: {
    margin: theme.spacing(0, 4, 0, 0),
    width: 300
  }
}))

const Subcategory = lazyProps => {
  const [store, updateStore] = useSearchResultsStore(lazyProps)
  const classes = useStyles()
  const theme = useTheme()
  const { pageData, loading } = store

  return (
    <SearchResultsProvider store={store} updateStore={updateStore}>
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
              {loading ? (
                <Skeleton style={{ width: 100, height: 12, marginBottom: theme.spacing(1) }} />
              ) : (
                <Typography variant="caption">
                  {pageData.total} total {pageData.total === 1 ? 'item' : 'items'}
                </Typography>
              )}
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
              {!loading && <ShowMore />}
            </Grid>
          </Grid>
        </Hbox>
      </Container>
    </SearchResultsProvider>
  )
}

Subcategory.getInitialProps = fetchProps(
  ({ query }) =>
    `http://localhost:3000/api/s/${query.subcategoryId}${qs.stringify(query, {
      addQueryPrefix: true
    })}`
)

export const config = { amp: 'hybrid' }
export default Subcategory
