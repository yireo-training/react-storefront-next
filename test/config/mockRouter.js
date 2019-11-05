import { EventEmitter } from 'events'

const events = new EventEmitter()

let beforePopState = Function.prototype

export const Router = {
  events: {
    on: (event, cb) => events.on(event, cb),
    off: (event, cb) => events.removeListener(event, cb)
  },
  beforePopState(cb) {
    beforePopState = cb
  }
}

export function goBack() {
  if (beforePopState() !== false) {
    window.history.back()
  }
}
