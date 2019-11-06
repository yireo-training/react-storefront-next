import React from 'react'
import { mount } from 'enzyme'
import ToggleButton from 'react-storefront/ToggleButton'

describe('ToggleButton.test', () => {
  let wrapper

  beforeEach(() => {})

  afterEach(() => {
    wrapper.unmount()
  })

  it('should bind by name', () => {
    const Test = () => {
      return null
    }

    wrapper = mount(<Test />)
  })
})
