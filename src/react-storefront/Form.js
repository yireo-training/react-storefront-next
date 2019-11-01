import React, { forwardRef } from 'react'
import { useAmp } from 'next/amp'

const Form = forwardRef((props, ref) => {
  const amp = useAmp()

  if (amp) {
    return <amp-form ref={ref} {...props} />
  } else {
    return <form ref={ref} {...props} />
  }
})

Form.propTypes = {}

Form.defaultProps = {}

export default Form
