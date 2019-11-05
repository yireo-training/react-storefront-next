import React, { useState, useMemo, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ProductLinkContext from './ProductLinkContext'

export const styles = theme => ({
  root: {}
})
const useStyles = makeStyles(styles, { name: 'RSFProductLink' })

export default function ProductLink({ classes, product, children }) {
  classes = useStyles({ classes })

  const [color, setColor] = useState({ thumbnail: product.thumbnail })

  const context = useMemo(() => {
    return {
      color,
      setColor
    }
  }, [color])

  return <ProductLinkContext.Provider value={context}>{children}</ProductLinkContext.Provider>
}

ProductLink.propTypes = {}

ProductLink.defaultProps = {}
