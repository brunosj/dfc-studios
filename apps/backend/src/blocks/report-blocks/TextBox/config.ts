import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Heading } from '@/blocks/atomic-blocks/Heading'
import { Text } from '@/blocks/atomic-blocks/Text'

export const TextBox: Block = {
  slug: 'textBox',
  interfaceName: 'TextBoxBlock',
  labels: {
    singular: 'Text Box',
    plural: 'Text Boxes',
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
          name: 'position',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            width: '50%',
            condition: (data) => data?.width !== 'full',
          },
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'content',
      label: 'Content',
      fields: [
        {
          name: 'Blocks',
          type: 'blocks',
          blocks: [Heading, Text],
        },
      ],
    },
    {
      type: 'group',
      name: 'styling',
      label: 'Color Options',
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
            description: 'Choose from report colors or standard options',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'borderColor',
              type: 'select',
              label: 'Border Color',
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
              name: 'borderWidth',
              type: 'select',
              defaultValue: '1',
              options: [
                { label: 'None', value: '0' },
                { label: 'Thin (1px)', value: '1' },
                { label: 'Medium (2px)', value: '2' },
                { label: 'Thick (4px)', value: '4' },
              ],
              admin: {
                width: '33%',
              },
              required: true,
            },
            {
              name: 'borderRadius',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' },
                { label: 'Extra Large', value: 'xl' },
              ],
              admin: {
                width: '33%',
              },
            },
          ],
        },
        {
          name: 'showLeftAccent',
          type: 'checkbox',
          label: 'Show Left Accent Border',
          defaultValue: false,
          admin: {
            description: 'Add a large colored accent border on the left side',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'leftAccentColor',
              type: 'select',
              label: 'Left Accent Color',
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
                description: 'Choose color for the left accent border',
                condition: (_, siblingData) => siblingData?.showLeftAccent,
              },
              defaultValue: 'primary',
            },
            {
              name: 'leftAccentWidth',
              type: 'select',
              label: 'Left Accent Width',
              defaultValue: '8',
              options: [
                { label: 'Thin (8px)', value: '8' },
                { label: 'Medium (12px)', value: '12' },
                { label: 'Thick (16px)', value: '16' },
                { label: 'Extra Thick (24px)', value: '24' },
              ],
              admin: {
                width: '50%',
                condition: (_, siblingData) => siblingData?.showLeftAccent,
              },
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
