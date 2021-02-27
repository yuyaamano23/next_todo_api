import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CounterState = {
  count: number
}

// 初期状態
export const initialState: CounterState = {
  count: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementCounter: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    decrementCounter: (state, action: PayloadAction<number>) => {
      state.count -= action.payload
    },
  },
})

export default counterSlice
