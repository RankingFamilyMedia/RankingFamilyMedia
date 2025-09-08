
'use client';

import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { PropsWithChildren, useState } from 'react';
import { AuthProvider, FirebaseAppProvider, FunctionsProvider } from 'reactfire';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { app } from '@/lib/firebase';

// Initialize services once outside the component
const auth = getAuth(app);
const functions = getFunctions(app);

export function AppProviders({ children }: PropsWithChildren) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <FirebaseAppProvider firebaseApp={app}>
                <AuthProvider sdk={auth}>
                    <FunctionsProvider sdk={functions}>
                        {children}
                    </FunctionsProvider>
                </AuthProvider>
            </FirebaseAppProvider>
        </QueryClientProvider>
    );
}
