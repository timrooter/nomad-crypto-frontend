import { SVGProps } from 'react'

import { cn } from '@/lib/utils'

export const Ripple = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      role={'img'}
      viewBox={'0 0 512 424'}
      xmlns={'http://www.w3.org/2000/svg'}
      className={cn('fill-[#23292f]', className)}
      {...props}
    >
      <title>Ripple</title>
      <path
        d={
          'M437,0h74L357,152.48c-55.77,55.19-146.19,55.19-202,0L.94,0H75L192,115.83a91.11,91.11,0,0,0,127.91,0Z'
        }
      />
      <path
        d={
          'M74.05,424H0L155,270.58c55.77-55.19,146.19-55.19,202,0L512,424H438L320,307.23a91.11,91.11,0,0,0-127.91,0Z'
        }
      />
    </svg>
  )
}
