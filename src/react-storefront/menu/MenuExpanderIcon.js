import React, { useContext } from 'react'
import { ChevronRight, ExpandLess, ExpandMore } from '@material-ui/icons'
import MenuContext from './MenuContext'
import { useAmp } from 'next/amp'

export default function ExpanderIcon({
  ExpandIcon,
  CollapseIcon,
  showExpander,
  sublist,
  expanded
}) {
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
    return expanded ? (
      <CollapseIcon className={classes.icon} />
    ) : (
      <ExpandIcon className={classes.icon} />
    )
  }
}
