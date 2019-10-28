import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import CmsSlot from 'react-storefront/CmsSlot'
import Row from 'react-storefront/Row'
import { makeStyles, Typography } from '@material-ui/core'
import ExpandableSection from 'react-storefront/ExpandableSection'
import ActionButton from 'react-storefront/ActionButton'
import Accordion from 'react-storefront/Accordion'
import Link from 'react-storefront/Link'
import Carousel from 'react-storefront/carousel/Carousel'
import MediaCarousel from 'react-storefront/carousel/MediaCarousel'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  slide: {
    padding: 15,
    minHeight: 300,
    color: '#fff'
  },
  slide1: {
    background: '#FEA900'
  },
  slide2: {
    background: '#B3DC4A'
  },
  slide3: {
    background: '#6AC0FF'
  }
}))

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
        <Carousel swipeStyle={{ padding: '0 30px' }} style={{ height: 300, width: 300 }}>
          <div className={clsx(classes.slide, classes.slide1)}>Slide 1</div>
          <div className={clsx(classes.slide, classes.slide2)}>Slide 2</div>
          <div className={clsx(classes.slide, classes.slide3)}>Slide 3</div>
        </Carousel>
      </Row>
      <Row>
        <ThrowError />
      </Row>
      <Row>
        <a href="/s/1">Subcategory 1</a>
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
