import type { FC } from 'react';

import { Step } from '@/components/ui/step';
import type { Release } from '@/types/release';

interface ReleaseWorkflowViewProps {
  release: Release;
}

export const ReleaseWorkflowView: FC<ReleaseWorkflowViewProps> = ({ release }) => {
  const steps = ['Dev', 'QA', 'UAT', 'Prod'];

  return (
    <>
      <div className='flex space-x-8'>
        {steps.map((step, index) => (
          <Step
            key={index}
            stepNumber={index + 1}
            title={step}
            completed={index <= release.workflowId!}
            onClick={() => {}}
            stepHint={`Move to ${steps[index]}`}
          />
        ))}
      </div>
    </>
  );
};
