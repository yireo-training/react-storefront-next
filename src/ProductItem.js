import React from 'react'
import Link from 'react-storefront/Link'
import { Vbox } from 'react-storefront/Box'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Rating from 'react-storefront/Rating'
import ForwardThumbnail from 'react-storefront/ForwardThumbnail'
import ProductThumbnail from './react-storefront/product-link/ProductThumbnail'
import ProductLink from './react-storefront/product-link/ProductLink'
import ProductColors from './react-storefront/product-link/ProductColors'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 0'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  price: {
    marginTop: '5px'
  },
  reviews: {
    marginTop: '5px'
  },
  reviewCount: {
    marginLeft: '2px'
  },
  info: {
    margin: '0'
  }
}))

export default function Product({ product, index }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ForwardThumbnail>
        <ProductLink product={product}>
          <Vbox alignItems="stretch">
            <Link
              as={product.url}
              href="/p/[productId]"
              className={classes.link}
              prefetch="visible"
              skeletonProps={{ product }}
            >
              <ProductThumbnail
                optimize={{ maxWidth: 200 }}
                lazy={index >= 4 && index < 20 ? 'ssr' : false}
                aspectRatio={100}
              />
            </Link>
            <div className={classes.info}>
              <Typography variant="subtitle1" className={classes.name}>
                {product.name}
              </Typography>
              <ProductColors product={product} buttonProps={{ variant: 'small' }} />
              <Rating product={product} className={classes.rating} />
              <Typography className={classes.price}>{product.price}</Typography>
            </div>
          </Vbox>
        </ProductLink>
      </ForwardThumbnail>
    </div>
  )
}
