import type { Block } from 'payload'
import { Heading } from '../../atomic-blocks/Heading/config'
import { Picture } from '../../atomic-blocks/Picture/config'
import { Text } from '../../atomic-blocks/Text/config'
import { Hero } from '../Hero/config'
import { Highlights } from '../Highlights/config'
import { GridTextImage } from '../GridTextImage/config'
import { TextBox } from '../TextBox/config'
import { Table } from '../Table/config'
import { Scrollytelling } from '../../Scrollytelling/config'

export const TwoColumn: Block = {
  slug: 'twoColumn',
  interfaceName: 'TwoColumnBlock',
  labels: {
    singular: 'Two Column',
    plural: 'Two Column Blocks',
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
              name: 'leftColumnWidth',
              type: 'select',
              label: 'Left Column Width',
              defaultValue: '50',
              options: [
                { label: '33% (Right: 67%)', value: '33' },
                { label: '50% (Right: 50%)', value: '50' },
                { label: '67% (Right: 33%)', value: '67' },
              ],
              admin: {
                width: '50%',
                description: 'Width of left column, right column is calculated automatically',
              },
              required: true,
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
                { label: 'Extra Large', value: 'xl' },
              ],
              admin: {
                width: '50%',
                description: 'Space between columns',
              },
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'leftColumnPosition',
              type: 'select',
              label: 'Left Column Content Position',
              defaultValue: 'top',
              options: [
                { label: 'Top', value: 'top' },
                { label: 'Center', value: 'center' },
                { label: 'Bottom', value: 'bottom' },
              ],
              admin: {
                width: '50%',
                description: 'Vertical position of content within the left column',
              },
              required: true,
            },
            {
              name: 'rightColumnPosition',
              type: 'select',
              label: 'Right Column Content Position',
              defaultValue: 'top',
              options: [
                { label: 'Top', value: 'top' },
                { label: 'Center', value: 'center' },
                { label: 'Bottom', value: 'bottom' },
              ],
              admin: {
                width: '50%',
                description: 'Vertical position of content within the right column',
              },
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'leftColumnSticky',
              type: 'checkbox',
              label: 'Left Column Sticky',
              defaultValue: false,
              admin: {
                width: '50%',
                description:
                  'Make left column content stick to the top of the viewport while scrolling.',
              },
            },
            {
              name: 'rightColumnSticky',
              type: 'checkbox',
              label: 'Right Column Sticky',
              defaultValue: false,
              admin: {
                width: '50%',
                description:
                  'Make right column content stick to the top of the viewport while scrolling.',
              },
            },
          ],
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
      ],
    },

    {
      type: 'group',
      name: 'content',
      label: 'Column Content',
      fields: [
        {
          name: 'leftColumnContent',
          type: 'blocks',
          label: 'Left Column Content',
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
            Table,
            // Container blocks
            Scrollytelling,
            // Note: TwoColumn and Section are intentionally excluded to prevent complex nesting
          ],
          admin: {
            description: 'Add blocks to the left column.',
          },
        },
        {
          name: 'rightColumnContent',
          type: 'blocks',
          label: 'Right Column Content',
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
            Table,
            // Container blocks
            Scrollytelling,
            // Note: TwoColumn and Section are intentionally excluded to prevent complex nesting
          ],
          admin: {
            description: 'Add blocks to the right column.',
          },
        },
      ],
    },
  ],
}
