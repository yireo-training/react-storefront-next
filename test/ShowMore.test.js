import React from 'react'
import { mount } from 'enzyme'
import SearchResultsContext from './../src/react-storefront/plp/SearchResultsContext'
import ShowMore from './../src/react-storefront/plp/ShowMore'

describe('ShowMore', () => {
  let wrapper

  afterEach(() => {
    try {
      wrapper.unmount()
    } catch (e) {}
  })

  describe('with pageData present in context', () => {
    it('does not render when page nr over page count', () => {
      const Test = () => {
        return (
          <SearchResultsContext.Provider value={{ pageData: { page: 4, totalPages: 5 } }}>
            <ShowMore
              variant="button"
              renderLoadingIcon={() => <div className="loading">Loading</div>}
            />
          </SearchResultsContext.Provider>
        )
      }

      wrapper = mount(<Test />)
      expect(wrapper.isEmptyRender()).toBe(true)
    })

    it('renders when page nr under page count', () => {
      const Test = () => {
        return (
          <SearchResultsContext.Provider value={{ pageData: { page: 3, totalPages: 5 } }}>
            <ShowMore
              variant="button"
              renderLoadingIcon={() => <div className="loading">Loading</div>}
            />
          </SearchResultsContext.Provider>
        )
      }

      wrapper = mount(<Test />)
      expect(wrapper.isEmptyRender()).toBe(false)
    })
  })

  describe('button variant', () => {
    it('calls fetchMore when button clicked and renders loading icon', () => {
      const fetchMoreStub = jest.fn()
      const Test = () => {
        return (
          <SearchResultsContext.Provider value={{ actions: { fetchMore: fetchMoreStub } }}>
            <ShowMore
              variant="button"
              renderLoadingIcon={() => <div className="loading">Loading</div>}
            />
          </SearchResultsContext.Provider>
        )
      }

      wrapper = mount(<Test />)
      expect(wrapper.find('div.loading')).not.toExist()
      wrapper.find('button').simulate('click')
      expect(fetchMoreStub).toBeCalled()
      expect(wrapper.find('div.loading')).toExist()
    })
  })

  describe('infinite variant', () => {
    it('renders a loading icon', () => {
      const Test = () => {
        return (
          <SearchResultsContext.Provider value={{}}>
            <ShowMore
              variant="infinite"
              renderLoadingIcon={() => <div className="loading">Loading</div>}
            />
          </SearchResultsContext.Provider>
        )
      }

      wrapper = mount(<Test />)
      expect(wrapper.find('div.loading')).toExist()
    })
  })
})
