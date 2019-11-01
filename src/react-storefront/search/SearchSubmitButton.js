import React, { useState, useEffect, useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import { useAmp } from 'next/amp'
import SearchIcon from '@material-ui/icons/Search'

export const styles = theme => ({
  root: {}
})
const useStyles = makeStyles(styles, { name: 'RSFSearchSubmitButton' })

/**
 * A button to submit the search.  All other props are spread to the provided `Component`.
 */
export default function SearchSubmitButton({ Component, classes, text, ...others }) {
  classes = useStyles({ classes })

  const amp = useAmp()

  return (
    <Component rel="search" type="submit" disabled={!amp && text.trim().length === 0} {...others}>
      <SearchIcon />
    </Component>
  )
}

SearchSubmitButton.propTypes = {
  /**
   * A Material UI button component to display.
   */
  Component: PropTypes.elementType.isRequired,
  /**
   * The current search text
   */
  text: PropTypes.string.isRequired
}

SearchSubmitButton.defaultProps = {}
