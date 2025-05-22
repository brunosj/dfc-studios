import { Media } from '@payload-types';

export const getImageUrl = (
  picture: string | Media | null | undefined
): string => {
  if (!picture) return '';

  // If it's already a full URL, return it
  if (
    typeof picture === 'string' &&
    (picture.startsWith('http://') || picture.startsWith('https://'))
  ) {
    return picture;
  }

  // Get the base URL from environment variable
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || '';

  // If it's a string (relative path), construct the full URL
  if (typeof picture === 'string') {
    // Make sure we don't add the base URL if it's already part of the string
    if (picture.startsWith('/')) {
      return `${baseUrl}${picture}`;
    }
    return `${baseUrl}/${picture}`;
  }

  // If it's a Media object, check if the URL already contains the base URL
  if (picture?.url) {
    if (
      picture.url.startsWith('http://') ||
      picture.url.startsWith('https://')
    ) {
      return picture.url;
    }
    if (picture.url.startsWith('/')) {
      return `${baseUrl}${picture.url}`;
    }
    return `${baseUrl}/${picture.url}`;
  }

  return '';
};
