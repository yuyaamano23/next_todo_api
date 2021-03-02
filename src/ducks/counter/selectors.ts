import { useSelector } from 'react-redux'
import { CounterState } from './slice'

export const useCounterState: any = () => {
  return useSelector((state: { counter: CounterState }) => state)
}
