import React from 'react'
import { Typography, Grid, Container, Hidden } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ResponsiveTiles from 'react-storefront/ResponsiveTiles'
import ProductItem from '../../components/ProductItem'
import ShowMore from 'react-storefront/plp/ShowMore'
import Head from 'next/head'
import BackToTop from 'react-storefront/BackToTop'
import { Skeleton } from '@material-ui/lab'
import { Hbox } from 'react-storefront/Box'
import SortButton from 'react-storefront/plp/SortButton'
import fetchProps from 'react-storefront/props/fetchProps'
import qs from 'qs'
import LoadMask from 'react-storefront/LoadMask'
import useSearchResultsStore from 'react-storefront/plp/useSearchResultsStore'
import FilterButton from 'react-storefront/plp/FilterButton'
import Filter from 'react-storefront/plp/Filter'
import Fill from 'react-storefront/Fill'
import SearchResultsProvider from 'react-storefront/plp/SearchResultsProvider'
import DataBindingProvider from 'react-storefront/bind/DataBindingProvider'
import ProductOptionSelector from 'react-storefront/option/ProductOptionSelector'

const useStyles = makeStyles(theme => ({
  sideBar: {
    margin: theme.spacing(0, 4, 0, 0),
    width: 275
  },
  sortButton: {
    [theme.breakpoints.down('xs')]: {
      flex: 1
    }
  },
  total: {
    marginTop: theme.spacing(1)
  }
}))

const Subcategory = lazyProps => {
  const [store, updateStore] = useSearchResultsStore(lazyProps)
  const classes = useStyles()
  const theme = useTheme()
  let { pageData, loading } = store
  // pageData = {}
  // loading = true

  return (
    <DataBindingProvider store={store} updateStore={updateStore}>
      <SearchResultsProvider store={store} updateStore={updateStore}>
        <Container maxWidth="lg">
          <Head>{loading ? null : <title>{pageData.title}</title>}</Head>
          <BackToTop />
          <Hbox align="flex-start">
            <Hidden implementation="css" xsDown>
              <div className={classes.sideBar}>
                <Hidden xsDown>
                  <Filter classes={{ root: classes.sideBar }} expandAll submitOnChange />
                </Hidden>
              </div>
            </Hidden>
            <Grid container style={{ position: 'relative' }}>
              <LoadMask show={store.reloading} transparent align="top" />
              <Grid item xs={12}>
                {pageData.name ? (
                  <Typography component="h1" variant="h6" gutterBottom>
                    {pageData.name}
                  </Typography>
                ) : (
                  <Skeleton style={{ height: '1rem' }} />
                )}
              </Grid>
              <Grid item xs={6} style={{ paddingRight: theme.spacing(1) }}>
                <Hidden implementation="css" smUp>
                  <FilterButton style={{ width: '100%' }} />
                </Hidden>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <SortButton className={classes.sortButton} store={store} />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {loading ? (
                  <Skeleton width={100} height={12} />
                ) : (
                  <Typography variant="caption" className={classes.total}>
                    <span>
                      {pageData.total} total {pageData.total === 1 ? 'item' : 'items'}
                    </span>
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
                  <ResponsiveTiles style={{ marginTop: 0 }}>
                    {(() => {
                      const tiles = []
                      for (let i = 0; i < 10; i++) {
                        tiles.push(
                          <div key={i} style={{ marginBottom: theme.spacing(3) }}>
                            <Fill style={{ marginBottom: theme.spacing(1) }}>
                              <Skeleton height="100%" style={{ margin: 0 }} />
                            </Fill>
                            <Skeleton height={14} />
                            <ProductOptionSelector
                              skeleton={4}
                              variant="swatch"
                              size="small"
                              optionProps={{
                                size: 'small',
                                showLabel: false
                              }}
                            />
                            <Skeleton height={10} />
                            <Skeleton height={10} />
                          </div>
                        )
                      }
                      return tiles
                    })()}
                  </ResponsiveTiles>
                )}
              </Grid>
              <Grid item xs={12}>
                {!loading && <ShowMore variant="infinite" style={{ paddingBottom: 200 }} />}
              </Grid>
            </Grid>
          </Hbox>
        </Container>
      </SearchResultsProvider>
    </DataBindingProvider>
  )
}

Subcategory.getInitialProps = fetchProps(({ query: { subcategoryId, ...search } }) => {
  return `/api/s/${subcategoryId}${qs.stringify(search, {
    addQueryPrefix: true
  })}`
})

export const config = { amp: 'hybrid' }
export default Subcategory
