import type { FC } from 'react';
import { Copy, Truck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { ReleaseWorkflowView } from './release-workflow-view';
import type { Release } from '@/types/release';

interface ReleaseSummaryViewProps {
  release: Release;
}

export const ReleaseSummaryView: FC<ReleaseSummaryViewProps> = ({ release }) => {
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='flex flex-row items-start bg-muted/50'>
        <div className='grid gap-0.5'>
          <CardTitle className='group flex items-center gap-2 text-lg'>
            {release.name}
            <Button
              size='icon'
              variant='outline'
              className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
            >
              <Copy className='h-3 w-3' />
              <span className='sr-only'>Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>{release.description}</CardDescription>
        </div>
        <div className='ml-auto flex items-center gap-1'>
          <Button
            size='sm'
            variant='outline'
            className='h-8 gap-1'
          >
            <Truck className='h-3.5 w-3.5' />
            <span className='lg:sr-only xl:not-sr-only xl:whitespace-nowrap'>Track Order</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className='p-6 text-sm'>
        <div className='grid gap-3'>
          <div className='font-semibold'>Release details</div>
          <ul className='grid gap-3'>
            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Release Period</span>
              <span>
                {release.startDate} - {release.releaseDate}
              </span>
            </li>

            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Uploaded date</span>
              <span>{release.dfnRmReleaseDate ?? '--'}</span>
            </li>

            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Uploaded by</span>
              <span>{release.uploadedBy ?? '--'}</span>
            </li>

            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Last updated date </span>
              <span>{release.lastUpdated ?? '--'}</span>
            </li>

            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Updated by</span>
              <span>{release.updatedBy ?? '--'}</span>
            </li>
          </ul>
        </div>

        {release.dfnRmID && (
          <>
            <Separator className='my-4' />

            <div className='grid gap-3'>
              <div className='font-semibold'>Workflow</div>
              <div className='flex justify-center'>
                <ReleaseWorkflowView release={release} />
              </div>
            </div>

            {/* <Separator className='my-4' />

            <div className='grid gap-3'>
              <div className='font-semibold'>Artifacts details</div>
              <ul className='grid gap-3'>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>DFNRM Release</span>
                  <span>{release.releaseLocation ?? '--'}</span>
                </li>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>DFNRM Release Note</span>
                  <span>{release.releaseNoteLocation ?? '--'}</span>
                </li>
              </ul>
            </div> */}
          </>
        )}
      </CardContent>
    </Card>
  );
};
