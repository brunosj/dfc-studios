import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Color: CollectionConfig = {
  slug: 'colors',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'hexCode', 'updatedAt'],
    meta: {
      title: 'Colors - DFC Studios',
      description: 'Colors - DFC Studios',
    },
    group: 'Settings',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'hexCode',
      label: 'Hex Code (Light)',
      type: 'text',
      required: true,
    },
    {
      name: 'hexCodeDark',
      label: 'Hex Code (Dark)',
      type: 'text',
      required: true,
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}
