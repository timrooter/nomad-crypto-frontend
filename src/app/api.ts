import { baseApi } from '@/app/baseApi'

const homeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getUsersCount: build.query<number, void>({
      query: () => ({
        url: '/public/numberOfUsers',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetUsersCountQuery } = homeApi
