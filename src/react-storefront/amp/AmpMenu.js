/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Head from 'next/head'
import MenuBody from '../menu/MenuBody'
import clsx from 'clsx'

import MenuContext from '../menu/MenuContext'

export const styles = theme => ({
  root: {
    position: 'relative',
    marginTop: theme.headerHeight,
    height: `calc(100vh - ${theme.headerHeight}px)`,
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '10px 2px 10px -5px rgba(0, 0, 0, 0.2)',
    paddingBottom: '64px',
    '& h3': {
      backgroundColor: theme.palette.background.paper
    },
    '& .expanded > .menu-item': {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      '& svg': {
        fill: theme.palette.secondary.contrastText
      }
    },
    '& a': {
      color: theme.typography.body1.color
    },
    '& ~ div[class*="amphtml-sidebar-mask"]': {
      background: 'rgba(0, 0, 0, 0.5)',
      opacity: 1
    }
  }
})

const useStyles = makeStyles(styles, { name: 'RSFAmpMenu' })

/**
 * An AMP-compatible menu based on amp-sidebar.
 */
export default function AmpMenu({
  id = 'moov_menu',
  drawerWidth,
  className,
  align,
  root,
  theme,
  rootHeader,
  rootFooter,
  ...others
}) {
  if (!root) return null

  let { classes } = useContext(MenuContext)

  classes = useStyles({ classes })

  const bodies = []

  function buildLevel(node, level = 0, parentPath = [], index = 0) {
    const root = level === 0
    const path = root ? [] : [...parentPath, index]

    bodies.push(
      <MenuBody
        level={level}
        levels={[{ ...node, root }]}
        rootHeader={rootHeader}
        rootFooter={rootFooter}
        drawerWidth={drawerWidth}
        path={path}
      />
    )
    // Limit full menu bodies to 3 levels
    if (node.items && level < 2) {
      node.items.forEach((n, i) => buildLevel(n, level + 1, path, i))
    }
  }

  buildLevel(root)

  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-sidebar"
          src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
        />
        <script
          async
          custom-element="amp-bind"
          src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
        />
        <style amp-custom>{`
            #${id} {
              width: ${drawerWidth}px;
            }
          `}</style>
      </Head>
      <amp-sidebar
        key="sidebar"
        id={id}
        class={clsx(className, classes.root)}
        layout="nodisplay"
        side={align}
        on="sidebarClose:AMP.setState({ rsfMenu: { open: false } })"
      >
        {bodies}
      </amp-sidebar>
    </>
  )
}
