import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import PropTypes from 'prop-types'
import CarouselDots from './CarouselDots'
import CarouselArrows from './CarouselArrows'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    position: 'relative',

    '& img': {
      display: 'block'
    }
  },

  swipeWrap: {
    position: 'relative',
    overflow: 'hidden',
    flex: 1,

    '& .react-swipeable-view-container, & > div:first-child': {
      height: '100%'
    }
  },

  '@media (hover:none)': {
    hideTouchArrows: {
      display: 'none'
    }
  }
})

const useStyles = makeStyles(styles, { name: 'RSFCarousel' })

const Carousel = React.forwardRef(
  (
    {
      children,
      classes,
      className,
      style,
      swipeStyle,
      slideStyle,
      arrows,
      aboveAdornments,
      belowAdornments,
      onMouseEnter,
      onMouseLeave
    },
    ref
  ) => {
    classes = useStyles({ classes })
    const [selected, setSelected] = useState(0)
    const count = children && children.length

    return (
      <div
        ref={ref}
        className={clsx(className, classes.root)}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {aboveAdornments}
        <div className={classes.swipeWrap}>
          <SwipeableViews
            index={selected}
            onChangeIndex={i => setSelected(i)}
            style={swipeStyle}
            slideStyle={slideStyle}
          >
            {children}
          </SwipeableViews>
          {arrows !== false && (
            <CarouselArrows
              className={arrows === 'desktop' ? classes.hideTouchArrows : null}
              selected={selected}
              setSelected={setSelected}
              count={count}
              selected={selected}
            />
          )}
          <CarouselDots
            selected={selected}
            setSelected={setSelected}
            count={count}
            selected={selected}
          />
        </div>
        {belowAdornments}
      </div>
    )
  }
)

Carousel.propTypes = {
  /**
   * Set to `false` to hide arrows, 'desktop' to only show them
   * on non-touch devices, 'all' to always show arrows.
   */
  arrows: PropTypes.oneOf([false, 'desktop', 'all']),
  aboveAdornments: PropTypes.arrayOf(PropTypes.element),
  belowAdornments: PropTypes.arrayOf(PropTypes.element)
}

Carousel.defaultProps = {
  inset: 0,
  arrows: 'desktop'
}

export default Carousel
