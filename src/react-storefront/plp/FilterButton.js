import React, { useEffect, useState, useCallback, memo, useContext } from 'react'
import ActionButton from '../ActionButton'
import SearchResultsContext from './SearchResultsContext'
import Filter from './Filter'
import PropTypes from 'prop-types'
import Drawer from '../drawer/Drawer'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useRouter } from 'next/router'
import qs from 'qs'
import { useAmp } from 'next/amp'
import SearchResultsContext from './SearchResultsContext'

export const styles = theme => ({
  drawer: {
    height: '75vh'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFFilterButton' })

/**
 * A button that when clicked, opens a drawer containing the `Filter` view. Current filters
 * are displayed in the button text.
 */
function FilterButton({
  classes,
  title,
  drawerProps,
  hideClearLink,
  clearLinkText,
  onClick,
  ...props
}) {
  classes = useStyles({ classes })

  const {
    pageData: { filters, facets },
    actions
  } = useContext(SearchResultsContext)

  const [state, setState] = useState({ open: false, loading: false, mountDrawer: false })
  const { open, mountDrawer, loading } = state
  const { clear, clearDisabled, drawer, ...buttonClasses } = useStyles(classes)
  const router = useRouter()
  const { amp, ...query } = router.query
  const ampUrl = router.asPath + qs.stringify({ ...query, openFilter: 1 })

  useEffect(() => {
    if (location.search.indexOf('openFilter') !== -1) {
      setState({ open: true, mountDrawer: true })
    }
  }, [])

  const toggleOpen = open => {
    setState({ ...state, open, mountDrawer: mountDrawer || true })
  }

  const handleClick = e => {
    if (onClick) {
      onClick(e)
    }

    if (!e.defaultPrevented) {
      toggleOpen(true)
    }
  }

  const handleViewResultsClick = useCallback(() => {
    toggleOpen(false)
    actions.applyFilters()
  })

  const getFilterList = () => {
    if (!filters || !facets) return null
    if (filters.length > 1) return `${filters.length} selected`

    const names = []
    const selection = {}

    for (let facet of filters) {
      selection[facet] = true
    }

    for (let group of facets) {
      for (let facet of group.facets) {
        if (selection[facet.code]) {
          names.push(facet.name)
        }
      }
    }

    return names.length ? names.join(', ') : null
  }

  return (
    <>
      <ActionButton
        label={title}
        href={amp ? ampUrl : null}
        value={getFilterList()}
        classes={buttonClasses}
        onClick={handleClick}
        {...props}
      />
      {!useAmp() && (
        <Drawer
          classes={{ paper: classes.drawer }}
          anchor="bottom"
          open={open}
          onClose={toggleOpen.bind(null, false)}
          ModalProps={{
            keepMounted: true
          }}
        >
          {mountDrawer && (
            <Filter
              loading={loading}
              setLoading={() => setState({ ...state, loading })}
              onViewResultsClick={handleViewResultsClick}
              {...drawerProps}
            />
          )}
        </Drawer>
      )}
    </>
  )
}

FilterButton.propTypes = {
  /**
   * CSS classes
   */
  classes: PropTypes.object,

  /**
   * Props for the underlying `Filter` component
   */
  drawerProps: PropTypes.object,

  /**
   * The label for the button and the drawer header.  Defaults to "Filter".
   */
  title: PropTypes.string,

  /**
   * Set to true to hide the clear link that is shown by default when one or more filters
   * is selected.  Defaults to false.
   */
  hideClearLink: PropTypes.bool,

  /**
   * Text for the clear link.  Defaults to "clear all".
   */
  clearLinkText: PropTypes.string
}

FilterButton.defaultProps = {
  title: 'Filter',
  drawerProps: {},
  hideClearLink: false,
  clearLinkText: 'clear all'
}

export default memo(FilterButton)
