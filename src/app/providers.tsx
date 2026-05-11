'use client';

import theme from '@/chakra/theme';
import Layout from '@/components/layout/Layout';
import { ColorModeProvider } from '@/components/ui/color-mode';
import { ToasterProvider } from '@/components/ui/toaster';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as JotaiProvider } from 'jotai';
import { useEffect, useState } from 'react';
import EmotionRegistry from './emotion-registry';
import { AuthInitializer } from '@/src/features/auth';

/**
 * Root provider tree.
 * - Jotai: still used for community/post/directory state (not auth)
 * - Zustand: used for auth state via AuthInitializer
 * - AuthInitializer: rehydrates user session on mount
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <JotaiProvider>
      <EmotionRegistry>
        <ChakraProvider value={theme}>
          <ColorModeProvider>
            <ToasterProvider>
              {/* Rehydrates auth session from JWT on every page load */}
              <AuthInitializer />
              <Layout>{children}</Layout>
            </ToasterProvider>
          </ColorModeProvider>
        </ChakraProvider>
      </EmotionRegistry>
    </JotaiProvider>
  );
}
