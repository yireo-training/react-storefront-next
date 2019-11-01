/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React from 'react'
import { Star, StarBorder, StarHalf } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Hbox } from './Box'

/**
 * Displays a star rating corresponding to the provided value
 */
export const styles = theme => ({
  root: {
    display: 'flex',
    '& svg': {
      color: theme.palette.rating,
      height: '16px',
      width: '16px',
      display: 'block'
    }
  },
  filledEmpty: {
    fill: theme.palette.divider
  },
  blank: {
    '& svg': {
      color: theme.palette.divider
    }
  },
  reviewsLabel: {
    marginLeft: '3px'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFRating' })

export default function Rating({
  iconFull,
  iconHalf,
  iconEmpty,
  classes,
  value,
  label,
  reviewCount,
  className,
  product,
  fillEmpty
}) {
  let stars = []

  if (product) {
    reviewCount = product.reviewCount
    value = product.rating
  }

  classes = useStyles({ classes })

  const IconFull = iconFull || Star
  const IconHalf = iconHalf || StarHalf
  const IconEmpty = iconEmpty || StarBorder

  for (let i = 1; i <= 5; i++) {
    if (value == null || value >= i) {
      stars.push(<IconFull key={i} />)
    } else if (value >= i - 0.5) {
      stars.push(<IconHalf key={i} />)
    } else if (fillEmpty) {
      stars.push(<IconFull className={classes.filledEmpty} key={i} />)
    } else {
      stars.push(<IconEmpty key={i} />)
    }
  }

  return (
    <Hbox>
      <div className={clsx(classes.root, className, { [classes.blank]: value == null })}>
        {stars}
      </div>
      {reviewCount ? (
        <div className={classes.reviewsLabel}>
          ({reviewCount}
          {label(reviewCount)})
        </div>
      ) : null}
    </Hbox>
  )
}

Rating.propTypes = {
  /**
   * CSS classes to apply
   */
  classes: PropTypes.object,

  /**
   * The number of stars to display.  Can be an integer or a float
   * ending in .5.
   */
  value: PropTypes.number,

  /**
   * The number of reviews
   */
  reviewCount: PropTypes.number,

  /**
   * A function that returns the label displayed to the right of the review count.
   * For example: `<Rating label={reviewCount => <span> {reviewCount == 1 ? 'review' : 'reviews'}</span>}/>`.
   * This value used in this example is the default.
   */
  label: PropTypes.func,

  /**
   * An instance of ProductModelBase.  You can set this instead of setting value an reviewCount individually.
   */
  product: PropTypes.object,

  /**
   * Custom full point icon
   */
  iconFull: PropTypes.func,

  /**
   * Custom half point icon
   */
  iconHalf: PropTypes.func,

  /**
   * Custom empty icon, will override fillEmpty icon
   */
  iconEmpty: PropTypes.func,

  /**
   * Use filled icon with light grey background for empty icon
   */
  fillEmpty: PropTypes.bool
}

Rating.defaultProps = {
  label: reviewCount => <span> {reviewCount == 1 ? 'review' : 'reviews'}</span>,
  fillEmpty: false
}
