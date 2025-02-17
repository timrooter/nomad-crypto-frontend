'use client'

import { useEffect, useState } from 'react'

import { BankCard } from '@/components/bank-card'
import { Card, CardContent } from '@/components/ui/card'
import useAuth from '@/lib/useAuth'
import { User } from '@/types/instances'

export const WalletSection = () => {
  const { getUser } = useAuth()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = getUser()

    setUser(userData)
  }, [])

  return (
    <Card className={'container mx-auto max-w-[800px] max-md:px-0.5'}>
      <CardContent className={'grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 sm:gap-4'}>
        <div className={'flex flex-col gap-2 py-4'}>
          <span
            className={
              'line-clamp-1 flex text-2xl font-medium tracking-wide max-md:px-0 max-md:text-center md:text-3xl'
            }
          >
            Welcome back, {user?.preferred_username}!
          </span>
          <span className={'flex items-center text-lg'}>{user?.email}</span>
        </div>
        <BankCard className={'w-full justify-self-center max-sm:row-start-1 max-sm:-m-4'} />
      </CardContent>
    </Card>
  )
}
