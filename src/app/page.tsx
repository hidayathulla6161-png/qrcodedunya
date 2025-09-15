'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AppShell from '../components/AppShell';
import RedirectHandler from '../components/RedirectHandler';
import { QrCode } from 'lucide-react';

function PageContent() {
  const searchParams = useSearchParams();
  const qrId = searchParams.get('qrId');
  const password = searchParams.get('password');

  // If a qrId is present in the URL, it's a redirect link.
  if (qrId) {
    return <RedirectHandler qrId={qrId} password={password} />;
  }

  // For all other cases, show the main app.
  return <AppShell />;
}


export default function Home() {
  return (
    <main className="min-h-screen w-full">
        <Suspense fallback={
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-lg font-medium">
              <QrCode className="h-12 w-12 animate-pulse text-primary" />
              <p className="text-muted-foreground">Loading QRcodeDunya...</p>
            </div>
        }>
          <PageContent />
        </Suspense>
    </main>
  );
}