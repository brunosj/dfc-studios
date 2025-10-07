import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Document',
    plural: 'Documents',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Assets',
    useAsTitle: 'filename',
    listSearchableFields: ['filename', 'title'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Display title for the document',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of the document',
      },
    },
    {
      name: 'thumbnailPath',
      type: 'text',
      admin: {
        description: 'Auto-generated thumbnail path',
        readOnly: true,
      },
    },
    {
      name: 'thumbnailGenerated',
      type: 'checkbox',
      admin: {
        description: 'Whether thumbnail was successfully generated',
        readOnly: true,
      },
      defaultValue: false,
    },
    {
      name: 'originalUrl',
      type: 'text',
      admin: {
        description: 'Original URL from Contentful (for migration tracking)',
        readOnly: true,
      },
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../../../documents'),
    mimeTypes: ['application/pdf'],
  },

  timestamps: true,
}
