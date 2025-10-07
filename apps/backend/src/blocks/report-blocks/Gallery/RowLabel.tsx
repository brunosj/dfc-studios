'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const GalleryImageRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    caption?: string
    alt?: string
    image?: { filename?: string } | string
  }>()

  const caption = data?.data?.caption
  const alt = data?.data?.alt
  const image = data?.data?.image

  // Get filename from image object
  const filename = typeof image === 'object' && image?.filename ? image.filename : 'Untitled'

  // Priority: caption > alt > filename
  const label = caption || alt || filename

  return <div>{label}</div>
}
