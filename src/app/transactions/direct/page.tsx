'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

const directSchema = z.object({
  toUsername: z.string().min(1, { message: 'Please enter a recipient username' }),
  currency: z.string().min(1, { message: 'Please select a currency' }),
  amount: z.preprocess(val => Number(val), z.number().positive()),
})

export type DirectFields = z.infer<typeof directSchema>

export default function Transactions() {
  const router = useRouter()
  const [currency, setCurrency] = useState('')

  const form = useForm<DirectFields>({
    resolver: zodResolver(directSchema),
    defaultValues: {
      toUsername: '',
      currency: '',
      amount: 0,
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  const onSubmit = (data: DirectFields) => {
    const query = {
      toUsername: data.toUsername,
      currency: data.currency,
      amount: data.amount,
      transactionType: 'Direct_Transfer_To_Wallet',
    }

    const queryParams = new URLSearchParams(query as unknown as Record<string, string>).toString()

    router.push(`/transactions/confirm?${queryParams}`)
  }

  return (
    <main className={'flex flex-col items-center gap-12'}>
      <Card className={'container mx-auto max-w-[800px] max-md:px-0.5'}>
        <CardHeader className={'text-2xl font-medium tracking-wide max-md:px-0 max-md:text-center'}>
          Direct Transfer
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
                  <FormItem className={'sm:col-span-2'}>
                    <FormLabel className={'text-lg'}>Receiver&apos;s Username</FormLabel>
                    <FormControl>
                      <Input {...field} onFocus={e => e.target.select()} placeholder={'Username'} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name={'toUsername'}
              />
              <FormField
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={'text-lg'}>Currency</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={value => {
                          field.onChange(value)
                          setCurrency(value)
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
                name={'currency'}
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
              <Button className={'sm:col-span-2'} disabled={!isValid}>
                Send
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
