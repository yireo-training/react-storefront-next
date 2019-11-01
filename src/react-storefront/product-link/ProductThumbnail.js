import React, { useContext } from 'react'
import ProductLinkContext from './ProductLinkContext'
import Image from '../Image'
import makeStyles from '@material-ui/core/styles/makeStyles'

export const styles = theme => ({
  image: {
    flex: 1,
    marginBottom: '10px',
    width: '100%'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFProductThumbnail' })

export default function ProductThumbnail({ classes, ...props }) {
  classes = useStyles({ classes })

  const { color } = useContext(ProductLinkContext)

  return <Image className={classes.image} {...color.thumbnail} {...props} />
}

ProductThumbnail.propTypes = {}

ProductThumbnail.defaultProps = {}
