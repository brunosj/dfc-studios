import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Layout from '@/app/layout.client';
import { Header, Footer, SiteMetadatum } from '@payload-types';
import { fetchGlobal } from '@/app/utils/fetchData';
import './globals.css';
import { MetadataProvider } from './contexts/MetadataContext';
import { ThemeProvider } from 'next-themes';

const greycliff = localFont({
  src: [
    {
      path: './fonts/greycliff-cf-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/greycliff-cf-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/greycliff-cf-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/greycliff-cf-demi-bold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/greycliff-cf-extra-bold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/greycliff-cf-medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteMetadata = await getSiteMetadata();

  return {
    title: siteMetadata?.title || 'Designers for Climate Studios',
    description: siteMetadata?.description || 'Designers for Climate Studios',
    icons: {
      icon:
        typeof siteMetadata?.favicon === 'object'
          ? siteMetadata.favicon.url || '/favicon.ico'
          : '/favicon.ico',
    },
    openGraph: {
      title: siteMetadata?.title || 'Designers for Climate Studios',
      description: siteMetadata?.description || 'Designers for Climate Studios',
      images: siteMetadata?.ogImage
        ? [
            {
              url:
                typeof siteMetadata.ogImage === 'object'
                  ? siteMetadata.ogImage.url || ''
                  : '/dfc-og-image.jpg',
              width: 1200,
              height: 630,
              alt: siteMetadata.title || 'Designers for Climate Studios',
            },
          ]
        : undefined,
    },
  };
}

/**
 * Fetch the header data
 */
async function getHeader(): Promise<Header | null> {
  return fetchGlobal<Header>('header');
}

/**
 * Fetch the footer data
 */
async function getFooter(): Promise<Footer | null> {
  return fetchGlobal<Footer>('footer');
}

/**
 * Fetch the site metadata
 */
async function getSiteMetadata(): Promise<SiteMetadatum | null> {
  return fetchGlobal<SiteMetadatum>('site-metadata');
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch header, footer, and metadata
  const [header, footer, siteMetadata] = await Promise.all([
    getHeader(),
    getFooter(),
    getSiteMetadata(),
  ]);

  return (
    <html lang='en' className={greycliff.className} suppressHydrationWarning>
      <body>
        <MetadataProvider metadata={siteMetadata}>
          <ThemeProvider
            attribute='data-theme'
            defaultTheme='light'
            // enableSystem
            disableTransitionOnChange
            value={{
              light: 'light',
              dark: 'dark',
            }}
          >
            <Layout header={header} footer={footer}>
              {children}
            </Layout>
          </ThemeProvider>
        </MetadataProvider>
      </body>
    </html>
  );
}
