'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const ResourceGroupRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    heading?: string
    resourceType?: string
    publications?: any[]
    posts?: any[]
    videos?: any[]
  }>()

  const heading = data?.data?.heading
  const resourceType = data?.data?.resourceType

  // Count items based on resource type
  let itemCount = 0
  if (resourceType === 'publications') {
    itemCount = data?.data?.publications?.length || 0
  } else if (resourceType === 'posts') {
    itemCount = data?.data?.posts?.length || 0
  } else if (resourceType === 'videos') {
    itemCount = data?.data?.videos?.length || 0
  }

  const typeLabel =
    {
      publications: 'Publications',
      posts: 'Posts',
      videos: 'Videos',
    }[resourceType || ''] || 'Resources'

  const label = heading
    ? `${heading} - ${typeLabel} (${itemCount} item${itemCount !== 1 ? 's' : ''})`
    : `${typeLabel} (${itemCount} item${itemCount !== 1 ? 's' : ''})`

  return <div>{label}</div>
}
