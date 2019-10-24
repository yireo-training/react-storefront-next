import React, { useContext } from 'react'
import Hidden from '@material-ui/core/Hidden'
import ToolbarButton from '../ToolbarButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import MenuContext from './MenuContext'
import MenuIcon from './MenuIcon'
import PropTypes from 'prop-types'
import { useObserver } from 'mobx-react'

export const styles = theme => ({
  link: {
    textDecoration: 'none'
  }
})

const useStyles = makeStyles(styles, { name: 'RSFMenuButton' })

/**
 * The button that controls that opens and closes the main app menu.
 */
export default function MenuButton({ MenuIcon, menuIconProps, open, onClick, classes }) {
  classes = useStyles({ classes })

  return useObserver(() => (
    <Hidden mdUp implementation="css" key="menuButton">
      <a
        on="tap:AMP.setState({ rsfMenu: { open: !rsfMenu.open, list: '@' } }), moov_menu.toggle"
        className={classes.link}
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
