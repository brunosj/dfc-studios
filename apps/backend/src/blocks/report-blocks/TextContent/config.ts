import type { Block } from 'payload'
import {
  lexicalEditor,
  InlineToolbarFeature,
  HeadingFeature,
  BlocksFeature,
  OrderedListFeature,
  UnorderedListFeature,
  LinkFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { richTextField } from '@/fields/richTextField'

// Import blocks that can be used within rich text
import { Picture } from '../../atomic-blocks/Picture/config'
import { TextBox } from '../TextBox/config'

export const TextContent: Block = {
  slug: 'textContent',
  interfaceName: 'TextContentBlock',
  labels: {
    singular: 'Text Content',
    plural: 'Text Content Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      admin: {
        description: 'Optional heading for this text content section',
      },
    },
    richTextField('content', true),
    {
      type: 'group',
      name: 'styling',
      label: 'Display Options',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'textAlignment',
              type: 'select',
              defaultValue: 'left',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
                { label: 'Justify', value: 'justify' },
              ],
              admin: {
                width: '50%',
              },
              required: true,
            },
            {
              name: 'maxWidth',
              type: 'select',
              defaultValue: 'full',
              options: [
                { label: 'Full Width', value: 'full' },
                { label: 'Large (80%)', value: 'large' },
                { label: 'Medium (60%)', value: 'medium' },
                { label: 'Small (40%)', value: 'small' },
              ],
              admin: {
                width: '50%',
              },
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'paddingTop',
              type: 'select',
              defaultValue: 'normal',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Small', value: 'small' },
                { label: 'Normal', value: 'normal' },
                { label: 'Large', value: 'large' },
                { label: 'Extra Large', value: 'xl' },
              ],
              admin: {
                width: '50%',
              },
              required: true,
            },
            {
              name: 'paddingBottom',
              type: 'select',
              defaultValue: 'normal',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Small', value: 'small' },
                { label: 'Normal', value: 'normal' },
                { label: 'Large', value: 'large' },
                { label: 'Extra Large', value: 'xl' },
              ],
              admin: {
                width: '50%',
              },
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'showTableOfContents',
      type: 'checkbox',
      label: 'Show Table of Contents',
      defaultValue: false,
      admin: {
        description:
          'Display a table of contents sidebar that automatically extracts headings (H2, H3, etc.) from the rich text content for easy navigation',
      },
    },
  ],
}
