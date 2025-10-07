import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    meta: {
      title: 'Users - DFC Studios',
      description: 'Users - DFC Studios',
    },
    defaultColumns: ['name', 'email', 'updatedAt'],
    group: 'Settings',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
  ],
}
