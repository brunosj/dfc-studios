import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { richTextField } from '@/fields/richTextField'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidateCollection'

export const Service: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'color', 'updatedAt'],
    meta: {
      title: 'Services - DFC Studios',
      description: 'Services - DFC Studios',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description:
          'Do not change these as they are used as is in the frontend for the dynamic megaphone SVG',
      },
    },
    {
      name: 'color',
      type: 'relationship',
      relationTo: 'colors',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    richTextField('longDescription', true),

    {
      name: 'picture',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [
      revalidateCollection({
        collection: 'services',
        paths: ['/our-services', '/'],
        tags: ['services-list', 'pages-sitemap'],
      }),
    ],
    afterDelete: [
      revalidateCollectionDelete({
        collection: 'services',
        paths: ['/our-services', '/'],
        tags: ['services-list', 'pages-sitemap'],
      }),
    ],
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}
