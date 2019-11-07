import React, { useState, useEffect, useRef } from 'react'
import DataBindingProvider from 'react-storefront/bind/DataBindingProvider'
import { mount } from 'enzyme'

describe('withDataBinding', () => {
  let Test, state, withDataBinding, mockAmp

  beforeEach(() => {
    jest.isolateModules(() => {
      mockAmp = false

      jest.mock('next/amp', () => ({
        useAmp: () => mockAmp
      }))

      withDataBinding = require('react-storefront/bind/withDataBinding').default

      Test = ({ children }) => {
        state = useRef(null)

        const [store, updateStore] = useState({
          pageData: {
            quantity: 1,
            product: { image: { src: '/image.jpg', alt: 'image' } },
            null: null,
            notNull: 'foo'
          }
        })

        useEffect(() => {
          state.current = store
        }, [store])

        return (
          <DataBindingProvider store={store} updateStore={updateStore}>
            {children}
          </DataBindingProvider>
        )
      }
    })
  })

  describe('reads', () => {
    it('should set the value prop when bind is a string', () => {
      let assigned

      const Component = withDataBinding(({ value }) => {
        assigned = value
        return null
      })

      mount(
        <Test>
          <Component bind="quantity" />
        </Test>
      )

      expect(assigned).toBe(1)
    })

    it('should set the first non-null value when bind is an array', () => {
      let assigned

      const Component = withDataBinding(({ value }) => {
        assigned = value
        return null
      })

      mount(
        <Test>
          <Component bind={['null', 'notNull']} />
        </Test>
      ).unmount()

      expect(assigned).toBe('foo')

      assigned = null

      mount(
        <Test>
          <Component bind={['null', 'notNull']} />
        </Test>
      )

      expect(assigned).toBe('foo')
    })

    it('should return null when no value is found', () => {
      let assigned

      const Component = withDataBinding(({ value }) => {
        assigned = value
        return null
      })

      mount(
        <Test>
          <Component bind={['null', 'foo']} />
        </Test>
      ).unmount()

      expect(assigned).toBe(null)
    })

    it('should set multiple props when bind is an object', () => {
      let assignedSrc, assignedAlt

      const Component = withDataBinding(({ src, alt }) => {
        assignedSrc = src
        assignedAlt = alt
        return null
      })

      mount(
        <Test>
          <Component bind={{ src: 'product.image.src', alt: 'product.image.alt' }} />
        </Test>
      )

      expect(assignedSrc).toBe('/image.jpg')
      expect(assignedAlt).toBe('image')
    })
  })

  describe('writes', () => {
    it('should set value when bind is a string', () => {
      const Component = withDataBinding(({ value, onValueChange }) => {
        useEffect(() => {
          onValueChange(value + 1)
        }, [])
        return null
      })

      mount(
        <Test>
          <Component bind="quantity" />
        </Test>
      )

      expect(state.current.pageData.quantity).toBe(2)
    })

    it('should set multiple props when bind is an object', () => {
      const Component = withDataBinding(({ src, onSrcChange, alt, onAltChange }) => {
        useEffect(() => {
          onSrcChange('new.png')
          onAltChange('new')
        }, [])
        return null
      })

      mount(
        <Test>
          <Component bind={{ src: 'product.image.src', alt: 'product.image.alt' }} />
        </Test>
      )

      expect(state.current.pageData.product.image.src).toBe('new.png')
      expect(state.current.pageData.product.image.alt).toBe('new')
    })
  })

  describe('not amp', () => {
    it('should not generate an amp-bind property when useAmp() returns false', () => {
      let ampBind

      const Component = withDataBinding(({ amp, value }) => {
        ampBind = amp.bind({ field: 'value', prop: 'value' })
        return null
      })

      mount(
        <Test>
          <Component bind="quantity" />
        </Test>
      )

      expect(ampBind).toEqual({})
    })
  })

  describe('amp', () => {
    beforeEach(() => {
      mockAmp = true
    })

    it('should generate an amp-bind property when useAmp() returns true', () => {
      let ampBind

      const Component = withDataBinding(({ amp, value }) => {
        ampBind = amp.bind({ field: 'value', prop: 'value' })
        return null
      })

      mount(
        <Test>
          <Component bind="quantity" />
        </Test>
      )

      expect(ampBind).toEqual({ 'amp-bind': 'value=>(page.quantity)' })
    })

    it('should generate a value that returns the first non-null state when bind is an array', () => {
      let ampBind

      const Component = withDataBinding(({ amp, value }) => {
        ampBind = amp.bind({ field: 'value', prop: 'value' })
        return null
      })

      mount(
        <Test>
          <Component bind={['null', 'quantity']} />
        </Test>
      )

      expect(ampBind).toEqual({ 'amp-bind': 'value=>(page.null||page.quantity)' })
    })

    it('should generate an amp change handler', () => {
      let handler

      const Component = withDataBinding(({ amp, value }) => {
        handler = amp.createHandler({
          event: 'tap',
          value: `${amp.getValue()} + 1)`
        })

        return null
      })

      mount(
        <Test>
          <Component bind="quantity" />
        </Test>
      )

      expect(handler).toEqual({
        on: 'tap:AMP.setState({ page: { quantity: (page.quantity) + 1) } })'
      })
    })
  })
})
