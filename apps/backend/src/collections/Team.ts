import type { CollectionConfig } from 'payload'
import { richTextField } from '@/fields/richTextField'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidateCollection'
import { slugField } from '@/fields/slug'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    meta: {
      title: 'Team - DFC Studios',
      description: 'Team - DFC Studios',
    },
    defaultColumns: ['name', 'email', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'email',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Info',
          fields: [
            {
              name: 'isStaff',
              type: 'checkbox',
              label: 'Is a Staff Member?',
              defaultValue: false,
            },
            { name: 'position', type: 'text', label: 'Position' },
            { name: 'nationality', type: 'text', label: 'Nationality' },
            { name: 'shortBio', type: 'textarea', label: 'Short Bio' },
            richTextField('longBio', true),
            {
              name: 'languages',
              type: 'array',
              label: 'Languages',
              fields: [
                {
                  name: 'language',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'Skills',
          fields: [
            {
              name: 'skillsList',
              type: 'array',
              fields: [
                {
                  name: 'primarySkills',
                  label: 'Primary Skills',
                  relationTo: 'services',
                  type: 'relationship',
                },
                {
                  name: 'secondarySkills',
                  label: 'Secondary Skills',
                  type: 'array',
                  fields: [
                    {
                      name: 'skill',
                      type: 'text',
                    },
                    {
                      name: 'skillLevel',
                      type: 'select',
                      label: 'Skill Level',
                      options: ['1-2 years', '2-5 years', '5-10 years', '10+ years', '20+ years'],
                      defaultValue: '2-5 years',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Picture',
          fields: [
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
              label: 'Avatar Picture',
            },
            {
              name: 'avatarColor',
              relationTo: 'colors',
              type: 'relationship',
              label: 'Avatar Color',
            },
            {
              name: 'normalPicture',
              type: 'upload',
              relationTo: 'media',
              label: 'Normal Picture',
            },
            {
              name: 'sillyPicture',
              type: 'upload',
              relationTo: 'media',
              label: 'Silly Picture',
            },
          ],
        },
        {
          label: 'Milestones',
          fields: [
            {
              name: 'milestones',
              type: 'array',
              fields: [
                { name: 'milestoneYear', type: 'text' },
                { name: 'milestoneTitle', type: 'text' },
                { name: 'milestoneSubtitle', type: 'text' },
                richTextField('milestoneDescription', true),
              ],
            },
          ],
        },
      ],
    },
    ...slugField('name'),
  ],
  hooks: {
    afterChange: [
      revalidateCollection({
        collection: 'team',
        paths: ['/about', '/'],
        tags: ['team-list', 'pages-sitemap', 'about', 'media'],
      }),
    ],
    afterDelete: [
      revalidateCollectionDelete({
        collection: 'team',
        paths: ['/about', '/'],
        tags: ['team-list', 'pages-sitemap', 'about', 'media'],
      }),
    ],
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}
