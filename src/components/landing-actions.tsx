'use client'

import { Button } from '@/components/ui/button'
import useAuth from '@/lib/useAuth'
import Link from 'next/link'

export const LandingActions = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className={'flex flex-col items-center justify-between gap-4 md:flex-row md:gap-2'}>
      <Button
        asChild
        variant={'secondary'}
        size={'lg'}
        className={'w-2/3 rounded-2xl text-lg md:w-5/12'}
      >
        <Link href={isAuthenticated ? '/rates' : '/auth/login'}>
          {isAuthenticated ? 'Check rates' : 'Sign In'}
        </Link>
      </Button>
      <Button
        asChild
        variant={'secondary'}
        size={'lg'}
        className={'w-2/3 rounded-2xl text-lg md:w-5/12'}
      >
        <Link href={isAuthenticated ? '/transactions' : '/auth/signup'}>
          {isAuthenticated ? 'Exchange' : 'Sign Up'}
        </Link>
      </Button>
    </div>
  )
}
