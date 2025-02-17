import { parseJwt } from '@/lib/parseJwt'
import { User } from '@/types/instances'
import { useCookies } from 'next-client-cookies'

const useAuth = () => {
  const cookies = useCookies()
  const isClient = typeof window !== 'undefined'

  const accessTokenCookie = cookies.get('accessToken')
  const accessTokenLocalStorage = isClient ? localStorage.getItem('accessToken') : null
  const isAuthenticated = !!(accessTokenCookie || accessTokenLocalStorage)

  const setAccessToken = (accessToken: string) => {
    if (isClient) {
      window.localStorage.setItem('accessToken', accessToken)
    }
    cookies.set('accessToken', accessToken, { expires: 60 * 60 * 24 * 30 })
  }

  const getUser = () => {
    const accessToken = cookies.get('accessToken')

    if (!accessToken) {
      return null
    }

    const user = parseJwt(accessToken)

    return user ? (user as User) : null
  }

  const logout = () => {
    if (isClient) {
      window.localStorage.removeItem('accessToken')
    }
    cookies.remove('accessToken')
    window.location.reload()
  }

  return { isAuthenticated, logout, setAccessToken, getUser }
}

export default useAuth
