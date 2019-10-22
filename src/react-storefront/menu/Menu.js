import React, { useContext } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import menuStyles from './menuStyles'
import MenuContext from './MenuContext'
import Drawer from '@material-ui/core/Drawer'
import clsx from 'clsx'
import SEOLinks from './SEOLinks'
import MenuBody from './MenuBody'
import PropTypes from 'prop-types'
import { useObserver } from 'mobx-react'

export const styles = menuStyles

const useStyles = makeStyles(styles, { name: 'RSFMenu' })

export default function Menu({
  classes,
  className,
  align,
  drawerWidth,
  persistent,
  simple,
  menuStore,
  ...others
}) {
  classes = useStyles({ classes })
  menuStore.classes = classes

  return useObserver(() => (
    <>
      <MenuContext.Provider value={menuStore}>
        <Drawer
          variant={persistent ? 'persistent' : 'temporary'}
          open={menuStore.open || persistent}
          onClose={() => (menuStore.open = false)}
          anchor={align}
          ModalProps={{
            keepMounted: true
          }}
          PaperProps={{
            style: { width: `${drawerWidth}px` }
          }}
          classes={{
            root: className,
            paper: clsx(classes.drawer, {
              [classes.drawerFixed]: persistent
            }),
            modal: classes.modal
          }}
        >
          <MenuBody drawerWidth={drawerWidth} simple={simple} {...others} />
        </Drawer>
        <SEOLinks />
      </MenuContext.Provider>
    </>
  ))
}

Menu.propTypes = {
  menu: PropTypes.object,

  /**
   * The width of the drawer in pixels
   */
  drawerWidth: PropTypes.number,

  /**
   * An element to display at the top of the root of the menu
   */
  rootHeader: PropTypes.element,

  /**
   * An element to display at the bottom of the root of the menu
   */
  rootFooter: PropTypes.element,

  /**
   * A function to render a custom header in leaf lists.  It is passed an object
   * with:
   *
   * - list: The menu model being rendered
   * - goBack: A function to call to go back to the previous list
   *
   * The function should return a React element or fragment.
   */
  renderLeafHeader: PropTypes.func,

  /**
   * A function to render a custom footer in leaf lists.  It is passed an object
   * with:
   *
   * - list: The menu model being rendered
   *
   * The function should return a React element or fragment.
   */
  renderLeafFooter: PropTypes.func,

  /**
   * Set to true to use expandable menu items below depth 1
   */
  useExpanders: PropTypes.bool,

  /**
   * Set to true to expand first item for not root items
   */
  expandFirstItem: PropTypes.bool,

  /**
   * Set to true to display the menu
   */
  open: PropTypes.bool,

  /**
   * Set to true to dock the menu so that it's always open and not modal
   */
  persistent: PropTypes.bool,

  /**
   * CSS classes for this component
   */
  classes: PropTypes.objectOf(PropTypes.string),

  /**
   * Called when the menu is closed
   */
  onClose: PropTypes.func,

  /**
   * Set to true to render a simple set of expanders rather than a multi-level drill down.
   * Defaults to false.
   */
  simple: PropTypes.bool,

  /**
   * The icon to use for collapsed groups
   */
  ExpandIcon: PropTypes.func,

  /**
   * The icon to use for expanded groups
   */
  CollapseIcon: PropTypes.func,

  /**
   * Sets the side of the screen from which the menu appears.
   */
  align: PropTypes.oneOf(['left', 'right']),

  /**
   * Overrides the default rendering of a menu item.  It is passed the following arguments:
   *
   * - item - the MenuItemModel instance.
   *
   * Return undefined to render the default contents
   *
   * Example:
   *
   * ```js
   *  itemRenderer={item => {
   *    return item.text === 'My Special Item ? <MySpecialItem/> : null
   *  }}
   * ```
   */
  itemRenderer: PropTypes.func,

  /**
   * Overrides the content of a menu item.  It is passed the following arguments:
   *
   * - item - the MenuItemModel instance.
   * - leaf - `true` when the item is a leaf node, otherwise `false`
   *
   * Return null to render the default contents
   *
   * Example:
   *
   * ```js
   *  itemContentRenderer={(item, leaf) => {
   *    return leaf ? <ListItemText primary={item.text}/> : null
   *  }}
   * ```
   */
  itemContentRenderer: PropTypes.func,

  /**
   * Set to `true` to show the item corresponding to the current URL as selected.
   */
  trackSelected: PropTypes.bool
}

Menu.defaultProps = {
  drawerWidth: 330,
  simple: false,
  expandFirstItem: false,
  align: 'left',
  trackSelected: false
}
