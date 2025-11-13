import React from 'react';
import Link from 'next/link';

interface ErrorMessageProps {
  error: string;
  onDismiss: () => void;
}

export function ErrorMessage({ error, onDismiss }: ErrorMessageProps) {
  // Check if this is a monthly limit error
  const isLimitError = error.toLowerCase().includes('monthly') && error.toLowerCase().includes('limit');

  return (
    <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-md animate-fade-in z-50">
      <div className="flex items-start gap-3">
        <svg className="h-5 w-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="font-sans text-sm leading-relaxed">{error}</p>
          {isLimitError && (
            <Link
              href="/plans"
              className="inline-block mt-2 font-sans text-sm font-medium text-red-800 hover:text-red-900 underline"
              onClick={onDismiss}
            >
              View upgrade options →
            </Link>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="text-red-500 hover:text-red-700 flex-shrink-0"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}