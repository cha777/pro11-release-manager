import type { FC, ReactNode } from 'react';
import { withAuthGuard } from '@/hocs/with-auth-guard';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = withAuthGuard((props) => {
  const { children } = props;

  return (
    <div className='relative flex w-full h-screen flex-col bg-background'>
      <main className='grid flex-1 items-start gap-4 p-4 sm:px-6  md:gap-8'>{children}</main>
    </div>
  );
});
