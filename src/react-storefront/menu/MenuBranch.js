import React, { useContext, useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import clsx from 'clsx'
import MenuItemContent from './MenuItemContent'
import MenuContext from './MenuContext'
import { useAmp } from 'next/amp'
import MenuExpander from './MenuExpander'

function MenuBranch(props) {
  const { depth, index, item, defaultExpanded, ...others } = props
  const amp = useAmp()
  const { onItemClick, classes, useExpanders } = useContext(MenuContext)
  const hasSubBranches = item.items.some(child => child.items != null)
  const showExpander = !hasSubBranches && useExpanders
  const [expanded, setExpanded] = useState(showExpander && defaultExpanded)

  const interactionProps = {
    onClick: showExpander ? setExpanded.bind(null, !expanded) : onItemClick.bind(null, item, depth),
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
      <ListItem
        className="menu-item"
        classes={{
          selected: classes.expandedItem
        }}
        button
        divider
        {...(amp ? ampProps : interactionProps)}
      >
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
    elements.push(
      <MenuExpander
        sublist={sublist}
        item={item}
        depth={depth}
        expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        {...props}
      />
    )
  }

  return <>{elements}</>
}

export default React.memo(MenuBranch)
