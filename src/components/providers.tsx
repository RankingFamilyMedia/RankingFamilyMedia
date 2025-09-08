'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { app } from '@/lib/firebase';
import { FirebaseAppProvider } from 'reactfire';

export function AppProviders({ children }: PropsWithChildren) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <FirebaseAppProvider firebaseApp={app}>
                {children}
            </FirebaseAppProvider>
        </QueryClientProvider>
    );
}
