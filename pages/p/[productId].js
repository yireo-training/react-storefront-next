import { useObserver } from 'mobx-react'
import { Container, Grid, Typography, Paper } from '@material-ui/core'
import Link from 'react-storefront/Link'
import { Button } from '@material-ui/core'
import Lazy from 'react-storefront/Lazy'
import ButtonSelector from 'react-storefront/ButtonSelector'
import QuantitySelector from 'react-storefront/QuantitySelector'
import useLazyStore from 'react-storefront/hooks/useLazyStore'
import useTraceUpdate from 'react-storefront/hooks/useTraceUpdate'
import Accordion from 'react-storefront/Accordion'
import ExpandableSection from 'react-storefront/ExpandableSection'
import fetchProps from 'react-storefront/props/fetchProps'
import TabPanel from 'react-storefront/TabPanel'
import CmsSlot from 'react-storefront/CmsSlot'
import ProductSkeleton from '../../src/ProductSkeleton'

const Product = React.memo(lazyProps => {
  const store = useLazyStore(lazyProps, { quantity: 1 })

  return useObserver(() => {
    const { loading, pageData: product } = store

    return (
      <Container maxWidth="lg">
        <Grid spacing={2} container>
          <Grid item xs={12}>
            <Link href="/s/[subcategoryId]" as="/s/1">
              Subcategory 1
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h1">
              {product && product.name}
            </Typography>
          </Grid>
        </Grid>
        {loading || !product ? (
          <ProductSkeleton />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              {/* {product.images && <MediaCarousel product={product} />} */}
            </Grid>
            <Grid item xs={12} md={8}>
              {product.colors && (
                <ButtonSelector
                  options={product.colors.options}
                  value={product.colors.selected}
                  onSelectionChange={(_e, color) => {
                    product.colors.selected = color
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <QuantitySelector value={product.quantity} onChange={q => (product.quantity = q)} />
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
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <ExpandableSection expanded title="First">
                <div>The first no accordion section</div>
              </ExpandableSection>
              <ExpandableSection title="Second">
                <div>The second no accordion section</div>
              </ExpandableSection>
            </Grid>
            <div style={{ height: 500 }}></div>
            <Grid item xs={12}>
              <Lazy style={{ minHeight: 200 }}>
                <div>Lazy content</div>
              </Lazy>
            </Grid>
          </Grid>
        )}
      </Container>
    )
  })
})

function MediaCarousel({ product }) {
  return useObserver(() => (
    <div>
      <img src={product.images[product.selectedImage].src} width={200} height={200} />
      <div>
        {product.images.map((image, i) => (
          <Button key={i} onClick={() => (product.selectedImage = i)}>
            Image {i}
          </Button>
        ))}
      </div>
    </div>
  ))
}

Product.getInitialProps = fetchProps(
  ({ query }) => `http://localhost:3000/api/p/${query.productId}`
)

export default Product

export const config = { amp: 'hybrid' }
