/**
 * @license
 * Copyright © 2017-2018 Moov Corporation.  All rights reserved.
 */
import React, { createContext, useState } from 'react'
import AmpAccordion from './amp/AmpAccordion'
import { useAmp } from 'next/amp'

export const AccordionContext = createContext()

/**
 * Accordion which only allows one child ExpandableSection to be open at a time
 *
 * ```js
 *  <Accordion>
 *    <ExpandableSection title="First">
 *      <div>The first section</div>
 *    </ExpandableSection>
 *    <ExpandableSection title="Second">
 *      <div>The second section</div>
 *    </ExpandableSection>
 *    <ExpandableSection title="Third">
 *      <div>The third section</div>
 *    </ExpandableSection>
 *  </Accordion>
 * ```
 */
export default function Accordion({ children, ...otherProps }) {
  const [expanded, setExpanded] = useState(null)

  if (useAmp()) {
    return <AmpAccordion {...otherProps}>{items}</AmpAccordion>
  } else {
    return React.Children.map(children, (child, i) => {
      return React.cloneElement(child, {
        expanded: expanded === i,
        onChange: (e, expanded) => {
          e.preventDefault()
          setExpanded(expanded ? i : null)
        }
      })
    })
  }
}
