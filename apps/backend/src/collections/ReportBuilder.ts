import type { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { Scrollytelling } from '@/blocks/Scrollytelling'
import { TextBox } from '@/blocks/report-blocks/TextBox'
import { Hero } from '@/blocks/report-blocks/Hero'
import { Highlights } from '@/blocks/report-blocks/Highlights'
import { GridTextImage } from '@/blocks/report-blocks/GridTextImage'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { Text } from '@/blocks/atomic-blocks/Text'
import { Picture } from '@/blocks/atomic-blocks/Picture'
import { Heading } from '@/blocks/atomic-blocks/Heading'
import { Banner } from '@/blocks/atomic-blocks/Banner'
import { Section } from '@/blocks/report-blocks/Section'
import { ReportRelatedContent } from '@/blocks/report-blocks/ReportRelatedContent'

export const ReportBuilder: CollectionConfig = {
  slug: 'report-builder',
  labels: {
    singular: 'Report Builder',
    plural: 'Report Builder',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    meta: {
      title: 'Report Builder - DFC Studios',
      description: 'Report Builder - DFC Studios',
    },
    preview: (data) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/report-builder/${data.slug}`
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Report Title',
    },
    {
      type: 'tabs',
      tabs: [
        // {
        //   label: 'Content',
        //   fields: [
        //     {
        //       name: 'publication',
        //       type: 'relationship',
        //       relationTo: 'publications',
        //       hasMany: false,
        //       label: 'Associated Publication',
        //       admin: {
        //         description: 'Link this report to a publication',
        //       },
        //     },
        //   ],
        // },
        {
          label: 'Layout',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Scrollytelling,
                Section,
                TextBox,
                Hero,
                Highlights,
                GridTextImage,
                Text,
                Picture,
                Heading,
                Banner,
                ReportRelatedContent,
              ],
              label: 'Report Layout',
              admin: {
                description: 'Build your interactive report using scrollytelling blocks',
              },
              required: true,
              minRows: 1,
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
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'colors',
      type: 'group',
      label: 'Report Colors',
      admin: {
        position: 'sidebar',
        description: 'Define custom colors for this report',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'primary',
              type: 'text',
              label: 'Primary Color',
              admin: {
                width: '50%',
                description: 'Hex color code (e.g., #2563eb)',
                placeholder: '#2563eb',
              },
              validate: (value: string | null | undefined) => {
                if (!value || typeof value !== 'string') return true // Optional field
                const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                return hexPattern.test(value) || 'Please enter a valid hex color (e.g., #2563eb)'
              },
            },
            {
              name: 'primaryLight',
              type: 'text',
              label: 'Primary Color Light',
              admin: {
                width: '50%',
                description: 'Hex color code (e.g., #60a5fa)',
                placeholder: '#60a5fa',
              },
              validate: (value: string | null | undefined) => {
                if (!value || typeof value !== 'string') return true // Optional field
                const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                return hexPattern.test(value) || 'Please enter a valid hex color (e.g., #60a5fa)'
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'secondary',
              type: 'text',
              label: 'Secondary Color',
              admin: {
                width: '50%',
                description: 'Hex color code (e.g., #10b981)',
                placeholder: '#10b981',
              },
              validate: (value: string | null | undefined) => {
                if (!value || typeof value !== 'string') return true // Optional field
                const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                return hexPattern.test(value) || 'Please enter a valid hex color (e.g., #10b981)'
              },
            },
            {
              name: 'secondaryLight',
              type: 'text',
              label: 'Secondary Color Light',
              admin: {
                width: '50%',
                description: 'Hex color code (e.g., #34d399)',
                placeholder: '#34d399',
              },
              validate: (value: string | null | undefined) => {
                if (!value || typeof value !== 'string') return true // Optional field
                const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                return hexPattern.test(value) || 'Please enter a valid hex color (e.g., #34d399)'
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'tertiary',
              type: 'text',
              label: 'Tertiary Color',
              admin: {
                width: '50%',
                description: 'Hex color code (e.g., #f59e0b)',
                placeholder: '#f59e0b',
              },
              validate: (value: string | null | undefined) => {
                if (!value || typeof value !== 'string') return true // Optional field
                const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                return hexPattern.test(value) || 'Please enter a valid hex color (e.g., #f59e0b)'
              },
            },
            {
              name: 'tertiaryLight',
              type: 'text',
              label: 'Tertiary Color Light',
              admin: {
                width: '50%',
                description: 'Hex color code (e.g., #fbbf24)',
                placeholder: '#fbbf24',
              },
              validate: (value: string | null | undefined) => {
                if (!value || typeof value !== 'string') return true // Optional field
                const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                return hexPattern.test(value) || 'Please enter a valid hex color (e.g., #fbbf24)'
              },
            },
          ],
        },
      ],
    },
    ...slugField(),
  ],
  // hooks: {
  //   beforeChange: [populatePublishedAt],
  //   afterChange: [revalidateRedirects],
  // },
}
