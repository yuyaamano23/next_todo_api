import { useSelector } from 'react-redux'
import { AuthState } from './slice'

export const useAuthState: any = () => {
  return useSelector((state: { auth: AuthState }) => state)
}
