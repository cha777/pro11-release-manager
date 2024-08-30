import type { FC } from 'react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoaderCircle } from 'lucide-react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Step } from '@/components/ui/step';
import type { Release } from '@/types/release';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { project } from '@/api';
import type { Project } from '@/types/project';

interface ReleaseWorkflowViewProps {
  release: Release;
}

const formSchema = z.object({
  id: z.number(),
  workflow: z.number(),
  comment: z.string().min(1, 'Comment cannot be empty').max(50),
});

export const ReleaseWorkflowView: FC<ReleaseWorkflowViewProps> = ({ release }) => {
  const steps = ['Dev', 'QA', 'UAT', 'Prod'];
  const [open, setOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<number>(0);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return project.changeWorkflow(values);
    },
    onSuccess: () => {
      const existingData = queryClient.getQueryData(['releases']) as Project;

      if (existingData) {
        const updatedData = {
          ...existingData,
          releases: existingData.releases.map((_release) => {
            if (_release.dfnRmID === release.dfnRmID) {
              return { ..._release, workflow: steps[selectedWorkflow], workflowId: selectedWorkflow };
            } else {
              return _release;
            }
          }),
        };

        queryClient.setQueryData(['releases'], updatedData);

        // TODD: Show toast message
      }

      setOpen(false);
    },
    onError: () => {
      // TODO: Handle error
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: release.dfnRmID,
      workflow: selectedWorkflow,
      comment: '',
    },
  });

  function onChangeWorkflow(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate(values);
  }

  return (
    <>
      <div className='flex space-x-8'>
        {steps.map((step, index) => (
          <Step
            key={index}
            stepNumber={index + 1}
            title={step}
            completed={index <= release.workflowId!}
            onClick={() => {
              form.setValue('workflow', index + 1);

              setSelectedWorkflow(index);
              setOpen(true);
            }}
            stepHint={`Move to ${steps[index]}`}
          />
        ))}
      </div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className='sm:max-w-md'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onChangeWorkflow)}
              className='space-y-8'
            >
              <DialogHeader>
                <DialogTitle>Change workflow to {steps[selectedWorkflow]}</DialogTitle>
              </DialogHeader>

              <FormField
                control={form.control}
                name='comment'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Comment'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className='sm:justify-start'>
                <Button
                  type='submit'
                  size='sm'
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
                      Please wait
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
