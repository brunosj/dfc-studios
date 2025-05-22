import type { CollectionSlug, Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'outline' | 'filled'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
  filled: {
    label: 'Filled',
    value: 'filled',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  disableCustomURL?: boolean
  overrides?: Record<string, unknown>
  relationTo?: string[]
}) => Field

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  disableCustomURL = false,
  overrides = {},
  relationTo = ['pages'],
} = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          ...(!disableCustomURL
            ? [
                {
                  name: 'type',
                  type: 'radio' as const,
                  admin: {
                    layout: 'horizontal' as const,
                    width: '50%',
                  },
                  defaultValue: 'reference',
                  options: [
                    {
                      label: 'Internal link',
                      value: 'reference',
                    },
                    {
                      label: 'Custom URL',
                      value: 'custom',
                    },
                  ],
                },
                {
                  name: 'newTab',
                  type: 'checkbox' as const,
                  admin: {
                    style: {
                      alignSelf: 'flex-end',
                    },
                    width: '50%',
                  },
                  label: 'Open in new tab',
                },
              ]
            : []),
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship' as const,
      admin: {
        condition: (_, siblingData) => disableCustomURL || siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: relationTo as CollectionSlug[],
      required: true,
    },
    ...(!disableCustomURL
      ? [
          {
            name: 'url',
            type: 'text' as const,
            admin: {
              condition: (_: unknown, siblingData: { type?: string }) =>
                siblingData?.type === 'custom',
            },
            label: 'Custom URL',
            required: true,
          },
        ]
      : []),
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
