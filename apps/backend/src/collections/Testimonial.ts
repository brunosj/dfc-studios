import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Testimonial: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'person',
    defaultColumns: ['person', 'position', 'client', 'date', 'updatedAt'],
    meta: {
      title: 'Testimonials - DFC Studios',
      description: 'Testimonials - DFC Studios',
    },
  },
  fields: [
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'person',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
    },
    {
      name: 'staff',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      filterOptions: {
        isStaff: {
          equals: true,
        },
      },
    },
    {
      name: 'date',
      type: 'date',
    },
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}
