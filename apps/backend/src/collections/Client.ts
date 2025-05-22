import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidateCollection'

export const Client: CollectionConfig = {
  slug: 'clients',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'organisation',
    defaultColumns: ['organisation', 'country', 'updatedAt'],
    meta: {
      title: 'Clients - DFC Studios',
      description: 'Clients - DFC Studios',
    },
  },
  fields: [
    {
      name: 'organisation',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        description: 'URL of the client',
      },
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'testimonials',
      type: 'join',
      collection: 'testimonials',
      on: 'client',
      hasMany: true,
    },
    ...slugField('organisation'),
  ],
  hooks: {
    afterChange: [
      revalidateCollection({
        collection: 'clients',
        paths: ['/our-work', '/'],
        tags: ['clients-list', 'pages-sitemap'],
      }),
    ],
    afterDelete: [
      revalidateCollectionDelete({
        collection: 'clients',
        paths: ['/our-work', '/'],
        tags: ['clients-list', 'pages-sitemap'],
      }),
    ],
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}
