import React from 'react'
import { mount } from 'enzyme'
import supressActWarnings from '../config/suppressActWarnings'
import { Router, goBack } from '../config/mockRouter'

let useLazyStore

describe('useLazyStore', () => {
  let restore, values, Test, updateStore, additionalData

  beforeAll(() => {
    restore = supressActWarnings()
  })

  afterAll(() => {
    restore()
  })

  beforeEach(() => {
    jest.doMock('next/router', () => Router)
    useLazyStore = require('react-storefront/hooks/useLazyStore').default
    values = []
    additionalData = null
    Test = props => {
      const returned = useLazyStore(props, additionalData)
      values.push(returned[0])
      updateStore = returned[1]
      return null
    }
  })

  it('should return props and do nothing if there are no lazy props', () => {
    mount(<Test foo="bar" />)
    expect(values).toHaveLength(1)
    expect(updateStore).toBeDefined()
    expect(values[0]).toEqual({ foo: 'bar', loading: false, pageData: {} })
  })

  it('should include the specified additionalData', () => {
    additionalData = { additional: { test: 'foo' } }
    mount(<Test foo="bar" />)
    expect(values).toHaveLength(1)
    expect(values[0]).toEqual({
      foo: 'bar',
      additional: { test: 'foo' },
      loading: false,
      pageData: {}
    })
  })

  it('should render again once lazyProps have been resolved', done => {
    global.fetch.mockResponseOnce(JSON.stringify({ pageData: { foo: 'bar' } }))

    mount(<Test lazy="/data" />)

    setTimeout(() => {
      expect(values).toHaveLength(2)
      expect(values[0]).toEqual({ loading: true, pageData: {} })
      expect(values[1]).toEqual({ loading: false, pageData: { foo: 'bar' } })
      done()
    }, 10)
  })
})
