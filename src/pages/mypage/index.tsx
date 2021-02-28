import React from 'react'
import { useDispatch } from 'react-redux'
import authSlice from 'ducks/auth/slice'
import { useAuthState } from 'ducks/auth/selectors'

const Index: React.FC = () => {
  const dispatch = useDispatch()
  const state = useAuthState().auth

  const onClickLoggedIn = () => {
    dispatch(authSlice.actions.loggedIn())
  }

  const onClickLoggedOut = () => {
    dispatch(authSlice.actions.loggedOut())
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
export default Index
