import React from 'react'
import Link from '../../src/react-storefront/Link'
import { Vbox } from '../../src/react-storefront/Box'
import Image from '../../src/react-storefront/Image'
import { makeStyles, Typography } from '@material-ui/core'
import { price } from '../../src/react-storefront/format'
import Rating from '../../src/react-storefront/Rating'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 0'
  },
  thumb: {
    flex: 2,
    display: 'block',
    marginBottom: '10px',
    '& img': {
      width: '100%'
    }
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
      <Link
        as={`/p/${product.id}`}
        href="/p/[productId]"
        className={classes.link}
        skeletonProps={{ product }}
      >
        <Vbox alignItems="stretch">
          <div className={classes.thumb}>
            <Image
              optimize={{ maxWidth: 200 }}
              lazy={index >= 4 && index < 20 ? 'ssr' : false}
              aspectRatio={100}
              alt={product.thumbnail.alt}
              src={product.thumbnail.src}
            />
          </div>
          <div className={classes.info}>
            <Typography variant="subtitle1" className={classes.name}>
              {product.name}
            </Typography>
            <Rating product={product} className={classes.rating} />
            <Typography className={classes.price}>{price(product.price)}</Typography>
          </div>
        </Vbox>
      </Link>
    </div>
  )
}
