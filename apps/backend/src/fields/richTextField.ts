import { Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UnorderedListFeature,
  OrderedListFeature,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

export const richTextField = (name: string = 'richText', label: boolean = true): Field => ({
  name,
  type: 'richText',
  editor: lexicalEditor({
    features: ({ rootFeatures }) => {
      return [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        UnorderedListFeature(),
        OrderedListFeature(),
        LinkFeature(),
      ]
    },
  }),
  label: label
    ? name.charAt(0).toUpperCase() +
      name
        .slice(1)
        .replace(/([A-Z])/g, ' $1')
        .trim()
    : false,
})
