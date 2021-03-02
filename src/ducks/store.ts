import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import countSlice from 'ducks/counter/slice'
import authSlice from 'ducks/auth/slice'

const reducer = combineReducers({
  counter: countSlice.reducer,
  auth: authSlice.reducer,
})

const store = configureStore({ reducer })

export default store
