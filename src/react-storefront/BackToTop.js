/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Fab from '@material-ui/core/Fab'
import Fade from '@material-ui/core/Fade'
import makeStyles from '@material-ui/core/styles/makeStyles'

const styles = () => ({
  root: {
    zIndex: 1,
    position: 'fixed',
    bottom: 24,
    right: 16
  },
  fab: {
    background: 'rgba(0,0,0,.85)',
    '&:hover': {
      background: 'rgb(0,0,0)'
    }
  },
  icon: {
    color: 'white'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFBackToTop' })

/**
 * A floating action buttion that appears when the user scrolls down
 * and scrolls to the top of the page when clicked.
 */
export default function BackToTop({
  Icon,
  showUnderY,
  instantBehaviorUnderY,
  classes,
  fadeTime,
  size
}) {
  const [visible, setVisible] = useState(false)
  const el = useRef()
  classes = useStyles({ classes })

  useEffect(() => {
    const onScroll = throttle(() => {
      setVisible(
        getScrollY() > showUnderY &&
          el.current.parentElement &&
          el.current.parentElement.offsetParent != null
      )
    }, 200)

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    const behavior = getScrollY() > instantBehaviorUnderY ? 'auto' : 'smooth'
    window.scrollTo({ top: 0, left: 0, behavior })
  }

  Icon = Icon || ArrowUpward

  return (
    <div className={classes.root} ref={el}>
      <Fade in={visible} timeout={fadeTime}>
        <Fab className={classes.fab} size={size} onClick={scrollToTop} title="back to top">
          <Icon className={classes.icon} />
        </Fab>
      </Fade>
    </div>
  )
}

BackToTop.propTypes = {
  /**
   * The icon to use within Fab component
   */
  Icon: PropTypes.func,
  /**
   * value which controls where along the Y position the BackToTop component is shown
   */
  showUnderY: PropTypes.number,
  /**
   * When the scroll position is less than this value, the page will smoothly scroll back up. If
   * the scroll position is more than this value, the page will immediately scroll back up.
   */
  instantBehaviorUnderY: PropTypes.number,
  /**
   * Fade in/out animation time of icon
   */
  fadeTime: PropTypes.number,
  /**
   * Controls size of component. Values allowed are [small, medium, large]
   */
  size: PropTypes.string
}

BackToTop.defaultProps = {
  showUnderY: 250,
  instantBehaviorUnderY: 3000,
  fadeTime: 320,
  size: 'medium'
}

function getScrollY() {
  return window.scrollY || window.pageYOffset
}
