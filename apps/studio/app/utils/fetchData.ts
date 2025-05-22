/**
 * Utility function to fetch data from the Payload API
 * @param endpoint The API endpoint to fetch from (e.g., 'homepage', 'globals/header')
 * @param apiUrl The base API URL
 * @param options Additional fetch options
 * @returns The fetched data or null if an error occurred
 */
import { isBuildEnvironment } from './freshData';

export async function fetchFromAPI<T>(
  endpoint: string,
  apiUrl: string = process.env.NEXT_PUBLIC_PAYLOAD_URL ||
    'http://localhost:3001',
  options: RequestInit = {}
): Promise<T | null> {
  try {
    const url = `${apiUrl}/api/${endpoint}`;

    // Determine if this is a build context
    const isBuild = isBuildEnvironment();

    // Default fetch options with time-based revalidation
    const fetchOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // If in build context or explicitly set, don't cache
      cache: isBuild ? 'no-store' : options.cache || 'default',
      // Enable time-based revalidation (ISR) in production, but not during builds
      next: {
        // Add request tags for targeted revalidation
        tags: ['api', `endpoint-${endpoint.split('?')[0].replace(/\//g, '-')}`],
        // Revalidate every 60 seconds unless specified
        revalidate: isBuild ? 0 : 60,
        ...(options.next || {}),
      },
      ...options,
    };

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      console.error(
        `Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`
      );
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

/**
 * Fetch a collection from Payload CMS
 * @param collection The collection name
 * @param limit The number of items to fetch
 * @param apiUrl The base API URL
 * @param options Additional fetch options
 * @param depth The depth of population (default: 3)
 * @returns The collection data or null if an error occurred
 */
export async function fetchCollection<T>(
  collection: string,
  limit: number = 10,
  apiUrl: string = process.env.NEXT_PUBLIC_PAYLOAD_URL ||
    'http://localhost:3001',
  options: RequestInit = {},
  depth: number = 3
): Promise<{ docs: T[]; totalDocs: number } | null> {
  // For homepage, use higher depth to ensure all nested data is populated
  if (collection === 'homepage') {
    depth = 10; // Reduced from 25 to 10 to prevent excessive data fetching
  }

  // Determine if this is a build context
  const isBuild = isBuildEnvironment();

  // Standard approach for all collections
  const endpoint = `${collection}?limit=${limit}&depth=${depth}`;
  const result = await fetchFromAPI<{ docs: T[]; totalDocs: number }>(
    endpoint,
    apiUrl,
    {
      cache: isBuild ? 'no-store' : options.cache || 'default',
      next: {
        tags: [collection, `${collection}-list`, 'pages-sitemap', 'media'],
        // Homepage gets more frequent revalidation
        revalidate: isBuild ? 0 : collection === 'homepage' ? 30 : 60,
        ...(options.next || {}),
      },
      ...options,
    }
  );

  return result;
}

/**
 * Fetch a global from Payload CMS
 * @param slug The global slug
 * @param apiUrl The base API URL
 * @param options Additional fetch options
 * @returns The global data or null if an error occurred
 */
export async function fetchGlobal<T>(
  slug: string,
  apiUrl?: string,
  options?: RequestInit
): Promise<T | null> {
  // Determine if this is a build context
  const isBuild = isBuildEnvironment();

  return fetchFromAPI<T>(`globals/${slug}`, apiUrl, {
    cache: isBuild ? 'no-store' : (options?.cache as RequestCache) || 'default',
    next: {
      tags: [`globals-${slug}`, 'globals'],
      revalidate: isBuild ? 0 : 60,
      ...(options?.next || {}),
    },
    ...(options || {}),
  });
}

/**
 * Fetch a team member by their slug
 * @param slug The team member's slug
 * @param apiUrl The base API URL
 * @returns The team member data or null if not found
 */
export async function getTeamBySlug<T>(
  slug: string,
  apiUrl: string = process.env.NEXT_PUBLIC_PAYLOAD_URL ||
    'http://localhost:3001'
): Promise<T | null> {
  // Determine if this is a build context
  const isBuild = isBuildEnvironment();

  const endpoint = `team?where[slug][equals]=${slug}&limit=1&depth=3`;
  const result = await fetchFromAPI<{ docs: T[]; totalDocs: number }>(
    endpoint,
    apiUrl,
    {
      cache: isBuild ? 'no-store' : 'default',
      next: {
        tags: ['team', 'pages-sitemap', `team-${slug}`],
        revalidate: isBuild ? 0 : 60,
      },
    }
  );

  if (!result?.docs || result.docs.length === 0) {
    return null;
  }

  return result.docs[0];
}

/**
 * Fetch a page by its slug
 * @param slug The page's slug
 * @param apiUrl The base API URL
 * @returns The page data or null if not found
 */
export async function getPageBySlug<T>(
  slug: string,
  apiUrl: string = process.env.NEXT_PUBLIC_PAYLOAD_URL ||
    'http://localhost:3001'
): Promise<T | null> {
  // Determine if this is a build context
  const isBuild = isBuildEnvironment();

  const endpoint = `pages?where[slug][equals]=${slug}&limit=1&depth=3`;
  const result = await fetchFromAPI<{ docs: T[]; totalDocs: number }>(
    endpoint,
    apiUrl,
    {
      cache: isBuild ? 'no-store' : 'default',
      next: {
        tags: ['pages', 'pages-sitemap', `page-${slug}`],
        revalidate: isBuild ? 0 : 60,
      },
    }
  );

  if (!result?.docs || result.docs.length === 0) {
    return null;
  }

  return result.docs[0];
}
