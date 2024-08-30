import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type StepProps = {
  stepNumber: number;
  title: string;
  completed: boolean;
  onClick: () => void;
  stepHint: string;
};

export const Step = ({ stepNumber, title, completed, onClick, stepHint }: StepProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <div
        className={cn(
          'flex items-center justify-center h-10 w-10 rounded-full border-2',
          completed ? 'border-green-600 bg-green-100 text-green-600' : 'border-gray-300 text-gray-500'
        )}
      >
        {completed ? (
          <Check />
        ) : (
          <Button
            variant='ghost'
            className='text-lg font-semibold rounded-full'
            onClick={onClick}
          >
            {stepNumber}
            <span className='sr-only'>{stepHint}</span>
          </Button>
        )}
      </div>
      <h4 className={cn('text-sm font-medium', completed ? 'text-green-600' : 'text-gray-500')}>{title}</h4>
    </div>
  );
};
