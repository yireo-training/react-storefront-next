import React, { useRef } from 'react'
import useIntersectionObserver from 'react-storefront/hooks/useIntersectionObserver'
import { mount } from 'enzyme'

describe('useIntersectionObserver', () => {
  let disconnected = false,
    instance = null,
    ref = null

  beforeEach(() => {
    global.IntersectionObserver = class {
      constructor(callback) {
        instance = this
        this.callback = callback
      }

      mockChange(intersectionRatio) {
        this.callback([{ intersectionRatio }])
      }

      observe(r) {
        ref = r
      }

      disconnect() {
        disconnected = true
      }
    }
  })

  it('should fire the callback when the element becomes visible', () => {
    const onChange = jest.fn()

    const Test = () => {
      const ref = useRef(null)
      useIntersectionObserver(() => ref, onChange)
      return <div ref={ref} />
    }

    mount(<Test />)
    expect(instance).not.toBeNull()
    instance.mockChange(0.5)
    expect(onChange).toHaveBeenCalledWith(true, expect.any(Function))
    expect(ref).not.toBeNull()
  })

  it('should disconnect when the component is unmounted', () => {
    const onChange = jest.fn()

    const Test = () => {
      const ref = useRef(null)
      useIntersectionObserver(() => ref, onChange)
      return <div ref={ref} />
    }

    const wrapper = mount(<Test />)
    wrapper.unmount()
    expect(disconnected).toBe(true)
  })

  it('should handle a null ref', () => {
    const Test = () => {
      useIntersectionObserver(() => null, jest.fn())
      return <div />
    }
    expect(() => {
      mount(<Test />)
    }).not.toThrowError()
  })
})
