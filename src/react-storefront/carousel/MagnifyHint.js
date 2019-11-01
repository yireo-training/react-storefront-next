import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { AddCircleOutline as Icon } from '@material-ui/icons'
import clsx from 'clsx'

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  wrap: {
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    lineHeight: 14,
    padding: '5px 10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    height: 16,
    width: 16,
    color: theme.palette.grey[300]
  },
  text: {
    marginLeft: 5,
    color: theme.palette.grey[300],
    position: 'relative',
    top: 1
  },
  over: {},
  zoomTextDesktop: {
    display: 'block',
    '$over &': {
      display: 'none'
    },
    '@media (hover:none)': {
      display: 'none'
    }
  },
  expandTextMobile: {
    display: 'none',
    '@media (hover:none)': {
      display: 'block'
    }
  },
  expandTextDesktop: {
    display: 'none',

    '$over &': {
      display: 'block',
      '@media (hover:none)': {
        display: 'none'
      }
    }
  }
})

const useStyles = makeStyles(styles, { name: 'RSFMagnifyHint' })

export default function MagnifyHint({ text, over }) {
  const classes = useStyles()

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.over]: over
      })}
    >
      <div className={classes.wrap}>
        <Icon className={classes.icon} alt="magify-icon" />
        <Typography variant="caption" className={clsx(classes.text, classes.zoomTextDesktop)}>
          Hover to Zoom
        </Typography>
        <Typography variant="caption" className={clsx(classes.text, classes.expandTextMobile)}>
          Tap to Expand
        </Typography>
        <Typography variant="caption" className={clsx(classes.text, classes.expandTextDesktop)}>
          Click to Expand
        </Typography>
      </div>
    </div>
  )
}

MagnifyHint.defaultProps = {
  text: 'Hover to Zoom'
}
