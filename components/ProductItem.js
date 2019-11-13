import React, { memo } from 'react'
import Link from 'react-storefront/link/Link'
import { Vbox } from 'react-storefront/Box'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Rating from 'react-storefront/Rating'
import ForwardThumbnail from 'react-storefront/ForwardThumbnail'
import ProductThumbnail from 'react-storefront/product-link/ProductThumbnail'
import ProductLink from 'react-storefront/product-link/ProductLink'
import ProductOptionSelector from 'react-storefront/option/ProductOptionSelector'

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

function ProductItem({ product, index }) {
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
              pageData={{ product }}
            >
              <ProductThumbnail
                bind={{
                  src: ['color.media.thumbnail.src', 'thumbnail.src'],
                  alt: ['color.media.thumbnail.alt', 'thumbnail.alt']
                }}
                optimize={{ maxWidth: 200 }}
                lazy={index >= 4 && index < 20 ? 'ssr' : false}
                aspectRatio={100}
              />
            </Link>
            <div className={classes.info}>
              <Typography variant="subtitle1" className={classes.name}>
                {product.name}
              </Typography>
              <ProductOptionSelector
                bind={{ value: 'color', options: 'colors' }}
                optionProps={{
                  size: 'small',
                  showLabel: false
                }}
              />
              <Rating product={product} className={classes.rating} />
              <Typography className={classes.price}>{product.price}</Typography>
            </div>
          </Vbox>
        </ProductLink>
      </ForwardThumbnail>
    </div>
  )
}

export default memo(ProductItem)
