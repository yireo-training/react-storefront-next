import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ButtonSelector from '../ButtonSelector'

export const styles = theme => ({
  root: {}
})
const useStyles = makeStyles(styles, { name: 'RSFProductColors' })

function ProductColors({ classes, colors, bind, ...others }) {
  classes = useStyles({ classes })

  return <ButtonSelector options={colors} bind={bind} {...others} />
}

ProductColors.propTypes = {}

ProductColors.defaultProps = {}

export default ProductColors
