import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '../../src/Link'
import { useObserver, useLocalStore } from 'mobx-react'
import { Button } from '@material-ui/core'
import Lazy from '../../src/react-storefront/Lazy'
import ButtonSelector from '../../src/react-storefront/ButtonSelector'
import QuantitySelector from '../../src/react-storefront/QuantitySelector'
import useLazyProps from '../../src/react-storefront/hooks/useLazyProps'
import fetchProps from '../../src/react-storefront/props/fetchProps'
import ProductSkeleton from './_ProductSkeleton'

export default function Product(lazyProps) {
  const { props, loading } = useLazyProps(lazyProps)

  return useObserver(() => {
    const product = useLocalStore(() => ({ ...props.product, selectedImage: 0 }))

    console.log('loading', loading)

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
              {product.name}
            </Typography>
          </Grid>
        </Grid>
        {loading ? (
          <ProductSkeleton />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <MediaCarousel product={product} />
            </Grid>
            <Grid item xs={12} md={8}>
              <ButtonSelector
                options={product.colors.options}
                value={product.colors.selected}
                onSelectionChange={(_e, color) => {
                  product.colors.selected = color
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <QuantitySelector value={product.quantity} onChange={q => (product.quantity = q)} />
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
}

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

export const config = { amp: 'hybrid' }
