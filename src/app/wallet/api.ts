import { baseApi } from '@/app/baseApi'
import { ExchangeFields } from '@/components/exchange-currency-section'
import { GetUserCurrencies } from '@/types/serverResponses'

const homeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getUserCurrencies: build.query<GetUserCurrencies, string>({
      query: username => ({
        url: `/api/users/wallet/${username}`,
        // url: `/http/401`,
        method: 'GET',
      }),
    }),
    exchangeCurrencies: build.mutation<GetUserCurrencies, ExchangeFields>({
      query: body => ({
        url: '/api/wallets/transfer',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetUserCurrenciesQuery, useExchangeCurrenciesMutation } = homeApi
