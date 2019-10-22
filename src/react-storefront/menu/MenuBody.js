import React, { useContext } from 'react'
import List from '@material-ui/core/List'
import MenuItem from './MenuItem'
import MenuContext from './MenuContext'
import LeafHeader from './LeafHeader'
import LeafFooter from './LeafFooter'
import { useObserver } from 'mobx-react'

export default function MenuBody(props) {
  return useObserver(() => {
    const {
      rootHeader,
      rootFooter,
      renderLeafHeader,
      renderLeafFooter,
      drawerWidth,
      children
    } = props

    const menu = useContext(MenuContext)
    const { levels, level, classes } = menu
    const position = -drawerWidth * level
    const goBack = () => (menu.level = menu.level - 1)

    return (
      <>
        {children}
        <div
          className={classes.bodyWrap}
          style={{ transform: `translateX(${position}px)`, flex: 1 }}
        >
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
                  goBack={goBack}
                  list={list}
                  render={renderLeafHeader}
                />
              )}

              {list.items &&
                list.items.map((item, key) => (
                  <MenuItem
                    {...props}
                    item={item}
                    isFirstItem={key === 0}
                    key={key}
                    depth={depth}
                    classes={{ list: classes.list, listItem: classes.listItem }}
                  />
                ))}

              {list.root ? rootFooter : <LeafFooter list={list} render={renderLeafFooter} />}
            </List>
          ))}
        </div>
      </>
    )
  })
}
