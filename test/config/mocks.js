import { IntersectionObserver, resetIntersectionObserver } from '../mocks/mockIntersectionObserver'
import fetchMock from 'jest-fetch-mock'
global.fetch = fetchMock
global.IntersectionObserver = IntersectionObserver

jest.doMock('isomorphic-unfetch', () => fetchMock)
jest.doMock('next/router', () => require('../mocks/mockRouter').Router)
jest.doMock('next/link', () => require('../mocks/mockNextLink'))

global.beforeEach(() => {
  resetIntersectionObserver()
})
