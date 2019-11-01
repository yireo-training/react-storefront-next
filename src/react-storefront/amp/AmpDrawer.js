import React, { useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import DrawerCloseButton from '../drawer/DrawerCloseButton'
import AmpContext from './AmpContext'
import PropTypes from 'prop-types'

const animationByAnchor = {
  top: 'fly-in-top',
  bottom: 'fly-in-bottom'
}

export const styles = theme => ({
  backdrop: {
    top: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: '0',
    position: 'fixed',
    display: 'block',
    zIndex: theme.zIndex.amp.modal + 1
  },

  fullscreen: {
    height: '100vh',
    width: '100vw'
  },

  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '-28px',
    zIndex: 1
  },

  hidden: {
    display: 'none'
  },

  lightbox: {
    zIndex: theme.zIndex.amp.modal + 2
  },

  container: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    flexWrap: 'nowrap',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow:
      '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)'
  },

  anchorLeft: {
    left: 0
  },

  anchorRight: {
    right: 0
  },

  sidebar: {
    backgroundColor: 'white',
    boxShadow:
      '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
    '& ~ div[class*="amphtml-sidebar-mask"]': {
      display: 'none'
    }
  }
})

const useStyles = makeStyles(styles, { name: 'RSFAmpDrawer' })

export default function AmpDrawer({
  classes,
  children,
  anchor,
  showCloseButton = anchor === 'bottom',
  fullscreen
}) {
  classes = useStyles({ classes })
  const { ampState } = useContext(AmpContext)

  if (anchor === 'left' || anchor === 'right') {
    return (
      <React.Fragment>
        <Head>
          <script
            async
            custom-element="amp-sidebar"
            src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
          />
        </Head>
        <div
          className={classes.hidden}
          on={`tap:${ampState}.close`}
          amp-bind={`class=>${ampState}.open ? "${clsx(classes.backdrop)}" : "${classes.hidden}"`}
        >
          <amp-sidebar
            class={clsx({
              [classes.sidebar]: true,
              [classes.anchorLeft]: anchor === 'left',
              [classes.anchorRight]: anchor === 'right'
            })}
            id={ampState}
            layout="nodisplay"
            side={anchor}
            on={`sidebarClose:AMP.setState({ ${ampState}: { open: false } })`}
          >
            {children}
          </amp-sidebar>
        </div>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Head>
        <script
          async
          custom-element="amp-lightbox"
          src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"
        />
      </Head>
      <div
        className={classes.hidden}
        on={`tap:AMP.setState({ ${ampState}: { open: false }})`}
        amp-bind={`class=>${ampState}.open ? "${clsx(classes.backdrop)}" : "${classes.hidden}"`}
      >
        <amp-lightbox
          class={clsx({
            [classes.lightbox]: true,
            [classes.fullscreen]: fullscreen
          })}
          animate-in={animationByAnchor[anchor]}
          layout="nodisplay"
          amp-bind={`open=>${ampState}.open`}
        >
          <Paper
            className={classes.container}
            square
            on={`tap:AMP.setState({ ${ampState}: { open: true }})`}
          >
            {showCloseButton && <DrawerCloseButton ampState={ampState} fullscreen={fullscreen} />}
            {children}
          </Paper>
        </amp-lightbox>
      </div>
    </React.Fragment>
  )
}

AmpDrawer.propTypes = {}

AmpDrawer.defaultProps = {
  anchor: 'bottom'
}
