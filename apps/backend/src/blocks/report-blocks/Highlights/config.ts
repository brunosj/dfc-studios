import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Highlights: Block = {
  slug: 'highlights',
  interfaceName: 'HighlightsBlock',
  labels: {
    singular: 'Highlights',
    plural: 'Highlights',
  },
  fields: [
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
                width: '33%',
                description: 'Choose from report colors or standard options',
              },
            },
            {
              name: 'headingColor',
              type: 'select',
              label: 'Heading Color',
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
                width: '33%',
                description: 'Choose from report colors or standard options',
              },
            },
            {
              name: 'contentColor',
              type: 'select',
              label: 'Content Color',
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
                width: '34%',
                description: 'Choose from report colors or standard options',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'array',
      name: 'highlights',
      label: 'Highlights',
      minRows: 1,
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor(),
          label: 'Content',
          required: true,
        },
      ],
    },
  ],
}
