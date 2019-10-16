import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Link from '../../src/Link'
import createProduct from '../../src/mocks/createProduct'
import { useObserver } from 'mobx-react'
import { Button } from '@material-ui/core'
import Lazy from '../../src/react-storefront/Lazy'
import ButtonSelector from '../../src/react-storefront/ButtonSelector'
import QuantitySelector from '../../src/react-storefront/QuantitySelector'
import useLazyProps from '../../src/react-storefront/hooks/useLazyProps'
import fetchFromServer from '../../src/react-storefront/props/fetchFromServer'

export default function Product(props) {
  return useLazyProps(props, ({ loading, props: { product } }) => {
    if (loading) {
      return <div>Loading...</div>
    } else if (product) {
      return (
        <Container maxWidth="lg">
          <Link href="/s/[subcategoryId]" as="/s/1">
            Subcategory 1
          </Link>
          <Typography variant="h1">{product.name}</Typography>
          <MediaCarousel product={product} />
          <ButtonSelector
            options={product.colors.options}
            value={product.colors.selected}
            onSelectionChange={(_e, color) => {
              product.colors.selected = color
            }}
          />
          <QuantitySelector value={product.quantity} onChange={q => (product.quantity = q)} />
          <div style={{ height: 500 }}></div>
          <Lazy style={{ minHeight: 200 }}>
            <div>Lazy content</div>
          </Lazy>
        </Container>
      )
    } else {
      return null
    }
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
  fetchFromServer(`http://localhost:3000/api/p/${query.productId}`)

export const config = { amp: 'hybrid' }
