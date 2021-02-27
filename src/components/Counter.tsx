import React from 'react'
import { useDispatch } from 'react-redux'
import counterSlice from 'ducks/counter/slice'
import { useCounterState } from 'ducks/counter/selectors'

const Counter: React.FC = () => {
  const dispatch = useDispatch()
  const state = useCounterState().counter

  return (
    <>
      <div>{state.count}</div>
    </>
  )
}

export default Counter
