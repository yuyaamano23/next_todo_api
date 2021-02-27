import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import countSlice from 'ducks/counter/slice'

const reducer = combineReducers({
  counter: countSlice.reducer,
})

const store = configureStore({ reducer })

export default store
