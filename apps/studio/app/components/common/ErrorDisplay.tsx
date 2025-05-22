'use client';

import React from 'react';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  apiUrl?: string;
  error?: Error | string | null;
}

/**
 * A reusable error display component
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = 'Error Loading Page',
  message = 'Please make sure the backend server is running',
  apiUrl,
  error,
}) => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold text-red-600 mb-4'>{title}</h1>
        <p className='text-gray-600 mb-4'>
          {message} {apiUrl && `at ${apiUrl}`}
        </p>
        <div className='mb-4'>
          <button
            onClick={() => window.location.reload()}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Retry
          </button>
        </div>
        {error && (
          <div className='mt-4 p-4 bg-gray-100 rounded text-left max-w-lg mx-auto overflow-auto'>
            <h3 className='font-bold mb-2'>Debug Information:</h3>
            <pre className='text-xs whitespace-pre-wrap'>
              {error instanceof Error ? error.message : String(error)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
