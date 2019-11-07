import React, { useState } from 'react'
import { mount } from 'enzyme'
import ToggleButton from 'react-storefront/ToggleButton'
import DataBindingProvider from 'react-storefront/bind/DataBindingProvider'
import { Button } from '@material-ui/core'

describe('ToggleButton.test', () => {
  let wrapper

  beforeEach(() => {})

  afterEach(() => {
    try {
      wrapper.unmount()
    } catch (e) {}
  })

  it('should get the value from bind', () => {
    const Test = () => {
      const [store, updateStore] = useState({ pageData: { size: 'md' } })

      return (
        <DataBindingProvider store={store} updateStore={updateStore}>
          <ToggleButton bind="size" value="md">
            md
          </ToggleButton>
        </DataBindingProvider>
      )
    }

    wrapper = mount(<Test />)

    expect(wrapper.find(Button).props().variant).toBe('contained')
  })

  it('should support a selected prop', () => {
    const Test = () => {
      return <ToggleButton selected>md</ToggleButton>
    }
  })

  it('should set the value using bind', () => {
    let size

    const Test = () => {
      const [store, updateStore] = useState({ pageData: { size: 'md' } })

      size = store.pageData.size

      return (
        <DataBindingProvider store={store} updateStore={updateStore}>
          <ToggleButton bind="size" value="sm">
            md
          </ToggleButton>
        </DataBindingProvider>
      )
    }

    wrapper = mount(<Test />)
    wrapper.find(Button).simulate('click')

    expect(size).toBe('md')
  })
})
