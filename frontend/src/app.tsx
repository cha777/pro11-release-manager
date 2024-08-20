import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { SplashScreen } from '@/components/splash-screen';
import { AuthConsumer, AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from './contexts/theme-context';
import { routes } from '@/routes';

const queryClient = new QueryClient();

export const App: FC = () => {
  const element = useRoutes(routes);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthConsumer>{(auth) => (auth.isInitialized ? element : <SplashScreen />)}</AuthConsumer>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
