import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useAmp } from 'next/amp'
import DataBindingContext from './DataBindingContext'
import get from 'lodash/get'
import set from 'lodash/set'

/**
 * Provides a way to access and update state that works with both React and AMP.
 *
 * All page components should use `DataBindingProvider` as the root element:
 *
 * ```js
 * function Product(lazyProps) {
 *   const [store, updateStore] = useLazyStore(lazyProps)
 *
 *   return (
 *     <DataBindingProvider store={store} updateStore={updateStore}>
 *        // access values from page state by name
 *        <Typography variant="h1">
 *          <Bind name="product.name"/>
 *        </Typography>
 *
 *        // form fields will automatically update state by name
 *        <Label>QTY:</Label>
 *        <QuantitySelector name="quanity"/>
 *     </DataBindingProvider>
 *   )
 * })
 * ```
 */
export default function DataBindingProvider({ id, children, store, updateStore, root }) {
  let scripts = null

  const value = useMemo(() => {
    return {
      getValue: path => {
        return get(store, `${normalizeRoot(root)}${path}`)
      },
      setValue: (path, value) => {
        updateStore(store => {
          const newStore = { ...store }
          set(newStore, `${normalizeRoot(root)}${path}`, value)
          return newStore
        })
      },
      ampState: id,
      root
    }
  }, [store, updateStore, id, root])

  if (useAmp()) {
    scripts = (
      <>
        <Head>
          <script
            async
            custom-element="amp-bind"
            src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
          />
        </Head>
        <amp-state id={id}>
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(root ? get(store, root) : store)
            }}
          />
        </amp-state>
      </>
    )
  }

  return (
    <>
      {scripts}
      <DataBindingContext.Provider value={value}>{children}</DataBindingContext.Provider>
    </>
  )
}

function normalizeRoot(root) {
  if (root) {
    return `${root}.`
  } else {
    return ''
  }
}

DataBindingProvider.propTypes = {
  /**
   * An id for the root object
   */
  id: PropTypes.string,

  /**
   * The page store returned from `hooks/useLazyStore`
   */
  store: PropTypes.object,

  /**
   * The page store update function returned from `hooks/useLazyStore`
   */
  updateStore: PropTypes.func,

  /**
   * A path prepended to all paths passed to `getValue` and `setValue`.
   */
  root: PropTypes.string
}

DataBindingProvider.defaultProps = {
  id: 'page',
  store: {},
  updateStore: Function.prototype,
  root: 'pageData'
}
