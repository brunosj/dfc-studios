'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const QuoteRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    text?: string
    person?: string
    personOrganization?: string
  }>()

  const text = data?.data?.text
  const person = data?.data?.person
  const organization = data?.data?.personOrganization

  // Create a preview of the quote text (first 50 characters)
  const quotePreview = text
    ? text.length > 50
      ? `"${text.substring(0, 50)}..."`
      : `"${text}"`
    : 'Quote'

  // Create attribution
  const attribution = person && organization ? `${person}, ${organization}` : person || 'Unknown'

  const label = `${quotePreview} — ${attribution}`

  return <div>{label}</div>
}
