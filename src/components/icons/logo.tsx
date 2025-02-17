import { SVGProps } from 'react'
import { cn } from '@/lib/utils'

export const Logo = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={101}
      height={24}
      viewBox="0 0 101 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('fill-accent-foreground', className)}
      {...props}
    >
      <path
        d="M25.4938 11.5995C25.4938 9.62351 25.7755 8.23492 26.5308 7.33711C27.2796 6.44702 28.5294 6 30.5728 6C32.616 6 33.8765 6.44699 34.6354 7.33789C35.4003 8.23585 35.6918 9.62443 35.6918 11.5995C35.6918 13.9595 35.3992 15.5503 34.63 16.5536C33.8709 17.5437 32.6149 18 30.5728 18C28.5306 18 27.2852 17.5437 26.5362 16.5544C25.7765 15.5511 25.4938 13.9603 25.4938 11.5995ZM30.5728 7.56841C29.0014 7.56841 28.1106 7.87325 27.6403 8.58701C27.4099 8.93674 27.2927 9.36809 27.2311 9.86887C27.1696 10.3694 27.1623 10.9549 27.1623 11.6196C27.1623 12.4944 27.1697 13.2309 27.2307 13.8402C27.2917 14.4486 27.4074 14.9477 27.6354 15.34C28.105 16.1477 29.0039 16.4316 30.5728 16.4316C32.1419 16.4316 33.0494 16.1476 33.5293 15.3414C33.7626 14.9493 33.8837 14.4501 33.9485 13.8412C34.0134 13.2315 34.0233 12.4947 34.0233 11.6196C34.0233 10.9544 34.0134 10.3687 33.948 9.86761C33.8826 9.36627 33.7599 8.93497 33.5242 8.5855C33.0439 7.87338 32.1445 7.56841 30.5728 7.56841Z"
        fill="white"
        style={{ mixBlendMode: 'difference' }}
      />
      <path
        d="M6 17.7397V6.26029H8.29942L13.8887 15.9891V6.26029H15.5573V17.7397H13.0977L7.66852 8.2913V17.7397H6Z"
        fill="white"
        style={{ mixBlendMode: 'difference' }}
      />
      <path
        d="M45.5282 17.7397V6.26029H48.0615L50.3669 13.7053L52.6723 6.26029H55.2657V17.7397H53.6172V8.61623L53.454 8.59162L51.5 15.2569H49.3855L47.3601 8.59248L47.1967 8.61623V17.7397H45.5282Z"
        fill="white"
        style={{ mixBlendMode: 'difference' }}
      />
      <path
        d="M85.1966 17.7397V6.26029H89.8951C91.7272 6.26029 92.9597 6.7618 93.7386 7.65707C94.5216 8.55704 94.874 9.886 94.874 11.5995C94.874 14.0025 94.4783 15.5275 93.6829 16.4539C92.894 17.3727 91.6784 17.7397 89.9352 17.7397H85.1966ZM89.9952 7.72858H86.8651V16.2714H89.9952C91.1027 16.2714 91.9281 15.9986 92.4632 15.256C92.9866 14.5296 93.2054 13.3866 93.2054 11.7197C93.2054 10.4357 92.9893 9.43457 92.4679 8.75264C91.9387 8.06072 91.1204 7.72858 89.9952 7.72858Z"
        fill="white"
        style={{ mixBlendMode: 'difference' }}
      />
      <path
        d="M68.4457 6.26029L65.255 17.7197H66.972L69.8552 7.72858H70.567L73.4501 17.7197H75.1672L71.9765 6.26029H68.4457Z"
        fill="white"
        style={{ mixBlendMode: 'difference' }}
      />
    </svg>
  )
}
