import { jsx, jsxs } from "react/jsx-runtime";
import { Component, useCallback } from "react";
import debounce from "debounce";
import md5OMatic from "md5-o-matic";
let id = Math.ceil(Math.random() * 10);
const uid = () => ++id;
function type(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
function isPrimitive(value) {
  const t = type(value);
  return t !== "Object" && t !== "Array";
}
class Highlighter extends Component {
  shouldComponentUpdate(p) {
    return p.highlight !== this.props.highlight;
  }
  render() {
    const str = this.props.string || "", highlight = this.props.highlight || "", highlightStart = str.search(highlight);
    if (!highlight || highlightStart === -1)
      return /* @__PURE__ */ jsx("span", { children: str });
    const highlightLength = highlight.source.length, highlightString = str.slice(
      highlightStart,
      highlightStart + highlightLength
    );
    return /* @__PURE__ */ jsx("span", { children: str.split(highlight).map(function(part, index) {
      return /* @__PURE__ */ jsxs("span", { children: [
        index > 0 ? /* @__PURE__ */ jsx("span", { className: "json-inspector__hl", children: highlightString }) : null,
        part
      ] }, index);
    }) });
  }
}
function isObject(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value);
}
const PATH_PREFIX = ".root.";
class Leaf extends Component {
  constructor(props) {
    super(props), this.state = {
      expanded: this._isInitiallyExpanded(this.props)
    };
  }
  render() {
    const { label, data, root, id: inputId } = this.props, id2 = "id_" + uid(), d = {
      path: this.keypath(),
      key: label.toString(),
      value: data
    }, onLabelClick = this._onClick.bind(this, d);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        "data-testid": root ? "leaf-root" : "leaf-child",
        "aria-expanded": this.state.expanded,
        "data-root": root || void 0,
        className: this.getClassName(),
        id: "leaf-" + this._rootPath(),
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "json-inspector__radio",
              type: "radio",
              name: id2,
              id: inputId,
              tabIndex: -1
            }
          ),
          /* @__PURE__ */ jsxs(
            "label",
            {
              className: "json-inspector__line",
              htmlFor: id2,
              onClick: onLabelClick,
              children: [
                /* @__PURE__ */ jsx("div", { className: "json-inspector__flatpath", children: d.path }),
                /* @__PURE__ */ jsxs("span", { className: "json-inspector__key", children: [
                  this.format(d.key),
                  ":",
                  this.renderInteractiveLabel(d.key, !0)
                ] }),
                this.renderTitle(),
                this.renderShowOriginalButton()
              ]
            }
          ),
          this.renderChildren()
        ]
      }
    );
  }
  renderTitle() {
    const data = this.data(), t = type(data);
    if (Array.isArray(data)) {
      const length = data.length;
      return /* @__PURE__ */ jsxs("span", { className: "json-inspector__value json-inspector__value_helper", children: [
        length > 0 ? "[\u2026] " : "[] ",
        items(length)
      ] });
    }
    if (typeof data == "object" && data !== null) {
      const keys = Object.keys(data).length;
      return /* @__PURE__ */ jsxs("span", { className: "json-inspector__value json-inspector__value_helper", children: [
        keys > 0 ? "{\u2026} " : "{} ",
        properties(keys)
      ] });
    }
    return /* @__PURE__ */ jsxs(
      "span",
      {
        className: "json-inspector__value json-inspector__value_" + t.toLowerCase(),
        children: [
          this.format(String(data)),
          this.renderInteractiveLabel(data, !1)
        ]
      }
    );
  }
  renderChildren() {
    const {
      verboseShowOriginal,
      query,
      id: id2,
      isExpanded,
      interactiveLabel,
      onClick,
      getOriginal
    } = this.props, childPrefix = this._rootPath(), data = this.data();
    return this.state.expanded && (isObject(data) || Array.isArray(data)) ? Object.keys(data).map((key) => {
      const value = data[key], shouldGetOriginal = !this.state.original || (verboseShowOriginal ? query : !1);
      return /* @__PURE__ */ jsx(
        Leaf,
        {
          data: value,
          label: key,
          prefix: childPrefix,
          onClick,
          id: id2,
          query,
          getOriginal: shouldGetOriginal ? getOriginal : void 0,
          isExpanded,
          interactiveLabel,
          verboseShowOriginal
        },
        getLeafKey(key, value)
      );
    }) : null;
  }
  renderShowOriginalButton() {
    const { data, getOriginal, query } = this.props;
    return isPrimitive(data) || this.state.original || !getOriginal || !query || query.test(this.keypath()) ? null : /* @__PURE__ */ jsx(
      "span",
      {
        className: "json-inspector__show-original",
        onClick: this._onShowOriginalClick
      }
    );
  }
  renderInteractiveLabel(originalValue, isKey) {
    const InteractiveLabel = this.props.interactiveLabel;
    return typeof InteractiveLabel == "function" ? /* @__PURE__ */ jsx(
      InteractiveLabel,
      {
        value: String(originalValue),
        originalValue,
        isKey,
        keypath: this.keypath()
      }
    ) : null;
  }
  static getDerivedStateFromProps(props, state) {
    return props.query ? {
      expanded: !props.query.test(props.label)
    } : null;
  }
  componentDidUpdate(prevProps) {
    prevProps.query && !this.props.query && this.setState({
      expanded: this._isInitiallyExpanded(this.props)
    });
  }
  _rootPath() {
    return (this.props.prefix || "") + "." + this.props.label;
  }
  keypath() {
    return this._rootPath().slice(PATH_PREFIX.length);
  }
  data() {
    return this.state.original || this.props.data;
  }
  format(str) {
    return /* @__PURE__ */ jsx(Highlighter, { string: str, highlight: this.props.query });
  }
  getClassName() {
    let cn = "json-inspector__leaf";
    return this.props.root && (cn += " json-inspector__leaf_root"), this.state.expanded && (cn += " json-inspector__leaf_expanded"), isPrimitive(this.props.data) || (cn += " json-inspector__leaf_composite"), cn;
  }
  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }
  _onClick(data, e) {
    this.toggle(), this.props.onClick && this.props.onClick(data), e.stopPropagation();
  }
  _onShowOriginalClick = (e) => {
    this.setState({
      original: this.props.getOriginal?.(this.keypath())
    }), e.stopPropagation();
  };
  _isInitiallyExpanded(p) {
    if (p.root)
      return !0;
    const keypath = this.keypath();
    return p.query ? !p.query.test(keypath) && typeof p.getOriginal == "function" : p.isExpanded ? p.isExpanded(keypath, p.data) : !1;
  }
}
function items(count) {
  return count + (count === 1 ? " item" : " items");
}
function properties(count) {
  return count + (count === 1 ? " property" : " properties");
}
function getLeafKey(key, value) {
  if (isPrimitive(value)) {
    const hash = md5OMatic(String(value));
    return key + ":" + hash;
  } else
    return key + "[" + type(value) + "]";
}
const noop = (...args) => {
}, SearchBar = ({ onChange = noop }) => {
  const onSearchChange = useCallback(
    (evt) => onChange(evt.target.value),
    [onChange]
  );
  return /* @__PURE__ */ jsx(
    "input",
    {
      className: "json-inspector__search",
      type: "search",
      placeholder: "Search",
      onChange: onSearchChange
    }
  );
};
function isEmpty(object) {
  return isObject(object) ? Object.keys(object).length === 0 : Array.isArray(object) ? object.length === 0 : object === null || typeof object != "string" || typeof object != "number" ? !0 : Object.keys(object).length === 0;
}
const getFilterer = memoize(
  (data, opts) => {
    const options = opts || { cacheResults: !0 }, cache = {};
    return function(query) {
      if (!options.cacheResults)
        return find(data, query, options);
      let subquery;
      if (!cache[query]) {
        for (var i = query.length - 1; i > 0; i -= 1)
          if (subquery = query.slice(0, i), cache[subquery]) {
            cache[query] = find(cache[subquery], query, options);
            break;
          }
      }
      return cache[query] || (cache[query] = find(data, query, options)), cache[query];
    };
  }
);
function find(data, query, options) {
  return !isObject(data) && !Array.isArray(data) ? {} : Object.keys(data).reduce(function(acc, key) {
    const value = data[key];
    let matches;
    return value ? typeof value != "object" ? ((contains(query, key, options) || contains(query, value, options)) && (acc[key] = value), acc) : contains(query, key, options) ? (acc[key] = value, acc) : (matches = find(value, query, options), isEmpty(matches) || Object.assign(acc, pair(key, matches)), acc) : acc;
  }, {});
}
function contains(query, value, options) {
  if (!value)
    return !1;
  var haystack = String(value), needle = query;
  return options?.ignoreCase && (haystack = haystack.toLowerCase(), needle = needle.toLowerCase()), haystack.indexOf(needle) !== -1;
}
function pair(key, value) {
  return { [key]: value };
}
function memoize(fn) {
  let lastData, lastOptions, lastResult;
  return (data, options) => ((!lastResult || data !== lastData || options !== lastOptions) && (lastData = data, lastOptions = options, lastResult = fn(data, options)), lastResult);
}
const PATH_DELIMITER = ".";
function integer(str) {
  return parseInt(str, 10);
}
function lens(data, path) {
  var p = path.split(PATH_DELIMITER), segment = p.shift();
  if (!segment)
    return data;
  if (Array.isArray(data) && data[integer(segment)])
    return lens(data[integer(segment)], p.join(PATH_DELIMITER));
  if (isObject(data) && segment in data)
    return lens(data[segment], p.join(PATH_DELIMITER));
}
const defaultValidateQuery = (query) => query.length >= 2, defaultFilterOptions = { cacheResults: !0, ignoreCase: !1 };
class JsonInspector extends Component {
  static defaultProps = {
    data: null,
    search: SearchBar,
    searchOptions: {
      debounceTime: 0
    },
    className: "",
    id: "json-" + Date.now(),
    onClick: noop,
    filterOptions: {
      cacheResults: !0,
      ignoreCase: !1
    },
    validateQuery: function(query) {
      return query.length >= 2;
    },
    /**
     * Decide whether the leaf node at given `keypath` should be
     * expanded initially.
     * @param  {String} keypath
     * @param  {Any} value
     * @return {Boolean}
     */
    isExpanded: function(keypath, value) {
      return !1;
    },
    verboseShowOriginal: !1
  };
  constructor(props) {
    super(props), this.state = {
      query: "",
      filterer: getFilterer(props.data, props.filterOptions)
    };
  }
  render() {
    const {
      data: rawData,
      className,
      onClick,
      id: id2,
      isExpanded,
      interactiveLabel,
      verboseShowOriginal,
      filterOptions = defaultFilterOptions,
      validateQuery = defaultValidateQuery
    } = this.props, isQueryValid = this.state.query !== "" && validateQuery(this.state.query), data = isQueryValid ? this.state.filterer(this.state.query) : rawData, isNotFound = isQueryValid && isEmpty(data);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        "data-testid": "json-inspector",
        className: "json-inspector " + className,
        children: [
          this.renderToolbar(),
          isNotFound ? /* @__PURE__ */ jsx("div", { className: "json-inspector__not-found", children: "Nothing found" }) : /* @__PURE__ */ jsx(
            Leaf,
            {
              data,
              onClick,
              id: id2,
              getOriginal: this.getOriginal,
              query: isQueryValid ? new RegExp(
                this.state.query,
                filterOptions.ignoreCase ? "i" : ""
              ) : null,
              label: "root",
              root: !0,
              isExpanded,
              interactiveLabel,
              verboseShowOriginal
            }
          )
        ]
      }
    );
  }
  renderToolbar() {
    const Search = this.props.search;
    return Search ? /* @__PURE__ */ jsx("div", { className: "json-inspector__toolbar", children: /* @__PURE__ */ jsx(
      Search,
      {
        onChange: debounce(
          this.search,
          this.props.searchOptions?.debounceTime
        ),
        data: this.props.data,
        query: this.state.query
      }
    ) }) : null;
  }
  search = (query) => {
    this.setState({ query });
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const filterer = getFilterer(nextProps.data, nextProps.filterOptions);
    return filterer === prevState.filterer ? null : { ...prevState, filterer };
  }
  shouldComponentUpdate(nextProps, prevState) {
    return prevState.query !== this.state.query || nextProps.data !== this.props.data || nextProps.onClick !== this.props.onClick;
  }
  createFilterer = (data, options) => {
    this.setState({
      filterer: getFilterer(data, options)
    });
  };
  getOriginal = (path) => lens(this.props.data, path);
}
export {
  JsonInspector
};
//# sourceMappingURL=JsonInspector.esm.js.map
