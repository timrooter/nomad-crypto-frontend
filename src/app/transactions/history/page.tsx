'use client'

import { useGetHistoryQuery } from '@/app/transactions/history/api'
import { Card } from '@/components/ui/card'
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { CURRENCIES } from '@/lib/constans'
import { Transaction, TransactionType } from '@/types/instances'
import { Ping } from '@uiball/loaders'

export default function Transactions() {
  const { data, isLoading, isError } = useGetHistoryQuery()

  const getTransactionTypeName = (transaction: Transaction) => {
    const typesName: Record<TransactionType, string> = {
      QR_Transfer: 'QR Transfer',
      Bank_Card_Transfer: 'Bank Card Transfer',
      Transfer_Request: 'Transfer Request',
      Direct_Transfer_To_Wallet: 'Direct Transfer',
    } as const

    return typesName[transaction.transactionType as TransactionType]
  }

  return (
    <main className={'flex flex-col items-center gap-6'}>
      <Card className={'w-full max-w-lg p-4'}>
        {isLoading && (
          <div className={'my-16 flex items-center justify-center'}>
            <Ping size={50} speed={1.3} color={'hsl(var(--card-foreground))'} />
          </div>
        )}
        {isError && (
          <div className={'my-8 flex items-center justify-center'}>
            <span>Error while fetching transactions history</span>
          </div>
        )}
        {data && (
          <Table>
            <TableHeader>
              <TableRow className={'font-medium sm:text-lg'}>
                <TableCell className={'text-card-foreground/70 max-sm:p-2'}>
                  Transaction Type
                </TableCell>
                <TableCell className={'text-center text-card-foreground/70 max-sm:p-2'}>
                  Amount
                </TableCell>
                <TableCell className={'text-center text-card-foreground/70 max-sm:p-2'}>
                  Currency
                </TableCell>
              </TableRow>
            </TableHeader>
            {data.map((transaction, index) => (
              <TableRow key={index} className={'font-medium sm:text-lg'}>
                <TableCell className={'max-sm:p-2 sm:px-6 sm:text-base'}>
                  {getTransactionTypeName(transaction)}
                </TableCell>
                <TableCell className={'text-center max-sm:p-2 max-sm:text-base'}>
                  {transaction.amount}
                </TableCell>
                <TableCell className={'text-center max-sm:p-2 sm:text-base'}>
                  {CURRENCIES.find(currency => currency.value === transaction.currency)
                    ?.abbreviation || transaction.currency}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </main>
  )
}
