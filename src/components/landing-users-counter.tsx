'use client'

import { useGetUsersCountQuery } from '@/app/api'
import { Card, CardContent } from '@/components/ui/card'
import NumberTicker from '@/components/ui/number-ticker'
import { cn } from '@/lib/utils'
import { Ping } from '@uiball/loaders'
import { CircleUserRound } from 'lucide-react'

export const LandingUsersCounter = () => {
  const { data: usersCount, isLoading, isError } = useGetUsersCountQuery()

  return (
    <Card className={'py-2'}>
      <CardContent className={'flex flex-col items-center gap-2 py-0 font-bold'}>
        <h1>Current Users in the system</h1>
        <div className={'relative'}>
          {isError ? (
            <span>Error while fetching users count</span>
          ) : (
            <>
              <span
                className={cn(
                  'absolute inset-0 flex items-center justify-center transition-opacity duration-200',
                  { 'opacity-0': !isLoading, 'opacity-100': isLoading }
                )}
              >
                <Ping size={35} speed={1.3} color={'hsl(var(--card-foreground))'} />
              </span>
              <span
                className={cn(
                  'flex items-center gap-2 text-3xl transition-opacity duration-200 md:text-4xl lg:text-5xl',
                  { 'opacity-0': isLoading, 'opacity-100': !isLoading }
                )}
              >
                <CircleUserRound className={'size-10 stroke-[1.5px] md:size-12 lg:size-16'} />
                <NumberTicker value={usersCount || 0} className={'text-card-foreground'} />
              </span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
