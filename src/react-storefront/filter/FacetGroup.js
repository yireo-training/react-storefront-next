import React, { memo } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ExpandableSection from '../ExpandableSection'
import { useObserver } from 'mobx-react'
import CheckboxFilterGroup from './CheckboxFilterGroup'
import ButtonFilterGroup from './ButtonFilterGroup'

const styles = theme => ({
  matches: {
    marginLeft: '5px',
    display: 'inline'
  },
  groupLabel: {
    display: 'flex',
    alignItems: 'center'
  },
  groupTitle: {
    [theme.breakpoints.up('sm')]: {
      fontWeight: 'bold'
    }
  }
})

const useStyles = makeStyles(styles, { name: 'RSFFacetGroup' })

function FacetGroup({ store, group, submitOnChange, defaultExpanded }) {
  return useObserver(() => {
    const selection = []
    const classes = useStyles()

    const {
      pageData: { filters }
    } = store

    for (let facet of group.facets) {
      if (filters.indexOf(facet.code) !== -1) {
        selection.push(facet)
      }
    }

    let Controls

    if (group.ui === 'buttons') {
      Controls = ButtonFilterGroup
    } else {
      Controls = CheckboxFilterGroup
    }

    let caption = null

    if (selection.length === 1) {
      caption = selection[0].name
    } else if (selection.length > 0) {
      caption = `${selection.length} selected`
    }

    return (
      <ExpandableSection
        title={group.name}
        caption={caption}
        defaultExpanded={defaultExpanded}
        classes={{ margins: classes.margins, title: classes.groupTitle }}
      >
        <Controls store={store} group={group} submitOnChange={submitOnChange} />
      </ExpandableSection>
    )
  })
}

export default memo(FacetGroup)
