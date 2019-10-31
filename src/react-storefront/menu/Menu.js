import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import menuStyles from './menuStyles'
import MenuContext from './MenuContext'
import Drawer from '@material-ui/core/Drawer'
import clsx from 'clsx'
import SEOLinks from './SEOLinks'
import MenuBody from './MenuBody'
import PropTypes from 'prop-types'

export const styles = menuStyles

const useStyles = makeStyles(styles, { name: 'RSFMenu' })

function Menu({
  classes,
  className,
  align,
  drawerWidth,
  persistent,
  root,
  open,
  onClose,
  expandFirstItem,
  renderLeafFooter,
  renderLeafHeader,
  itemRenderer,
  itemContentRenderer,
  useExpanders,
  ...others
}) {
  classes = useStyles({ classes })

  const [state, setState] = useState(() => {
    return {
      level: 0,
      levels: [{ ...root, root: true }]
    }
  })

  // this is needed so we can always update the *current* state, not the snapshot that
  // was present when the callbacks were memoized
  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  // this ensures that the expanded state is reset when showing a new level
  const nextKey = useRef(0)

  const onItemClick = (item, depth) => {
    const levels = [...stateRef.current.levels]
    const level = depth + 1

    item.key = nextKey.current++ // this ensures that the expanded state is reset when showing a new level

    if (level >= levels.length) {
      levels.push(item)
    } else {
      levels[level] = item
    }

    setState({
      level,
      levels: levels.slice(0, level + 1)
    })
  }

  const goBack = level => {
    setState({
      level,
      levels: stateRef.current.levels
    })
  }

  // it is implortant to memoize the context, otherwise it will cause all consumers rerender
  // every time Menu rerenders
  const context = useMemo(
    () => ({
      classes,
      onItemClick,
      goBack,
      expandFirstItem,
      renderLeafFooter,
      renderLeafHeader,
      itemRenderer,
      itemContentRenderer,
      useExpanders,
      close: onClose
    }),
    [classes]
  )

  return (
    <>
      <MenuContext.Provider value={context}>
        <Drawer
          variant={persistent ? 'persistent' : 'temporary'}
          open={open || persistent}
          onClose={onClose}
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
          <MenuBody
            level={state.level}
            levels={state.levels}
            root={root}
            drawerWidth={drawerWidth}
            {...others}
          />
        </Drawer>
        <SEOLinks root={root} />
      </MenuContext.Provider>
    </>
  )
}

Menu.propTypes = {
  root: PropTypes.object,

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
   * Set level at which menu items will be expandable
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
  expandFirstItem: false,
  align: 'left',
  trackSelected: false
}

export default React.memo(Menu)
