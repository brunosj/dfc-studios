import type { Block } from 'payload'

export const Picture: Block = {
  slug: 'picture',
  interfaceName: 'PictureBlock',
  labels: {
    singular: 'Picture',
    plural: 'Pictures',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'width',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'Half (½)', value: 'half' },
            { label: 'Two Thirds (⅔)', value: 'two-thirds' },
            { label: 'Full', value: 'full' },
          ],
          admin: {
            width: '50%',
          },
          required: true,
        },
        {
          name: 'position',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            condition: (data, siblingData) => siblingData.width !== 'full',
          },
        },
      ],
    },
    {
      name: 'insideContainer',
      type: 'checkbox',
      label: 'Inside Container',
      defaultValue: true,
    },

    {
      name: 'showCaption',
      type: 'checkbox',
      label: 'Show Caption',
      defaultValue: false,
      admin: {
        description: 'Display image alt text as caption',
      },
    },

    {
      type: 'group',
      name: 'captionSettings',
      label: 'Caption Settings',
      admin: {
        condition: (data, siblingData) => siblingData.showCaption,
      },
      fields: [
        {
          name: 'captionPosition',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Bottom Left', value: 'bottom-left' },
            { label: 'Bottom Center', value: 'bottom-center' },
            { label: 'Bottom Right', value: 'bottom-right' },
            { label: 'Top Left', value: 'top-left' },
            { label: 'Top Center', value: 'top-center' },
            { label: 'Top Right', value: 'top-right' },
          ],
          admin: {
            description: 'Position of the caption relative to the image',
          },
          required: true,
        },
      ],
    },
    {
      name: 'showOverlay',
      type: 'checkbox',
      label: 'Show Overlay',
      defaultValue: false,
    },

    {
      type: 'group',
      name: 'overlaySettings',
      label: 'Overlay Settings',
      admin: {
        condition: (data, siblingData) => siblingData.showOverlay,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'overlayColor',
              type: 'select',
              label: 'Overlay Color',
              options: [
                { label: 'Primary Color', value: 'primary' },
                { label: 'Primary Color Light', value: 'primaryLight' },
                { label: 'Secondary Color', value: 'secondary' },
                { label: 'Secondary Color Light', value: 'secondaryLight' },
                { label: 'Tertiary Color', value: 'tertiary' },
                { label: 'Tertiary Color Light', value: 'tertiaryLight' },
                { label: 'Black', value: '#000000' },
                { label: 'White', value: '#ffffff' },
              ],
              admin: {
                width: '50%',
                description: 'Choose from report colors or standard options',
              },
              defaultValue: '#000000',
              required: true,
            },
            {
              name: 'overlayOpacity',
              type: 'number',
              label: 'Overlay Opacity',
              min: 0,
              max: 100,
              defaultValue: 50,
              admin: {
                width: '50%',
                description: 'Opacity percentage (0-100)',
              },
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
