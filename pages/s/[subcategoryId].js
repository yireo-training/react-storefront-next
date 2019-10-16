import { Typography, Grid, Container } from '@material-ui/core'
import withHistoryCache from '../../src/react-storefront/router/withHistoryCache'
import ResponsiveTiles from '../../src/react-storefront/ResponsiveTiles'
import ProductItem from './_ProductItem'

export default function Subcategory({ subcategory }) {
  if (!subcategory) return null
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" variant="h6">
            {subcategory.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ResponsiveTiles>
            {subcategory.products.map((product, i) => (
              <ProductItem key={product.id} product={product} index={i} />
            ))}
          </ResponsiveTiles>
        </Grid>
      </Grid>
    </Container>
  )
}

Subcategory.getInitialProps = withHistoryCache(async ({ query }) => {
  if (typeof window !== 'undefined') {
    return window.fetch(`/api/s/${query.subcategoryId}`).then(res => res.json())
  } else {
    let result

    const req = {
      query
    }

    const res = {
      end(body) {
        result = JSON.parse(body)
      }
    }

    await require('../api/s/[subcategoryId]').default(req, res)

    return result
  }
})
