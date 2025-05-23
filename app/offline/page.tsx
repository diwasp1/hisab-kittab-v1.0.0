'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
        <h1 className="mt-4 text-3xl font-bold">You're Offline</h1>
        <p className="mt-2 text-gray-600">
          Please check your internet connection and try again.
        </p>
        <Button
          onClick={handleRetry}
          className="mt-4 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Retry
        </Button>
      </div>
    </div>
  );
} 