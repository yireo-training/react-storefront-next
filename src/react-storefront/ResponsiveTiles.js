/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { useRef } from 'react'
import GridListTile from '@material-ui/core/GridListTile'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

/**
 * A responsive grid of tiles that changes the number of columns based on the viewport size.
 * This component commonly used in product listings and search results.
 */
export default function ResponsiveTiles(props) {
  const Tiles = useRef(createTiles(props))
  const { cols, spacing, ...others } = props
  return <Tiles.current {...others} />
}

ResponsiveTiles.propTypes = {
  /**
   * A map of viewport widths to number of columns.  For example:
   * ```
   *  cols={{
   *    xs: 2,
   *    sm: 3,
   *    md: 4,
   *    lg: 5,
   *    xl: 5
   *  }}
   * ```
   *
   * The amounts shown in the example above are the defaults.
   */
  cols: PropTypes.object,

  /**
   * The spacing between the tiles in theme spacing units. Defaults to 1
   */
  spacing: PropTypes.number
}

ResponsiveTiles.defaultProps = {
  cols: {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 5
  },
  spacing: 1
}

function createTiles({ cols }) {
  const useStyles = makeStyles(theme => {
    let breakpoints = {}

    // Breakpoints MUST be set in order from smallest to largest
    Object.keys(cols)
      .map(width => {
        return {
          key: width,
          value: cols[width],
          width: `${100 / cols[width]}%`
        }
      })
      .sort((a, b) => a.value - b.value)
      .forEach(({ key, width }) => {
        breakpoints[theme.breakpoints.up(key)] = { width }
      })

    return {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflowY: 'auto',
        listStyle: 'none',
        padding: 0,
        margin: `-${theme.spacing(1)}px`,
        WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.
      },
      tile: {
        ...breakpoints,
        padding: `${theme.spacing(1)}px`,
        height: 'auto'
      }
    }
  }, 'RSFResponsiveTiles')

  return function Tiles({ className, classes, children, ...other }) {
    classes = useStyles({ classes })

    return (
      <ul className={clsx(className, classes.root)} {...other}>
        {React.Children.map(children, (child, i) => {
          if (!React.isValidElement(child)) {
            return null
          }
          return (
            <GridListTile key={i} classes={{ root: classes.tile }}>
              {child}
            </GridListTile>
          )
        })}
      </ul>
    )
  }
}
