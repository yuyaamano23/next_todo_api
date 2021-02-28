import { useSelector } from 'react-redux'
import { AuthState } from './slice'

// FIXME: なんかエラー出てる
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuthState = () => {
  return useSelector((state: { auth: AuthState }) => state)
}
