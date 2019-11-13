import React from 'react'
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

function ProductThumbnail({ classes, bind, ...props }) {
  classes = useStyles({ classes })

  return <Image className={classes.image} bind={bind} {...props} />
}

ProductThumbnail.propTypes = {}

ProductThumbnail.defaultProps = {}

export default ProductThumbnail
