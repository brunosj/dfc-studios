import type { Block } from 'payload'

export const SectionTitle: Block = {
  slug: 'sectionTitle',
  interfaceName: 'SectionTitleBlock',
  labels: {
    singular: 'Section Title',
    plural: 'Section Titles',
  },
  fields: [
    {
      name: 'content',
      type: 'text',
      required: true,
      label: 'Heading Text',
    },
    {
      name: 'theme',
      type: 'select',
      options: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
      ],
      defaultValue: 'light',
      label: 'Theme',
      admin: {
        description:
          'The theme of the section title. This will determine the text and background color (hardcoded to main website colors).',
      },
    },
  ],
}
