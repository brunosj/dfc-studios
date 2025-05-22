import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

// Helper to add a simple retry mechanism for frontend revalidation
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries = 2,
  delay = 1000,
): Promise<Response> => {
  try {
    const response = await fetch(url, options)
    if (response.ok) return response

    if (retries > 0) {
      console.log(`Retrying revalidation request... (${retries} attempts left)`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      return fetchWithRetry(url, options, retries - 1, delay * 1.5)
    }

    return response
  } catch (error) {
    if (retries > 0) {
      console.log(`Network error, retrying... (${retries} attempts left)`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      return fetchWithRetry(url, options, retries - 1, delay * 1.5)
    }
    throw error
  }
}

const callFrontendRevalidate = async (paths: string[], tags: string[]) => {
  try {
    const frontendUrl = process.env.FRONTEND_URL
    const revalidateToken = process.env.REVALIDATE_TOKEN

    if (!frontendUrl || !revalidateToken) {
      throw new Error('Missing required environment variables for revalidation')
    }

    console.log(
      `Calling frontend revalidation for paths: ${paths.join(', ')}, tags: ${tags.join(', ')}`,
    )

    const response = await fetchWithRetry(
      `${frontendUrl}/api/revalidate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-token': revalidateToken,
        },
        body: JSON.stringify({
          paths: paths,
          tags: tags,
        }),
      },
      2, // Number of retries
      1000, // Initial delay in ms
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Failed to revalidate frontend: ${response.status} ${response.statusText} - ${errorText}`,
      )
    }

    const result = await response.json()
    console.log('Frontend revalidation successful:', result)
  } catch (error) {
    console.error('Error calling frontend revalidation:', error)
    // Don't throw the error to prevent blocking the main operation
  }
}

export const revalidateGlobals: GlobalAfterChangeHook = async ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating globals`)
  payload.logger.info(`Global ID: ${doc.id}, type: ${doc._type}`)

  // Since globals affect the entire site, we revalidate all main pages
  const paths = ['/', '/about', '/our-work', '/our-services', '/contact']
  const tags = ['globals', 'pages-sitemap']

  // Revalidate all paths
  paths.forEach((path) => {
    try {
      revalidatePath(path)
      payload.logger.info(`Revalidated path: ${path}`)
    } catch (error) {
      payload.logger.error(`Error revalidating path ${path}: ${error}`)
    }
  })

  // Revalidate all tags
  tags.forEach((tag) => {
    try {
      revalidateTag(tag)
      payload.logger.info(`Revalidated tag: ${tag}`)
    } catch (error) {
      payload.logger.error(`Error revalidating tag ${tag}: ${error}`)
    }
  })

  // Call frontend revalidation
  await callFrontendRevalidate(paths, tags)

  return doc
}
