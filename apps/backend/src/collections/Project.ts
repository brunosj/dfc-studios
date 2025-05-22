import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { richTextField } from '@/fields/richTextField'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidateCollection'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Project: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'date', 'updatedAt'],
    meta: {
      title: 'Projects - DFC Studios',
      description: 'Projects - DFC Studios',
    },
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
          label: 'Info',
          fields: [
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
            },
            {
              name: 'date',
              type: 'date',
              required: true,
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
            },
            // {
            //   name: 'image',
            //   type: 'upload',
            //   relationTo: 'media',
            //   required: false,
            // },
            {
              name: 'images',
              type: 'upload',
              relationTo: 'media',
              required: false,
              hasMany: true,
            },
            {
              name: 'staff',
              type: 'relationship',
              relationTo: 'team',
              hasMany: true,
              filterOptions: {
                isStaff: {
                  equals: true,
                },
              },
            },
            {
              name: 'client',
              type: 'relationship',
              relationTo: 'clients',
              required: false,
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            richTextField('longDescription', true),
            richTextField('keyChallenges', true),
            richTextField('tools', true),
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
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [
      revalidateCollection({
        collection: 'projects',
        paths: ['/our-work', '/'],
        tags: ['projects-list', 'pages-sitemap'],
      }),
    ],
    afterDelete: [
      revalidateCollectionDelete({
        collection: 'projects',
        paths: ['/our-work', '/'],
        tags: ['projects-list', 'pages-sitemap'],
      }),
    ],
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}
