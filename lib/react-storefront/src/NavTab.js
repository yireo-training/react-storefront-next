import Tab from '@material-ui/core/Tab'
import Link from './link/Link'
import { makeStyles } from '@material-ui/core/styles'
import { Popper, Hidden, Fade, Paper } from '@material-ui/core'
import { useState, useCallback } from 'react'

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: 100
  },
  tab: {
    fontWeight: 'normal',
    height: 56,
    whiteSpace: 'nowrap',
    ...theme.typography.body1
  },
  menu: {
    zIndex: theme.zIndex.appBar
  }
})

const useStyles = makeStyles(styles, { name: 'RSFNavTab' })

function NavTab({ classes, href, as, children, ...props }) {
  classes = useStyles({ classes })

  const [overTab, setOverTab] = useState(false)
  const [overMenu, setOverMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const showMenu = useCallback(event => {
    setOverTab(true)
    setAnchorEl(event.currentTarget)
  })

  const hideMenu = useCallback(() => setOverTab(false))
  const leaveMenu = useCallback(() => setOverMenu(false))
  const enterMenu = useCallback(() => setOverMenu(true))

  return (
    <>
      <Link
        className={classes.link}
        href={href}
        as={as}
        onMouseEnter={showMenu}
        onMouseLeave={hideMenu}
        prefetch="visible"
      >
        <Tab className={classes.tab} {...props} />
      </Link>
      {!children ? null : (
        <Hidden xsDown>
          <Popper open={overTab || overMenu} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper square onMouseEnter={enterMenu} onMouseLeave={leaveMenu} onClick={leaveMenu}>
                  {children}
                </Paper>
              </Fade>
            )}
          </Popper>
        </Hidden>
      )}
    </>
  )
}

export default React.memo(NavTab)
