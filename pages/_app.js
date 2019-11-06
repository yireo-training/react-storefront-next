import React from 'react'
import theme from '../src/theme'
import Header from '../src/Header'
import { CssBaseline } from '@material-ui/core'
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles'
import storeInitialPropsInHistory from '../src/react-storefront/router/storeInitialPropsInHistory'
import PWA from '../src/react-storefront/PWA'
import Nav from '../src/Nav'
import reportError from '../src/reportError'
import useJssStyles from 'react-storefront/hooks/useJssStyles'
import PageState from 'react-storefront/PageState'

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
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Nav />
        <main className={classes.main}>
          <PageState id="page" state={pageProps}>
            <Component {...pageProps} />
          </PageState>
        </main>
      </MuiThemeProvider>
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
