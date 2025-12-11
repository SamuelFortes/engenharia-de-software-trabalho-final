import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function CondoVoteLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center gap-2" >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="32"
            height="32"
            {...props}
        >
            <g>
                <rect fill="hsl(var(--primary))" width="100" height="100" rx="20" />
                <path fill="hsl(var(--card))" d="M30 50 L45 65 L70 40 L65 35 L45 55 L35 45 z" />
            </g>
        </svg>
        <span className={cn('font-headline text-xl font-bold', props.className)}>CondoVote</span>
    </div>
  );
}
