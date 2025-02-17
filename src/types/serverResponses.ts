import { Card, Transaction } from '@/types/instances'

export type LoginResponse = {
  accessToken: string
}

export type SignupResponse = {
  accessToken: string
}

export type GetExchangeRates = {
  [key: string]: number
  kzt_to_solana: number
  bitcoin_to_kzt: number
  usd_to_ethereum: number
  solana_to_usd: number
  ethereum_to_usd: number
  usd_to_tether: number
  kzt_to_bitcoin: number
  tether_to_usd: number
  binancecoin_to_kzt: number
  kzt_to_binancecoin: number
  usd_to_kzt: number
  kzt_to_ethereum: number
  ripple_to_kzt: number
  kzt_to_usd: number
  usd_to_binancecoin: number
  usd_to_ripple: number
  kzt_to_tether: number
  bitcoin_to_usd: number
  usd_to_solana: number
  solana_to_kzt: number
  usd_to_bitcoin: number
  ethereum_to_kzt: number
  binancecoin_to_usd: number
  tether_to_kzt: number
  usd_to_usd: number
  ripple_to_usd: number
  kzt_to_ripple: number
}

export type GetUserCurrencies = {
  [key: string]: number
  id: number
  userId: number
  ethereum: number
  ripple: number
  tether: number
  binancecoin: number
  solana: number
  bitcoin: number
  usd: number
  kzt: number
}

export type GetCard = Card

export type GetHistory = Transaction[]
