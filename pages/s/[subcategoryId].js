import { Typography, Grid, Container } from '@material-ui/core'
import withHistoryCache from '../../src/react-storefront/router/withHistoryCache'
import ResponsiveTiles from '../../src/react-storefront/ResponsiveTiles'
import ProductItem from './_ProductItem'
import fetch from 'cross-fetch'
import ShowMore from '../../src/react-storefront/ShowMore'
import useHistoryStore from '../../src/react-storefront/hooks/useHistoryStore'
import Head from 'next/head'
import BackToTop from '../../src/react-storefront/BackToTop'

export default function Subcategory(props) {
  const [store, updateStore] = useHistoryStore(props, { page: 0 })
  const { subcategory, page } = store

  async function fetchMore() {
    const more = await fetch(`/api/s/${subcategory.id}?page=${page + 1}`).then(res => res.json())

    updateStore({
      ...store,
      page: page + 1,
      subcategory: {
        ...subcategory,
        products: [...subcategory.products, ...more.products]
      }
    })
  }

  return (
    <Container maxWidth="lg">
      <Head>
        <title>{subcategory.title}</title>
      </Head>
      <BackToTop />
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
        <Grid item xs={12}>
          <ShowMore loadMore={fetchMore} />
        </Grid>
      </Grid>
    </Container>
  )
}

Subcategory.getInitialProps = withHistoryCache(async ({ query }) => {
  if (typeof window !== 'undefined') {
    return window
      .fetch(`/api/s/${query.subcategoryId}`, {
        cache: 'force-cache',
        headers: {
          'x-rsf-api-version': '1'
        }
      })
      .then(res => res.json())
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
