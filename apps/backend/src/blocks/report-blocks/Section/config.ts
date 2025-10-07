import type { Block } from 'payload'
import { Heading } from '../../atomic-blocks/Heading/config'
import { Picture } from '../../atomic-blocks/Picture/config'
import { Text } from '../../atomic-blocks/Text/config'
import { Hero } from '../Hero/config'
import { Highlights } from '../Highlights/config'
import { GridTextImage } from '../GridTextImage/config'
import { TextBox } from '../TextBox/config'
import { TwoColumn } from '../TwoColumn/config'
import { Table } from '../Table/config'
import { Scrollytelling } from '../../Scrollytelling/config'

export const Section: Block = {
  slug: 'section',
  interfaceName: 'SectionBlock',
  labels: {
    singular: 'Section',
    plural: 'Sections',
  },
  fields: [
    {
      type: 'group',
      name: 'parameters',
      label: 'Layout Parameters',
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
                width: '33%',
              },
              required: true,
            },
            {
              name: 'alignment',
              type: 'select',
              defaultValue: 'left',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ],
              admin: {
                width: '33%',
              },
              required: true,
            },
            {
              name: 'verticalAlignment',
              type: 'select',
              defaultValue: 'top',
              options: [
                { label: 'Top', value: 'top' },
                { label: 'Center', value: 'center' },
                { label: 'Bottom', value: 'bottom' },
              ],
              admin: {
                width: '33%',
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
          name: 'insideContainer',
          type: 'checkbox',
          label: 'Inside Container',
          defaultValue: true,
          admin: {
            description: 'Whether this section should use the layout container',
          },
        },
        {
          name: 'minHeight',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: 'Auto', value: 'auto' },
            { label: 'Screen Height', value: 'screen' },
            { label: 'Half Screen', value: 'half-screen' },
          ],
          admin: {
            description: 'Minimum height for this section',
          },
        },
        {
          name: 'content',
          type: 'blocks',
          label: 'Section Content',
          blocks: [
            // Atomic blocks
            Heading,
            Picture,
            Text,
            // Report blocks
            Hero,
            Highlights,
            GridTextImage,
            TextBox,
            TwoColumn,
            Table,
            // Container blocks
            Scrollytelling,
            // Note: Section is intentionally excluded to prevent infinite nesting
          ],
          admin: {
            description: 'Add any blocks to this section. They will be rendered in order.',
          },
        },
      ],
    },

    {
      type: 'group',
      name: 'styling',
      label: 'Styling Options',
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
                { label: 'Gray Light', value: '#f8fafc' },
                { label: 'Gray', value: '#e2e8f0' },
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
                { label: 'Gray Dark', value: '#1e293b' },
                { label: 'Gray', value: '#64748b' },
              ],
              admin: {
                width: '50%',
                description: 'Choose from report colors or standard options',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
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
                width: '50%',
              },
            },
            {
              name: 'shadow',
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
                width: '50%',
              },
            },
          ],
        },
      ],
    },
  ],
}
