/**
 * Prefetch a URL using the service worker.
 * @param {String} url The URL to prefetch
 */
export async function prefetch(url) {
  if (await waitForServiceWorkerController()) {
    navigator.serviceWorker.controller.postMessage({
      action: 'cache-path',
      path: url,
      apiVersion: process.env.RSF_API_VERSION || '1'
    })
  }
}

/**
 * Resolves when the service worker has been installed.
 * @private
 */
function waitForServiceWorkerController() {
  if (!navigator.serviceWorker || !navigator.serviceWorker.ready) {
    return false
  }

  return new Promise(resolve => {
    navigator.serviceWorker.ready.then(() => {
      if (navigator.serviceWorker.controller) {
        return resolve(true)
      }
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        return resolve(true)
      })
    })
  })
}
