import React, { useEffect } from 'react'
import { useObserver } from 'mobx-react'
import { Container, Grid, Typography, Paper } from '@material-ui/core'
import Link from '../../src/Link'
import { Button } from '@material-ui/core'
import Lazy from '../../src/react-storefront/Lazy'
import ButtonSelector from '../../src/react-storefront/ButtonSelector'
import QuantitySelector from '../../src/react-storefront/QuantitySelector'
import useLazyStore from '../../src/react-storefront/hooks/useLazyStore'
import useTraceUpdate from 'react-storefront/hooks/useTraceUpdate'
import fetchProps from '../../src/react-storefront/props/fetchProps'
import TabPanel from '../../src/react-storefront/TabPanel'
import CmsSlot from '../../src/react-storefront/CmsSlot'
import ProductSkeleton from './_ProductSkeleton'

const Product = React.memo(lazyProps => {
  return useObserver(() => {
    const { loading, product } = useLazyStore(lazyProps, { quantity: 1 })

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

Product.getInitialProps = ({ query }) =>
  fetchProps(`http://localhost:3000/api/p/${query.productId}`)

export default Product

export const config = { amp: 'hybrid' }
