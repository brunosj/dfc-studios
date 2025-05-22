import type { GlobalConfig } from 'payload'

export const Socials: GlobalConfig = {
  slug: 'socials',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Globals',
  },
  fields: [
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      admin: {
        description: 'Add social media links',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'Twitter',
              value: 'twitter',
            },
            {
              label: 'LinkedIn',
              value: 'linkedin',
            },
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'YouTube',
              value: 'youtube',
            },
            {
              label: 'TikTok',
              value: 'tiktok',
            },
            {
              label: 'GitHub',
              value: 'github',
            },
            {
              label: 'Dribbble',
              value: 'dribbble',
            },
            {
              label: 'Behance',
              value: 'behance',
            },
            {
              label: 'Other',
              value: 'other',
            },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Custom Icon (optional)',
          admin: {
            description: 'Upload a custom icon for this social platform',
          },
        },
        {
          name: 'color',
          type: 'relationship',
          relationTo: 'colors',
          label: 'Brand Color',
          admin: {
            description: 'Select a color for this social platform',
          },
        },
      ],
    },
  ],
}
