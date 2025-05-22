/**
 * Utility functions to help with fresh data fetching
 */

import { revalidateTag, revalidatePath } from 'next/cache';

/**
 * Detect if we're in a build environment
 * During builds, we should always fetch fresh data
 */
export function isBuildEnvironment(): boolean {
  return process.env.NODE_ENV === 'production' && !process.env.NEXT_RUNTIME;
}

/**
 * Create fetch options for fresh data
 * Use this when you want to ensure data is fresh
 * @param tags Optional cache tags to associate with the request
 * @returns RequestInit object with appropriate cache settings
 */
export function createFreshFetchOptions(tags: string[] = []): RequestInit {
  return {
    cache: 'no-store',
    next: {
      tags,
      // Setting revalidate to 0 is equivalent to opting out of caching
      revalidate: 0,
    },
  };
}

/**
 * Force revalidation of all content
 * This can be called manually when you need to refresh cached data
 */
export async function revalidateAllContent(): Promise<void> {
  try {
    // Revalidate key tags
    const coreTags = [
      'pages-sitemap',
      'homepage',
      'homepage-list',
      'globals',
      'media',
      'api',
    ];

    coreTags.forEach((tag) => {
      console.log(`Revalidating tag: ${tag}`);
      revalidateTag(tag);
    });

    // Revalidate main paths
    const mainPaths = ['/', '/about', '/our-work', '/our-services', '/contact'];
    mainPaths.forEach((path) => {
      console.log(`Revalidating path: ${path}`);
      revalidatePath(path);
    });

    console.log('Revalidation completed');
  } catch (error) {
    console.error('Error during revalidation:', error);
  }
}
