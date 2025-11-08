'use client';

import { useEffect } from 'react';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global Error:', error);
    }

    // TODO: Send to error tracking service (e.g., Sentry)
    // trackError(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 border border-red-200 dark:border-red-900">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Application Error
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  We're sorry, but something went wrong. Our team has been notified and we're working on a fix.
                </p>
              </div>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <summary className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer mb-2">
                  Error details (development only)
                </summary>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Error ID: {error.digest}
                    </p>
                  )}
                  <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded overflow-auto max-h-60 border border-gray-200 dark:border-gray-700">
                    {error.stack}
                  </pre>
                </div>
              </details>
            )}

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try again
              </button>
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                Go home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
