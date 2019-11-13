export class IntersectionObserver {
  disconnected = false

  constructor(callback) {
    IntersectionObserver.instance = this
    this.callback = callback
  }

  simulateChange(intersectionRatio) {
    this.callback([{ intersectionRatio }])
  }

  observe(r) {
    this.ref = r
  }

  disconnect() {
    this.disconnected = true
  }
}

export function resetIntersectionObserver() {
  delete IntersectionObserver.instance
  delete IntersectionObserver.ref
}
