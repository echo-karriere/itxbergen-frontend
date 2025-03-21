import {Component} from 'react'
import debounce from 'debounce'

import {Leaf} from './Leaf.js'
import {SearchBar, type SearchBarProps} from './SearchBar.js'

import {getFilterer} from './filterer.js'
import {isEmpty} from './isEmpty.js'
import {lens} from './lens.js'
import {noop} from './noop.js'

/**
 * @public
 */
export interface JsonInspectorProps {
  /**
   * DOM id for the root node
   */
  id?: string
  /**
   * JSON object or array to inspect.
   */
  data: unknown
  /**
   * The class name to be added to the root component element.
   */
  className?: string
  /**
   * Search bar component that accepts `onChange`, `data` and `query`
   * properties. Defaults to built-in search bar. Pass `false` to disable
   * search.
   */
  search?: React.ComponentType<SearchBarProps> | false
  /**
   * Optional parameters for search (toolbar). Must be an object.
   */
  searchOptions?: {
    /**
     * wait time (ms) between search field `onChange` events before actually
     * performing search. This can help provide a better user experience when
     * searching larger data sets. Defaults to `0`.
     */
    debounceTime?: number
  }
  /**
   * Can be used to create custom input fields for JSON property names and
   * primitive values, see [#3][0] for more information.
   *
   * [0]: https://github.com/Lapple/react-json-inspector/issues/3
   */
  interactiveLabel?: React.ComponentType<{
    /**
     * either stringified property value or key value that is being interacted
     * with
     */
    value: string
    /**
     * either the original property value or key value,
     */
    originalValue: unknown
    /**
     * flag to differentiate between interacting with keys or properties,
     */
    isKey: boolean
    /**
     * keypath of the node being interacted with, will be the same for keys
     * and properties
     */
    keypath: string
  }>
  /**
   * Callback to be run whenever any key-value pair is clicked. Receives an
   * object with `key`, `value` and `path` properties.
   */
  onClick?: (options: {key: string; value: unknown; path: string}) => void
  /**
   * Function to check whether the entered search term is sufficient to query
   * data. Defaults to `(query) => query.length >= 2`.
   */
  validateQuery?: (query: string) => boolean
  /**
   * Optional predicate that can determine whether the leaf node should be
   * expanded on initial render. Receives two arguments: `keypath` and `value`.
   * Defaults to `(keypath, value) => false`.
   */
  isExpanded?: (keyPath: string, value: unknown) => boolean
  filterOptions?: {
    /**
     * Set to `false` to disable the filterer cache. This can sometimes
     * provide performance enhancements with larger data sets. Defaults to
     * `true`.
     */
    cacheResults?: boolean
    /**
     * Set to `true` to enable case insensitivity in search. Defaults to
     * `false`.
     */
    ignoreCase?: boolean
  }
  /**
   * Set to `true` for full showOriginal expansion of children containing
   * search term. Defaults to `false`.
   */
  verboseShowOriginal?: boolean
}

/**
 * @public
 */
export interface JsonInspectorState {
  query: string
  filterer(
    data: unknown,
    options?: JsonInspectorProps['filterOptions'],
  ): unknown
}

const defaultValidateQuery = (query: string) => query.length >= 2
const defaultFilterOptions = {cacheResults: true, ignoreCase: false}

/**
 * @public
 */
export class JsonInspector extends Component<
  JsonInspectorProps,
  JsonInspectorState
> {
  static defaultProps = {
    data: null,
    search: SearchBar,
    searchOptions: {
      debounceTime: 0,
    },
    className: '',
    id: 'json-' + Date.now(),
    onClick: noop,
    filterOptions: {
      cacheResults: true,
      ignoreCase: false,
    },
    validateQuery: function (query: string) {
      return query.length >= 2
    },
    /**
     * Decide whether the leaf node at given `keypath` should be expanded initially.
     *
     * @param keypath - Path to the node
     * @param value - Value of the node
     * @returns True if node should be expanded, false otherwise
     */
    isExpanded: function (keypath: string, value: unknown) {
      return false
    },
    verboseShowOriginal: false,
  }

  constructor(props: JsonInspectorProps) {
    super(props)
    this.state = {
      query: '',
      filterer: getFilterer(props.data, props.filterOptions),
    }
  }

  render() {
    const {
      data: rawData,
      className,
      onClick,
      id,
      isExpanded,
      interactiveLabel,
      verboseShowOriginal,
      filterOptions = defaultFilterOptions,
      validateQuery = defaultValidateQuery,
    } = this.props

    const isQueryValid =
      this.state.query !== '' && validateQuery(this.state.query)

    const data = isQueryValid ? this.state.filterer(this.state.query) : rawData

    const isNotFound = isQueryValid && isEmpty(data)

    return (
      <div
        data-testid="json-inspector"
        className={'json-inspector ' + className}
      >
        {this.renderToolbar()}
        {isNotFound ? (
          <div className="json-inspector__not-found">Nothing found</div>
        ) : (
          <Leaf
            data={data}
            onClick={onClick}
            id={id}
            getOriginal={this.getOriginal}
            query={
              isQueryValid
                ? new RegExp(
                    this.state.query,
                    filterOptions.ignoreCase ? 'i' : '',
                  )
                : null
            }
            label="root"
            root={true}
            isExpanded={isExpanded}
            interactiveLabel={interactiveLabel}
            verboseShowOriginal={verboseShowOriginal}
          />
        )}
      </div>
    )
  }

  renderToolbar() {
    const Search = this.props.search
    if (!Search) {
      return null
    }

    return (
      <div className="json-inspector__toolbar">
        <Search
          onChange={debounce(
            this.search,
            this.props.searchOptions?.debounceTime,
          )}
          data={this.props.data}
          query={this.state.query}
        />
      </div>
    )
  }

  search = (query: string) => {
    this.setState({query})
  }

  static getDerivedStateFromProps(
    nextProps: JsonInspectorProps,
    prevState: JsonInspectorState,
  ) {
    const filterer = getFilterer(nextProps.data, nextProps.filterOptions)
    return filterer === prevState.filterer ? null : {...prevState, filterer}
  }

  shouldComponentUpdate(
    nextProps: JsonInspectorProps,
    prevState: JsonInspectorState,
  ) {
    return (
      prevState.query !== this.state.query ||
      nextProps.data !== this.props.data ||
      nextProps.onClick !== this.props.onClick
    )
  }

  createFilterer = (
    data: unknown,
    options: JsonInspectorProps['filterOptions'],
  ) => {
    this.setState({
      filterer: getFilterer(data, options),
    })
  }

  getOriginal = (path: string) => {
    return lens(this.props.data, path)
  }
}
