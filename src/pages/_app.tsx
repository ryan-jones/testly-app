import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AuthContextProvider } from '@/contexts/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ErrorBoundary>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
