import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

type RevalidationConfig = {
  collection: string
  paths: string[]
  tags: string[]
}

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
          path: paths[0], // Send the first path for backward compatibility
          tag: tags[0], // Send the first tag for backward compatibility
          paths: paths, // Send all paths
          tags: tags, // Send all tags
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

export const revalidateCollection =
  (config: RevalidationConfig): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      if (doc._status === 'published') {
        payload.logger.info(`Revalidating collection: ${config.collection}`)
        // Log document ID for troubleshooting
        payload.logger.info(`Document ID: ${doc.id}`)

        // Revalidate all configured paths
        config.paths.forEach((path) => {
          try {
            revalidatePath(path)
          } catch (error) {
            payload.logger.error(`Error revalidating path ${path}: ${error}`)
          }
        })

        // Revalidate all configured tags
        config.tags.forEach((tag) => {
          try {
            revalidateTag(tag)
          } catch (error) {
            payload.logger.error(`Error revalidating tag ${tag}: ${error}`)
          }
        })

        // Call frontend revalidation
        await callFrontendRevalidate(config.paths, config.tags)
      }

      // If the item was previously published, we need to revalidate
      if (previousDoc?._status === 'published' && doc._status !== 'published') {
        payload.logger.info(`Revalidating collection after unpublish: ${config.collection}`)
        config.paths.forEach((path) => {
          try {
            revalidatePath(path)
          } catch (error) {
            payload.logger.error(`Error revalidating path ${path}: ${error}`)
          }
        })

        config.tags.forEach((tag) => {
          try {
            revalidateTag(tag)
          } catch (error) {
            payload.logger.error(`Error revalidating tag ${tag}: ${error}`)
          }
        })

        // Call frontend revalidation
        await callFrontendRevalidate(config.paths, config.tags)
      }
    }
    return doc
  }

export const revalidateCollectionDelete =
  (config: RevalidationConfig): CollectionAfterDeleteHook =>
  async ({ doc, req: { context } }) => {
    if (!context.disableRevalidate) {
      config.paths.forEach((path) => {
        try {
          revalidatePath(path)
        } catch (error) {
          console.error(`Error revalidating path ${path}: ${error}`)
        }
      })

      config.tags.forEach((tag) => {
        try {
          revalidateTag(tag)
        } catch (error) {
          console.error(`Error revalidating tag ${tag}: ${error}`)
        }
      })

      // Call frontend revalidation
      await callFrontendRevalidate(config.paths, config.tags)
    }
    return doc
  }
