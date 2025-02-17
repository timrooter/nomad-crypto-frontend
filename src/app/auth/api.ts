import { LoginFields } from '@/app/auth/login/page'
import { SignupFields } from '@/app/auth/signup/page'
import { baseApi } from '@/app/baseApi'
import { LoginResponse, SignupResponse } from '@/types/serverResponses'

const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginResponse, LoginFields>({
      query: data => ({
        url: '/auth/authenticate',
        method: 'POST',
        body: data,
      }),
    }),
    signup: build.mutation<SignupResponse, SignupFields>({
      query: data => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = authApi
