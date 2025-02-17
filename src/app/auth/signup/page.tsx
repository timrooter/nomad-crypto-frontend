'use client'

import { useForm } from 'react-hook-form'

import { useSignupMutation } from '@/app/auth/api'
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

const SignupSchema = z.object({
  name: z.string(),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
})

export type SignupFields = z.infer<typeof SignupSchema>

export default function Signup() {
  const { setAccessToken } = useAuth()
  const [signup, { isLoading, isError, error, data: signupData }] = useSignupMutation()

  const form = useForm<SignupFields>({
    resolver: zodResolver(SignupSchema),
  })

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = form

  const onSubmit = (data: SignupFields) => {
    signup(data)
      .unwrap()
      .then(res => {
        setAccessToken(res.accessToken)
        window.location.replace('/wallet')
      })
  }

  return (
    <main className={'grid justify-items-center'}>
      <div className={'w-72'}>
        <h1 className={'mb-6 text-center text-2xl font-bold'}>Create Account</h1>
        <Form {...form}>
          <form className={'space-y-4'} onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={'Name'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={'name'}
            />
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
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} type={'email'} placeholder={'E-mail'} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={'email'}
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
                'Sign Up'
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
          <span>Have an account?</span>
          <Link href={'/auth/login'} className={'font-bold'}>
            Sign In
          </Link>
        </div>
      </div>
    </main>
  )
}
