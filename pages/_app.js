import React, { useEffect } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import Header from './_Header'
import { makeStyles } from '@material-ui/core'
import storeInitialPropsInHistory from '../src/react-storefront/router/storeInitialPropsInHistory'
import PWA from '../src/react-storefront/PWA'
import useLazyProps from '../src/react-storefront/hooks/useLazyProps'
import Nav from './_Nav'
import Menu from 'react-storefront/menu/Menu'
import { registerSW } from 'react-storefront/serviceWorker'
import createMenu from '../src/mocks/createMenu'
import { useMenuStore } from 'react-storefront/menu/MenuProvider'

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
  const classes = useStyles()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  const menuStore = useMenuStore(menu)

  return (
    <PWA>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header menuStore={menuStore} />
        <Menu align="right" useExpanders menuStore={menuStore} />
        <Nav />
        <main className={classes.main}>
          <Component {...pageProps} />
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

  return { pageProps: { ...pageProps, menu } }
}

// class MyApp extends App {
//   constructor({ pageProps }) {
//     super()

//     this.state = {
//       app: pageProps.app || {}
//     }
//   }

//   componentDidMount() {
//     // Remove the server-side injected CSS.
//     const jssStyles = document.querySelector('#jss-server-side')

//     if (jssStyles) {
//       jssStyles.parentNode.removeChild(jssStyles)
//     }
//   }

//   render() {
//     const { Component, classes, pageProps } = this.props

//     console.log('app.render')

//     return (
//       <PWA>
//         <AppContext.Provider value={this.appContextValue}>
//           <>
//             <Head>
//               <Title />
//             </Head>
//             <ThemeProvider theme={theme}>
//               <CssBaseline />
//               <Header />
//               <Nav />
//               <main className={classes.main}>
//                 <Component {...pageProps} />
//               </main>
//             </ThemeProvider>
//           </>
//         </AppContext.Provider>
//       </PWA>
//     )
//   }

//   static async getInitialProps({ Component, ctx }) {
//     let pageProps = {}

//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx)
//     }

//     return { pageProps }
//   }
// }

function Title(props) {
  console.log('Title')
  return <title>foo</title>
  return useLazyProps(props, ({ props }) => {
    return <title>{props.app && props.app.title}</title>
  })
}

// export default withStyles(styles)(MyApp)
