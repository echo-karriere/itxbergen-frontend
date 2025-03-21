import {type ChangeEventHandler, useCallback} from 'react'
import {noop} from './noop'

/**
 * @public
 */
export interface SearchBarProps {
  onChange: (query: string) => void
  data: unknown
  query: string
}

export const SearchBar = ({onChange = noop}: SearchBarProps) => {
  const onSearchChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (evt) => onChange(evt.target.value),
    [onChange],
  )

  return (
    <input
      className="json-inspector__search"
      type="search"
      placeholder="Search"
      onChange={onSearchChange}
    />
  )
}
