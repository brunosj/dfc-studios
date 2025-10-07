import type { Block } from 'payload'

export const Quote: Block = {
  slug: 'quote',
  labels: {
    singular: 'Quote Block',
    plural: 'Quote Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      admin: {
        description: 'Optional heading for this quotes section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional description for this quotes section',
      },
    },
    {
      name: 'quotes',
      type: 'array',
      label: 'Quotes',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Quote Text',
          admin: {
            description: 'The quote content',
          },
        },
        {
          name: 'person',
          type: 'text',
          required: true,
          label: 'Person',
          admin: {
            description: 'Name of the person who said this quote',
          },
        },
        {
          name: 'personOrganization',
          type: 'text',
          required: true,
          label: 'Person Organization',
          admin: {
            description: 'Organization or title of the person',
          },
        },
        {
          name: 'picture',
          type: 'upload',
          relationTo: 'local-images',
          label: 'Person Picture',
          admin: {
            description: 'Photo of the person who said this quote',
          },
        },
      ],
      admin: {
        description: 'Add quotes with attribution and photos',
        components: {
          RowLabel: '@/blocks/initative-blocks/Quote/RowLabel#QuoteRowLabel',
        },
      },
      minRows: 1,
    },
    {
      name: 'display',
      type: 'group',
      label: 'Display Options',
      fields: [
        {
          name: 'layout',
          type: 'select',
          label: 'Layout',
          defaultValue: 'cards',
          options: [
            {
              label: 'Cards',
              value: 'cards',
            },
            {
              label: 'List',
              value: 'list',
            },
          ],
          admin: {
            description: 'How to display the quotes',
          },
        },
        {
          name: 'columns',
          type: 'select',
          label: 'Columns',
          defaultValue: '1',
          options: [
            { label: '1 Column', value: '1' },
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
          ],
          admin: {
            description: 'Number of columns for grid/cards layout',
            condition: (data: any, siblingData: any) =>
              siblingData?.layout === 'grid' || siblingData?.layout === 'cards',
          },
        },
        {
          name: 'showImages',
          type: 'checkbox',
          label: 'Show Images',
          defaultValue: true,
          admin: {
            description: 'Display person pictures with quotes',
          },
        },
      ],
    },
  ],
}
