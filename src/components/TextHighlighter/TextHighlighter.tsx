import { memo, useMemo } from 'react'

import type { TextHighlighterProps } from './TextHighlighter.types'

function BaseTextHighlighter({
  highlightClassName = 'highlight',
  searchQuery,
  textToHighlight,
}: TextHighlighterProps) {
  const cleanedSearchQuery = searchQuery.filter(Boolean)

  const highlightedText = useMemo(() => {
    const regex = new RegExp(cleanedSearchQuery.join('|'), 'gi')

    return textToHighlight.replace(
      regex,
      match => `<span class="${highlightClassName}">${match}</span>`,
    )
  }, [cleanedSearchQuery, textToHighlight, highlightClassName])

  if (!cleanedSearchQuery.length) {
    return textToHighlight
  }

  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
}

export const TextHighlighter = memo(BaseTextHighlighter)
