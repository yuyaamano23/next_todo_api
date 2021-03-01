import React from 'react'
import { useDispatch } from 'react-redux'
import authSlice from 'ducks/auth/slice'
import { useAuthState } from 'ducks/auth/selectors'
import { saveAuthToken } from 'utils/tokenStorage'
import axios from 'axios'

const mypage: React.FC = () => {
  const dispatch = useDispatch()
  const state = useAuthState().auth

  const onClickLoggedIn = () => {
    dispatch(authSlice.actions.loggedIn())
    TokenCheck()
  }

  const onClickLoggedOut = () => {
    dispatch(authSlice.actions.loggedOut())
  }

  const TokenCheck = () => {
    // localStorageから取得する予定
    const email = 'naze@gmail.com'
    const token = 'Nxyi1D0sgbllT28S6wAXN1AGhi4xVFDdGWJVm8qlruHX3KM97g2yTo3OEcUD'

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
          saveAuthToken()
        } else {
          console.log('token invalid')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {state.isLoggedIn ? (
        <>
          <div>ログイン中です</div>
          <button onClick={onClickLoggedOut}>ログアウトする</button>
        </>
      ) : (
        <>
          <div>ログアウト中です</div>
          <button onClick={onClickLoggedIn}>ログインする</button>
        </>
      )}
    </>
  )
}
export default mypage
