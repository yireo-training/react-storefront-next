export default function withHistoryCache(getInitialProps) {
  return (...args) => {
    if (typeof window !== 'undefined' && window.history.state.rsf) {
      console.log('loading props from history', window.history.state.rsf.props)
      return window.history.state.rsf.props
    } else {
      console.log('loading props from history', null)
    }

    return getInitialProps(...args)
  }
}
