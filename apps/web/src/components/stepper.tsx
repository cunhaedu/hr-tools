import clsx from 'clsx';

interface StepperProps {
  length: number;
  currentStep: number;
}

export function Stepper({ length, currentStep }: StepperProps) {
  return (
    <div className='flex items-center justify-center gap-2'>
      {Array.from(Array(length + 1).keys()).map((index) => (
        <div
          key={index}
          className={clsx(
            'flex h-6 w-6 rounded-full justify-center items-center',
            index === currentStep ? 'bg-primary' : 'bg-border'
          )}
        >
          <span
            className={clsx(
              "text-xs text-center text-black",
              {"dark:text-white": index !== currentStep}
            )}
          >
            {index + 1}
          </span>
        </div>
      ))}
    </div>
  );
}
