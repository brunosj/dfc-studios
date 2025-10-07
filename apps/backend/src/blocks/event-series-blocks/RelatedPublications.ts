import type { Block } from 'payload'

export const RelatedPublications: Block = {
  slug: 'relatedPublications',
  interfaceName: 'RelatedPublicationsBlock',
  labels: {
    singular: 'Related Publications',
    plural: 'Related Publications Blocks',
  },
  fields: [
    {
      name: 'publications',
      type: 'relationship',
      relationTo: 'publications',
      hasMany: true,
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ],
      defaultValue: 'grid',
    },
  ],
}
