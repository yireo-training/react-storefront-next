/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { memo, useState, useContext } from 'react'
import ActionButton from '../ActionButton'
import Sort from './Sort'
import PropTypes from 'prop-types'
import Drawer from '../drawer/Drawer'
import Menu from '@material-ui/core/Menu'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import qs from 'qs'
import { useAmp } from 'next/amp'
import { useRouter } from 'next/router'
import SearchResultsContext from './SearchResultsContext'

/**
 * A button that when clicked, opens a drawer containing the `Sort` view. The name of the currently
 * selected sortOption is display in the button text.
 */
function SortButton({
  variant,
  title,
  drawerProps,
  onClick,
  sortProps,
  drawerBreakpoint,
  ...props
}) {
  const isAmp = useAmp()
  const theme = useTheme()
  const [state, setState] = useState({
    open: false,
    loading: false,
    mountDrawer: false,
    anchorEl: null
  })
  const { open, mountDrawer, loading, anchorEl } = state
  const {
    pageData: { sort, sortOptions }
  } = useContext(SearchResultsContext)
  const selectedOption = sortOptions.find(o => sort === o.code)
  const router = useRouter()
  const { amp, ...query } = router.query
  const ampUrl = router.asPath + qs.stringify({ ...query, openFilter: 1 })

  const handleClick = e => {
    if (onClick) {
      onClick(e)
    }

    if (!e.defaultPrevented) {
      toggleOpen(true, e.currentTarget)
    }
  }

  const close = () => {
    toggleOpen(false)
  }

  const toggleOpen = (open, anchorEl) => {
    if (open) {
      setState({ mountDrawer: true, open: true, anchorEl: anchorEl })
    } else {
      setState({ open: false, anchorEl: null })
    }
  }

  const useDrawer = useMediaQuery(theme.breakpoints.down(drawerBreakpoint))

  return (
    <>
      <ActionButton
        key="button"
        href={isAmp ? ampUrl : null}
        label={title}
        value={selectedOption && selectedOption.name}
        {...props}
        onClick={e => handleClick(e)}
      />
      {!isAmp && useDrawer && (
        <Drawer
          ModalProps={{
            keepMounted: true
          }}
          key="drawer"
          anchor="bottom"
          title={title}
          open={open}
          onClose={close}
          {...drawerProps}
        >
          {mountDrawer && (
            <Sort
              loading={loading}
              setLoading={() => setState({ ...state, loading })}
              onSelect={close}
              {...sortProps}
            />
          )}
        </Drawer>
      )}
      {!isAmp && !useDrawer && (
        <Menu open={open} anchorEl={anchorEl} onClose={close}>
          <Sort variant="menu-items" onSelect={close} {...sortProps} />
        </Menu>
      )}
    </>
  )
}

SortButton.propTypes = {
  /**
   * CSS classes
   */
  classes: PropTypes.object,

  /**
   * Props to pass to the underlying `Drawer` component.
   */
  drawerProps: PropTypes.object,

  /**
   * Props to pass to the underlying `Sort` component.
   */
  sortProps: PropTypes.object,

  /**
   * Text for the button label and the drawer header.  Defaults to "Sort".
   */
  title: PropTypes.string,

  /**
   * The breakpoint in your theme below which a drawer UI should be used in favor of the menu UI.
   */
  drawerBreakpoint: PropTypes.string
}

SortButton.defaultProps = {
  title: 'Sort',
  drawerProps: {},
  sortProps: {},
  drawerBreakpoint: 'xs'
}

export default memo(SortButton)
