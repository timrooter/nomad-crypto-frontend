import { baseApi } from '@/app/baseApi'
import { GetHistory } from '@/types/serverResponses'

const historyApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getHistory: build.query<GetHistory, void>({
      query: () => ({
        url: '/api/transactions',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetHistoryQuery } = historyApi
