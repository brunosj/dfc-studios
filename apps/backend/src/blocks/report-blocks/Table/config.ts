import type { Block } from 'payload'

export const Table: Block = {
  slug: 'table',
  interfaceName: 'TableBlock',
  labels: {
    singular: 'Table',
    plural: 'Table Blocks',
  },
  fields: [
    {
      type: 'group',
      name: 'parameters',
      label: 'Layout Parameters',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Table Title',
          admin: {
            description: 'Optional title displayed above the table in small font',
          },
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
            {
              name: 'rowGap',
              type: 'select',
              label: 'Gap Between Rows',
              defaultValue: 'normal',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Small', value: 'small' },
                { label: 'Normal', value: 'normal' },
                { label: 'Large', value: 'large' },
                { label: 'Extra Large', value: 'xl' },
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
          defaultValue: false,
          admin: {
            description: 'Whether this table should use the layout container',
          },
        },
      ],
    },

    {
      type: 'group',
      name: 'content',
      label: 'Table Content',
      fields: [
        {
          name: 'rows',
          type: 'array',
          label: 'Table Rows',
          minRows: 1,
          admin: {
            description: 'Add rows to your table. Each row can have different styling and layout.',
          },
          fields: [
            {
              type: 'group',
              name: 'styling',
              label: 'Row Styling',
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
                      defaultValue: '#000000',
                      admin: {
                        width: '50%',
                      },
                    },
                  ],
                },
                {
                  name: 'backgroundOpacity',
                  type: 'select',
                  label: 'Background Opacity',
                  defaultValue: '100',
                  options: [
                    { label: '10%', value: '10' },
                    { label: '20%', value: '20' },
                    { label: '30%', value: '30' },
                    { label: '40%', value: '40' },
                    { label: '50%', value: '50' },
                    { label: '60%', value: '60' },
                    { label: '70%', value: '70' },
                    { label: '80%', value: '80' },
                    { label: '90%', value: '90' },
                    { label: '100%', value: '100' },
                  ],
                  admin: {
                    condition: (data, siblingData) =>
                      siblingData.backgroundColor && siblingData.backgroundColor !== 'transparent',
                  },
                  required: true,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fontSize',
                      type: 'select',
                      label: 'Font Size',
                      defaultValue: 'normal',
                      options: [
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
                      name: 'fontWeight',
                      type: 'select',
                      label: 'Font Weight',
                      defaultValue: 'normal',
                      options: [
                        { label: 'Normal', value: 'normal' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'Semibold', value: 'semibold' },
                        { label: 'Bold', value: 'bold' },
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
              type: 'group',
              name: 'layout',
              label: 'Row Layout',
              fields: [
                {
                  name: 'columnLayout',
                  type: 'select',
                  label: 'Column Layout',
                  defaultValue: 'single',
                  options: [
                    { label: 'Single Column', value: 'single' },
                    { label: 'Two Columns', value: 'two' },
                  ],
                  admin: {
                    width: '100%',
                  },
                  required: true,
                },
                {
                  name: 'showBullets',
                  type: 'checkbox',
                  label: 'Show Bullets',
                  defaultValue: false,
                  admin: {
                    condition: (data, siblingData) => siblingData.columnLayout === 'single',
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'leftColumnBullets',
                      type: 'checkbox',
                      label: 'Left Column Bullets',
                      defaultValue: false,
                      admin: {
                        width: '50%',
                        condition: (data, siblingData) => siblingData.columnLayout === 'two',
                      },
                    },
                    {
                      name: 'rightColumnBullets',
                      type: 'checkbox',
                      label: 'Right Column Bullets',
                      defaultValue: false,
                      admin: {
                        width: '50%',
                        condition: (data, siblingData) => siblingData.columnLayout === 'two',
                      },
                    },
                  ],
                },
                {
                  name: 'singleContent',
                  type: 'richText',
                  label: 'Content',
                  admin: {
                    condition: (data, siblingData) => siblingData.columnLayout === 'single',
                  },
                },
                {
                  name: 'leftContent',
                  type: 'richText',
                  label: 'Left Column Content',
                  admin: {
                    condition: (data, siblingData) => siblingData.columnLayout === 'two',
                  },
                },
                {
                  name: 'rightContent',
                  type: 'richText',
                  label: 'Right Column Content',
                  admin: {
                    condition: (data, siblingData) => siblingData.columnLayout === 'two',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
