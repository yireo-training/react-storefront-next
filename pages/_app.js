import React, { useState } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import Header from './_Header'
import { withStyles } from '@material-ui/core'
import AppContext from '../src/AppContext'
import storeInitialPropsInHistory from '../src/react-storefront/router/storeInitialPropsInHistory'
import PWA from '../src/react-storefront/PWA'
import useLazyProps from '../src/react-storefront/hooks/useLazyProps'

storeInitialPropsInHistory()

const styles = theme => ({
  main: {}
})

class MyApp extends App {
  constructor({ pageProps }) {
    super()

    this.state = {
      app: pageProps.app || {}
    }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, classes, pageProps } = this.props

    return (
      <PWA>
        <AppContext.Provider value={this.appContextValue}>
          <>
            <Head>
              <Title {...pageProps} />
            </Head>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Header />
              <main className={classes.main}>
                <Component {...pageProps} />
              </main>
            </ThemeProvider>
          </>
        </AppContext.Provider>
      </PWA>
    )
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }
}

function Title(props) {
  return useLazyProps(props, ({ props }) => {
    return <title>{props.app && props.app.title}</title>
  })
}

export default withStyles(styles)(MyApp)
