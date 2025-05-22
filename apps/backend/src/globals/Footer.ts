import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { richTextField } from '@/fields/richTextField'
import { revalidateGlobals } from '@/hooks/revalidateGlobals'

export const Footer: GlobalConfig = {
  slug: 'footer',
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
      type: 'tabs',
      tabs: [
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              label: 'Navigation Items',
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
                      relationTo: ['homepage', 'portfolio', 'contact', 'about', 'pages'],
                    }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Info',
          fields: [
            {
              type: 'text',
              name: 'slogan',
              label: 'Slogan',
            },
            richTextField('address', true),
            richTextField('bottomText', true),
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}
