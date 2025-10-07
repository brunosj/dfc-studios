import type { Block } from 'payload'
import { Heading } from '@/blocks/atomic-blocks/Heading'
import { Picture } from '@/blocks/atomic-blocks/Picture'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      type: 'group',
      name: 'content',
      label: 'Content',
      fields: [
        {
          name: 'layout',
          type: 'blocks',
          label: 'Hero Content',
          blocks: [Heading, Picture],
        },
      ],
    },
    {
      type: 'group',
      name: 'metadata',
      label: 'Metadata',
      fields: [
        {
          name: 'topicArea',
          type: 'text',
          label: 'Topic Area',
        },
        {
          name: 'type',
          type: 'text',
          label: 'Type',
        },
        {
          name: 'publicationDate',
          type: 'date',
          label: 'Publication Date',
        },
      ],
    },
    {
      type: 'array',
      name: 'authors',
      label: 'Authors & Organizations',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Author/Organization Name',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Website URL',
        },
      ],
    },
    {
      type: 'group',
      name: 'styling',
      label: 'Color Options',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'backgroundColor',
              type: 'select',
              label: 'Background Color',
              options: [
                { label: 'Primary Color', value: 'primary' },
                { label: 'Primary Color Light', value: 'primaryLight' },
                { label: 'Secondary Color', value: 'secondary' },
                { label: 'Secondary Color Light', value: 'secondaryLight' },
                { label: 'Tertiary Color', value: 'tertiary' },
                { label: 'Tertiary Color Light', value: 'tertiaryLight' },
                { label: 'Black', value: '#000000' },
                { label: 'White', value: '#ffffff' },
                { label: 'Transparent', value: 'transparent' },
              ],
              admin: {
                width: '50%',
                description: 'Choose from report colors or standard options',
              },
            },
            {
              name: 'textColor',
              type: 'select',
              label: 'Text Color',
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
            },
          ],
        },
      ],
    },
  ],
}
