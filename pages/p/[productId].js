import { useContext, useState } from 'react'
import Lazy from 'react-storefront/Lazy'
import QuantitySelector from 'react-storefront/QuantitySelector'
import useLazyStore from 'react-storefront/hooks/useLazyStore'
import Accordion from 'react-storefront/Accordion'
import ExpandableSection from 'react-storefront/ExpandableSection'
import fetchProps from 'react-storefront/props/fetchProps'
import TabPanel from 'react-storefront/TabPanel'
import CmsSlot from 'react-storefront/CmsSlot'
import MediaCarousel from 'react-storefront/carousel/MediaCarousel'
import PWAContext from 'react-storefront/PWAContext'
import Skeleton from 'react-storefront/Skeleton'
import { Container, Grid, Typography, Paper, Hidden } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Row from 'react-storefront/Row'
import { Hbox } from 'react-storefront/Box'
import Label from 'react-storefront/Label'
import Fill from 'react-storefront/Fill'
import Rating from 'react-storefront/Rating'
import Text from 'react-storefront/Text'
import DataBindingProvider from 'react-storefront/bind/DataBindingProvider'
import withCaching from '../../src/moov-xdn-next/src/withCaching'
import createCustomCacheKey from '../../src/moov-xdn/src/createCustomCacheKey'
import get from 'lodash/get'
import ProductOptionSelector from 'react-storefront/option/ProductOptionSelector'

const styles = theme => ({
  carouselWrap: {
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, -2),
      width: '100vw'
    }
  }
})

const useStyles = makeStyles(styles)

const Product = React.memo(lazyProps => {
  const theme = useTheme()
  const [store, updateStore] = useLazyStore(lazyProps, { pageData: { quantity: 1 } })
  const classes = useStyles()
  const product = get(store, 'pageData.product') || {}
  const color = get(store, 'pageData.color')
  const { thumbnail } = useContext(PWAContext)

  const header = (
    <Row>
      <Typography variant="h6" component="h1" gutterBottom>
        {product ? product.name : <Skeleton style={{ height: '1em' }} />}
      </Typography>
      <Hbox>
        <Typography style={{ marginRight: theme.spacing(2) }}>{product.price}</Typography>
        <Rating value={product.rating} reviewCount={10} />
      </Hbox>
    </Row>
  )

  return (
    <DataBindingProvider
      id={`RSFProduct${product.id}`}
      store={store}
      updateStore={updateStore}
      root="pageData"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={5}>
            <Hidden implementation="css" smUp>
              {header}
            </Hidden>
            <Fill aspectRatio={1} className={classes.carouselWrap}>
              <MediaCarousel
                baseURL={`/api/p/media`}
                className={classes.carousel}
                thumbnail={thumbnail.current}
                product={product}
                color={color}
                // bind={{ productId: 'id', media: 'media', color: 'color' }}
              />
            </Fill>
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Hidden implementation="css" xsDown>
                  <div style={{ paddingBottom: theme.spacing(1) }}>{header}</div>
                </Hidden>
                {product ? (
                  <>
                    <Hbox style={{ marginBottom: 10 }}>
                      <Label>COLOR: </Label>
                      <Typography>
                        <Text bind="color.text" />
                      </Typography>
                    </Hbox>
                    <ProductOptionSelector
                      optionProps={{ showLabel: false }}
                      bind={{ value: 'color', options: 'product.colors' }}
                    />
                  </>
                ) : (
                  <div>
                    <Skeleton style={{ height: 14, marginBottom: theme.spacing(2) }}></Skeleton>
                    <Hbox>
                      <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                      <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                      <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                    </Hbox>
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                {product ? (
                  <>
                    <Hbox style={{ marginBottom: 10 }}>
                      <Label>SIZE: </Label>
                      <Typography>
                        <Text bind="size.text" />
                      </Typography>
                    </Hbox>
                    <ProductOptionSelector bind={{ value: 'size', options: 'product.sizes' }} />
                  </>
                ) : (
                  <div>
                    <Skeleton style={{ height: 14, marginBottom: theme.spacing(2) }}></Skeleton>
                    <Hbox>
                      <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                      <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                      <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                    </Hbox>
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <Hbox>
                  <Label>QTY:</Label>
                  <QuantitySelector bind="quantity" />
                </Hbox>
              </Grid>
              <Grid item xs={12}>
                <TabPanel>
                  <CmsSlot label="Description">Description</CmsSlot>
                  <CmsSlot label="Specs">Test</CmsSlot>
                  <div label="Reviews">
                    {['here', 'here2', 'here3'].map((review, i) => (
                      <Paper key={i}>{review}</Paper>
                    ))}
                  </div>
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Row>
              <Accordion>
                <ExpandableSection expanded title="First">
                  <div>The first section</div>
                </ExpandableSection>
                <ExpandableSection title="Second">
                  <div>The second section</div>
                </ExpandableSection>
                <ExpandableSection title="Third">
                  <div>The third section</div>
                </ExpandableSection>
              </Accordion>
            </Row>
            <Row>
              <ExpandableSection expanded title="First">
                <div>The first no accordion section</div>
              </ExpandableSection>
              <ExpandableSection title="Second">
                <div>The second no accordion section</div>
              </ExpandableSection>
            </Row>
          </Grid>
          <div style={{ height: 500 }}></div>
          <Grid item xs={12}>
            <Lazy style={{ minHeight: 200 }}>
              <div>Lazy content</div>
            </Lazy>
          </Grid>
        </Grid>
      </Container>
    </DataBindingProvider>
  )
})

Product.getInitialProps = withCaching({
  edge: {
    maxAgeSeconds: 1000,
    key: createCustomCacheKey().addCookie('currency')
  }
})(fetchProps(({ query }) => `/api/p/${query.productId}`))

export default Product

export const config = { amp: 'hybrid' }
