import { useContext } from 'react'
import { useObserver } from 'mobx-react'
import { Container, Grid, Typography, Paper, Divider } from '@material-ui/core'
import Link from 'react-storefront/Link'
import Lazy from 'react-storefront/Lazy'
import ButtonSelector from 'react-storefront/ButtonSelector'
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
import makeStyles from '@material-ui/core/styles/makeStyles'
import Row from 'react-storefront/Row'
import { Hbox } from 'react-storefront/Box'
import Label from 'react-storefront/Label'

const styles = theme => ({
  carousel: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      margin: '0 -16px',
      height: '100vw',
      width: '100vw'
    }
  }
})

const useStyles = makeStyles(styles)

const Product = React.memo(lazyProps => {
  const store = useLazyStore(lazyProps, { quantity: 1 })

  return useObserver(() => {
    const classes = useStyles()
    const { loading, pageData: product } = store
    const { thumbnail } = useContext(PWAContext)

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
              {product ? product.name : <Skeleton style={{ height: '1em' }} />}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={5}>
            <MediaCarousel
              className={classes.carousel}
              product={product}
              thumbnail={thumbnail.current}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <Row>
              {product ? (
                <>
                  <Hbox style={{ marginBottom: 10 }}>
                    <Label>COLOR: </Label>
                    <Typography>{product.colors.selected.text}</Typography>
                  </Hbox>
                  <ButtonSelector
                    options={product.colors.options}
                    value={product.colors.selected}
                    onSelectionChange={(_e, color) => {
                      product.colors.selected = color
                    }}
                  />
                </>
              ) : (
                <div>
                  <Skeleton style={{ height: 14 }}></Skeleton>
                  <Hbox>
                    <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                    <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                    <Skeleton style={{ height: 48, width: 48, marginRight: 10 }}></Skeleton>
                  </Hbox>
                </div>
              )}
            </Row>
            <Row>
              <Divider />
            </Row>
            <Row>
              {product && (
                <Hbox>
                  <Label>QTY:</Label>
                  <QuantitySelector
                    value={product.quantity}
                    onChange={q => (product.quantity = q)}
                  />
                </Hbox>
              )}
            </Row>
            <Row>
              <TabPanel>
                <CmsSlot label="Description">Description</CmsSlot>
                <CmsSlot label="Specs">Test</CmsSlot>
                <div label="Reviews">
                  {['here', 'here2', 'here3'].map((review, i) => (
                    <Paper key={i}>{review}</Paper>
                  ))}
                </div>
              </TabPanel>
            </Row>
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
    )
  })
})

Product.getInitialProps = fetchProps(
  ({ query }) => `http://localhost:3000/api/p/${query.productId}`
)

export default Product

export const config = { amp: 'hybrid' }
