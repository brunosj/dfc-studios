import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Text: Block = {
  slug: 'text',
  interfaceName: 'TextBlock',
  labels: {
    singular: 'Text',
    plural: 'Text Blocks',
  },
  fields: [
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
          name: 'columnLayout',
          type: 'select',
          defaultValue: 'one-column',
          options: [
            { label: 'Single Column', value: 'one-column' },
            { label: 'Two Columns', value: 'two-columns' },
          ],
          admin: {
            width: '50%',
            description: 'Two columns will automatically flow content using CSS columns',
          },
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'alignment',
          label: 'Text Alignment',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            width: '50%',
          },
          required: true,
        },
        {
          name: 'position',
          label: 'Position',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
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
            width: '25%',
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
            width: '25%',
          },
          required: true,
        },
        {
          name: 'paddingLeft',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'small' },
            { label: 'Normal', value: 'normal' },
            { label: 'Large', value: 'large' },
            { label: 'Extra Large', value: 'xl' },
          ],
          admin: {
            width: '25%',
          },
          required: true,
        },
        {
          name: 'paddingRight',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'small' },
            { label: 'Normal', value: 'normal' },
            { label: 'Large', value: 'large' },
            { label: 'Extra Large', value: 'xl' },
          ],
          admin: {
            width: '25%',
          },
          required: true,
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
      label: 'Text Content',
      required: true,
      admin: {
        description:
          'Content will automatically flow into columns when two-column layout is selected',
      },
    },
    {
      name: 'insideContainer',
      type: 'checkbox',
      label: 'Inside Container',
      defaultValue: false,
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
              defaultValue: '#000000',
              admin: {
                width: '50%',
                description: 'Choose from report colors or standard options',
              },
            },
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
              defaultValue: 'transparent',
              admin: {
                width: '50%',
                description: 'Choose from report colors or standard options',
              },
            },
          ],
        },
        {
          name: 'columnGap',
          type: 'select',
          label: 'Column Gap',
          defaultValue: 'normal',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Normal', value: 'normal' },
            { label: 'Large', value: 'large' },
          ],
          admin: {
            description: 'Spacing between columns (only applies to two-column layout)',
            condition: (_, siblingData) => siblingData?.columnLayout === 'two-columns',
          },
        },
      ],
    },
  ],
}
