'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useQrDecode } from 'react-qr-hooks'
import Webcam from 'react-webcam'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TransactionData } from '@/types/instances'
import { CameraIcon, ImageIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Transactions() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState('')
  const [showCamera, setShowCamera] = useState(false)
  const [scanError, setScanError] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const webcamRef = useRef<Webcam>(null)

  const parseQRCode = (result: string) => {
    if (!result) {
      return 'error'
    }

    let parsedResult

    try {
      parsedResult = JSON.parse(result) as TransactionData
    } catch (error) {
      return 'error'
    }

    if (
      'currency' in parsedResult &&
      'amount' in parsedResult &&
      'toUsername' in parsedResult &&
      'transactionType' in parsedResult &&
      parsedResult.amount > 0 &&
      parsedResult.currency.length > 0 &&
      parsedResult.toUsername.length > 0 &&
      [
        'Direct_Transfer_To_Wallet',
        'QR_Transfer',
        'Transfer_Request',
        'Bank_Card_Transfer',
      ].includes(parsedResult.transactionType)
    ) {
      return parsedResult as TransactionData
    } else {
      return 'error'
    }
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        setShowCamera(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const decodedImage = useQrDecode(selectedImage || capturedImage || '')

  useEffect(() => {
    if (decodedImage) {
      const data = parseQRCode(decodedImage)

      if (data === 'error') {
        setScanError(true)
      }

      if (data !== 'error') {
        const queryParams = new URLSearchParams(
          data as unknown as Record<string, string>
        ).toString()

        router.push(`/transactions/confirm?${queryParams}`)
      }
    }
  }, [decodedImage])

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let intervalId: NodeJS.Timeout | null = null

    if (showCamera) {
      intervalId = setInterval(() => {
        const imageSrc = webcamRef.current?.getScreenshot()

        if (imageSrc) {
          setCapturedImage(imageSrc)
        }
      }, 500)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [showCamera])

  return (
    <main className={'flex flex-col items-center gap-12'}>
      <Card className={'w-full max-w-md'}>
        <CardHeader className={'text-2xl font-medium tracking-wide max-md:px-0 max-md:text-center'}>
          Scan QR Code
        </CardHeader>
        <CardContent className={'grid gap-6'}>
          <div className={'grid gap-3'}>
            <Label
              htmlFor={'image-upload'}
              className={
                'inline-flex cursor-pointer items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-primary-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
              }
            >
              <ImageIcon className={'mr-2 h-4 w-4'} />
              <Input
                id={'image-upload'}
                type={'file'}
                accept={'.jpg, .jpeg, .png'}
                className={'sr-only'}
                onChange={handleImageUpload}
              />
              Select Image
            </Label>
            <Button onClick={() => setShowCamera(true)}>
              <CameraIcon className={'mr-2 h-4 w-4'} />
              Scan with Camera
            </Button>
            {(showCamera || typeof decodedImage === 'undefined' || scanError) && (
              <div>
                {!showCamera && (
                  <p className={'font-medium'}>Oops! We couldn&apos;t scan the QR code.</p>
                )}
                <p className={'mb-1 mt-2'}>Please make sure that qr code is:</p>
                <ul>
                  <li>&#9642; Well-lit and in focus.</li>
                  <li>&#9642; Positioned directly over the QR code.</li>
                  <li>&#9642; Not damaged or obscured.</li>
                  <li>&#9642; Correct and properly formatted.</li>
                </ul>
              </div>
            )}
            {showCamera && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat={'image/jpeg'}
                videoConstraints={{ facingMode: 'environment' }}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
