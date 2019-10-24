import React, { useContext, useCallback } from 'react'
import List from '@material-ui/core/List'
import MenuItem from './MenuItem'
import MenuContext from './MenuContext'
import LeafHeader from './LeafHeader'
import LeafFooter from './LeafFooter'

function MenuBody({ level, levels, rootHeader, rootFooter, drawerWidth, children }) {
  const { goBack, classes, expandFirstItem } = useContext(MenuContext)
  const position = -drawerWidth * level

  return (
    <>
      {children}
      <div className={classes.bodyWrap} style={{ transform: `translateX(${position}px)`, flex: 1 }}>
        {levels.map((item, depth) => (
          <List
            style={{ width: `${drawerWidth}px` }}
            classes={{ root: classes.list, padding: classes.padding }}
            key={depth}
          >
            {item.root ? (
              rootHeader
            ) : (
              <LeafHeader classes={classes} goBack={() => goBack(level - 1)} item={item} />
            )}

            {item.items &&
              item.items.map((child, i) => (
                <MenuItem
                  item={child}
                  key={item.key + '-' + i} // this ensures that the expanded state is after showing a new level
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
