import React from 'react'
import { useDispatch } from 'react-redux'
import authSlice from 'ducks/auth/slice'
import { saveAuthToken } from 'utils/tokenStorage'
import Router from 'next/router'
import axios from 'axios'

type InputLoggedIndata = {
  email: string
  password: string
}

// TODO: 入力フォームをからデータを受け取ってpostさせたい

const signIn: React.FC = () => {
  const dispatch = useDispatch()

  const onClickLoggedIn = () => {
    const data: InputLoggedIndata = {
      email: 'naze@gmail.com',
      password: 'naze',
    }

    axios({
      method: 'post',
      url: `${process.env.endPoint}/api/login`,
      params: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res.status)
        console.log(res.data)
        saveAuthToken(res.data.api_token, res.data.email, res.data.name)
        dispatch(authSlice.actions.loggedIn())
        Router.push('/todos')
      })
      .catch(() => {
        console.log('メールアドレスとパスワードが一致しません')
      })
  }

  return (
    <>
      <div>ログアウト中です</div>
      <button onClick={onClickLoggedIn}>ログインする</button>
    </>
  )
}
export default signIn
