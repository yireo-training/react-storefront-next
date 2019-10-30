import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import Header from '../src/Header'
import { makeStyles, useTheme } from '@material-ui/core'
import storeInitialPropsInHistory from '../src/react-storefront/router/storeInitialPropsInHistory'
import PWA from '../src/react-storefront/PWA'
import Nav from '../src/Nav'
import reportError from '../src/reportError'
import SearchProvider from '../src/react-storefront/search/SearchProvider'
import useJssStyles from 'react-storefront/hooks/useJssStyles'
import Search from 'react-storefront/search/Search'

storeInitialPropsInHistory()

const styles = theme => ({
  main: {
    paddingTop: 16
  }
})

const useStyles = makeStyles(styles)

export default function MyApp({ Component, pageProps }) {
  useJssStyles()
  const classes = useStyles()

  return (
    <PWA onError={reportError}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SearchProvider>
          <Header></Header>

          <Nav />
          <main className={classes.main}>
            <Component {...pageProps} />
            <Search />
          </main>
        </SearchProvider>
      </ThemeProvider>
    </PWA>
  )
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}
