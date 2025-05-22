import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center px-4'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-gray-900 dark:text-white mb-4'>
          404
        </h1>
        <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4'>
          Page Not Found
        </h2>
        <p className='text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto'>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Return Home
          </Link>
          <Link
            href='/contact'
            className='px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors'
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
