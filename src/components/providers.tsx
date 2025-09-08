
'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { app } from '@/lib/firebase';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

export function AppProviders({ children }: PropsWithChildren) {
    const [queryClient] = useState(() => new QueryClient());
    
    // These are now unused but kept here in case you need them later for other Firebase services.
    // const auth = getAuth(app);
    // const functions = getFunctions(app);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
