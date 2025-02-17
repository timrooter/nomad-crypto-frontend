import { ExchangeRatesList } from '@/components/exchange-rates-list'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Rates() {
  return (
    <main>
      <Card className={'container mx-auto max-w-[800px] max-md:px-0.5'}>
        <CardHeader className={'text-2xl font-medium tracking-wide max-md:px-0 max-md:text-center'}>
          Current Exchange Rates
        </CardHeader>
        <CardContent className={'min-h-[150px] max-md:px-0.5'}>
          <ExchangeRatesList />
        </CardContent>
      </Card>
    </main>
  )
}
