import type { Block } from 'payload'

export const ReportRelatedContent: Block = {
  slug: 'reportRelatedContent',
  interfaceName: 'ReportRelatedContentBlock',
  labels: {
    singular: 'Report Related Content',
    plural: 'Report Related Content Blocks',
  },
  fields: [
    {
      name: 'featuredResource',
      type: 'group',
      label: 'Featured Resource',
      fields: [
        {
          name: 'enable',
          type: 'checkbox',
          label: 'Show Featured Resource',
          defaultValue: false,
          admin: {
            description: 'Display a featured resource as a banner at the top of this section',
          },
        },
        {
          name: 'resourceType',
          type: 'select',
          label: 'Resource Type',
          options: [
            { label: 'Publication', value: 'publication' },
            { label: 'Blog Post', value: 'post' },
            { label: 'Video', value: 'video' },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.enable === true,
          },
        },
        {
          name: 'publication',
          type: 'relationship',
          relationTo: 'publications',
          label: 'Featured Publication',
          admin: {
            condition: (data, siblingData) => siblingData?.resourceType === 'publication',
          },
        },
        // {
        //   name: 'post',
        //   type: 'relationship',
        //   relationTo: ['posts', 'news'],
        //   label: 'Featured Post',
        //   admin: {
        //     condition: (data, siblingData) => siblingData?.resourceType === 'post',
        //   },
        // },
        // {
        //   name: 'video',
        //   type: 'relationship',
        //   relationTo: 'videos',
        //   label: 'Featured Video',
        //   admin: {
        //     condition: (data, siblingData) => siblingData?.resourceType === 'video',
        //   },
        // },
        {
          name: 'customTitle',
          type: 'text',
          label: 'Custom Banner Title',
          admin: {
            description: 'Override the default title for the banner (optional)',
            condition: (data, siblingData) => siblingData?.enable === true,
          },
        },
        {
          name: 'customDescription',
          type: 'textarea',
          label: 'Custom Banner Description',
          admin: {
            description: 'Override the default description for the banner (optional)',
            condition: (data, siblingData) => siblingData?.enable === true,
          },
        },
      ],
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      admin: {
        description: 'Optional heading for this related content section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
      admin: {
        description: 'Optional description text for this section',
      },
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      options: [
        { label: 'Resources', value: 'resources' },
        { label: 'Events', value: 'events' },
        { label: 'Partners', value: 'partners' },
        { label: 'Team Members', value: 'team' },
      ],
      admin: {
        description: 'Choose the type of content to display in this section',
      },
    },
    // Resources (grouped)
    {
      name: 'resourceGroups',
      type: 'array',
      label: 'Resource Groups',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Group Heading',
          admin: {
            description: 'e.g., "Related Publications", "Featured Videos", "Blog Posts"',
          },
        },
        {
          name: 'resourceType',
          type: 'select',
          required: true,
          options: [
            { label: 'Publications', value: 'publications' },
            { label: 'Posts', value: 'posts' },
            { label: 'Videos', value: 'videos' },
          ],
          admin: {
            description: 'Choose the type of resources in this group',
          },
        },
        {
          name: 'publications',
          type: 'relationship',
          relationTo: 'publications',
          hasMany: true,
          admin: {
            condition: (data, siblingData) => siblingData.resourceType === 'publications',
            description: 'Select publications to display in this group',
          },
        },
        // {
        //   name: 'posts',
        //   type: 'relationship',
        //   relationTo: ['posts', 'news'],
        //   hasMany: true,
        //   admin: {
        //     condition: (data, siblingData) => siblingData.resourceType === 'posts',
        //     description: 'Select posts and news articles to display in this group',
        //   },
        // },
        // {
        //   name: 'videos',
        //   type: 'relationship',
        //   relationTo: 'videos',
        //   hasMany: true,
        //   admin: {
        //     condition: (data, siblingData) => siblingData.resourceType === 'videos',
        //     description: 'Select videos to display in this group',
        //   },
        // },
      ],
      admin: {
        condition: (data, siblingData) => siblingData.contentType === 'resources',
        description: 'Create groups of different resource types with custom headings',
        components: {
          RowLabel: '@/blocks/initative-blocks/RelatedContent/RowLabel#ResourceGroupRowLabel',
        },
      },
      minRows: 1,
    },
    // Events
    // {
    //   name: 'events',
    //   type: 'relationship',
    //   relationTo: 'events',
    //   hasMany: true,
    //   admin: {
    //     condition: (data, siblingData) => siblingData.contentType === 'events',
    //     description: 'Select related events to display',
    //   },
    // },
    // Partners
    // {
    //   name: 'partners',
    //   type: 'relationship',
    //   relationTo: 'collaborators',
    //   hasMany: true,
    //   admin: {
    //     condition: (data, siblingData) => siblingData.contentType === 'partners',
    //     description: 'Select partners and collaborators to display',
    //   },
    // },
    // Team Members
    // {
    //   name: 'teamMembers',
    //   type: 'relationship',
    //   relationTo: 'collaborators',
    //   hasMany: true,
    //   admin: {
    //     condition: (data, siblingData) => siblingData.contentType === 'team',
    //     description: 'Select team members working on this initiative',
    //   },
    // },
    // Display Options
    {
      type: 'group',
      name: 'display',
      label: 'Display Options',
      admin: {
        condition: (data, siblingData) => siblingData.contentType !== 'events',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'layout',
              type: 'select',
              defaultValue: 'list',
              options: [
                { label: 'Grid', value: 'grid' },
                { label: 'List', value: 'list' },
                { label: 'Cards', value: 'cards' },
                { label: 'Carousel', value: 'carousel' },
                { label: 'Simple List', value: 'simple' },
              ],
              admin: {
                width: '50%',
              },
              required: true,
            },
            {
              name: 'columns',
              type: 'select',
              defaultValue: '3',
              options: [
                { label: '1 Column', value: '1' },
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' },
                { label: '5 Columns', value: '5' },
              ],
              admin: {
                width: '50%',
                condition: (data, siblingData) => ['grid', 'cards'].includes(siblingData.layout),
              },
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'showImages',
              type: 'checkbox',
              label: 'Show Images/Avatars',
              defaultValue: true,
              admin: {
                width: '33%',
              },
            },
            {
              name: 'showDescriptions',
              type: 'checkbox',
              label: 'Show Descriptions',
              defaultValue: true,
              admin: {
                width: '33%',
              },
            },
            {
              name: 'showMetadata',
              type: 'checkbox',
              label: 'Show Metadata (dates, tags, etc.)',
              defaultValue: true,
              admin: {
                width: '34%',
              },
            },
          ],
        },
        {
          name: 'itemLimit',
          type: 'number',
          label: 'Maximum Items to Display',
          defaultValue: 10,
          admin: {
            description: 'Leave empty to show all items',
          },
        },
      ],
    },
  ],
}
