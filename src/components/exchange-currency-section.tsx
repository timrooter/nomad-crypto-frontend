'use client'

import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useGetExchangeRatesQuery } from '@/app/rates/api'
import { useExchangeCurrenciesMutation } from '@/app/wallet/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CURRENCIES } from '@/lib/constans'
import { getErrorMessage } from '@/lib/errorHandler'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'

const exchangeSchema = z.object({
  fromCurrency: z.string().min(1, { message: 'Please select a currency' }),
  toCurrency: z.string().min(1, { message: 'Please select a currency' }),
  amount: z.preprocess(val => Number(val), z.number().positive()),
})

export type ExchangeFields = z.infer<typeof exchangeSchema>

export const ExchangeCurrencySection = () => {
  const amountOptions = [10, 20, 50, 100, 200, 500]

  const { data: exchangeRates } = useGetExchangeRatesQuery()
  const [exchangeCurrencies, { isLoading, isError, error }] = useExchangeCurrenciesMutation()
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')

  const form = useForm<ExchangeFields>({
    resolver: zodResolver(exchangeSchema),
    defaultValues: {
      fromCurrency: '',
      toCurrency: '',
      amount: 0,
    },
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
    watch,
  } = form

  const onSubmit = (data: ExchangeFields) => {
    exchangeCurrencies({
      fromCurrency: data.fromCurrency,
      toCurrency: data.toCurrency,
      amount: Number(data.amount),
    })
      .unwrap()
      .then(() => {
        window.location.reload()
      })
  }

  const amount = watch('amount')

  const exchange = useMemo(() => {
    if (fromCurrency !== 'usd' && fromCurrency !== 'kzt' && amount !== 0) {
      const rateToUsd = amount * (exchangeRates?.[fromCurrency + '_to_usd'] ?? 0)

      return new Intl.NumberFormat('ru-RU', {
        maximumSignificantDigits: 5,
      }).format(rateToUsd * (exchangeRates?.['usd' + '_to_' + toCurrency] ?? 0))
    }

    return new Intl.NumberFormat('ru-RU', {
      maximumSignificantDigits: 5,
    }).format(amount * (exchangeRates?.[fromCurrency + '_to_' + toCurrency] ?? 0))
  }, [amount, fromCurrency, toCurrency])

  return (
    <Card className={'container mx-auto max-w-[800px] max-md:px-0.5'}>
      <CardHeader className={'text-2xl font-medium tracking-wide max-md:px-0 max-md:text-center'}>
        Exchange Currency
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className={'grid grid-cols-1 gap-4 sm:grid-cols-2'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={'text-lg'}>From Currency</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={value => {
                        field.onChange(value)
                        setFromCurrency(value)
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className={'text-left text-card-foreground'}>
                        <SelectValue placeholder={'Select a currency'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {CURRENCIES.map(currency => (
                            <SelectItem
                              key={currency.value}
                              className={'text-card-foreground'}
                              value={currency.value}
                              disabled={currency.value === toCurrency}
                            >
                              {currency.abbreviation} - {currency.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={'fromCurrency'}
            />
            <FormField
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={'text-lg'}>To Currency</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={value => {
                        field.onChange(value)
                        setToCurrency(value)
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className={'text-card-foreground'}>
                        <SelectValue placeholder={'Select a currency'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {CURRENCIES.map(currency => (
                            <SelectItem
                              key={currency.value}
                              className={'text-card-foreground'}
                              value={currency.value}
                              disabled={currency.value === fromCurrency}
                            >
                              {currency.abbreviation} - {currency.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={'toCurrency'}
            />
            <FormField
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={'text-lg'}>Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onFocus={e => e.target.select()}
                      type={'number'}
                      min={0}
                      step={'0.00001'}
                      placeholder={'Amount'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name={'amount'}
            />
            <h3
              className={
                'flex justify-evenly self-end text-center font-medium text-card-foreground/70 max-sm:row-start-5 sm:py-2'
              }
            >
              <span className={'text-nowrap'}>
                {amount || '—'}{' '}
                {CURRENCIES.find(currency => currency.value === fromCurrency)?.abbreviation ||
                  fromCurrency ||
                  '−−−'}
              </span>{' '}
              <span>--&gt;</span>{' '}
              <span className={'text-nowrap'}>
                {exchange !== '0' ? exchange : '—'}{' '}
                {CURRENCIES.find(currency => currency.value === toCurrency)?.abbreviation ||
                  toCurrency ||
                  '−−−'}
              </span>
            </h3>
            <div className={'grid grid-cols-6 gap-2'}>
              {amountOptions.map(amount => (
                <Button
                  key={amount}
                  type={'button'}
                  onClick={() => setValue('amount', amount)}
                  className={'h-4 flex-1 p-1 text-xs max-sm:px-1 max-sm:py-0.5 sm:text-sm'}
                  variant={'link'}
                >
                  {amount}
                </Button>
              ))}
            </div>
            <Button className={'sm:col-span-2'} disabled={isLoading || !isValid}>
              {isLoading ? (
                <>
                  <Loader2 className={'mr-2 h-4 w-4 animate-spin'} />
                  Please wait
                </>
              ) : (
                'Exchange'
              )}
            </Button>
            {isError && (
              <div
                className={
                  'col-span-2 rounded-md border border-destructive/60 bg-destructive/10 py-2 text-center text-sm text-destructive'
                }
              >
                {getErrorMessage(error)}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
