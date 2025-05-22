import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateGlobals } from '@/hooks/revalidateGlobals'

export const Metadata: GlobalConfig = {
  slug: 'site-metadata',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Globals',
  },
  hooks: {
    afterChange: [revalidateGlobals],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],

  versions: {
    drafts: true,
  },
}
