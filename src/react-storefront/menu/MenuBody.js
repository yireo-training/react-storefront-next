import React, { useContext, useCallback } from 'react'
import List from '@material-ui/core/List'
import MenuItem from './MenuItem'
import MenuContext from './MenuContext'
import LeafHeader from './LeafHeader'
import LeafFooter from './LeafFooter'

function MenuBody({
  level,
  levels,
  rootHeader,
  rootFooter,
  renderLeafHeader,
  renderLeafFooter,
  drawerWidth,
  children
}) {
  const { goBack, classes, expandFirstItem } = useContext(MenuContext)
  const position = -drawerWidth * level

  return (
    <>
      {children}
      <div className={classes.bodyWrap} style={{ transform: `translateX(${position}px)`, flex: 1 }}>
        {levels.map((list, depth) => (
          <List
            style={{ width: `${drawerWidth}px` }}
            classes={{ root: classes.list, padding: classes.padding }}
            key={depth}
          >
            {list.root ? (
              rootHeader
            ) : (
              <LeafHeader
                classes={classes}
                goBack={() => goBack(level - 1)}
                list={list}
                render={renderLeafHeader}
              />
            )}

            {list.items &&
              list.items.map((item, i) => (
                <MenuItem
                  item={item}
                  key={list.key + '-' + i} // this ensures that the expanded state is after showing a new level
                  depth={depth}
                  defaultExpanded={i === 0 && expandFirstItem}
                />
              ))}

            {list.root ? rootFooter : <LeafFooter list={list} render={renderLeafFooter} />}
          </List>
        ))}
      </div>
    </>
  )
}

export default React.memo(MenuBody)
