import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import ButtonSelector from '../ButtonSelector'
import ProductLinkContext from './ProductLinkContext'

export const styles = theme => ({
  root: {}
})
const useStyles = makeStyles(styles, { name: 'RSFProductColors' })

export default function ProductColors({ classes, product, ...others }) {
  classes = useStyles({ classes })

  const { color, setColor } = useContext(ProductLinkContext)

  return (
    <ButtonSelector
      options={product.colors}
      value={color}
      onSelectionChange={(_e, color) => setColor(color)}
      {...others}
    />
  )
}

ProductColors.propTypes = {}

ProductColors.defaultProps = {}
