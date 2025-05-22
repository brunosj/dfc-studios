// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { resendAdapter } from '@payloadcms/email-resend'

import { plugins } from './plugins'
import { collections } from './collections'
import { globals } from './globals'
import { Users } from './collections/Users'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: { path: 'src/components/Logo/AdminLogo.tsx' },
        Icon: { path: 'src/components/Logo/AdminLogo.tsx' },
      },
    },
    meta: {
      title: 'DFC Studios',
      description: 'DFC Studios - Admin',
    },
  },
  collections,
  globals,
  sharp,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    declare: false,
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  cors: {
    origins: [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
      process.env.NEXT_PUBLIC_SERVER_URL || '',
    ],
    headers: ['Content-Type', 'Authorization', 'x-csrf-token'],
  },
  csrf: [process.env.NEXT_PUBLIC_PAYLOAD_URL || '', process.env.NEXT_PUBLIC_SERVER_URL || ''],
  plugins: [...plugins],
  email: resendAdapter({
    defaultFromAddress: 'website@dfc.studio',
    defaultFromName: 'DFC Studios',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
})
