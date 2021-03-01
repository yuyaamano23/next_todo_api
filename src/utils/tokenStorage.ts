export const setItem: any = (key, value) => {
  // localStorage以外の保存方法に切り替えるようにするため
  // localStorage, sessionStorage, Cookie, ...
  localStorage.setItem(key, value)
}
export const getItem: any = (key) => {
  return localStorage.getItem(key)
}
const removeItem = (key) => {
  localStorage.removeItem(key)
}
/**
 * トークン・email保存する
 *
 * @param {String} token - 認証トークン
 * @param {String} email - email
 */
export const saveAuthToken: any = (token, email) => {
  setItem('token', token)
  setItem('email', email)
}
/**
 * 保存されたトークン・emailを削除する
 */
export const removeAuthToken: any = () => {
  removeItem('token')
  removeItem('email')
}

export const getUserId: any = () => {
  return getItem('email')
}
