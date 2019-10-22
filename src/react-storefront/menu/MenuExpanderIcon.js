import React, { useContext } from 'react'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import MenuContext from './MenuContext'
import { useObserver } from 'mobx-react'
import { useAmp } from 'next/amp'

export default function ExpanderIcon({ ExpandIcon, CollapseIcon, showExpander, sublist, item }) {
  return useObserver(() => {
    const { classes } = useContext(MenuContext)
    const amp = useAmp()

    ExpandIcon = ExpandIcon || ExpandMore
    CollapseIcon = CollapseIcon || ExpandLess

    if (!showExpander) return <ChevronRight className={classes.icon} />

    if (amp) {
      return (
        <>
          <CollapseIcon
            className={classes.icon}
            amp-bind={`class=>rsfMenu.sublist == '${sublist}' ? '${classes.visible} ${classes.icon}' : '${classes.hidden} ${classes.icon}'`}
          />
          <ExpandIcon
            className={classes.icon}
            amp-bind={`class=>rsfMenu.sublist == '${sublist}' ? '${classes.hidden} ${classes.icon}' : '${classes.visible} ${classes.icon}'`}
          />
        </>
      )
    } else {
      return item.expanded ? (
        <CollapseIcon className={classes.icon} />
      ) : (
        <ExpandIcon className={classes.icon} />
      )
    }
  })
}
