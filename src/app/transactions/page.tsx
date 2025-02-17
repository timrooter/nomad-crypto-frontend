'use client'

import { Button } from '@/components/ui/button'
import { CreditCard, FileClock, QrCode, ScanQrCode, UserCheck } from 'lucide-react'
import Link from 'next/link'

export default function Transactions() {
  return (
    <main className={'flex flex-col items-center gap-12'}>
      <h1 className={'scroll-m-20 text-3xl font-medium lg:text-4xl'}>Options</h1>
      <div className={'flex w-4/5 flex-col gap-6 sm:w-80'}>
        <Button
          asChild
          className={'rounded-lg p-3 sm:rounded-xl sm:p-6 sm:text-base'}
          variant={'expandIcon'}
          icon={<UserCheck className={'size-5'} />}
          iconPlacement={'right'}
        >
          <Link href={'/transactions/direct'}>Direct to User</Link>
        </Button>
        <Button
          asChild
          className={'w-full rounded-lg p-3 sm:rounded-xl sm:p-6 sm:text-base'}
          variant={'expandIcon'}
          icon={<QrCode className={'size-5'} />}
          iconPlacement={'right'}
        >
          <Link href={'/transactions/qr-gen'}>QR-code generation</Link>
        </Button>
        <Button
          asChild
          className={'w-full rounded-lg p-3 sm:rounded-xl sm:p-6 sm:text-base'}
          variant={'expandIcon'}
          icon={<ScanQrCode className={'size-5'} />}
          iconPlacement={'right'}
        >
          <Link href={'/transactions/qr-scan'}>Scan QR-code</Link>
        </Button>
        <Button
          asChild
          className={'w-full rounded-lg p-3 sm:rounded-xl sm:p-6 sm:text-base'}
          variant={'expandIcon'}
          icon={<FileClock className={'size-5'} />}
          iconPlacement={'right'}
        >
          <Link href={'/transactions/history'}>History of transactions</Link>
        </Button>
        <Button
          asChild
          className={'w-full rounded-lg p-3 sm:rounded-xl sm:p-6 sm:text-base'}
          variant={'expandIcon'}
          icon={<CreditCard className={'size-5'} />}
          iconPlacement={'right'}
        >
          <Link href={'/transactions/card'}>My bank card</Link>
        </Button>
      </div>
    </main>
  )
}
