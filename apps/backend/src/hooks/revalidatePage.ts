import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '@/payload-types'

const callFrontendRevalidate = async (path: string, tag: string) => {
  try {
    const frontendUrl = process.env.FRONTEND_URL
    const revalidateToken = process.env.REVALIDATE_TOKEN

    if (!frontendUrl || !revalidateToken) {
      throw new Error('Missing required environment variables for revalidation')
    }

    console.log(`Calling frontend revalidation for path: ${path}, tag: ${tag}`)

    const response = await fetch(`${frontendUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-token': revalidateToken,
      },
      body: JSON.stringify({
        path,
        tag,
        paths: [path],
        tags: [tag],
      }),
    })

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

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

      payload.logger.info(`Revalidating page at path: ${path}`)

      revalidatePath(path)
      revalidateTag('pages-sitemap')
      // Call frontend revalidation
      await callFrontendRevalidate(path, 'pages-sitemap')
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('pages-sitemap')
      // Call frontend revalidation
      await callFrontendRevalidate(oldPath, 'pages-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('pages-sitemap')
    // Call frontend revalidation
    await callFrontendRevalidate(path, 'pages-sitemap')
  }

  return doc
}
