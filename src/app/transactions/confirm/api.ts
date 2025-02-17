import { baseApi } from '@/app/baseApi'
import { TransactionData } from '@/types/instances'
import { GetUserCurrencies } from '@/types/serverResponses'

const transactionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    processTransaction: build.mutation<GetUserCurrencies, TransactionData>({
      query: body => ({
        url: `/api/transactions`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useProcessTransactionMutation } = transactionApi
