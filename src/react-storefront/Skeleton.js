import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

export const defaultBaseColor = '#eee'
export const defaultHighlightColor = '#f5f5f5'

const styles = theme => ({
  root: {
    backgroundColor: defaultBaseColor,
    backgroundImage: `linear-gradient(90deg, ${defaultBaseColor}, ${defaultHighlightColor}, ${defaultBaseColor})`,
    backgroundSize: '200px 100%',
    backgroundRepeat: 'no-repeat',
    borderRadius: 4,
    display: 'inline-block',
    lineHeight: 1,
    width: '100%',
    animationDuration: '1.2s',
    animationFillMode: 'none',
    animationIterationCount: 'infinite',
    animationName: '$shimmer',
    animationTimingFunction: 'ease-in-out'
  },
  '@keyframes shimmer': {
    '0%': {
      backgroundPosition: '-200px 0'
    },
    '100%': {
      backgroundPosition: 'calc(200px + 100%) 0'
    }
  }
})

const useStyles = makeStyles(styles, { name: 'RSFSkeleton' })

export default function Skeleton({ classes, style }) {
  classes = useStyles({ classes })

  return (
    <div className={classes.root} style={style}>
      &zwnj;
    </div>
  )
}

Skeleton.defaultProps = {
  count: 1,
  width: null,
  wrapper: null,
  height: null,
  circle: false
}
