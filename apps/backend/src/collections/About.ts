import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { richTextField } from '@/fields/richTextField'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { revalidateDelete, revalidatePage } from '@/hooks/revalidatePage'

export const About: CollectionConfig = {
  slug: 'about',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: {
    singular: 'About',
    plural: 'About',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    meta: {
      title: 'About - DFC Studios',
      description: 'About - DFC Studios',
    },
    group: 'Pages',
  },
  // Limit to a single document
  hooks: {
    beforeValidate: [
      async ({ operation, req }) => {
        if (operation === 'create') {
          const existingDocs = await req.payload.find({
            collection: 'about',
          })

          if (existingDocs.totalDocs > 0) {
            throw new Error('Only one about document can exist')
          }
        }
      },
    ],
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'About',
      required: true,
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Hero Title',
            },
            richTextField('heroFirstParagraph', true),
            richTextField('heroSecondParagraph', true),
            richTextField('heroThirdParagraph', true),
          ],
        },
        {
          label: 'Team Section',
          fields: [
            {
              name: 'teamTitle',
              type: 'text',
              label: 'Team Section Title',
            },
            {
              name: 'teamMembers',
              type: 'relationship',
              relationTo: 'team',
              hasMany: true,
              label: 'Team Members',
              admin: {
                description: 'Select team members to feature on the about page',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}
