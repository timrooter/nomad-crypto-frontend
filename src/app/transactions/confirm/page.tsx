'use client'

import { useState } from 'react'

import { useProcessTransactionMutation } from '@/app/transactions/confirm/api'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getErrorMessage } from '@/lib/errorHandler'
import {
  CircleCheckBig,
  Loader2,
  NotepadText,
  RefreshCcw,
  TriangleAlert,
  Wallet,
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function TransactionConfirm() {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const [processTransaction, { isLoading, isError, error }] = useProcessTransactionMutation()

  const toUsername = searchParams.get('toUsername')
  const currency = searchParams.get('currency')
  const amount = searchParams.get('amount')
  const transactionType = searchParams.get('transactionType')

  const processTransactionHandler = () => {
    if (!toUsername || !currency || !amount || !transactionType) {
      return
    }

    processTransaction({
      toUsername,
      currency,
      amount: Number(amount),
      transactionType,
    }).then(() => {
      setOpen(true)
    })
  }

  return (
    <main className={'flex flex-col items-center gap-12'}>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <div className={'flex justify-center'}>
            {isError ? (
              <TriangleAlert className={'size-12 stroke-red-500'} />
            ) : (
              <div className={'grid place-items-center rounded-full bg-green-200 p-2'}>
                <CircleCheckBig className={'size-12 stroke-green-500'} />
              </div>
            )}
          </div>
          <h2
            className={`text-center text-lg font-medium sm:text-xl ${isError ? 'text-destructive' : ''}`}
          >
            {isError ? 'Failed to complete the transaction' : 'Transaction completed successfully'}
          </h2>
          <h3
            className={`text-center text-base sm:text-lg ${isError ? 'font-medium text-foreground' : ''}`}
          >
            {isError ? (
              getErrorMessage(error)
            ) : (
              <>
                <span className={'font-medium'}>
                  {amount} {currency?.toUpperCase()}
                </span>{' '}
                has been sent to user <span className={'font-medium'}>{toUsername}</span>
              </>
            )}
          </h3>
          <AlertDialogFooter className={'mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2'}>
            {isError ? (
              <AlertDialogCancel onClick={() => setOpen(false)} className={'gap-2 font-semibold'}>
                <RefreshCcw className={'size-4'} /> Try again
              </AlertDialogCancel>
            ) : (
              <AlertDialogAction asChild>
                <Link href={'/wallet'} className={'gap-2'}>
                  <Wallet className={'size-5'} /> Return to Wallet
                </Link>
              </AlertDialogAction>
            )}
            <AlertDialogAction asChild>
              <Link href={'/transactions'} className={'gap-2'}>
                <NotepadText className={'size-5'} /> Return to Transactions
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className={'w-full max-w-md'}>
        <CardHeader className={'text-center text-2xl font-medium tracking-wide max-md:px-0'}>
          Transaction Details
        </CardHeader>
        <CardContent className={'grid gap-6'}>
          {toUsername && currency && amount && transactionType ? (
            <>
              <Table className={'text-lg'}>
                <TableBody>
                  <TableRow>
                    <TableCell className={'w-1/2 font-medium'}>To:</TableCell>
                    <TableCell>{toUsername}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={'w-1/2 font-medium'}>Currency:</TableCell>
                    <TableCell>{currency.toUpperCase()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={'w-1/2 font-medium'}>Amount:</TableCell>
                    <TableCell>{amount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button disabled={isLoading} onClick={processTransactionHandler}>
                {isLoading ? (
                  <>
                    <Loader2 className={'mr-2 h-4 w-4 animate-spin'} />
                    Please wait
                  </>
                ) : (
                  'Confirm Transaction'
                )}
              </Button>
            </>
          ) : (
            <>No data</>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
