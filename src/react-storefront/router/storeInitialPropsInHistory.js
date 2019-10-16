import Router from 'next/router'

/**
 * Patches history.pushState and history.replaceState to stores the props of the
 * current main component in history.state before navigating.  This allows us to instantly
 * render the main component when the user goes back
 */
export default function storeInitialPropsInHistory() {
  if (typeof window === 'undefined') return

  const { replaceState, pushState } = window.history

  history.replaceState = (data, title, url) => {
    let { state } = history
    if (!state) state = {}
    replaceState.call(history, { rsf: state.rsf, ...data }, title, url)
  }

  history.pushState = async (...args) => {
    const { components, pathname, as } = Router.router
    let props = components[pathname].props.pageProps

    if (props.lazy && props.lazy.then) {
      let props = await props.lazy
    }

    history.replaceState({ ...history.state, rsf: { props } }, document.title, as)
    pushState.apply(history, args)
  }
}
