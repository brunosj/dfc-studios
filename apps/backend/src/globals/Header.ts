import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateGlobals } from '@/hooks/revalidateGlobals'

export const Header: GlobalConfig = {
  slug: 'header',
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
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      admin: {
        description: 'Add navigation items to the header',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
              },
            },
            link({
              disableLabel: true,
              overrides: {
                admin: {
                  width: '50%',
                },
              },
              relationTo: ['homepage', 'portfolio', 'contact', 'about', 'our-services', 'pages'],
            }),
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}
