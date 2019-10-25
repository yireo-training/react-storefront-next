/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React from 'react'
import Typography from '@material-ui/core/Typography'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import AmpAccordion from './AmpAccordion'

export const styles = theme => ({
  section: {
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: 'transparent'
  },
  title: {
    backgroundColor: 'transparent',
    padding: `12px ${theme.spacing(4)}px`,
    borderStyle: 'none',
    outlineWidth: 0
  },
  toggle: {
    position: 'absolute',
    right: '18px',
    top: '13px'
  },
  expand: {
    display: 'block',
    'section[expanded] &': {
      display: 'none'
    }
  },
  collapse: {
    display: 'none',
    'section[expanded] &': {
      display: 'block'
    }
  },
  body: {
    backgroundColor: 'transparent',
    padding: `0 0 ${theme.spacing(2)}px ${theme.spacing(4)}px`
  }
})

const useStyles = makeStyles(styles, { name: 'RSFAmpExpandableSection' })

/**
 * An AMP-compatible expandable section based on amp-accordion.
 */
export default function AmpExpandableSection({
  classes,
  expanded,
  children = [],
  title,
  ExpandIcon,
  CollapseIcon,
  fromAccordion
}) {
  classes = useStyles({ classes })

  if (ExpandIcon === ExpandMore) {
    CollapseIcon = ExpandLess
  }

  const sectionAttributes = {}

  if (expanded) sectionAttributes.expanded = ''

  const section = (
    <section className={classes.section} {...sectionAttributes}>
      <Typography variant="subtitle1" component="h3" className={classes.title}>
        {title}
        <ExpandIcon className={clsx(classes.toggle, classes.expand)} />
        <CollapseIcon className={clsx(classes.toggle, classes.collapse)} />
      </Typography>
      <div className={classes.body}>{children}</div>
    </section>
  )

  if (fromAccordion) {
    return section
  }

  return <AmpAccordion>{section}</AmpAccordion>
}

AmpExpandableSection.propTypes = {
  /**
   * The title for the header of the expandable section
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Set to true to expand the panel
   */
  expanded: PropTypes.bool,

  /**
   * The icon to use for collapsed groups
   */
  ExpandIcon: PropTypes.func,

  /**
   * The icon to use for expanded groups
   */
  CollapseIcon: PropTypes.func,

  /**
   * Identifier if component is a child of Accordion
   */
  fromAccordion: PropTypes.boolean
}

AmpExpandableSection.defaultProps = {
  expanded: false,
  ExpandIcon: ExpandMore,
  CollapseIcon: ExpandLess
}
