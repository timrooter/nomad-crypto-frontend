import phoneHorizontal from '$/public/phone-horizontal.png'
import phoneVertical from '$/public/phone-vertical.png'
import { LandingActions } from '@/components/landing-actions'
import { LandingUsersCounter } from '@/components/landing-users-counter'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

export default function Home() {
  return (
    <main className={'flex flex-col'}>
      <LandingUsersCounter />
      <section className={'grid grid-cols-1 gap-2 md:grid-cols-2 md:px-6 xl:px-32'}>
        <article
          className={'mt-6 max-w-[500px] space-y-4 justify-self-center lg:mt-16 lg:space-y-6'}
        >
          <h1
            className={
              'text-center text-3xl font-medium tracking-wide md:text-4xl lg:text-left lg:text-5xl'
            }
          >
            Welcome to <span className={'font-bold'}>Blur</span>
          </h1>
          <p className={'text-lg leading-6 text-foreground/70'}>
            We help people legally pay for goods and services with cryptocurrency using the Blur
            virtual card. With our card, you can quickly and safely make everyday purchases and
            international transfers without losing money on exchange rate differences. We combine
            the ease of transfers via banking apps with the security and anonymity of crypto
            transactions.
          </p>
          <Separator />
          <LandingActions />
        </article>
        <div className={'grid place-items-center max-sm:-mx-6'}>
          <Image
            src={phoneVertical.src}
            priority
            alt={'blur'}
            width={1500}
            height={1125}
            className={'object-contain max-md:hidden'}
          />
          <Image
            src={phoneHorizontal.src}
            priority
            alt={'blur'}
            width={1500}
            height={1125}
            className={'object-contain md:hidden'}
          />
        </div>
      </section>
    </main>
  )
}
