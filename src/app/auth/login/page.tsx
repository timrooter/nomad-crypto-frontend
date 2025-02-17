'use client'

import { useForm } from 'react-hook-form'

import { useLoginMutation } from '@/app/auth/api'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { getErrorMessage } from '@/lib/errorHandler'
import useAuth from '@/lib/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(3),
})

export type LoginFields = z.infer<typeof loginSchema>

export default function Login() {
  const { setAccessToken } = useAuth()
  const [login, { isLoading, isError, error }] = useLoginMutation()

  const form = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  const onSubmit = (data: LoginFields) => {
    login(data)
      .unwrap()
      .then(res => {
        setAccessToken(res.accessToken)
        window.location.replace('/wallet')
      })
  }

  return (
    <main className={'grid justify-items-center'}>
      <div className={'w-72'}>
        <h1 className={'mb-6 text-center text-2xl font-bold'}>Sign In</h1>
        <Form {...form}>
          <form className={'space-y-4'} onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={'Username'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={'username'}
            />
            <FormField
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type={'password'} placeholder={'Password'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={'password'}
            />
            <Button className={'w-full'} disabled={isLoading || !isValid}>
              {isLoading ? (
                <>
                  <Loader2 className={'mr-2 h-4 w-4 animate-spin'} />
                  Please wait
                </>
              ) : (
                'Log In'
              )}
            </Button>
          </form>
        </Form>
        {isError && (
          <div
            className={
              'mt-4 rounded-md border border-destructive/60 bg-destructive/10 py-2 text-center text-sm text-destructive'
            }
          >
            {getErrorMessage(error)}
          </div>
        )}
        <div className={'mt-4 flex justify-between text-foreground/80'}>
          <span>Don&apos;t have an account?</span>
          <Link href={'/auth/signup'} className={'font-bold'}>
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  )
}
