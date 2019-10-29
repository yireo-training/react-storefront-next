import React, { useContext } from 'react'
import Hidden from '@material-ui/core/Hidden'
import ToolbarButton from '../ToolbarButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import MenuIcon from './MenuIcon'
import PropTypes from 'prop-types'
import { useObserver } from 'mobx-react'
import clsx from 'clsx'

export const styles = theme => ({
  link: {
    textDecoration: 'none'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFMenuButton' })

/**
 * The button that controls that opens and closes the main app menu.
 */
export default function MenuButton({
  MenuIcon,
  menuIconProps,
  open,
  onClick,
  classes,
  className,
  style
}) {
  classes = useStyles({ classes })

  return useObserver(() => (
    <Hidden mdUp implementation="css" key="menuButton">
      <a
        on="tap:AMP.setState({ rsfMenu: { open: !rsfMenu.open, list: '@' } }), moov_menu.toggle"
        className={clsx(classes.link, className)}
        style={style}
      >
        <ToolbarButton
          aria-label="Menu"
          color="inherit"
          onClick={onClick}
          icon={<MenuIcon open={open} {...menuIconProps} />}
        />
      </a>
    </Hidden>
  ))
}

MenuButton.propTypes = {
  /**
   * A react component to use for the menu icon
   */
  MenuIcon: PropTypes.func,

  /**
   * Props for the menu icon
   */
  menuIconProps: PropTypes.object
}

MenuButton.defaultProps = {
  MenuIcon,
  menuIconProps: {}
}
