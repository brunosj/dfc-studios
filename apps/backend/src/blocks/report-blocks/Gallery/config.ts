import type { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Gallery Heading',
      admin: {
        description: 'Optional heading for this gallery section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Gallery Description',
      admin: {
        description: 'Optional description text for the gallery',
      },
    },
    {
      name: 'images',
      type: 'upload',
      label: 'Gallery Images',
      relationTo: 'media',
      hasMany: true,
    },
    {
      type: 'group',
      name: 'display',
      label: 'Display Options',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'layout',
              type: 'select',
              defaultValue: 'grid',
              options: [
                { label: 'Grid', value: 'grid' },
                { label: 'Masonry', value: 'masonry' },
                // { label: 'Carousel', value: 'carousel' },
                { label: 'Slideshow', value: 'slideshow' },
              ],
              admin: {
                width: '50%',
              },
              required: true,
            },
            {
              name: 'columns',
              type: 'select',
              defaultValue: '3',
              options: [
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
                { label: '5 Columns', value: '5' },
              ],
              admin: {
                width: '50%',
                condition: (data, siblingData) => ['grid', 'masonry'].includes(siblingData.layout),
              },
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'aspectRatio',
              type: 'select',
              defaultValue: 'square',
              options: [
                { label: 'Auto', value: 'auto' },
                { label: 'Square (1:1)', value: 'square' },
                { label: 'Landscape (16:9)', value: 'landscape' },
                { label: 'Portrait (3:4)', value: 'portrait' },
              ],
              admin: {
                width: '50%',
              },
              required: true,
            },
            {
              name: 'enableLightbox',
              type: 'checkbox',
              label: 'Enable Lightbox',
              defaultValue: true,
              admin: {
                description: 'Allow users to view full-size images',
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'showCaptions',
          type: 'checkbox',
          label: 'Show Captions',
          defaultValue: true,
        },
      ],
    },
  ],
}
