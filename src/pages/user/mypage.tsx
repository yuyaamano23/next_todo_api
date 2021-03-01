import React, { useEffect } from 'react'
import { getUserEmail, getUserToken } from 'utils/tokenStorage'
import { useAuthState } from 'ducks/auth/selectors'
import axios from 'axios'

type userProfile = {
  id: number | null
  name: string | null
  email: string | null
  email_verified_at: string | null
  api_token: string | null
}

// 初期値を定義しないとエラー
const userNull = {
  id: null,
  name: 'ゲストユーザ',
  email: null,
  email_verified_at: null,
  api_token: null,
}

const mypage: React.FC = () => {
  const state = useAuthState().auth
  const [userProfile, setUserProfile] = React.useState<userProfile>(userNull)

  useEffect(() => {
    // 今後ログインしているユーザーのプロフィールを取得するapiを作りここで叩きたい
    axios({
      method: 'get',
      url: `${process.env.endPoint}/api/me`,
      params: { email: `${getUserEmail()}` },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getUserToken()}`,
      },
    })
      .then((res) => {
        setUserProfile(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      {state.isLoggedIn ? (
        <>
          <div>ログイン中です</div>
          <div>{userProfile.id}</div>
          <div>{userProfile.name}</div>
          <div>{userProfile.email}</div>
        </>
      ) : (
        <>
          <div>ログアウト中です</div>
          <div>{userProfile.name}</div>
        </>
      )}
    </>
  )
}
export default mypage
