import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

type CustomError = {
  statusCode: number
  message: string
}

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
): string => {
  if (!error) {
    return 'An unknown error occurred'
  }

  if ('status' in error) {
    const data = error.data as CustomError

    switch (error.status) {
      case 500:
        return data?.message || 'Internal server error. Please try again later.'
      case 400:
        return data?.message || 'Bad request. Please check your input.'
      case 401:
        return 'Unauthorized. Please log in and try again.'
      case 403:
        return 'Forbidden. You do not have permission to perform this action.'
      case 404:
        return 'Resource not found. Please try again.'
      case 422:
        return 'Validation error. Please check your input.'
      default:
        return data?.message || 'An unexpected error occurred. Please try again later.'
    }
  } else if ('message' in error && typeof error.message === 'string') {
    return error.message
  }

  return 'An unknown error occurred'
}
