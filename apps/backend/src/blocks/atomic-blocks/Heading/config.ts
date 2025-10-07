import type { Block } from 'payload'

export const Heading: Block = {
  slug: 'heading',
  interfaceName: 'HeadingBlock',
  labels: {
    singular: 'Heading',
    plural: 'Headings',
  },
  fields: [
    {
      name: 'parameters',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'fontSize',
              type: 'select',
              defaultValue: '3xl',
              options: [
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' },
                { label: 'Extra Large', value: 'xl' },
                { label: '2X Large', value: '2xl' },
                { label: '3X Large', value: '3xl' },
                { label: '4X Large', value: '4xl' },
                { label: '5X Large', value: '5xl' },
              ],
              admin: {
                width: '33%',
              },
              required: true,
            },
            {
              name: 'fontWeight',
              type: 'select',
              defaultValue: 'normal',
              options: [
                { label: 'Light', value: 'light' },
                { label: 'Normal', value: 'normal' },
                { label: 'Medium', value: 'medium' },
                { label: 'Bold', value: 'bold' },
              ],
              admin: {
                width: '33%',
              },
              required: true,
            },
            {
              name: 'textTransform',
              type: 'select',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Capitalize', value: 'capitalize' },
                { label: 'Uppercase', value: 'uppercase' },
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
              label: 'Text Alignment',
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
              defaultValue: 'none',
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
              defaultValue: 'none',
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
        {
          name: 'layoutPosition',
          type: 'select',
          label: 'Position in Layout',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Top of Image', value: 'topOfImage' },
            { label: 'Top of Text', value: 'topOfText' },
          ],
          defaultValue: 'default',
          admin: {
            description: 'Used in layout blocks like GridTextImage to control heading placement',
          },
        },
        {
          name: 'insideContainer',
          type: 'checkbox',
          label: 'Inside Container',
          defaultValue: false,
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
            {
              name: 'highlightColor',
              type: 'select',
              label: 'Highlight Color',
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
                description: 'Color for highlighting specific words or phrases',
              },
            },
          ],
        },
        {
          name: 'showBackground',
          type: 'checkbox',
          label: 'Show Background',
          defaultValue: false,
        },
        {
          type: 'row',
          admin: {
            condition: (data, siblingData) => siblingData.showBackground,
          },
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
                width: '100%',
              },
            },
            {
              name: 'backgroundRounded',
              type: 'checkbox',
              label: 'Rounded Background',
              defaultValue: false,
              admin: {
                description: 'Apply rounded corners to background',
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
          name: 'content',
          type: 'text',
          required: true,
          label: 'Heading Text',
        },
      ],
    },
  ],
}
