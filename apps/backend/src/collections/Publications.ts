import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionAfterChangeHook } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Publications: CollectionConfig = {
  slug: 'publications',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'publicationDate'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'info',
          label: 'Info',
          fields: [
            {
              name: 'category',
              type: 'text',
              required: true,
            },
            // {
            //   name: 'programme',
            //   type: 'relationship',
            //   relationTo: 'categories',
            //   filterOptions: {
            //     type: {
            //       equals: 'programme',
            //     },
            //   },
            //   admin: {
            //     description: 'Related programme',
            //     disabled: true,
            //   },
            // },
            // {
            //   name: 'thematicArea',
            //   type: 'relationship',
            //   relationTo: 'categories',
            // },
            // {
            //   name: 'project',
            //   type: 'relationship',
            //   relationTo: 'projects',
            //   admin: {
            //     description: 'Related project',
            //     disabled: true,
            //   },
            // },
            {
              name: 'author',
              type: 'textarea',
            },

            {
              name: 'summary',
              type: 'textarea',
            },
            {
              name: 'publicationDate',
              type: 'date',
            },
            {
              name: 'language',
              type: 'select',
              options: [
                {
                  label: 'English',
                  value: 'en',
                },
                {
                  label: 'German',
                  value: 'de',
                },
                {
                  label: 'French',
                  value: 'fr',
                },
              ],
            },

            {
              name: 'keywords',
              type: 'array',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                },
              ],
            },
            {
              name: 'doi',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'doiNumber',
              type: 'number',
              admin: {
                condition: (data) => data.doi === true,
              },
            },
            {
              name: 'doiUrl',
              type: 'text',
              admin: {
                condition: (data) => data.doi === true,
              },
            },
            {
              name: 'citation',
              type: 'textarea',
            },
          ],
        },
        {
          name: 'content',
          label: 'Content',
          fields: [
            {
              name: 'generateNewsEntry',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description:
                  'Generate a news entry for this publication (use Description field in extension below)',
              },
            },
            {
              name: 'description',
              label: 'News Entry Text',
              type: 'richText',
              editor: lexicalEditor({}),
              admin: {
                condition: (data, siblingData) => siblingData.generateNewsEntry === true,
              },
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Publication thumbnail image',
                condition: (data) => false, // Hidden by default
              },
            },
            {
              name: 'pdf',
              type: 'upload',
              relationTo: 'documents',
              admin: {
                description: 'Publication PDF document',
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
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'automatedNewsEntry',
      type: 'text',
      admin: {
        description: 'Automated news entry content',
        position: 'sidebar',
        condition: (data) => false,
      },
    },
    {
      name: 'thumbnailFromCloudinary',
      type: 'text',
      admin: {
        description: 'Cloudinary URL for thumbnail (migration field)',
        position: 'sidebar',
        condition: (data) => false, // Hidden by default
      },
    },
    // Migration tracking fields
    {
      name: 'contentfulId',
      type: 'text',
      admin: {
        description: 'Original Contentful entry ID (for migration tracking)',
        readOnly: true,
        position: 'sidebar',
        condition: (data) => false, // Hidden by default
      },
    },
    {
      name: 'migrationNotes',
      type: 'textarea',
      admin: {
        description: 'Notes about the migration process',
        position: 'sidebar',
        condition: (data) => false, // Hidden by default
      },
    },
  ],

  timestamps: true,
}
