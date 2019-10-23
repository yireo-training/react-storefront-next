import React, { useMemo, useState } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import Header from './_Header'
import { makeStyles } from '@material-ui/core'
import storeInitialPropsInHistory from '../src/react-storefront/router/storeInitialPropsInHistory'
import PWA from '../src/react-storefront/PWA'
import Nav from './_Nav'
import Menu from 'react-storefront/menu/Menu'
import { registerSW } from 'react-storefront/serviceWorker'
import createMenu from '../src/mocks/createMenu'
import reportError from '../src/reportError'
import MenuButton from '../src/react-storefront/menu/MenuButton'
import useJssStyles from 'react-storefront/hooks/useJssStyles'

const menu = createMenu()

// registerSW()
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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <PWA onError={reportError}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header>
          <MenuButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </Header>
        <Menu
          align="right"
          useExpanders
          root={menu}
          open={menuOpen}
          expandFirstItem
          // itemContentRenderer={() => <div>content</div>}
          // itemRenderer={() => <div>sdfsd</div>}
          // renderLeafHeader={() => <div>leaf header</div>}
          // renderLeafFooter={() => <div>leaf footer</div>}
          onClose={() => setMenuOpen(false)}
        />
        <Nav />
        <main className={classes.main}>
          {useMemo(
            () => (
              <Component {...pageProps} />
            ),
            [pageProps]
          )}
        </main>
      </ThemeProvider>
    </PWA>
  )
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  const { app, ...page } = pageProps

  return { pageProps: { ...page, app: { app, ...menu } } }
}
