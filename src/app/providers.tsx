'use client';

import Layout from '@/components/layout/Layout';
import { ColorModeProvider } from '@/components/ui/color-mode';
import { ToasterProvider } from '@/components/ui/toaster';
import { Provider as JotaiProvider } from 'jotai';
import { useEffect, useState } from 'react';
import { AuthInitializer } from '@/src/features/auth';

/**
 * Root provider tree.
 * - Jotai: used for community/post/directory state
 * - AuthInitializer: rehydrates user session on mount via Zustand
 * - ColorModeProvider: handles dark mode via Tailwind 'dark' class
 * - ToasterProvider: handles notifications via custom Tailwind component
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <JotaiProvider>
      <ColorModeProvider>
        <ToasterProvider>
          {/* Rehydrates auth session from JWT on every page load */}
          <AuthInitializer />
          <Layout>{children}</Layout>
        </ToasterProvider>
      </ColorModeProvider>
    </JotaiProvider>
  );
}
