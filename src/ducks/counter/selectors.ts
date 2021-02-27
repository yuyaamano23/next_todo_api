import { useSelector } from 'react-redux'
import { CounterState } from './slice'

// FIXME: なんかエラー出てる
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCounterState = () => {
  return useSelector((state: { counter: CounterState }) => state)
}
