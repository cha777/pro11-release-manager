import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import { CirclePlus, CircleMinus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingIndicator } from '@/components/loading-indicator';
import { TableComponent } from '@/components/table-component';
import { ReleaseSummaryView } from './release-summary-view';

import { project } from '@/api';
import type { Release } from '@/types/release';

const columns: ColumnDef<Release>[] = [
  {
    id: 'expanded',
    cell: ({ row, table }) => {
      const isExpanded = row.getIsExpanded();

      return (
        <Button
          size='icon'
          variant='outline'
          className='h-6 w-6'
          onClick={() => {
            table.resetExpanded();
            row.toggleExpanded(!isExpanded);
          }}
        >
          {isExpanded ? <CircleMinus className='h-3 w-3' /> : <CirclePlus className='h-3 w-3' />}
          <span className='sr-only'>Expand/Collapse</span>
        </Button>
      );
    },
  },
  {
    accessorKey: 'self',
    header: () => <div className='w-19'>#</div>,
    cell: ({ row }) => {
      return (
        <a
          className='text-primary underline-offset-4 hover:underline'
          href={row.getValue('self')}
          target='_blank'
        >
          {row.original.id}
        </a>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'workflow',
    header: 'Workflow',
  },
  {
    accessorKey: 'released',
    header: 'Released',
    cell: ({ row }) => {
      const isReleased = row.getValue('released');
      const className = isReleased ? 'bg-lime-500' : 'bg-cyan-500';
      const content = isReleased ? 'Released' : 'Unreleased';
      return <Badge className={className}>{content}</Badge>;
    },
  },
];

export const ReleaseList: FC = () => {
  const query = useQuery({ queryKey: ['releases'], queryFn: project.getProjectDetails });

  if (query.isLoading || query.isFetching) {
    return <LoadingIndicator />;
  }

  if (query.data) {
    return (
      <TableComponent
        columns={columns}
        data={query.data.releases}
        renderExpandedRow={(row) => <ReleaseSummaryView release={row} />}
      />
    );
  }

  return null;
};
