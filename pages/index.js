import React from 'react'
import Container from '@material-ui/core/Container'
import CmsSlot from '../src/react-storefront/CmsSlot'
import Row from '../src/react-storefront/Row'

export default function Index() {
  return (
    <Container maxWidth="lg">
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
