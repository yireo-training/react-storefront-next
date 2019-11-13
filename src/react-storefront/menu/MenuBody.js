import React, { useContext } from 'react'
import { List } from '@material-ui/core'
import { useAmp } from 'next/amp'
import clsx from 'clsx'
import MenuItem from './MenuItem'
import MenuContext from './MenuContext'
import LeafHeader from './LeafHeader'
import LeafFooter from './LeafFooter'

function MenuBody({ level, levels, rootHeader, rootFooter, drawerWidth, path = [], children }) {
  const { goBack, classes, expandFirstItem } = useContext(MenuContext)
  const position = -drawerWidth * level

  const parentPath = path.length ? '@' + path.slice(0, path.length - 1).join('.') : null
  const id = '@' + path.join('.')
  const isRoot = id === '@'

  const inFocusClass = clsx(classes.ampBody, classes.inFocus)
  const hiddenLeftClass = clsx(classes.ampBody, classes.hiddenLeft)
  const hiddenClass = clsx(classes.ampBody, isRoot ? classes.hiddenLeft : classes.hiddenRight)

  const wrapProps = useAmp()
    ? {
        className: clsx(classes.ampBody, {
          [classes.inFocus]: isRoot,
          [classes.hiddenRight]: !isRoot
        }),
        // This conditional handles the positioning of each menu body
        // By default all bodies except for root are hidden to the right
        //
        // If moving forward through the menu, the current body translates in
        // from the right and the previous body is translated to the left.
        //
        // When moving backwards this is reversed. There are some checks for the root
        // body since it always is hidden to the left.
        'amp-bind': `class=>rsfMenu.list == '${id}'  ? '${inFocusClass}' : rsfMenu.last == '${id}' ? rsfMenu.list == '@' ? '${hiddenClass}' : '${hiddenLeftClass}' : '${hiddenClass}'`
      }
    : {
        className: classes.bodyWrap,
        style: { transform: `translateX(${position}px)`, flex: 1 }
      }

  return (
    <>
      {children}
      <div {...wrapProps}>
        {levels.map((item, depth) => (
          <List
            style={{ width: `${drawerWidth}px` }}
            classes={{ root: classes.list, padding: classes.padding }}
            key={depth}
          >
            {item.root ? (
              rootHeader
            ) : (
              <LeafHeader
                classes={classes}
                goBack={() => goBack(level - 1)}
                item={item}
                parentPath={parentPath}
              />
            )}

            {item.items &&
              item.items.map((child, i) => (
                <MenuItem
                  item={child}
                  key={item.key + '-' + i} // this ensures that the expanded state is after showing a new level
                  path={id}
                  index={i}
                  depth={depth}
                  defaultExpanded={i === 0 && expandFirstItem}
                />
              ))}

            {item.root ? rootFooter : <LeafFooter item={item} />}
          </List>
        ))}
      </div>
    </>
  )
}

export default React.memo(MenuBody)
