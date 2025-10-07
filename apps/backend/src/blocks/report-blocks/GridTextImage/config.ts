import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Heading } from '../../atomic-blocks/Heading/config'
import { Picture } from '../../atomic-blocks/Picture/config'
import { Text } from '../../atomic-blocks/Text/config'

export const GridTextImage: Block = {
  slug: 'gridTextImage',
  interfaceName: 'GridTextImageBlock',
  labels: {
    singular: 'Grid Text/Image',
    plural: 'Grid Text/Image Blocks',
  },
  fields: [
    {
      type: 'group',
      name: 'parameters',
      label: 'Parameters',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'stickyImage',
              type: 'checkbox',
              label: 'Sticky Image',
              defaultValue: false,
              admin: {
                width: '50%',
                description: 'Make image sticky when scrolling',
              },
            },
            {
              name: 'invertColumns',
              type: 'checkbox',
              label: 'Invert Columns',
              defaultValue: false,
              admin: {
                width: '50%',
                description: 'Switch the order of text and image columns',
              },
            },
          ],
        },
        {
          name: 'insideContainer',
          type: 'checkbox',
          label: 'Text Inside Container',
          defaultValue: true,
          admin: {
            description: 'Constrain text content width using layout container',
          },
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
    {
      name: 'content',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'blocks',
          label: 'Heading',
          blocks: [Heading],
          maxRows: 1,
          admin: {
            description:
              'Optional heading for this section. Use the position field in the heading to control placement. Note: Width, container, and background styling options are not used in this layout.',
          },
        },
        {
          name: 'text',
          type: 'blocks',
          label: 'Text Content',
          blocks: [Text],
          maxRows: 1,
          required: true,
        },
        {
          name: 'image',
          type: 'blocks',
          label: 'Image',
          blocks: [Picture],
          maxRows: 1,
          required: true,
          admin: {
            description:
              'Image for this section. Note: Width, container, positioning, and overlay options are not used in this layout.',
          },
        },
      ],
    },
  ],
}
