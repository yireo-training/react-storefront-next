import React, { useContext, useRef, useEffect, useState, useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import MUIDrawer from '@material-ui/core/Drawer'
import Close from '@material-ui/icons/Close'
import Fab from '@material-ui/core/Fab'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useAmp } from 'next/amp'
import AMPContext from './AMPContext'

/**
 * A slide-in drawer with fab close button.
 */
export const styles = theme => ({
  root: {
    zIndex: theme.zIndex.modal + 10
  },

  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '-28px',
    zIndex: 1
  },

  container: {
    height: '100%',
    boxSizing: 'border-box',
    flexWrap: 'nowrap',
    display: 'flex',
    flexDirection: 'column'
  },

  content: {
    flexBasis: '100%',
    overflow: 'auto'
  },

  paper: {
    overflowY: 'visible'
  },

  title: {
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 1,
    width: '100%',
    height: '72px',
    lineHeight: '72px',
    textAlign: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`
  },

  ampClosed: {
    display: 'none'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFDrawer' })

export default function Drawer({
  ampBindClosed,
  variant,
  closeButtonProps,
  showCloseButton,
  open,
  onRequestClose,
  title,
  children,
  classes,
  autoAdjustBodyPadding,
  anchor,
  ...rest
}) {
  classes = useStyles({ classes })

  const amp = useAmp()
  const { ampStateId } = useContext(AMPContext)
  const drawer = useRef(null)
  const drawerResize = useRef(null)

  const setPadding = useCallback(() => {
    if (autoAdjustBodyPadding) {
      requestAnimationFrame(() => {
        const el = drawer.current
        document.body.style.paddingBottom = el && el.clientHeight + 'px'
      })
    }
  })

  const closeDrawer = useCallback(() => {
    onRequestClose()
    document.body.style.paddingBottom = 0
  })

  useEffect(() => {
    const el = drawer.current

    setPadding()

    if (autoAdjustBodyPadding && el) {
      drawerResize.current = new ResizeObserver(() => {
        document.body.style.paddingBottom = el && el.clientHeight + 'px'
      })
      drawerResize.observe(el)
    }

    return () => {
      if (drawerResize.current && el) {
        drawerResize.current.unobserve(el)
      }
    }
  }, [])

  useEffect(() => {
    if (open) {
      setPadding()
    } else {
      closeDrawer()
    }
  }, [open])

  return (
    <MUIDrawer
      anchor={anchor}
      classes={{
        root: classes.root,
        paper: clsx({
          [classes.paper]: true,
          [classes.ampClosed]: amp && !open
        })
      }}
      amp-bind={
        ampBindClosed
          ? `class=>${ampStateId}.${ampBindClosed} ? '${classes.ampClosed}' : null`
          : null
      }
      open={(amp && variant === 'temporary') || open}
      variant={variant}
      onClose={onRequestClose && onRequestClose}
      {...rest}
    >
      <div className={classes.container} ref={drawer}>
        {title && (
          <Typography className={classes.title} variant="h6" component="div">
            {title}
          </Typography>
        )}

        {showCloseButton && anchor === 'bottom' && (
          <Fab
            color="primary"
            className={classes.closeButton}
            onClick={closeDrawer}
            style={{ display: open ? '' : 'none' }}
            on={
              ampBindClosed
                ? `tap:AMP.setState({ ${ampStateId}: { ${ampBindClosed}: true }})`
                : null
            }
            {...closeButtonProps}
          >
            <Close />
          </Fab>
        )}

        <div className={classes.content}>{children}</div>
      </div>
    </MUIDrawer>
  )
}
Drawer.propTypes = {
  /**
   * Set to false to hide the close button. Defaults to true
   */
  showCloseButton: PropTypes.bool,

  /**
   * Called when the user closes the drawer
   */
  onRequestClose: PropTypes.func.isRequired,

  /**
   * The title to display at the top of the drawer
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Set to true to automatically add padding to the body when the drawer
   * is open so that the user is able to scroll and see all of the body content.
   * Defaults to false.
   */
  autoAdjustBodyPadding: PropTypes.bool,

  /**
   * Props to apply to the closeButton
   */
  closeButtonProps: PropTypes.object,

  /**
   * The name of a property the amp-state to bind to the closed state of the drawer.
   */
  ampBindClosed: PropTypes.string,

  /**
   * Side from which the drawer will appear (top, left, right, bottom). Defaults to 'bottom'
   */
  anchor: PropTypes.string
}

Drawer.defaultProps = {
  showCloseButton: true,
  autoAdjustBodyPadding: false,
  closeButtonProps: {},
  variant: 'temporary',
  anchor: 'bottom'
}
