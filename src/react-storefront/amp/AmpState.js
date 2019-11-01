import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useAmp } from 'next/amp'
import AmpContext from './AmpContext'

/**
 * Serializes the page props as an amp-state.
 */
export default function AmpState({ id, children, state }) {
  const value = useMemo(
    () => ({
      ampState: id
    }),
    []
  )

  let scripts = null

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
              __html: JSON.stringify(state)
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

AmpState.propTypes = {
  /**
   * An id for the root object
   */
  id: PropTypes.string,

  /**
   * The page props
   */
  state: PropTypes.object.isRequired
}

AmpState.defaultProps = {
  id: 'page'
}
