import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://crypto-demo-back-984b9f939635.herokuapp.com/',
  // baseUrl: 'https://dummyjson.com',
  credentials: 'include',
  prepareHeaders: headers => {
    const accessToken = window.localStorage.getItem('accessToken')

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const logout = () => {
    localStorage.removeItem('accessToken')
    Cookies.remove('accessToken')
    window.location.reload()

    return
  }

  const result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    logout()
  }

  return result
}

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
})
