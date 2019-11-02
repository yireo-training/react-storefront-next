import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useAmp } from 'next/amp'
import AmpContext from './AmpContext'
import get from 'lodash/get'
import set from 'lodash/set'

/**
 * Serializes the page props as an amp-state.
 */
export default function AmpState({ id, children, store, updateStore, root }) {
  let scripts = null

  const value = useMemo(() => {
    return {
      getValue: path => get(store, `${normalizeRoot(root)}${path}`),
      setValue: (path, value) => {
        updateStore(store => {
          const newStore = { ...store }
          set(store, `${normalizeRoot(root)}${path}`, value)
          return newStore
        })
      },
      ampState: id,
      store,
      updateStore,
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
              __html: JSON.stringify(store.pageData)
            }}
          />
        </amp-state>
      </>
    )
  }

  return (
    <>
      {scripts}
      <AmpContext.Provider value={value}>{children}</AmpContext.Provider>
    </>
  )
}

function normalizeRoot(root) {
  if (root) root = `${root}.`
  return root
}

AmpState.propTypes = {
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
  updateStore: PropTypes.func
}

AmpState.defaultProps = {
  id: 'page',
  store: {},
  updateStore: Function.prototype
}
