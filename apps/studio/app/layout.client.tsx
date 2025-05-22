import React from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { Header as HeaderType, Footer as FooterType } from '@payload-types';

interface LayoutProps {
  children: React.ReactNode;
  header: HeaderType | null;
  footer: FooterType | null;
}

const Layout: React.FC<LayoutProps> = ({ children, header, footer }) => {
  return (
    <div className='min-h-screen relative'>
      {/* Background decorative elements */}
      <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
        {/* Gradient background */}
        {/* <div className='absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-pink-50/30 dark:from-gray-950 dark:via-blue-950/30 dark:to-purple-950/30' /> */}

        {/* Subtle pattern overlay */}
        <div className='absolute inset-0 opacity-[0.10] dark:opacity-[0.05]'>
          <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
            <defs>
              <pattern
                id='grid-pattern'
                x='0'
                y='0'
                width='40'
                height='40'
                patternUnits='userSpaceOnUse'
              >
                <path
                  d='M 40 0 L 0 0 0 40'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='0.5'
                />
              </pattern>
            </defs>
            <rect width='100%' height='100%' fill='url(#grid-pattern)' />
          </svg>
        </div>
      </div>

      {header && <Header header={header} />}
      <main>{children}</main>
      {footer && header && <Footer footer={footer} header={header} />}
    </div>
  );
};

export default Layout;
