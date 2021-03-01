import React from 'react'
import { useDispatch } from 'react-redux'
import authSlice from 'ducks/auth/slice'
import { saveAuthToken } from 'utils/tokenStorage'
import axios from 'axios'

type InputLoggedIndata = {
  email: string
  password: string
}

// TODO: 入力フォームをからデータを受け取ってpostさせたい

const signIn: React.FC = () => {
  const dispatch = useDispatch()

  const onClickLoggedIn = () => {
    dispatch(authSlice.actions.loggedIn())

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
        saveAuthToken(data.email, res.data)
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
