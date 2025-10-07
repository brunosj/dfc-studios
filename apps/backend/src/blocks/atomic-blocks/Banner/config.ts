import type { Block } from 'payload'

export const Banner: Block = {
  slug: 'banner',
  interfaceName: 'BannerBlock',
  labels: {
    singular: 'Banner',
    plural: 'Banner Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Banner Heading',
    },

    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Brief description or text content for the banner',
      },
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      options: [
        { label: 'Publication', value: 'publication' },
        { label: 'Post', value: 'post' },
        { label: 'Video', value: 'video' },
        { label: 'Initiative', value: 'initiative' },
      ],
      admin: {
        width: '50%',
        description: 'Select the type of content this banner will feature',
      },
    },

    {
      name: 'publication',
      type: 'relationship',
      relationTo: 'publications',
      hasMany: false,
      admin: {
        condition: (data, siblingData) => siblingData?.contentType === 'publication',
        description: 'Select the publication to feature',
      },
    },
    {
      name: 'extraDocuments',
      type: 'relationship',
      relationTo: 'documents',
      hasMany: true,
      admin: {
        condition: (data, siblingData) => siblingData?.contentType === 'publication',
        description: 'Additional documents available for download',
      },
    },
    {
      name: 'extraDocumentsButtonText',
      type: 'text',
      label: 'Additional Documents Button Text',
      defaultValue: 'Download',
      admin: {
        condition: (data, siblingData) => siblingData?.contentType === 'publication',
        description: 'Text for additional documents buttons',
      },
    },
    // Post fields
    // {
    //   name: 'post',
    //   type: 'relationship',
    //   relationTo: 'posts',
    //   hasMany: false,
    //   admin: {
    //     condition: (data, siblingData) => siblingData?.contentType === 'post',
    //     description: 'Select the post to feature',
    //   },
    // },
    // Video fields
    // {
    //   name: 'video',
    //   type: 'relationship',
    //   relationTo: 'videos',
    //   hasMany: false,
    //   admin: {
    //     condition: (data, siblingData) => siblingData?.contentType === 'video',
    //     description: 'Select the video to feature',
    //   },
    // },
    // Initiative fields
    // {
    //   name: 'initiative',
    //   type: 'relationship',
    //   relationTo: 'initiatives',
    //   hasMany: false,
    //   admin: {
    //     condition: (data, siblingData) => siblingData?.contentType === 'initiative',
    //     description: 'Select the initiative to feature',
    //   },
    // },
    // Custom button for non-publication content
    {
      type: 'group',
      name: 'customButton',
      label: 'Custom Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Learn More',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Custom URL',
          admin: {
            description:
              "Override default URL for the selected content. Leave empty to use content's default URL.",
          },
        },
        {
          name: 'appearance',
          type: 'select',
          label: 'Button Appearance',
          defaultValue: 'outline',
          options: [
            { label: 'Outline', value: 'outline' },
            { label: 'Filled', value: 'filled' },
            { label: 'Ghost', value: 'ghost' },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'color',
          type: 'select',
          label: 'Button Color',
          defaultValue: 'primary',
          options: [
            { label: 'Primary Color', value: 'primary' },
            { label: 'Primary Color Light', value: 'primaryLight' },
            { label: 'Secondary Color', value: 'secondary' },
            { label: 'Secondary Color Light', value: 'secondaryLight' },
            { label: 'Tertiary Color', value: 'tertiary' },
            { label: 'Tertiary Color Light', value: 'tertiaryLight' },
            { label: 'Black', value: '#000000' },
            { label: 'White', value: '#ffffff' },
          ],
          admin: {
            width: '50%',
            description: 'Choose from report colors or standard options',
          },
        },
      ],
    },

    // Display settings
    {
      type: 'group',
      name: 'display',
      label: 'Display Settings',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'imageDisplay',
              type: 'select',
              required: true,
              defaultValue: 'background',
              options: [
                { label: 'Background Image', value: 'background' },
                { label: 'Image in Container', value: 'container' },
              ],
              admin: {
                width: '50%',
                description: 'How the image should be displayed',
              },
            },
            {
              name: 'imagePosition',
              type: 'select',
              defaultValue: 'right',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
              admin: {
                width: '50%',
                condition: (data, siblingData) => siblingData?.imageDisplay === 'container',
                description: 'Position of image when displayed in container',
              },
            },
          ],
        },
        {
          name: 'customImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Custom Background Image',
          admin: {
            condition: (data, siblingData) => siblingData?.imageDisplay === 'background',
            description:
              'Optional custom image to use as background. If not provided, uses content image.',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'backgroundColor',
              type: 'select',
              label: 'Background Color',
              defaultValue: 'primary',
              options: [
                { label: 'Primary Color', value: 'primary' },
                { label: 'Primary Color Light', value: 'primaryLight' },
                { label: 'Secondary Color', value: 'secondary' },
                { label: 'Secondary Color Light', value: 'secondaryLight' },
                { label: 'Tertiary Color', value: 'tertiary' },
                { label: 'Tertiary Color Light', value: 'tertiaryLight' },
                { label: 'Black', value: '#000000' },
                { label: 'White', value: '#ffffff' },
                { label: 'Transparent', value: 'transparent' },
              ],
              admin: {
                width: '50%',
                description: 'Choose from report colors or standard options',
              },
            },
            {
              name: 'textColor',
              type: 'select',
              label: 'Text Color',
              defaultValue: '#ffffff',
              options: [
                { label: 'Primary Color', value: 'primary' },
                { label: 'Primary Color Light', value: 'primaryLight' },
                { label: 'Secondary Color', value: 'secondary' },
                { label: 'Secondary Color Light', value: 'secondaryLight' },
                { label: 'Tertiary Color', value: 'tertiary' },
                { label: 'Tertiary Color Light', value: 'tertiaryLight' },
                { label: 'Black', value: '#000000' },
                { label: 'White', value: '#ffffff' },
              ],
              admin: {
                width: '50%',
                description: 'Choose from report colors or standard options',
              },
            },
          ],
        },
        {
          name: 'showOverlay',
          type: 'checkbox',
          label: 'Show Overlay',
          defaultValue: true,
          admin: {
            condition: (data, siblingData) => siblingData?.imageDisplay === 'background',
            description:
              'Add a colored overlay over the background image for better text readability',
          },
        },
        {
          name: 'overlayOpacity',
          type: 'number',
          label: 'Overlay Opacity',
          defaultValue: 0.7,
          min: 0,
          max: 1,
          admin: {
            condition: (data, siblingData) =>
              siblingData?.imageDisplay === 'background' && siblingData?.showOverlay,
            description: 'Opacity of the overlay (0.0 to 1.0)',
          },
        },
      ],
    },
    // Layout settings
    {
      type: 'row',
      fields: [
        {
          name: 'height',
          type: 'select',
          label: 'Banner Height',
          defaultValue: 'medium',
          options: [
            { label: 'Auto (content-driven)', value: 'auto' },
            { label: 'Small (max 40vh)', value: 'small' },
            { label: 'Medium (max 50vh)', value: 'medium' },
            { label: 'Large (max 60vh)', value: 'large' },
            { label: 'Extra Large (max 70vh)', value: 'xl' },
          ],
          admin: {
            width: '50%',
            description: 'Maximum height constraint. Content can be shorter but not taller.',
          },
        },
        {
          name: 'textAlignment',
          type: 'select',
          label: 'Text Alignment',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'insideContainer',
      type: 'checkbox',
      label: 'Inside Container',
      defaultValue: true,
      admin: {
        description: 'Whether the banner content should be constrained by the layout container',
      },
    },
  ],
}
