'use client'

import { useGetExchangeRatesQuery } from '@/app/rates/api'
import { BinanceCoin } from '@/components/icons/binance-coin'
import { Bitcoin } from '@/components/icons/bitcoin'
import { Ethereum } from '@/components/icons/ethereum'
import { Ripple } from '@/components/icons/ripple'
import { Solana } from '@/components/icons/solana'
import { Tether } from '@/components/icons/tether'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Ping } from '@uiball/loaders'

export const ExchangeRatesList = () => {
  const { data: exchangeRates, isLoading, isError } = useGetExchangeRatesQuery()

  return (
    <>
      {isLoading && (
        <div className={'mt-16 flex items-center justify-center'}>
          <Ping size={50} speed={1.3} color={'hsl(var(--card-foreground))'} />
        </div>
      )}
      {isError && (
        <div className={'mt-16 flex items-center justify-center'}>
          <span>Error while fetching exchange rates</span>
        </div>
      )}
      {!isLoading && exchangeRates && (
        <Table>
          <TableHeader>
            <TableRow className={'font-medium md:text-lg'}>
              <TableHead className={'w-4/12 text-card-foreground/70 md:w-5/12'}>Currency</TableHead>
              <TableHead className={'text-center text-card-foreground/70'}>To USD</TableHead>
              <TableHead className={'text-center text-card-foreground/70'}>To KZT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={'text-base md:text-lg'}>
            <TableRow>
              <TableCell className={'flex items-center gap-4 text-card-foreground'}>
                <Solana className={'size-10'} />{' '}
                <div className={'grid'}>
                  <span className={'text-nowrap text-xl font-semibold tracking-wide'}>Solana</span>
                  <span className={'text-xs'}>SOL</span>
                </div>
              </TableCell>
              <TableCell className={'text-center text-card-foreground'}>
                {parseFloat(exchangeRates.solana_to_usd.toFixed(2))}
              </TableCell>
              <TableCell className={'text-center text-card-foreground'}>
                {parseFloat(exchangeRates.solana_to_kzt.toFixed(2))}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={'flex items-center gap-4 text-card-foreground'}>
                <Ethereum className={'size-10'} />{' '}
                <div className={'grid'}>
                  <span className={'text-nowrap text-xl font-semibold tracking-wide'}>
                    Ethereum
                  </span>
                  <span className={'text-xs'}>ETH</span>
                </div>
              </TableCell>
              <TableCell className={'text-center text-card-foreground'}>
                {parseFloat(exchangeRates.ethereum_to_usd.toFixed(2))}
              </TableCell>
              <TableCell className={'text-center text-card-foreground'}>
                {parseFloat(exchangeRates.ethereum_to_kzt.toFixed(2))}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={'flex items-center gap-4 text-card-foreground'}>
                <Tether className={'size-10'} />{' '}
                <div className={'grid'}>
                  <span className={'text-nowrap text-xl font-semibold tracking-wide'}>Tether</span>
                  <span className={'text-xs'}>USDT</span>
                </div>
              </TableCell>
              <TableCell className={'text-center text-card-foreground'}>
                {parseFloat(exchangeRates.tether_to_usd.toFixed(2))}
              </TableCell>
              <TableCell className={'text-center text-card-foreground'}>
                {parseFloat(exchangeRates.tether_to_kzt.toFixed(2))}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={'flex items-center gap-4 text-card-foreground'}>
                <Bitcoin className={'size-10'} />{' '}
                <div className={'grid'}>
                  <span className={'text-nowrap text-xl font-semibold tracking-wide'}>Bitcoin</span>
                  <span className={'text-xs'}>BTC</span>
                </div>
              </TableCell>
              <TableCell className={'text-center text-card-foreground'}>
                {parseFloat(exchangeRates.bitcoin_to_usd.toFixed(2))}
              </TableCell>
              <TableCell className={'text-center text-card-foreground'}>
                {parseFloat(exchangeRates.bitcoin_to_kzt.toFixed(2))}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={'flex items-center gap-4 text-card-foreground'}>
                <Ripple className={'size-10'} />{' '}
                <div className={'grid'}>
                  <span className={'text-nowrap text-xl font-semibold tracking-wide'}>Ripple</span>
                  <span className={'text-xs'}>XRP</span>
                </div>
              </TableCell>
              <TableCell className={'text-center text-card-foreground'}>
                {parseFloat(exchangeRates.ripple_to_usd.toFixed(2))}
              </TableCell>
              <TableCell className={'text-center text-card-foreground'}>
                {parseFloat(exchangeRates.ripple_to_kzt.toFixed(2))}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className={'flex items-center gap-4 text-card-foreground'}>
                <BinanceCoin className={'size-10'} />{' '}
                <div className={'grid'}>
                  <span className={'text-nowrap text-xl font-semibold tracking-wide'}>
                    Binance Coin
                  </span>
                  <span className={'text-xs'}>BNB</span>
                </div>
              </TableCell>
              <TableCell className={'text-center text-card-foreground'}>
                {parseFloat(exchangeRates.binancecoin_to_usd.toFixed(2))}
              </TableCell>
              <TableCell className={'text-center text-card-foreground'}>
                {parseFloat(exchangeRates.binancecoin_to_kzt.toFixed(2))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  )
}
