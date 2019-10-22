export default function withHistoryCache(getInitialProps) {
  return (...args) => {
    if (typeof window !== 'undefined' && window.history.state.rsf) {
      return window.history.state.rsf.props
    } else {
      return getInitialProps(...args)
    }
  }
}
