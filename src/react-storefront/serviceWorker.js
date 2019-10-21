export function registerSW() {
  if (typeof window !== 'undefined') {
    navigator.serviceWorker
      .register('/_next/static/service-worker.js', { scope: '/' })
      .then(function(registration) {
        console.log('SW registered: ', registration)
      })
      .catch(function(registrationError) {
        console.log('SW registration failed: ', registrationError)
      })
  }
}
