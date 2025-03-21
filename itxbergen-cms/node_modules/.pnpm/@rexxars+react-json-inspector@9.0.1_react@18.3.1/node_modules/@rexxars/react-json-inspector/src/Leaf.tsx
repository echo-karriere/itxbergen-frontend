import {Component, MouseEvent} from 'react'

import md5OMatic from 'md5-o-matic'

import {uid} from './uid'
import {type} from './type'
import {isPrimitive} from './isPrimitive'

import {Highlighter} from './highlighter'
import {isObject} from './isObject'
import type {JsonInspectorProps} from './JsonInspector'

const PATH_PREFIX = '.root.'

interface LeafProps {
  data: unknown
  label: string

  id?: string
  root?: boolean
  prefix?: string
  query?: RegExp | null

  isExpanded?: (keyPath: string, value: unknown) => boolean

  interactiveLabel?: JsonInspectorProps['interactiveLabel']
  onClick: JsonInspectorProps['onClick']

  // @todo what is this
  verboseShowOriginal?: boolean
  getOriginal?: (keypath: string) => unknown
}

interface LeafState {
  expanded: boolean

  // @todo what is this
  original?: unknown
}

export class Leaf extends Component<LeafProps, LeafState> {
  constructor(props: LeafProps) {
    super(props)

    this.state = {
      expanded: this._isInitiallyExpanded(this.props),
    }
  }

  render() {
    const {label, data, root, id: inputId} = this.props
    const id = 'id_' + uid()

    const d = {
      path: this.keypath(),
      key: label.toString(),
      value: data,
    }

    const onLabelClick = this._onClick.bind(this, d)

    return (
      <div
        data-testid={root ? 'leaf-root' : 'leaf-child'}
        aria-expanded={this.state.expanded}
        data-root={root || undefined}
        className={this.getClassName()}
        id={'leaf-' + this._rootPath()}
      >
        <input
          className="json-inspector__radio"
          type="radio"
          name={id}
          id={inputId}
          tabIndex={-1}
        />
        <label
          className="json-inspector__line"
          htmlFor={id}
          onClick={onLabelClick}
        >
          <div className="json-inspector__flatpath">{d.path}</div>
          <span className="json-inspector__key">
            {this.format(d.key)}
            {':'}
            {this.renderInteractiveLabel(d.key, true)}
          </span>
          {this.renderTitle()}
          {this.renderShowOriginalButton()}
        </label>
        {this.renderChildren()}
      </div>
    )
  }

  renderTitle() {
    const data = this.data()
    const t = type(data)

    if (Array.isArray(data)) {
      const length = data.length
      return (
        <span className="json-inspector__value json-inspector__value_helper">
          {length > 0 ? '[…] ' : '[] '}
          {items(length)}
        </span>
      )
    }

    if (typeof data === 'object' && data !== null) {
      const keys = Object.keys(data).length
      return (
        <span className="json-inspector__value json-inspector__value_helper">
          {keys > 0 ? '{…} ' : '{} '}
          {properties(keys)}
        </span>
      )
    }

    return (
      <span
        className={
          'json-inspector__value json-inspector__value_' + t.toLowerCase()
        }
      >
        {this.format(String(data))}
        {this.renderInteractiveLabel(data, false)}
      </span>
    )
  }

  renderChildren() {
    const {
      verboseShowOriginal,
      query,
      id,
      isExpanded,
      interactiveLabel,
      onClick,
      getOriginal,
    } = this.props
    const childPrefix = this._rootPath()
    const data = this.data()

    if (this.state.expanded && (isObject(data) || Array.isArray(data))) {
      return Object.keys(data).map((key) => {
        const value = (data as any)[key]

        const shouldGetOriginal =
          !this.state.original || (verboseShowOriginal ? query : false)

        return (
          <Leaf
            data={value}
            label={key}
            prefix={childPrefix}
            onClick={onClick}
            id={id}
            query={query}
            getOriginal={shouldGetOriginal ? getOriginal : undefined}
            key={getLeafKey(key, value)}
            isExpanded={isExpanded}
            interactiveLabel={interactiveLabel}
            verboseShowOriginal={verboseShowOriginal}
          />
        )
      })
    }

    return null
  }

  renderShowOriginalButton() {
    const {data, getOriginal, query} = this.props
    if (
      isPrimitive(data) ||
      this.state.original ||
      !getOriginal ||
      !query ||
      query.test(this.keypath())
    ) {
      return null
    }

    return (
      <span
        className="json-inspector__show-original"
        onClick={this._onShowOriginalClick}
      />
    )
  }

  renderInteractiveLabel(originalValue: unknown, isKey: boolean) {
    const InteractiveLabel = this.props.interactiveLabel
    if (typeof InteractiveLabel === 'function') {
      return (
        <InteractiveLabel
          value={String(originalValue)}
          originalValue={originalValue}
          isKey={isKey}
          keypath={this.keypath()}
        />
      )
    }

    return null
  }

  static getDerivedStateFromProps(props: LeafProps, state: LeafState) {
    if (props.query) {
      return {
        expanded: !props.query.test(props.label),
      }
    }

    return null
  }

  componentDidUpdate(prevProps: LeafProps) {
    // Restore original expansion state when switching from search mode
    // to full browse mode.
    if (prevProps.query && !this.props.query) {
      this.setState({
        expanded: this._isInitiallyExpanded(this.props),
      })
    }
  }

  _rootPath() {
    return (this.props.prefix || '') + '.' + this.props.label
  }

  keypath() {
    return this._rootPath().slice(PATH_PREFIX.length)
  }

  data() {
    return this.state.original || this.props.data
  }

  format(str: string) {
    return <Highlighter string={str} highlight={this.props.query} />
  }

  getClassName() {
    let cn = 'json-inspector__leaf'

    if (this.props.root) {
      cn += ' json-inspector__leaf_root'
    }

    if (this.state.expanded) {
      cn += ' json-inspector__leaf_expanded'
    }

    if (!isPrimitive(this.props.data)) {
      cn += ' json-inspector__leaf_composite'
    }

    return cn
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  _onClick(
    data: {
      path: string
      key: string
      value: unknown
    },
    e: MouseEvent,
  ) {
    this.toggle()
    if (this.props.onClick) {
      this.props.onClick(data)
    }

    e.stopPropagation()
  }

  _onShowOriginalClick = (e: MouseEvent) => {
    this.setState({
      original: this.props.getOriginal?.(this.keypath()),
    })

    e.stopPropagation()
  }

  _isInitiallyExpanded(p: LeafProps) {
    if (p.root) {
      return true
    }

    const keypath = this.keypath()

    if (!p.query) {
      return p.isExpanded ? p.isExpanded(keypath, p.data) : false
    } else {
      // When a search query is specified, first check if the keypath
      // contains the search query: if it does, then the current leaf
      // is itself a search result and there is no need to expand further.
      //
      // Having a `getOriginal` function passed signalizes that current
      // leaf only displays a subset of data, thus should be rendered
      // expanded to reveal the children that is being searched for.
      return !p.query.test(keypath) && typeof p.getOriginal === 'function'
    }
  }
}

function items(count: number) {
  return count + (count === 1 ? ' item' : ' items')
}

function properties(count: number) {
  return count + (count === 1 ? ' property' : ' properties')
}

function getLeafKey(key: string, value: unknown) {
  if (isPrimitive(value)) {
    // TODO: Sanitize `value` better.
    const hash = md5OMatic(String(value))
    return key + ':' + hash
  } else {
    return key + '[' + type(value) + ']'
  }
}
