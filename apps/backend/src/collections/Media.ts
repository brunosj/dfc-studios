import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidateCollection'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    meta: {
      title: 'Media - DFC Studios',
      description: 'Media - DFC Studios',
    },
    group: 'Assets',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
  hooks: {
    afterChange: [
      revalidateCollection({
        collection: 'media',
        paths: ['/about', '/'],
        tags: ['media', 'team-list', 'pages-sitemap'],
      }),
    ],
    afterDelete: [
      revalidateCollectionDelete({
        collection: 'media',
        paths: ['/about', '/'],
        tags: ['media', 'team-list', 'pages-sitemap'],
      }),
    ],
  },
  upload: {
    staticDir: path.resolve(dirname, '../../../../../media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
