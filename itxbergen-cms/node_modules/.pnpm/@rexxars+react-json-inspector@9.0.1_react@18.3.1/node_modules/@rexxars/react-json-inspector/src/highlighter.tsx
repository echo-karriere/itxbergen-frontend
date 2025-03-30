import {Component} from 'react'

export interface HighlighterProps {
  string: string
  highlight?: RegExp | null
}

export class Highlighter extends Component<HighlighterProps> {
  shouldComponentUpdate(p: HighlighterProps) {
    return p.highlight !== this.props.highlight
  }

  render() {
    const str = this.props.string || ''
    const highlight = this.props.highlight || ''
    const highlightStart = str.search(highlight)

    if (!highlight || highlightStart === -1) {
      return <span>{str}</span>
    }

    const highlightLength = highlight.source.length
    const highlightString = str.slice(
      highlightStart,
      highlightStart + highlightLength,
    )

    return (
      <span>
        {str.split(highlight).map(function (part, index) {
          return (
            <span key={index}>
              {index > 0 ? (
                <span className="json-inspector__hl">{highlightString}</span>
              ) : null}
              {part}
            </span>
          )
        })}
      </span>
    )
  }
}
