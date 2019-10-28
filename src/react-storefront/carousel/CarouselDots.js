import React from 'react'
import clsx from 'clsx'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import { fade } from '@material-ui/core/styles/colorManipulator'

const styles = theme => ({
  dot: {
    backgroundColor: fade(theme.palette.text.primary, 0.25),
    width: 8,
    height: 8,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.background.paper,
    borderRadius: '50%',
    display: 'inline-block',
    margin: '0 2px',
    // Same duration as SwipeableViews animation
    transitionDuration: '0.35s'
  },

  dotSelected: {
    backgroundColor: theme.palette.text.primary
  },

  dots: {
    position: 'absolute',
    bottom: '5px',
    textAlign: 'center',
    width: '100%'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFCarouselDots' })

export default function CarouselDots({ count, selected, classes }) {
  const dots = []
  classes = useStyles({ classes })

  console.log('selected', selected)

  for (let i = 0; i < count; i++) {
    dots.push(
      <div
        key={i}
        className={clsx({
          [classes.dot]: true,
          [classes.dotSelected]: selected === i
        })}
      />
    )
  }

  return <div className={classes.dots}>{dots}</div>
}

CarouselDots.propTypes = {
  count: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired
}
