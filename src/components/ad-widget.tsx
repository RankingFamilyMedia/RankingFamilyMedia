
'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

export function AdWidget() {
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error('AdSense error:', err);
            }
        }, 100); // Small delay to ensure container is rendered

        return () => clearTimeout(timer);
    }, []);

    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle>Advertisement</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center h-60 bg-gray-900 rounded-md">
                     <ins className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-client="ca-pub-6208745110537063"
                        data-ad-slot="1214402990"
                        data-ad-format="auto"
                        data-full-width-responsive="true"></ins>
                </div>
            </CardContent>
        </Card>
    );
}
