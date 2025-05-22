import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
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
import { richTextField } from '@/fields/richTextField'
import { anyone } from '@/access/anyone'

export const Homepage: CollectionConfig = {
  slug: 'homepage',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  labels: {
    singular: 'Homepage | Page',
    plural: 'Homepage | Page',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    meta: {
      title: 'Homepage - DFC Studios',
      description: 'Homepage - DFC Studios',
    },
  },
  // Limit to a single document
  hooks: {
    beforeValidate: [
      async ({ operation, req }) => {
        if (operation === 'create') {
          const existingDocs = await req.payload.find({
            collection: 'homepage',
          })

          if (existingDocs.totalDocs > 0) {
            throw new Error('Only one homepage document can exist')
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
      defaultValue: 'Homepage',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroColors',
              type: 'relationship',
              relationTo: 'colors',
              hasMany: true,
              label: 'Hero Colors',
              admin: {
                description: 'Select the main color for the hero section (messages)',
              },
            },
            {
              name: 'keyMessages',
              type: 'array',
              label: 'Key Messages',
              admin: {
                description: 'Add key messages for the hero section',
              },
              fields: [
                {
                  name: 'keyMessageText',
                  label: 'Key Message',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Services Section',
          fields: [
            // {
            //   name: 'servicesColor',
            //   type: 'relationship',
            //   relationTo: 'colors',
            //   label: 'Services Color',
            //   admin: {
            //     description:
            //       'Select the color for the megaphone section (SVG shapes, headings, etc.)',
            //   },
            // },
            {
              name: 'servicesText',
              type: 'group',
              label: 'Services Text',
              fields: [
                {
                  name: 'firstParagraph',
                  type: 'textarea',
                  label: 'First Paragraph',
                },
                {
                  name: 'secondParagraph',
                  type: 'textarea',
                  label: 'Second Paragraph',
                },
              ],
            },
            {
              name: 'servicesUSP',
              type: 'textarea',
              label: 'Services USP Sentence',
              admin: {
                description: 'Unique selling proposition for your services',
              },
            },
            // {
            //   name: 'featuredServices',
            //   type: 'relationship',
            //   relationTo: 'services',
            //   hasMany: true,
            //   label: 'Featured Services',
            //   admin: {
            //     description: 'Select services to feature on the homepage',
            //   },
            // },
            // {
            //   name: 'servicesPictures',
            //   type: 'array',
            //   label: 'Service Pictures',
            //   admin: {
            //     description: 'Add pictures to showcase your services',
            //   },
            //   fields: [
            //     {
            //       name: 'picture',
            //       type: 'upload',
            //       relationTo: 'media',
            //       required: true,
            //     },
            //     {
            //       name: 'caption',
            //       type: 'text',
            //     },
            //   ],
            // },
          ],
        },
        {
          label: 'Clients Section',
          fields: [
            // {
            //   name: 'clientsColor',
            //   type: 'relationship',
            //   relationTo: 'colors',
            //   label: 'Clients Color',
            //   admin: {
            //     description:
            //       'Select the color for the clients section (heading, carousel arrows, etc.)',
            //   },
            // },
            {
              name: 'clientsTitle',
              type: 'text',
              label: 'Clients Section Title',
            },
            {
              name: 'featuredClients',
              type: 'relationship',
              relationTo: 'clients',
              hasMany: true,
              label: 'Featured Clients',
              admin: {
                description: 'Select clients to feature on the homepage',
              },
            },
          ],
        },
        // {
        //   label: 'Projects Section',
        //   fields: [
        //     {
        //       name: 'showProjectsSection',
        //       type: 'checkbox',
        //       label: 'Show Projects Section',
        //       defaultValue: true,
        //     },
        //     {
        //       name: 'projectsTitle',
        //       type: 'text',
        //       label: 'Projects Section Title',
        //     },
        //     richTextField('projectsDescription', true),
        //     {
        //       name: 'featuredProjects',
        //       type: 'relationship',
        //       relationTo: 'projects',
        //       hasMany: true,
        //       label: 'Featured Projects',
        //       admin: {
        //         description: 'Select projects to feature on the homepage',
        //       },
        //     },
        //   ],
        // },
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
