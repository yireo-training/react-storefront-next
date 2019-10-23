import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import CmsSlot from 'react-storefront/CmsSlot'
import Row from 'react-storefront/Row'
import { makeStyles, Typography } from '@material-ui/core'
import ExpandableSection from 'react-storefront/ExpandableSection'
import ActionButton from 'react-storefront/ActionButton'
import Accordion from 'react-storefront/Accordion'
import Link from 'react-storefront/Link'

const useStyles = makeStyles(theme => ({}))

function ThrowError() {
  const [error, setError] = useState(false)

  if (error) {
    throw new Error('test')
  } else {
    return (
      <div>
        <button
          onClick={() => {
            throw new Error('test')
          }}
        >
          Throw Error
        </button>
        <button onClick={() => setError(true)}>Render Error</button>
      </div>
    )
  }
}

export default function Index() {
  const classes = useStyles()
  const sections = []

  for (let i = 0; i < 10; i++) {
    sections.push(
      <ExpandableSection key={i} title={`Section ${i}`} caption="Click Here">
        <Typography>This is a help section</Typography>
      </ExpandableSection>
    )
  }

  return (
    <Container maxWidth="lg">
      <Row>
        <ThrowError />
      </Row>
      <Row>
        <Accordion>{sections}</Accordion>
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
