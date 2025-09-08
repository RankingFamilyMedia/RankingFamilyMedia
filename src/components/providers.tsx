
'use client';

import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { PropsWithChildren, useState } from 'react';
import { AuthProvider, FirebaseAppProvider, FunctionsProvider, useFirebaseApp } from 'reactfire';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { app } from '@/lib/firebase';


function FirebaseServiceProviders({ children }: PropsWithChildren) {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const functions = getFunctions(app);

    return (
        <AuthProvider sdk={auth}>
            <FunctionsProvider sdk={functions}>
                {children}
            </FunctionsProvider>
        </AuthProvider>
    );
}

export function AppProviders({ children }: PropsWithChildren) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <FirebaseAppProvider firebaseApp={app}>
                <FirebaseServiceProviders>{children}</FirebaseServiceProviders>
            </FirebaseAppProvider>
        </QueryClientProvider>
    );
}
