'use client'

import { useEffect, useState } from 'react'

import { useGetUserCurrenciesQuery } from '@/app/wallet/api'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { CURRENCIES } from '@/lib/constans'
import useAuth from '@/lib/useAuth'
import { User } from '@/types/instances'

export const BalanceSection = () => {
  const { getUser } = useAuth()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(getUser())
  }, [])

  const {
    data: userCurrencies,
    isLoading,
    status,
    isError,
  } = useGetUserCurrenciesQuery(user ? user.preferred_username : '', {
    skip: !user?.preferred_username,
  })

  return (
    <Card className={'container mx-auto max-w-[800px] max-md:px-0.5'}>
      <CardHeader className={'text-2xl font-medium tracking-wide max-md:px-0 max-md:text-center'}>
        Balance
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {isError ? (
              <TableRow className={'text-center'}>Error while fetching balance</TableRow>
            ) : (
              CURRENCIES.map((currency, index) => (
                <TableRow key={index}>
                  <TableCell
                    className={
                      'w-10 py-2 text-base font-medium text-card-foreground/70 sm:text-right'
                    }
                  >
                    {isLoading || status === 'uninitialized' ? (
                      <div
                        className={'m-1 h-5 w-10 animate-pulse rounded-md bg-card-foreground/25'}
                      />
                    ) : (
                      currency.abbreviation
                    )}
                  </TableCell>
                  <TableCell className={'hidden w-2/3 py-2 text-lg sm:table-cell'}>
                    {isLoading || status === 'uninitialized' ? (
                      <div
                        className={'m-1 h-5 w-full animate-pulse rounded-md bg-card-foreground/25'}
                      />
                    ) : (
                      currency.name
                    )}
                  </TableCell>
                  <TableCell
                    className={'flex items-center justify-end py-2 text-lg sm:justify-center'}
                  >
                    {isLoading || status === 'uninitialized' ? (
                      <div
                        className={'m-1 h-5 w-full animate-pulse rounded-md bg-card-foreground/25'}
                      />
                    ) : (
                      userCurrencies?.[currency.value] ?? ''
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
