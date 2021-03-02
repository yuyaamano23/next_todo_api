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
 * @param {String} email - メアド
 * @param {String} name - 名前
 */
export const saveAuthToken: any = (token, email, name) => {
  setItem('token', token)
  setItem('email', email)
  setItem('name', name)
}
/**
 * 保存されたトークン・email・nameを削除する
 */
export const removeAuthToken: any = () => {
  removeItem('token')
  removeItem('email')
  removeItem('name')
}

export const getUserToken: any = () => {
  return getItem('token')
}

export const getUserEmail: any = () => {
  return getItem('email')
}

export const getUserName: any = () => {
  return getItem('name')
}
