/**
 * Interface for Payload CMS link fields
 */
export interface LinkType {
  type?: 'reference' | 'custom' | null;
  url?: string | null;
  newTab?: boolean | null;
  reference?: {
    relationTo: string;
    value: string | { id?: string; slug?: string; [key: string]: unknown };
  } | null;
  relationTo?: string;
  label?: string;
  appearance?: 'default' | 'outline' | 'filled';
}

/**
 * Resolves a Payload CMS link object to a URL string
 * @param link The Payload link object or string
 * @returns A URL string that can be used with Next.js Link component
 */
export const resolvePayloadLink = (link: unknown): string => {
  if (!link) return '/';

  // If it's already a string, return it
  if (typeof link === 'string') return link;

  // Cast to our LinkType to work with it
  const linkObj = link as LinkType;

  // Handle Payload link field structure
  if (linkObj.type === 'custom' && linkObj.url) {
    return linkObj.url;
  }

  if (linkObj.type === 'reference' && linkObj.reference) {
    const { relationTo, value } = linkObj.reference;

    // Handle different collection types
    switch (relationTo) {
      case 'homepage':
        // Homepage is always the root
        return '/';

      // Pages that use just the slug (no collection prefix)
      case 'portfolio':
      case 'contact':
      case 'about':
      case 'services':
      case 'pages':
        if (typeof value === 'object' && value.slug) {
          return `/${value.slug}`;
        }
        return `/${typeof value === 'object' ? value.id : value}`;

      // For collections that need their name in the URL path
      default:
        // For any other collection
        if (typeof value === 'object' && value.slug) {
          return `/${relationTo}/${value.slug}`;
        }
        return `/${relationTo}/${typeof value === 'object' ? value.id : value}`;
    }
  }

  // Fallback to homepage
  return '/';
};
