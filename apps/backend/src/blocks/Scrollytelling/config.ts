import type { Block } from 'payload'
import { Hero } from '../report-blocks/Hero'
import { Highlights } from '../report-blocks/Highlights'
import { GridTextImage } from '../report-blocks/GridTextImage'
import { TextBox } from '../report-blocks/TextBox'

export const Scrollytelling: Block = {
  slug: 'scrollytelling',
  interfaceName: 'ScrollytellingBlock',
  labels: {
    singular: 'Scrollytelling',
    plural: 'Scrollytelling Blocks',
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        // Report blocks
        Hero,
        Highlights,
        GridTextImage,
        TextBox,
      ],
      admin: {
        initCollapsed: true,
      },
      label: 'Scrollytelling Content',
      required: true,
      minRows: 1,
    },
  ],
}
