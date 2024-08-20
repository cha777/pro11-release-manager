import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';

import { LoadingIndicator } from '@/components/loading-indicator';
import { TableComponent } from '@/components/table-component';

import { project } from '@/api';
import type { Release } from '@/types/release';
import { Badge } from './ui/badge';

const columns: ColumnDef<Release>[] = [
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
    accessorKey: 'description',
    header: 'Description',
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
    <LoadingIndicator />;
  }

  if (query.data) {
    return (
      <TableComponent
        columns={columns}
        data={query.data.releases}
      />
    );
  }

  return <div>ReleaseList</div>;
};
