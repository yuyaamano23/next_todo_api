import { createSlice } from '@reduxjs/toolkit'

export type AuthState = {
  isLoggedIn: boolean
}

// 初期状態
export const initialState: AuthState = {
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state) => {
      state.isLoggedIn = true
    },
    loggedOut: (state) => {
      state.isLoggedIn = false
    },
  },
})

export default authSlice
