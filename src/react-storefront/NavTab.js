import Tab from '@material-ui/core/Tab'
import Link from './Link'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Popper from '@material-ui/core/Popper'
import Hidden from '@material-ui/core/Hidden'
import Fade from '@material-ui/core/Hidden'
import Paper from '@material-ui/core/Paper'
import { useState, useRef } from 'react'

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

export default function NavTab({ classes, href, as, children, ...props }) {
  classes = useStyles({ classes })

  const [overTab, setOverTab] = useState(false)
  const [overMenu, setOverMenu] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const toggleMenu = (show, event) => {
    setOverTab(show)

    if (show) {
      setAnchorEl(event.currentTarget)
    }
  }

  return (
    <>
      <Link
        className={classes.link}
        href={href}
        as={as}
        onMouseEnter={e => toggleMenu(true, e)}
        onMouseLeave={e => toggleMenu(false, e)}
      >
        <Tab className={classes.tab} {...props} />
      </Link>
      {!children ? null : (
        <Hidden xsDown>
          <Popper
            className={classes.menu}
            open={overTab || overMenu}
            anchorEl={anchorEl}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  square
                  onMouseEnter={() => setOverMenu(true)}
                  onMouseLeave={() => setOverMenu(false)}
                  onClick={() => setOverMenu(false)}
                >
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
