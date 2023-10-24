import clsx from 'clsx';

import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip"

interface StepperProps {
  stepTitles: string[];
  currentStep: number;
}

export function Stepper({ stepTitles, currentStep }: StepperProps) {
  return (
    <div className='flex items-center justify-center gap-2'>
      {stepTitles.map((title, index) => (
        <TooltipProvider key={title}>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={clsx(
                  'flex h-6 w-6 rounded-full justify-center items-center text-xs text-center text-black',
                  index === currentStep ? 'bg-primary' : 'bg-border dark:text-white'
                )}
              >
                {index + 1}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
