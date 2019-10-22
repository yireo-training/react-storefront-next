/**
 * @license
 * Copyright © 2017-2019 Moov Corporation.  All rights reserved.
 */
import React, { useContext, useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Collapse from '@material-ui/core/Collapse'
import clsx from 'clsx'
import MenuItemContent from './MenuItemContent'
import MenuItem from './MenuItem'
import MenuContext from './MenuContext'
import { useObserver } from 'mobx-react'
import { useAmp } from 'next/amp'

export default function Branch(props) {
  return useObserver(() => {
    const {
      useExpandersAtLevel,
      expandFirstItem,
      isFirstItem,
      depth,
      index,
      item,
      ...others
    } = props
    const amp = useAmp()
    const { setSelected, classes } = useContext(MenuContext)
    const showExpander = useExpandersAtLevel === depth
    const slideToItem = item => setSelected(item)
    const [expanded, setExpanded] = useState(showExpander && isFirstItem && expandFirstItem)
    const toggleItemExpaned = () => setExpanded(!expanded)

    const interactionProps = {
      onClick: showExpander ? toggleItemExpaned.bind(null, item) : slideToItem.bind(null, item),
      classes: {
        root: clsx(classes.listItem, item.className, {
          [classes.expanded]: expanded,
          [classes.expander]: showExpander
        })
      }
    }

    const sublist = `${depth}.${index}`

    const ampProps = {
      on:
        depth === 0
          ? `tap:AMP.setState({ rsfMenu: { list: '@${index}' } })`
          : `tap:AMP.setState({ rsfMenu: { sublist: sublist == '${sublist}' ? null : '${sublist}' } })`
    }

    const elements = [
      <div key="item" amp-bind={`class=>rsfMenu.sublist == '${sublist}' ? 'expanded' : ''`}>
        <ListItem className="menu-item" button divider {...(amp ? ampProps : interactionProps)}>
          <MenuItemContent
            {...others}
            item={item}
            leaf={false}
            expanded={expanded}
            showExpander={showExpander}
            sublist={sublist}
          />
        </ListItem>
      </div>
    ]

    if (showExpander) {
      const collapseProps = amp
        ? {
            in: true,
            'amp-bind': `class=>rsfMenu.sublist == '${sublist}' ? '${classes.visible}' : '${classes.hidden}'`
          }
        : { in: expanded }

      elements.push(
        <Collapse {...collapseProps} timeout="auto" key="collapse">
          <List component="div" classes={{ root: classes.list }}>
            {item.items &&
              item.items.map((item, i) => (
                <MenuItem {...props} depth={depth + 1} isFirstItem={i === 0} item={item} key={i} />
              ))}
          </List>
        </Collapse>
      )
    }

    return <>{elements}</>
  })
}
