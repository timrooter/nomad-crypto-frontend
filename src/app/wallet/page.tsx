import { BalanceSection } from '@/components/balance-section'
import { ExchangeCurrencySection } from '@/components/exchange-currency-section'
import { WalletSection } from '@/components/wallet-section'

export default function Wallet() {
  return (
    <main className={'flex flex-col gap-4'}>
      <WalletSection />
      <BalanceSection />
      <ExchangeCurrencySection />
    </main>
  )
}
