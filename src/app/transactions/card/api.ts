import { baseApi } from '@/app/baseApi'
import { GetCard } from '@/types/serverResponses'

const cardApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getCard: build.query<GetCard, void>({
      query: () => ({
        url: '/api/card',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetCardQuery } = cardApi
