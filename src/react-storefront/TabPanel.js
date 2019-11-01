/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { useState } from 'react'
import { useAmp } from 'next/amp'
import Head from 'next/head'
import { Tabs, Tab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'

export const useStyles = makeStyles(
  theme => ({
    root: {},
    panel: {
      margin: `${theme.spacing(2)}px 0`
    },
    hidden: {
      display: 'none'
    },
    ampSelector: {
      '& [option][selected]': {
        outline: 'none',
        cursor: 'inherit'
      }
    },
    ampPanel: {
      display: 'none',
      '&[selected]': {
        display: 'block'
      }
    },
    ampTab: {
      opacity: 1,
      '& .label': {
        borderBottom: `2px solid transparent`,
        opacity: 0.7,
        padding: '15px 12px 14px 12px'
      },
      '& .selected': {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
        opacity: 1
      }
    },
    ampTabLabelContainer: {
      padding: 0
    },
    ampTabIndicator: {
      display: 'none'
    }
  }),
  { name: 'RSFTabPanel' }
)

/**
 * A simple tab panel that is AMP-compatible.  Tab names are pull from the label prop of the child elements.
 * Any type of element can be a child.
 *
 * Example:
 *
 * ```js
 *  <TabPanel>
 *    <div label="Description">
 *      Description here
 *    </div>
 *    <CmsSlot label="Instructions">
 *      { instructionsFromCms }
 *    </CmsSlot>
 *  </TabPanel>
 * ```
 */
export default function TabPanel({
  children,
  classes,
  ampStateId,
  ampStateProperty,
  scrollable,
  selected: selectedProp,
  onChange
}) {
  classes = useStyles({ classes })

  const amp = useAmp()
  const [selected, setSelected] = useState(selectedProp)
  const tabs = []

  let panels = []

  const onChangeHandler = (event, selected) => {
    setSelected(selected)
    if (onChange) {
      onChange(selected)
    }
  }

  React.Children.forEach(children, (child, i) => {
    let { label } = child.props

    if (amp) {
      label = (
        <div
          className={clsx('label', { selected: selected === i })}
          amp-bind={`class=>${ampStateId}.${ampStateProperty} == "tab${i}" || (${i} == 0 && !${ampStateId}.${ampStateProperty}) ? 'label selected' : 'label'`}
        >
          {label}
        </div>
      )
    }

    tabs.push(
      <Tab
        key={i}
        label={label}
        on={`tap:AMP.setState({ ${ampStateId}: { ${ampStateProperty}: 'tab${i}' }})`}
        classes={{
          root: clsx({ [classes.ampTab]: amp }),
          labelContainer: clsx({ [classes.ampTabLabelContainer]: amp })
        }}
      />
    )

    panels.push(
      <div
        key={i}
        role="tabpanel"
        option={`tab${i}`}
        selected={i === selected}
        className={clsx(classes.panel, {
          [classes.hidden]: !amp && i !== selected,
          [classes.ampPanel]: amp
        })}
      >
        {React.cloneElement(child, { label: null })}
      </div>
    )
  })

  if (amp) {
    panels = (
      <amp-selector
        role="tablist"
        amp-bind={`selected=>${ampStateId}.${ampStateProperty}`}
        class={classes.ampSelector}
      >
        {panels}
      </amp-selector>
    )
  }

  return (
    <div className={classes.root}>
      {amp && (
        <Head>
          <script
            async
            custom-element="amp-selector"
            src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"
          />
        </Head>
      )}
      <Tabs
        variant={scrollable ? 'scrollable' : null}
        value={selected}
        onChange={onChangeHandler}
        classes={{
          indicator: clsx({ [classes.ampTabIndicator]: amp })
        }}
      >
        {tabs}
      </Tabs>
      {panels}
    </div>
  )
}

TabPanel.propTypes = {
  /**
   * Set to false to prevent the tabs from scrolling
   */
  scrollable: PropTypes.bool,
  /**
   * Selected tab index
   */
  selected: PropTypes.number,
  /**
   * On change callback
   */
  onChange: PropTypes.func
}

TabPanel.defaultProps = {
  ampStateId: 'moovAmpState',
  ampStateProperty: 'selectedTab',
  variant: 'scrollable',
  selected: 0
}
