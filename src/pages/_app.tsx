import 'styles/globals.scss'
import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useDispatch } from 'react-redux'
import authSlice from 'ducks/auth/slice'
import axios from 'axios'
import { getItem } from 'utils/tokenStorage'
import store from 'ducks/store'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from 'components/Theme'
import NavBar from 'components/UIkit/NavBar'
import Layout from 'components/Layout'

// _app.tsxではprivederでラップしたコンポーネントしかstoreに接続できないので、AppInit関数を作ることで解決した
function AppInit() {
  const dispatch = useDispatch()

  useEffect(() => {
    // クライアントのlocalstrogeにあるtokenが有効であるかどうかを全ページ共通の処理としてマウント時に1度だけ行う
    const email = getItem('email')
    const token = getItem('token')

    axios({
      method: 'get',
      url: `${process.env.endPoint}/api/me`,
      params: { email: email },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.id && res.data.name && res.data.email) {
          console.log('token valid')
          // storeのisLoggedInをtrueにする
          dispatch(authSlice.actions.loggedIn())
        } else {
          console.log('token invalid')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return null
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <Provider store={store}>
      <React.Fragment>
        <AppInit />
        <Layout>
          <Head>
            <title>My page</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <NavBar />
            <Component {...pageProps} />
          </ThemeProvider>
        </Layout>
      </React.Fragment>
    </Provider>
  )
}

export default MyApp
