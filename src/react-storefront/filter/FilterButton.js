import React, { useEffect, useState, useCallback, memo } from 'react'
import ActionButton from '../ActionButton'
import Filter from './Filter'
import PropTypes from 'prop-types'
import Drawer from '../Drawer'
import makeStyles from '@material-ui/core/styles/makeStyles'
import clsx from 'clsx'
import grey from '@material-ui/core/colors/grey'
import { Hbox } from '../Box'
import { useRouter } from 'next/router'
import qs from 'qs'
import { useAmp } from 'next/amp'
import { useObserver } from 'mobx-react'

export const styles = theme => ({
  clear: {
    ...theme.typography.caption,
    padding: 0,
    marginLeft: '10px',
    textDecoration: 'underline'
  },
  clearDisabled: {
    color: grey[400]
  },
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
  store,
  title,
  drawerProps,
  hideClearLink,
  clearLinkText,
  onClick,
  ...props
}) {
  return useObserver(() => {
    classes = useStyles({ classes })

    const [state, setState] = useState({ open: false, loading: false, mountDrawer: false })
    const { filters, facets } = store.pageData
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
      store.actions.applyFilters()
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
            onRequestClose={toggleOpen.bind(null, false)}
            ModalProps={{
              keepMounted: true
            }}
            title={
              <Hbox justifyContent="center">
                <div>{title}</div>
                {hideClearLink || filters.length === 0 ? null : (
                  <button
                    onClick={store.actions.clearFilters}
                    className={clsx({
                      [clear]: true,
                      [clearDisabled]: loading
                    })}
                  >
                    {clearLinkText}
                  </button>
                )}
              </Hbox>
            }
          >
            {mountDrawer && (
              <Filter
                store={store}
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
  })
}

FilterButton.propTypes = {
  /**
   * A store returned from `react-storefront/hooks/useSearchResultsStore`
   */
  store: PropTypes.object.isRequired,

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
