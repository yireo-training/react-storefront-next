import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import DataBindingProvider from 'react-storefront/bind/DataBindingProvider'

export const styles = theme => ({
  root: {}
})

const useStyles = makeStyles(styles, { name: 'RSFProductLink' })

export default function ProductLink({ classes, product, children }) {
  classes = useStyles({ classes })
  const [store, updateStore] = useState(product)

  return (
    <DataBindingProvider id={`p${product.id}`} store={store} updateStore={updateStore} root={null}>
      {children}
    </DataBindingProvider>
  )
}
ProductLink.propTypes = {}
ProductLink.defaultProps = {}
