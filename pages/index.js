import React from 'react'
import Container from '@material-ui/core/Container'
import CmsSlot from '../src/react-storefront/CmsSlot'
import Row from '../src/react-storefront/Row'
import { makeStyles, Typography } from '@material-ui/core'
import ExpandableSection from '../src/react-storefront/ExpandableSection'
import ActionButton from '../src/react-storefront/ActionButton'

const useStyles = makeStyles(theme => ({}))

export default function Index() {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Row>
        <ExpandableSection title="Help" caption="Click Here">
          <Typography>This is a help section</Typography>
        </ExpandableSection>
        <ExpandableSection title="Buy" caption="Click Here">
          <Typography>This is a help section</Typography>
        </ExpandableSection>
      </Row>
      <Row>
        <ActionButton label="Sort" value="Lowest Price" />
      </Row>
      <Row>
        <CmsSlot
          style={{ minHeight: 320 }}
          lazyLoadImages
        >{`<img data-rsf-lazy data-src="https://via.placeholder.com/500x500/cccccc?text=Hero Image" width="100%"/>`}</CmsSlot>
      </Row>
      <Row>
        <CmsSlot
          style={{ minHeight: 320 }}
          lazyLoadImages
        >{`<img data-rsf-lazy data-src="https://via.placeholder.com/500x500/cccccc?text=Ad 1" width="100%"/>`}</CmsSlot>
      </Row>
      <Row>
        <CmsSlot
          style={{ minHeight: 320 }}
          lazyLoadImages
        >{`<img data-rsf-lazy data-src="https://via.placeholder.com/500x500/cccccc?text=Ad 2" width="100%"/>`}</CmsSlot>
      </Row>
      <Row>
        <CmsSlot
          style={{ minHeight: 320 }}
          lazyLoadImages
        >{`<img data-rsf-lazy data-src="https://via.placeholder.com/500x500/cccccc?text=Ad 3" width="100%"/>`}</CmsSlot>
      </Row>
    </Container>
  )
}
