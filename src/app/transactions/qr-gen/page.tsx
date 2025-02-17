'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from '@/components/ui/drawer'
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
import useAuth from '@/lib/useAuth'
import { TransactionData, TransactionType, User } from '@/types/instances'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWindowSize } from '@uidotdev/usehooks'
import { QRCodeSVG } from 'qrcode.react'
import { z } from 'zod'

const generateQRSchema = z.object({
  currency: z.string().min(1, { message: 'Please select a currency' }),
  amount: z.preprocess(val => Number(val), z.number().positive()),
})

export type GenerateQRFields = z.infer<typeof generateQRSchema>

export default function Transactions() {
  const { getUser } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null)
  const screen = useWindowSize()

  const isDesktop = screen && screen.width ? screen.width > 768 : false

  useEffect(() => {
    const userData = getUser()

    setUser(userData)
  }, [])

  const form = useForm<GenerateQRFields>({
    resolver: zodResolver(generateQRSchema),
    defaultValues: {
      currency: '',
      amount: 0,
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form

  const onSubmit = (data: GenerateQRFields) => {
    if (!user) {
      return
    }

    setTransactionData({
      ...data,
      toUsername: user.preferred_username,
      transactionType: 'QR_Transfer' as TransactionType,
    })
    setModalOpen(true)
  }

  return (
    <main className={'flex flex-col items-center gap-12'}>
      {isDesktop ? (
        <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
          <DialogContent className={'w-[450px] p-10'}>
            <div className={'grid place-items-center rounded-lg bg-card p-4'}>
              <QRCodeSVG
                bgColor={'hsl(var(--card))'}
                fgColor={'hsl(var(--card-foreground))'}
                value={transactionData ? JSON.stringify(transactionData) : ''}
                size={300}
                className={'size-full'}
              />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isModalOpen} onOpenChange={setModalOpen}>
          <DrawerContent className={'h-fit'}>
            <div className={'m-4 grid place-items-center'}>
              <div className={'h-[calc(300px - 2rem)] rounded-lg bg-card p-4'}>
                <QRCodeSVG
                  bgColor={'hsl(var(--card))'}
                  fgColor={'hsl(var(--card-foreground))'}
                  value={transactionData ? JSON.stringify(transactionData) : ''}
                  className={'w-full'}
                  size={200}
                />
              </div>
            </div>
            <DrawerFooter className={'pt-2'}>
              <DrawerClose asChild>
                <Button variant={'outline'}>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
      <Card className={'container mx-auto max-w-[800px] max-md:px-0.5'}>
        <CardHeader className={'text-2xl font-medium tracking-wide max-md:px-0 max-md:text-center'}>
          Generate QR-code
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className={'space-y-4'} onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={'text-lg'}>Currency</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Button className={'w-full'} disabled={!user || !isValid}>
                Generate QR-code
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
