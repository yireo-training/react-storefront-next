import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Tabs from '@material-ui/core/Tabs'
import { useRouter } from 'next/router'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import clsx from 'clsx'

export const styles = theme => ({
  paper: {
    display: 'flex',
    justifyContent: 'center'
  },
  indicatorNoSelection: {
    display: 'none'
  },
  root: {
    maxWidth: theme.breakpoints.values.lg,
    flex: 1,
    position: 'relative',
    '&::before, &::before': {
      content: "''",
      top: 0,
      left: 0,
      width: '15px',
      height: 'calc(100% - 3px)',
      position: 'absolute',
      zIndex: 1
    },
    '&::before': {
      background:
        'linear-gradient(to right, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.0) 100%)'
    },
    '&::after': {
      background:
        'linear-gradient(to left, rgba(255, 255, 255, 1.0) 0%, rgba(255, 255, 255, 0.0) 100%)'
    }
  }
})

const useStyles = makeStyles(styles, { name: 'RSFNavTabs' })

/**
 * Scrollable navigation tabs for the top of the app. All extra props are spread to the
 * underlying Material UI Tabs element.  When a tab is clicked, the "top_nav_clicked" analytics
 * event is fired.
 */
export default function NavTabs({ classes, paperProps, children, style, ...others }) {
  const { paper, indicator, indicatorNoSelection, ...classNames } = useStyles({ classes })
  const { asPath } = useRouter()
  const value = children.findIndex(tab => tab.props.as === asPath)

  return (
    <Paper className={paper} square elevation={2} style={style} {...paperProps}>
      <Tabs
        variant="scrollable"
        classes={{
          ...classNames,
          indicator: clsx(indicator, {
            [indicatorNoSelection]: value === -1
          })
        }}
        value={value === -1 ? false : value}
        {...others}
      >
        {children}
      </Tabs>
    </Paper>
  )
}

NavTabs.propTypes = {
  paperProps: PropTypes.object
}

NavTabs.defaultProps = {
  paperProps: {}
}
