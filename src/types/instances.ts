export type User = {
  exp: number
  iat: number
  jti: string
  iss: string
  aud: string[]
  sub: string
  rol: string[]
  name: string
  preferred_username: string
  email: string
}

export type TransactionData = {
  currency: string
  amount: number
  toUsername: string
  transactionType: string
}

export type TransactionType =
  | 'Direct_Transfer_To_Wallet'
  | 'QR_Transfer'
  | 'Transfer_Request'
  | 'Bank_Card_Transfer'

export type Card = {
  id: number
  cardNumber: string
  cardHolderName: string
  expiryDate: string
  cvv: string
}

export type Transaction = {
  fromWalletId: number
  toWalletId: number
  amount: number
  currency: string
  transactionType: string
}
