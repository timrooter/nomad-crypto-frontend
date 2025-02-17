'use client'

import { useGetCardQuery } from '@/app/transactions/card/api'
import { Logo } from '@/components/icons/logo'
import { Card } from '@/components/ui/card'

export const BankCard = ({ className }: { className?: string }) => {
  const { data, isLoading, isError } = useGetCardQuery()

  return (
    <div className={className}>
      {isError ? (
        <h1 className={'scroll-m-20 text-3xl font-medium lg:text-4xl'}>
          Error while fetching card data
        </h1>
      ) : (
        <Card
          className={
            'relative grid h-52 w-full max-w-sm grid-rows-[1fr_auto_auto_auto] gap-1 overflow-hidden rounded-3xl bg-gradient-to-b from-[#141a6b] via-[#272f91] to-[#141a6b] p-5 text-accent-foreground'
          }
        >
          <div>
            <Logo className={'h-8'} />
          </div>
          <div className={`py-1.5 text-xl font-medium tracking-[0.075em] sm:text-2xl`}>
            {isLoading ? (
              <div className={'h-8 w-10/12 animate-pulse rounded bg-accent-foreground/25'} />
            ) : (
              <>
                {data!.cardNumber.slice(0, 4)} {data!.cardNumber.slice(4, 8)}{' '}
                {data!.cardNumber.slice(8, 12)} {data!.cardNumber.slice(12, 16)}
              </>
            )}
          </div>
          <div className={'mt-1 flex justify-between text-sm tracking-widest'}>
            <span>
              {isLoading ? (
                <div className={'my-1 h-4 w-12 animate-pulse rounded bg-accent-foreground/25'} />
              ) : (
                data!.expiryDate
              )}
            </span>
            <span className={'italic'}>
              {isLoading ? (
                <div className={'my-1 h-4 w-8 animate-pulse rounded bg-accent-foreground/25'} />
              ) : (
                data!.cvv
              )}
            </span>
          </div>
          <div className={'font-semibold uppercase tracking-wider'}>
            {isLoading ? (
              <div className={'my-1 h-4 w-1/3 animate-pulse rounded bg-accent-foreground/25'} />
            ) : (
              data!.cardHolderName
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
