import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import fetchMock from 'jest-fetch-mock'

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })

global.jsdom.reconfigure({
  features: {
    ProcessExternalResources: false
  }
})

global.fetch = fetchMock
