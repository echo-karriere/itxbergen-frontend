import isEqual from "lodash/isEqual.js";
import debugIt from "debug";
import flatten from "lodash/flatten.js";
import { parsePatch as parsePatch$1, applyPatches, stringifyPatches, makePatches } from "@sanity/diff-match-patch";
import max from "lodash/max.js";
import min from "lodash/min.js";
import { uuid } from "@sanity/uuid";
import compact from "lodash/compact.js";
const debug = debugIt("mutator-document");
class ImmutableAccessor {
  _value;
  path;
  constructor(value, path) {
    this._value = value, this.path = path || [];
  }
  containerType() {
    return Array.isArray(this._value) ? "array" : this._value !== null && typeof this._value == "object" ? "object" : "primitive";
  }
  // Common reader, supported by all containers
  get() {
    return this._value;
  }
  // Array reader
  length() {
    if (!Array.isArray(this._value))
      throw new Error("Won't return length of non-indexable _value");
    return this._value.length;
  }
  getIndex(i) {
    return Array.isArray(this._value) ? i >= this.length() ? null : new ImmutableAccessor(this._value[i], this.path.concat(i)) : !1;
  }
  // Object reader
  hasAttribute(key) {
    return isRecord$1(this._value) ? this._value.hasOwnProperty(key) : !1;
  }
  attributeKeys() {
    return isRecord$1(this._value) ? Object.keys(this._value) : [];
  }
  getAttribute(key) {
    if (!isRecord$1(this._value))
      throw new Error("getAttribute only applies to plain objects");
    return this.hasAttribute(key) ? new ImmutableAccessor(this._value[key], this.path.concat(key)) : null;
  }
  // Common writer, supported by all containers
  set(value) {
    return value === this._value ? this : new ImmutableAccessor(value, this.path);
  }
  // array writer interface
  setIndex(i, value) {
    if (!Array.isArray(this._value))
      throw new Error("setIndex only applies to arrays");
    if (Object.is(value, this._value[i]))
      return this;
    const nextValue = this._value.slice();
    return nextValue[i] = value, new ImmutableAccessor(nextValue, this.path);
  }
  setIndexAccessor(i, accessor) {
    return this.setIndex(i, accessor.get());
  }
  unsetIndices(indices) {
    if (!Array.isArray(this._value))
      throw new Error("unsetIndices only applies to arrays");
    const length = this._value.length, nextValue = [];
    for (let i = 0; i < length; i++)
      indices.indexOf(i) === -1 && nextValue.push(this._value[i]);
    return new ImmutableAccessor(nextValue, this.path);
  }
  insertItemsAt(pos, items) {
    if (!Array.isArray(this._value))
      throw new Error("insertItemsAt only applies to arrays");
    let nextValue;
    return this._value.length === 0 && pos === 0 ? nextValue = items : nextValue = this._value.slice(0, pos).concat(items).concat(this._value.slice(pos)), new ImmutableAccessor(nextValue, this.path);
  }
  // Object writer interface
  setAttribute(key, value) {
    if (!isRecord$1(this._value))
      throw new Error("Unable to set attribute of non-object container");
    if (Object.is(value, this._value[key]))
      return this;
    const nextValue = Object.assign({}, this._value, { [key]: value });
    return new ImmutableAccessor(nextValue, this.path);
  }
  setAttributeAccessor(key, accessor) {
    return this.setAttribute(key, accessor.get());
  }
  unsetAttribute(key) {
    if (!isRecord$1(this._value))
      throw new Error("Unable to unset attribute of non-object container");
    const nextValue = Object.assign({}, this._value);
    return delete nextValue[key], new ImmutableAccessor(nextValue, this.path);
  }
}
function isRecord$1(value) {
  return value !== null && typeof value == "object";
}
function isRecord(value) {
  return value !== null && typeof value == "object";
}
const IS_DOTTABLE = /^[a-z_$]+/;
function arrayToJSONMatchPath(pathArray) {
  let path = "";
  return pathArray.forEach((segment, index) => {
    path += stringifySegment(segment, index === 0);
  }), path;
}
function stringifySegment(segment, hasLeading) {
  if (typeof segment == "number")
    return `[${segment}]`;
  if (isRecord(segment)) {
    const seg = segment;
    return Object.keys(segment).map((key) => isPrimitiveValue(seg[key]) ? `[${key}=="${seg[key]}"]` : "").join("");
  }
  return typeof segment == "string" && IS_DOTTABLE.test(segment) ? hasLeading ? segment : `.${segment}` : `['${segment}']`;
}
function isPrimitiveValue(val) {
  switch (typeof val) {
    case "number":
    case "string":
    case "boolean":
      return !0;
    default:
      return !1;
  }
}
function descend$1(tail) {
  const [head, newTail] = splitIfPath(tail);
  if (!head)
    throw new Error("Head cannot be null");
  return spreadIfUnionHead(head, newTail);
}
function splitIfPath(tail) {
  if (tail.type !== "path")
    return [tail, null];
  const nodes = tail.nodes;
  return nodes.length === 0 ? [null, null] : nodes.length === 1 ? [nodes[0], null] : [nodes[0], { type: "path", nodes: nodes.slice(1) }];
}
function concatPaths(path1, path2) {
  if (!path1 && !path2)
    return null;
  const nodes1 = path1 ? path1.nodes : [], nodes2 = path2 ? path2.nodes : [];
  return {
    type: "path",
    nodes: nodes1.concat(nodes2)
  };
}
function spreadIfUnionHead(head, tail) {
  return head.type !== "union" ? [[head, tail]] : head.nodes.map((node) => {
    if (node.type === "path") {
      const [subHead, subTail] = splitIfPath(node);
      return [subHead, concatPaths(subTail, tail)];
    }
    return [node, tail];
  });
}
const digitChar = /[0-9]/, attributeCharMatcher = /^[a-zA-Z0-9_]$/, attributeFirstCharMatcher = /^[a-zA-Z_]$/, symbols = {
  // NOTE: These are compared against in order of definition,
  // thus '==' must come before '=', '>=' before '>', etc.
  operator: ["..", ".", ",", ":", "?"],
  comparator: [">=", "<=", "<", ">", "==", "!="],
  keyword: ["$", "@"],
  boolean: ["true", "false"],
  paren: ["[", "]"]
}, symbolClasses = Object.keys(symbols);
class Tokenizer {
  source;
  i;
  length;
  tokenizers;
  constructor(path) {
    this.source = path, this.length = path.length, this.i = 0, this.tokenizers = [
      this.tokenizeSymbol,
      this.tokenizeIdentifier,
      this.tokenizeNumber,
      this.tokenizeQuoted
    ].map((fn) => fn.bind(this));
  }
  tokenize() {
    const result = [];
    for (; !this.EOF(); ) {
      this.chompWhitespace();
      let token = null;
      if (!this.tokenizers.some((tokenizer) => (token = tokenizer(), !!token)) || !token)
        throw new Error(`Invalid tokens in jsonpath '${this.source}' @ ${this.i}`);
      result.push(token);
    }
    return result;
  }
  takeWhile(fn) {
    const start = this.i;
    let result = "";
    for (; !this.EOF(); ) {
      const nextChar = fn(this.source[this.i]);
      if (nextChar === null)
        break;
      result += nextChar, this.i++;
    }
    return this.i === start ? null : result;
  }
  EOF() {
    return this.i >= this.length;
  }
  peek() {
    return this.EOF() ? null : this.source[this.i];
  }
  consume(str) {
    if (this.i + str.length > this.length)
      throw new Error(`Expected ${str} at end of jsonpath`);
    if (str === this.source.slice(this.i, this.i + str.length))
      this.i += str.length;
    else
      throw new Error(`Expected "${str}", but source contained "${this.source.slice()}`);
  }
  // Tries to match the upcoming bit of string with the provided string. If it matches, returns
  // the string, then advances the read pointer to the next bit. If not, returns null and nothing
  // happens.
  tryConsume(str) {
    if (this.i + str.length > this.length)
      return null;
    if (str === this.source.slice(this.i, this.i + str.length)) {
      if (str[0].match(attributeCharMatcher) && this.length > this.i + str.length) {
        const nextChar = this.source[this.i + str.length];
        if (nextChar && nextChar.match(attributeCharMatcher))
          return null;
      }
      return this.i += str.length, str;
    }
    return null;
  }
  chompWhitespace() {
    this.takeWhile((char) => char === " " ? "" : null);
  }
  tokenizeQuoted() {
    const quote = this.peek();
    if (quote === "'" || quote === '"') {
      this.consume(quote);
      let escape = !1;
      const inner = this.takeWhile((char) => escape ? (escape = !1, char) : char === "\\" ? (escape = !0, "") : char != quote ? char : null);
      return this.consume(quote), {
        type: "quoted",
        value: inner,
        quote: quote === '"' ? "double" : "single"
      };
    }
    return null;
  }
  tokenizeIdentifier() {
    let first = !0;
    const identifier = this.takeWhile((char) => first ? (first = !1, char.match(attributeFirstCharMatcher) ? char : null) : char.match(attributeCharMatcher) ? char : null);
    return identifier !== null ? {
      type: "identifier",
      name: identifier
    } : null;
  }
  tokenizeNumber() {
    const start = this.i;
    let dotSeen = !1, digitSeen = !1, negative = !1;
    this.peek() === "-" && (negative = !0, this.consume("-"));
    const number = this.takeWhile((char) => char === "." && !dotSeen && digitSeen ? (dotSeen = !0, char) : (digitSeen = !0, char.match(digitChar) ? char : null));
    return number !== null ? {
      type: "number",
      value: negative ? -number : +number,
      raw: negative ? `-${number}` : number
    } : (this.i = start, null);
  }
  tokenizeSymbol() {
    for (const symbolClass of symbolClasses) {
      const symbol = symbols[symbolClass].find((pattern) => this.tryConsume(pattern));
      if (symbol)
        return {
          type: symbolClass,
          symbol
        };
    }
    return null;
  }
}
function tokenize(jsonpath) {
  return new Tokenizer(jsonpath).tokenize();
}
class Parser {
  tokens;
  length;
  i;
  constructor(path) {
    this.tokens = tokenize(path), this.length = this.tokens.length, this.i = 0;
  }
  parse() {
    return this.parsePath();
  }
  EOF() {
    return this.i >= this.length;
  }
  // Look at upcoming token
  peek() {
    return this.EOF() ? null : this.tokens[this.i];
  }
  consume() {
    const result = this.peek();
    return this.i += 1, result;
  }
  // Return next token if it matches the pattern
  probe(pattern) {
    const token = this.peek();
    if (!token)
      return null;
    const record = token;
    return Object.keys(pattern).every((key) => key in token && pattern[key] === record[key]) ? token : null;
  }
  // Return and consume next token if it matches the pattern
  match(pattern) {
    return this.probe(pattern) ? this.consume() : null;
  }
  parseAttribute() {
    const token = this.match({ type: "identifier" });
    if (token && token.type === "identifier")
      return {
        type: "attribute",
        name: token.name
      };
    const quoted = this.match({ type: "quoted", quote: "single" });
    return quoted && quoted.type === "quoted" ? {
      type: "attribute",
      name: quoted.value || ""
    } : null;
  }
  parseAlias() {
    return this.match({ type: "keyword", symbol: "@" }) || this.match({ type: "keyword", symbol: "$" }) ? {
      type: "alias",
      target: "self"
    } : null;
  }
  parseNumber() {
    const token = this.match({ type: "number" });
    return token && token.type === "number" ? {
      type: "number",
      value: token.value
    } : null;
  }
  parseNumberValue() {
    const expr = this.parseNumber();
    return expr ? expr.value : null;
  }
  parseSliceSelector() {
    const start = this.i, rangeStart = this.parseNumberValue();
    if (!this.match({ type: "operator", symbol: ":" }))
      return rangeStart === null ? (this.i = start, null) : { type: "index", value: rangeStart };
    const result = {
      type: "range",
      start: rangeStart,
      end: this.parseNumberValue()
    };
    return this.match({ type: "operator", symbol: ":" }) && (result.step = this.parseNumberValue()), result.start === null && result.end === null ? (this.i = start, null) : result;
  }
  parseValueReference() {
    return this.parseAttribute() || this.parseSliceSelector();
  }
  parseLiteralValue() {
    const literalString = this.match({ type: "quoted", quote: "double" });
    if (literalString && literalString.type === "quoted")
      return {
        type: "string",
        value: literalString.value || ""
      };
    const literalBoolean = this.match({ type: "boolean" });
    return literalBoolean && literalBoolean.type === "boolean" ? {
      type: "boolean",
      value: literalBoolean.symbol === "true"
    } : this.parseNumber();
  }
  // TODO: Reorder constraints so that literal value is always on rhs, and variable is always
  // on lhs.
  parseFilterExpression() {
    const start = this.i, expr = this.parseAttribute() || this.parseAlias();
    if (!expr)
      return null;
    if (this.match({ type: "operator", symbol: "?" }))
      return {
        type: "constraint",
        operator: "?",
        lhs: expr
      };
    const binOp = this.match({ type: "comparator" });
    if (!binOp || binOp.type !== "comparator")
      return this.i = start, null;
    const lhs = expr, rhs = this.parseLiteralValue();
    if (!rhs)
      throw new Error(`Operator ${binOp.symbol} needs a literal value at the right hand side`);
    return {
      type: "constraint",
      operator: binOp.symbol,
      lhs,
      rhs
    };
  }
  parseExpression() {
    return this.parseFilterExpression() || this.parseValueReference();
  }
  parseUnion() {
    if (!this.match({ type: "paren", symbol: "[" }))
      return null;
    const terms = [];
    let expr = this.parseFilterExpression() || this.parsePath() || this.parseValueReference();
    for (; expr && (terms.push(expr), !this.match({ type: "paren", symbol: "]" })); ) {
      if (!this.match({ type: "operator", symbol: "," }))
        throw new Error("Expected ]");
      if (expr = this.parseFilterExpression() || this.parsePath() || this.parseValueReference(), !expr)
        throw new Error("Expected expression following ','");
    }
    return {
      type: "union",
      nodes: terms
    };
  }
  parseRecursive() {
    if (!this.match({ type: "operator", symbol: ".." }))
      return null;
    const subpath = this.parsePath();
    if (!subpath)
      throw new Error("Expected path following '..' operator");
    return {
      type: "recursive",
      term: subpath
    };
  }
  parsePath() {
    const nodes = [], expr = this.parseAttribute() || this.parseUnion() || this.parseRecursive();
    if (!expr)
      return null;
    for (nodes.push(expr); !this.EOF(); )
      if (this.match({ type: "operator", symbol: "." })) {
        const attr = this.parseAttribute();
        if (!attr)
          throw new Error("Expected attribute name following '.");
        nodes.push(attr);
        continue;
      } else if (this.probe({ type: "paren", symbol: "[" })) {
        const union = this.parseUnion();
        if (!union)
          throw new Error("Expected union following '['");
        nodes.push(union);
      } else {
        const recursive = this.parseRecursive();
        recursive && nodes.push(recursive);
        break;
      }
    return nodes.length === 1 ? nodes[0] : {
      type: "path",
      nodes
    };
  }
}
function parseJsonPath(path) {
  const parsed = new Parser(path).parse();
  if (!parsed)
    throw new Error(`Failed to parse JSON path "${path}"`);
  return parsed;
}
function toPath(expr) {
  return toPathInner(expr, !1);
}
function toPathInner(expr, inUnion) {
  switch (expr.type) {
    case "attribute":
      return expr.name;
    case "alias":
      return expr.target === "self" ? "@" : "$";
    case "number":
      return `${expr.value}`;
    case "range": {
      const result = [];
      return inUnion || result.push("["), expr.start && result.push(`${expr.start}`), result.push(":"), expr.end && result.push(`${expr.end}`), expr.step && result.push(`:${expr.step}`), inUnion || result.push("]"), result.join("");
    }
    case "index":
      return inUnion ? `${expr.value}` : `[${expr.value}]`;
    case "constraint": {
      const rhs = expr.rhs ? ` ${toPathInner(expr.rhs, !1)}` : "", inner = `${toPathInner(expr.lhs, !1)} ${expr.operator}${rhs}`;
      return inUnion ? inner : `[${inner}]`;
    }
    case "string":
      return JSON.stringify(expr.value);
    case "path": {
      const result = [], nodes = expr.nodes.slice();
      for (; nodes.length > 0; ) {
        const node = nodes.shift();
        node && result.push(toPath(node));
        const upcoming = nodes[0];
        upcoming && toPathInner(upcoming, !1)[0] !== "[" && result.push(".");
      }
      return result.join("");
    }
    case "union":
      return `[${expr.nodes.map((e) => toPathInner(e, !0)).join(",")}]`;
    default:
      throw new Error(`Unknown node type ${expr.type}`);
    case "recursive":
      return `..${toPathInner(expr.term, !1)}`;
  }
}
class Expression {
  expr;
  constructor(expr) {
    if (!expr)
      throw new Error("Attempted to create Expression from null-value");
    if ("expr" in expr ? this.expr = expr.expr : this.expr = expr, !("type" in this.expr))
      throw new Error("Attempt to create Expression for expression with no type");
  }
  isPath() {
    return this.expr.type === "path";
  }
  isUnion() {
    return this.expr.type === "union";
  }
  isCollection() {
    return this.isPath() || this.isUnion();
  }
  isConstraint() {
    return this.expr.type === "constraint";
  }
  isRecursive() {
    return this.expr.type === "recursive";
  }
  isExistenceConstraint() {
    return this.expr.type === "constraint" && this.expr.operator === "?";
  }
  isIndex() {
    return this.expr.type === "index";
  }
  isRange() {
    return this.expr.type === "range";
  }
  expandRange(probe) {
    const probeLength = () => {
      if (!probe)
        throw new Error("expandRange() required a probe that was not passed");
      return probe.length();
    };
    let start = "start" in this.expr && this.expr.start || 0;
    start = interpretNegativeIndex(start, probe);
    let end = "end" in this.expr && this.expr.end || probeLength();
    end = interpretNegativeIndex(end, probe);
    const step = "step" in this.expr && this.expr.step || 1;
    return { start, end, step };
  }
  isAttributeReference() {
    return this.expr.type === "attribute";
  }
  // Is a range or index -> something referencing indexes
  isIndexReference() {
    return this.isIndex() || this.isRange();
  }
  name() {
    return "name" in this.expr ? this.expr.name : "";
  }
  isSelfReference() {
    return this.expr.type === "alias" && this.expr.target === "self";
  }
  constraintTargetIsSelf() {
    return this.expr.type === "constraint" && this.expr.lhs.type === "alias" && this.expr.lhs.target === "self";
  }
  constraintTargetIsAttribute() {
    return this.expr.type === "constraint" && this.expr.lhs.type === "attribute";
  }
  testConstraint(probe) {
    const expr = this.expr;
    if (expr.type === "constraint" && expr.lhs.type === "alias" && expr.lhs.target === "self") {
      if (probe.containerType() !== "primitive")
        return !1;
      if (expr.type === "constraint" && expr.operator === "?")
        return !0;
      const lhs2 = probe.get(), rhs2 = expr.rhs && "value" in expr.rhs ? expr.rhs.value : void 0;
      return testBinaryOperator(lhs2, expr.operator, rhs2);
    }
    if (expr.type !== "constraint")
      return !1;
    const lhs = expr.lhs;
    if (!lhs)
      throw new Error("No LHS of expression");
    if (lhs.type !== "attribute")
      throw new Error(`Constraint target ${lhs.type} not supported`);
    if (probe.containerType() !== "object")
      return !1;
    const lhsValue = probe.getAttribute(lhs.name);
    if (lhsValue == null || lhsValue.containerType() !== "primitive")
      return !1;
    if (this.isExistenceConstraint())
      return !0;
    const rhs = expr.rhs && "value" in expr.rhs ? expr.rhs.value : void 0;
    return testBinaryOperator(lhsValue.get(), expr.operator, rhs);
  }
  pathNodes() {
    return this.expr.type === "path" ? this.expr.nodes : [this.expr];
  }
  prepend(node) {
    return node ? new Expression({
      type: "path",
      nodes: node.pathNodes().concat(this.pathNodes())
    }) : this;
  }
  concat(other) {
    return other ? other.prepend(this) : this;
  }
  descend() {
    return descend$1(this.expr).map((headTail) => {
      const [head, tail] = headTail;
      return {
        head: head ? new Expression(head) : null,
        tail: tail ? new Expression(tail) : null
      };
    });
  }
  unwrapRecursive() {
    if (this.expr.type !== "recursive")
      throw new Error(`Attempt to unwrap recursive on type ${this.expr.type}`);
    return new Expression(this.expr.term);
  }
  toIndicies(probe) {
    if (this.expr.type !== "index" && this.expr.type !== "range")
      throw new Error("Node cannot be converted to indexes");
    if (this.expr.type === "index")
      return [interpretNegativeIndex(this.expr.value, probe)];
    const result = [], range = this.expandRange(probe);
    let { start, end } = range;
    range.step < 0 && ([start, end] = [end, start]);
    for (let i = start; i < end; i++)
      result.push(i);
    return result;
  }
  toFieldReferences() {
    if (this.isIndexReference())
      return this.toIndicies();
    if (this.expr.type === "attribute")
      return [this.expr.name];
    throw new Error(`Can't convert ${this.expr.type} to field references`);
  }
  toString() {
    return toPath(this.expr);
  }
  static fromPath(path) {
    const parsed = parseJsonPath(path);
    if (!parsed)
      throw new Error(`Failed to parse path "${path}"`);
    return new Expression(parsed);
  }
  static attributeReference(name) {
    return new Expression({
      type: "attribute",
      name
    });
  }
  static indexReference(i) {
    return new Expression({
      type: "index",
      value: i
    });
  }
}
function testBinaryOperator(lhsValue, operator, rhsValue) {
  switch (operator) {
    case ">":
      return lhsValue > rhsValue;
    case ">=":
      return lhsValue >= rhsValue;
    case "<":
      return lhsValue < rhsValue;
    case "<=":
      return lhsValue <= rhsValue;
    case "==":
      return lhsValue === rhsValue;
    case "!=":
      return lhsValue !== rhsValue;
    default:
      throw new Error(`Unsupported binary operator ${operator}`);
  }
}
function interpretNegativeIndex(index, probe) {
  if (index >= 0)
    return index;
  if (!probe)
    throw new Error("interpretNegativeIndex() must have a probe when < 0");
  return index + probe.length();
}
class Descender {
  head;
  tail;
  constructor(head, tail) {
    this.head = head, this.tail = tail;
  }
  // Iterate this descender once processing any constraints that are
  // resolvable on the current value. Returns an array of new descenders
  // that are guaranteed to be without constraints in the head
  iterate(probe) {
    let result = [this];
    if (this.head && this.head.isConstraint()) {
      let anyConstraints = !0;
      for (; anyConstraints; )
        result = flatten(
          result.map((descender) => descender.iterateConstraints(probe))
        ), anyConstraints = result.some((descender) => descender.head && descender.head.isConstraint());
    }
    return result;
  }
  isRecursive() {
    return !!(this.head && this.head.isRecursive());
  }
  hasArrived() {
    return this.head === null && this.tail === null;
  }
  extractRecursives() {
    if (this.head && this.head.isRecursive()) {
      const term = this.head.unwrapRecursive();
      return new Descender(null, term.concat(this.tail)).descend();
    }
    return [];
  }
  iterateConstraints(probe) {
    const head = this.head;
    if (head === null || !head.isConstraint())
      return [this];
    const result = [];
    if (probe.containerType() === "primitive" && head.constraintTargetIsSelf())
      return head.testConstraint(probe) && result.push(...this.descend()), result;
    if (probe.containerType() === "array") {
      const length = probe.length();
      for (let i = 0; i < length; i++) {
        const constraint = probe.getIndex(i);
        constraint && head.testConstraint(constraint) && result.push(new Descender(new Expression({ type: "index", value: i }), this.tail));
      }
      return result;
    }
    return probe.containerType() === "object" ? head.constraintTargetIsSelf() ? [] : head.testConstraint(probe) ? this.descend() : result : result;
  }
  descend() {
    return this.tail ? this.tail.descend().map((ht) => new Descender(ht.head, ht.tail)) : [new Descender(null, null)];
  }
  toString() {
    const result = ["<"];
    return this.head && result.push(this.head.toString()), result.push("|"), this.tail && result.push(this.tail.toString()), result.push(">"), result.join("");
  }
}
class Matcher {
  active;
  recursives;
  payload;
  constructor(active, parent) {
    this.active = active || [], parent ? (this.recursives = parent.recursives, this.payload = parent.payload) : this.recursives = [], this.extractRecursives();
  }
  setPayload(payload) {
    return this.payload = payload, this;
  }
  // Moves any recursive descenders onto the recursive track, removing them from
  // the active set
  extractRecursives() {
    this.active = this.active.filter((descender) => descender.isRecursive() ? (this.recursives.push(...descender.extractRecursives()), !1) : !0);
  }
  // Find recursives that are relevant now and should be considered part of the active set
  activeRecursives(probe) {
    return this.recursives.filter((descender) => {
      const head = descender.head;
      return head ? head.isConstraint() || probe.containerType() === "array" && head.isIndexReference() ? !0 : probe.containerType() === "object" ? head.isAttributeReference() && probe.hasAttribute(head.name()) : !1 : !1;
    });
  }
  match(probe) {
    return this.iterate(probe).extractMatches(probe);
  }
  iterate(probe) {
    const newActiveSet = [];
    return this.active.concat(this.activeRecursives(probe)).forEach((descender) => {
      newActiveSet.push(...descender.iterate(probe));
    }), new Matcher(newActiveSet, this);
  }
  // Returns true if any of the descenders in the active or recursive set
  // consider the current state a final destination
  isDestination() {
    return this.active.some((descender) => descender.hasArrived());
  }
  hasRecursives() {
    return this.recursives.length > 0;
  }
  // Returns any payload delivieries and leads that needs to be followed to complete
  // the process.
  extractMatches(probe) {
    const leads = [], targets = [];
    if (this.active.forEach((descender) => {
      if (descender.hasArrived()) {
        targets.push(
          new Expression({
            type: "alias",
            target: "self"
          })
        );
        return;
      }
      const descenderHead = descender.head;
      if (descenderHead && !(probe.containerType() === "array" && !descenderHead.isIndexReference()) && !(probe.containerType() === "object" && !descenderHead.isAttributeReference()))
        if (descender.tail) {
          const matcher = new Matcher(descender.descend(), this);
          descenderHead.toFieldReferences().forEach(() => {
            leads.push({
              target: descenderHead,
              matcher
            });
          });
        } else
          targets.push(descenderHead);
    }), this.hasRecursives()) {
      const recursivesMatcher = new Matcher([], this);
      if (probe.containerType() === "array") {
        const length = probe.length();
        for (let i = 0; i < length; i++)
          leads.push({
            target: Expression.indexReference(i),
            matcher: recursivesMatcher
          });
      } else probe.containerType() === "object" && probe.attributeKeys().forEach((name) => {
        leads.push({
          target: Expression.attributeReference(name),
          matcher: recursivesMatcher
        });
      });
    }
    return targets.length > 0 ? { leads, delivery: { targets, payload: this.payload } } : { leads };
  }
  static fromPath(jsonpath) {
    const path = parseJsonPath(jsonpath);
    if (!path)
      throw new Error(`Failed to parse path from "${jsonpath}"`);
    const descender = new Descender(null, new Expression(path));
    return new Matcher(descender.descend());
  }
}
class PlainProbe {
  _value;
  path;
  constructor(value, path) {
    this._value = value, this.path = path || [];
  }
  containerType() {
    return Array.isArray(this._value) ? "array" : this._value !== null && typeof this._value == "object" ? "object" : "primitive";
  }
  length() {
    if (!Array.isArray(this._value))
      throw new Error("Won't return length of non-indexable _value");
    return this._value.length;
  }
  getIndex(i) {
    return Array.isArray(this._value) ? i >= this.length() ? null : new PlainProbe(this._value[i], this.path.concat(i)) : !1;
  }
  hasAttribute(key) {
    return isRecord(this._value) ? this._value.hasOwnProperty(key) : !1;
  }
  attributeKeys() {
    return isRecord(this._value) ? Object.keys(this._value) : [];
  }
  getAttribute(key) {
    if (!isRecord(this._value))
      throw new Error("getAttribute only applies to plain objects");
    return this.hasAttribute(key) ? new PlainProbe(this._value[key], this.path.concat(key)) : null;
  }
  get() {
    return this._value;
  }
}
function extractAccessors(path, value) {
  const result = [], matcher = Matcher.fromPath(path).setPayload(function(values) {
    result.push(...values);
  }), accessor = new PlainProbe(value);
  return descend(matcher, accessor), result;
}
function descend(matcher, accessor) {
  const { leads, delivery } = matcher.match(accessor);
  leads.forEach((lead) => {
    accessorsFromTarget(lead.target, accessor).forEach((childAccessor) => {
      descend(lead.matcher, childAccessor);
    });
  }), delivery && delivery.targets.forEach((target) => {
    typeof delivery.payload == "function" && delivery.payload(accessorsFromTarget(target, accessor));
  });
}
function accessorsFromTarget(target, accessor) {
  const result = [];
  if (target.isIndexReference())
    target.toIndicies(accessor).forEach((i) => {
      result.push(accessor.getIndex(i));
    });
  else if (target.isAttributeReference())
    result.push(accessor.getAttribute(target.name()));
  else if (target.isSelfReference())
    result.push(accessor);
  else
    throw new Error(`Unable to derive accessor for target ${target.toString()}`);
  return compact(result);
}
function extract(path, value) {
  return extractAccessors(path, value).map((acc) => acc.get());
}
function extractWithPath(path, value) {
  return extractAccessors(path, value).map((acc) => ({ path: acc.path, value: acc.get() }));
}
function applyPatch(patch, oldValue) {
  if (typeof oldValue != "string") return oldValue;
  const [result] = applyPatches(patch, oldValue, { allowExceedingIndices: !0 });
  return result;
}
class DiffMatchPatch {
  path;
  dmpPatch;
  id;
  constructor(id, path, dmpPatchSrc) {
    this.id = id, this.path = path, this.dmpPatch = parsePatch$1(dmpPatchSrc);
  }
  apply(targets, accessor) {
    let result = accessor;
    if (result.containerType() === "primitive")
      return result;
    for (const target of targets) {
      if (target.isIndexReference()) {
        for (const index of target.toIndicies(accessor)) {
          const item = result.getIndex(index);
          if (!item)
            continue;
          const oldValue = item.get(), nextValue = applyPatch(this.dmpPatch, oldValue);
          result = result.setIndex(index, nextValue);
        }
        continue;
      }
      if (target.isAttributeReference() && result.hasAttribute(target.name())) {
        const attribute = result.getAttribute(target.name());
        if (!attribute)
          continue;
        const oldValue = attribute.get(), nextValue = applyPatch(this.dmpPatch, oldValue);
        result = result.setAttribute(target.name(), nextValue);
        continue;
      }
      throw new Error(`Unable to apply diffMatchPatch to target ${target.toString()}`);
    }
    return result;
  }
}
function performIncrement(previousValue, delta) {
  return typeof previousValue != "number" || !Number.isFinite(previousValue) ? previousValue : previousValue + delta;
}
class IncPatch {
  path;
  value;
  id;
  constructor(id, path, value) {
    this.path = path, this.value = value, this.id = id;
  }
  apply(targets, accessor) {
    let result = accessor;
    if (result.containerType() === "primitive")
      return result;
    for (const target of targets) {
      if (target.isIndexReference()) {
        for (const index of target.toIndicies(accessor)) {
          const item = result.getIndex(index);
          if (!item)
            continue;
          const previousValue = item.get();
          result = result.setIndex(index, performIncrement(previousValue, this.value));
        }
        continue;
      }
      if (target.isAttributeReference()) {
        const attribute = result.getAttribute(target.name());
        if (!attribute)
          continue;
        const previousValue = attribute.get();
        result = result.setAttribute(target.name(), performIncrement(previousValue, this.value));
        continue;
      }
      throw new Error(`Unable to apply to target ${target.toString()}`);
    }
    return result;
  }
}
function targetsToIndicies(targets, accessor) {
  const result = [];
  return targets.forEach((target) => {
    target.isIndexReference() && result.push(...target.toIndicies(accessor));
  }), result.sort();
}
class InsertPatch {
  location;
  path;
  items;
  id;
  constructor(id, location, path, items) {
    this.id = id, this.location = location, this.path = path, this.items = items;
  }
  apply(targets, accessor) {
    let result = accessor;
    if (accessor.containerType() !== "array")
      throw new Error("Attempt to apply insert patch to non-array value");
    switch (this.location) {
      case "before": {
        const pos = minIndex(targets, accessor);
        result = result.insertItemsAt(pos, this.items);
        break;
      }
      case "after": {
        const pos = maxIndex(targets, accessor);
        result = result.insertItemsAt(pos + 1, this.items);
        break;
      }
      case "replace": {
        const indicies = targetsToIndicies(targets, accessor);
        result = result.unsetIndices(indicies), result = result.insertItemsAt(indicies[0], this.items);
        break;
      }
      default:
        throw new Error(`Unsupported location atm: ${this.location}`);
    }
    return result;
  }
}
function minIndex(targets, accessor) {
  let result = min(targetsToIndicies(targets, accessor)) || 0;
  return targets.forEach((target) => {
    if (target.isRange()) {
      const { start } = target.expandRange();
      start < result && (result = start);
    }
  }), result;
}
function maxIndex(targets, accessor) {
  let result = max(targetsToIndicies(targets, accessor)) || 0;
  return targets.forEach((target) => {
    if (target.isRange()) {
      const { end } = target.expandRange();
      end > result && (result = end);
    }
  }), result;
}
class SetIfMissingPatch {
  id;
  path;
  value;
  constructor(id, path, value) {
    this.id = id, this.path = path, this.value = value;
  }
  apply(targets, accessor) {
    let result = accessor;
    return targets.forEach((target) => {
      if (!target.isIndexReference())
        if (target.isAttributeReference())
          result.containerType() === "primitive" ? result = result.set({ [target.name()]: this.value }) : result.hasAttribute(target.name()) || (result = accessor.setAttribute(target.name(), this.value));
        else
          throw new Error(`Unable to apply to target ${target.toString()}`);
    }), result;
  }
}
class SetPatch {
  id;
  path;
  value;
  constructor(id, path, value) {
    this.id = id, this.path = path, this.value = value;
  }
  apply(targets, accessor) {
    let result = accessor;
    return targets.forEach((target) => {
      if (target.isSelfReference())
        result = result.set(this.value);
      else if (target.isIndexReference())
        target.toIndicies(accessor).forEach((i) => {
          result = result.setIndex(i, this.value);
        });
      else if (target.isAttributeReference())
        result.containerType() === "primitive" ? result = result.set({ [target.name()]: this.value }) : result = result.setAttribute(target.name(), this.value);
      else
        throw new Error(`Unable to apply to target ${target.toString()}`);
    }), result;
  }
}
class UnsetPatch {
  id;
  path;
  value;
  constructor(id, path) {
    this.id = id, this.path = path;
  }
  // eslint-disable-next-line class-methods-use-this
  apply(targets, accessor) {
    let result = accessor;
    switch (accessor.containerType()) {
      case "array":
        result = result.unsetIndices(targetsToIndicies(targets, accessor));
        break;
      case "object":
        targets.forEach((target) => {
          result = result.unsetAttribute(target.name());
        });
        break;
      default:
        throw new Error(
          "Target value is neither indexable or an object. This error should potentially just be silently ignored?"
        );
    }
    return result;
  }
}
function parsePatch(patch) {
  const result = [];
  if (Array.isArray(patch))
    return patch.reduce((r, p) => r.concat(parsePatch(p)), result);
  const { set, setIfMissing, unset, diffMatchPatch, inc, dec, insert } = patch;
  if (setIfMissing && Object.keys(setIfMissing).forEach((path) => {
    result.push(new SetIfMissingPatch(patch.id, path, setIfMissing[path]));
  }), set && Object.keys(set).forEach((path) => {
    result.push(new SetPatch(patch.id, path, set[path]));
  }), unset && unset.forEach((path) => {
    result.push(new UnsetPatch(patch.id, path));
  }), diffMatchPatch && Object.keys(diffMatchPatch).forEach((path) => {
    result.push(new DiffMatchPatch(patch.id, path, diffMatchPatch[path]));
  }), inc && Object.keys(inc).forEach((path) => {
    result.push(new IncPatch(patch.id, path, inc[path]));
  }), dec && Object.keys(dec).forEach((path) => {
    result.push(new IncPatch(patch.id, path, -dec[path]));
  }), insert) {
    let location, path;
    const spec = insert;
    if ("before" in spec)
      location = "before", path = spec.before;
    else if ("after" in spec)
      location = "after", path = spec.after;
    else if ("replace" in spec)
      location = "replace", path = spec.replace;
    else
      throw new Error("Invalid insert patch");
    result.push(new InsertPatch(patch.id, location, path, spec.items));
  }
  return result;
}
class Patcher {
  patches;
  constructor(patch) {
    this.patches = parsePatch(patch);
  }
  apply(value) {
    const accessor = new ImmutableAccessor(value);
    return this.applyViaAccessor(accessor).get();
  }
  // If you want to use your own accessor implementation, you can use this method
  // to invoke the patcher. Since all subsequent accessors for children of this accessor
  // are obtained through the methods in the accessors, you retain full control of the
  // implementation throguhgout the application. Have a look in ImmutableAccessor
  // to see an example of how accessors are implemented.
  applyViaAccessor(accessor) {
    let result = accessor;
    const idAccessor = accessor.getAttribute("_id");
    if (!idAccessor)
      throw new Error("Cannot apply patch to document with no _id");
    const id = idAccessor.get();
    for (const patch of this.patches) {
      if (patch.id !== id)
        continue;
      const matcher = Matcher.fromPath(patch.path).setPayload(patch);
      result = process(matcher, result);
    }
    return result;
  }
}
function process(matcher, accessor) {
  const isSetPatch = matcher.payload instanceof SetPatch || matcher.payload instanceof SetIfMissingPatch;
  let result = accessor;
  const { leads, delivery } = matcher.match(accessor);
  return leads.forEach((lead) => {
    if (lead.target.isIndexReference())
      lead.target.toIndicies().forEach((i) => {
        const item = result.getIndex(i);
        if (!item)
          throw new Error("Index out of bounds");
        result = result.setIndexAccessor(i, process(lead.matcher, item));
      });
    else if (lead.target.isAttributeReference()) {
      isSetPatch && result.containerType() === "primitive" && (result = result.set({}));
      let oldValueAccessor = result.getAttribute(lead.target.name());
      if (!oldValueAccessor && isSetPatch && (result = result.setAttribute(lead.target.name(), {}), oldValueAccessor = result.getAttribute(lead.target.name())), !oldValueAccessor)
        return;
      const newValueAccessor = process(lead.matcher, oldValueAccessor);
      oldValueAccessor !== newValueAccessor && (result = result.setAttributeAccessor(lead.target.name(), newValueAccessor));
    } else
      throw new Error(`Unable to handle target ${lead.target.toString()}`);
  }), delivery && isPatcher(delivery.payload) && (result = delivery.payload.apply(delivery.targets, result)), result;
}
function isPatcher(payload) {
  return !!(payload && typeof payload == "object" && payload !== null && "apply" in payload && typeof payload.apply == "function");
}
const luid = uuid;
class Mutation {
  params;
  compiled;
  _appliesToMissingDocument;
  constructor(options) {
    this.params = options;
  }
  get transactionId() {
    return this.params.transactionId;
  }
  get transition() {
    return this.params.transition;
  }
  get identity() {
    return this.params.identity;
  }
  get previousRev() {
    return this.params.previousRev;
  }
  get resultRev() {
    return this.params.resultRev;
  }
  get mutations() {
    return this.params.mutations;
  }
  get timestamp() {
    if (typeof this.params.timestamp == "string")
      return new Date(this.params.timestamp);
  }
  get effects() {
    return this.params.effects;
  }
  assignRandomTransactionId() {
    this.params.transactionId = luid(), this.params.resultRev = this.params.transactionId;
  }
  appliesToMissingDocument() {
    if (typeof this._appliesToMissingDocument < "u")
      return this._appliesToMissingDocument;
    const firstMut = this.mutations[0];
    return firstMut ? this._appliesToMissingDocument = !!(firstMut.create || firstMut.createIfNotExists || firstMut.createOrReplace) : this._appliesToMissingDocument = !0, this._appliesToMissingDocument;
  }
  // Compiles all mutations into a handy function
  compile() {
    const operations = [], getGuaranteedCreatedAt = (doc) => doc?._createdAt || this.params.timestamp || (/* @__PURE__ */ new Date()).toISOString();
    this.mutations.forEach((mutation) => {
      if (mutation.create) {
        const create = mutation.create || {};
        operations.push((doc) => doc || Object.assign(create, {
          _createdAt: getGuaranteedCreatedAt(create)
        }));
        return;
      }
      if (mutation.createIfNotExists) {
        const createIfNotExists = mutation.createIfNotExists || {};
        operations.push(
          (doc) => doc === null ? Object.assign(createIfNotExists, {
            _createdAt: getGuaranteedCreatedAt(createIfNotExists)
          }) : doc
        );
        return;
      }
      if (mutation.createOrReplace) {
        const createOrReplace = mutation.createOrReplace || {};
        operations.push(
          () => Object.assign(createOrReplace, {
            _createdAt: getGuaranteedCreatedAt(createOrReplace)
          })
        );
        return;
      }
      if (mutation.delete) {
        operations.push(() => null);
        return;
      }
      if (mutation.patch) {
        if ("query" in mutation.patch)
          return;
        const patch = new Patcher(mutation.patch);
        operations.push((doc) => patch.apply(doc));
        return;
      }
      throw new Error(`Unsupported mutation ${JSON.stringify(mutation, null, 2)}`);
    }), typeof this.params.timestamp == "string" && operations.push((doc) => doc ? Object.assign(doc, { _updatedAt: this.params.timestamp }) : null);
    const prevRev = this.previousRev, rev = this.resultRev || this.transactionId;
    this.compiled = (doc) => {
      if (prevRev && doc && prevRev !== doc._rev)
        throw new Error(
          `Previous revision for this mutation was ${prevRev}, but the document revision is ${doc._rev}`
        );
      let result = doc;
      for (const operation of operations)
        result = operation(result);
      return result && rev && (result === doc && (result = Object.assign({}, doc)), result._rev = rev), result;
    };
  }
  apply(document) {
    debug("Applying mutation %O to document %O", this.mutations, document), this.compiled || this.compile();
    const result = this.compiled(document);
    return debug("  => %O", result), result;
  }
  static applyAll(document, mutations) {
    return mutations.reduce((doc, mutation) => mutation.apply(doc), document);
  }
  // Given a number of yet-to-be-committed mutation objects, collects them into one big mutation
  // any metadata like transactionId is ignored and must be submitted by the client. It is assumed
  // that all mutations are on the same document.
  // TOOO: Optimize mutations, eliminating mutations that overwrite themselves!
  static squash(document, mutations) {
    const squashed = mutations.reduce(
      (result, mutation) => result.concat(...mutation.mutations),
      []
    );
    return new Mutation({ mutations: squashed });
  }
}
class Document {
  /**
   * Incoming patches from the server waiting to be applied to HEAD
   */
  incoming = [];
  /**
   * Patches we know has been subitted to the server, but has not been seen yet in the return channel
   * so we can't be sure about the ordering yet (someone else might have slipped something between them)
   */
  submitted = [];
  /**
   * Pending mutations
   */
  pending = [];
  /**
   * Our model of the document according to the incoming patches from the server
   */
  HEAD;
  /**
   * Our optimistic model of what the document will probably look like as soon as all our patches
   * have been processed. Updated every time we stage a new mutation, but also might revert back
   * to previous states if our mutations fail, or could change if unexpected mutations arrive
   * between our own. The `onRebase` callback will be called when EDGE changes in this manner.
   */
  EDGE;
  /**
   * Called with the EDGE document when that document changes for a reason other than us staging
   * a new patch or receiving a mutation from the server while our EDGE is in sync with HEAD:
   * I.e. when EDGE changes because the order of mutations has changed in relation to our
   * optimistic predictions.
   */
  onRebase;
  /**
   * Called when we receive a patch in the normal order of things, but the mutation is not ours
   */
  onMutation;
  /**
   * Called when consistency state changes with the boolean value of the current consistency state
   */
  onConsistencyChanged;
  /**
   * Called whenever a new incoming mutation comes in. These are always ordered correctly.
   */
  onRemoteMutation;
  /**
   * We are consistent when there are no unresolved mutations of our own, and no un-applicable
   * incoming mutations. When this has been going on for too long, and there has been a while
   * since we staged a new mutation, it is time to reset your state.
   */
  inconsistentAt = null;
  /**
   * The last time we staged a patch of our own. If we have been inconsistent for a while, but it
   * hasn't been long since we staged a new mutation, the reason is probably just because the user
   * is typing or something.
   *
   * Should be used as a guard against resetting state for inconsistency reasons.
   */
  lastStagedAt = null;
  constructor(doc) {
    this.reset(doc), this.HEAD = doc, this.EDGE = doc;
  }
  // Reset the state of the Document, used to recover from unsavory states by reloading the document
  reset(doc) {
    this.incoming = [], this.submitted = [], this.pending = [], this.inconsistentAt = null, this.HEAD = doc, this.EDGE = doc, this.considerIncoming(), this.updateConsistencyFlag();
  }
  // Call when a mutation arrives from Sanity
  arrive(mutation) {
    this.incoming.push(mutation), this.considerIncoming(), this.updateConsistencyFlag();
  }
  // Call to signal that we are submitting a mutation. Returns a callback object with a
  // success and failure handler that must be called according to the outcome of our
  // submission.
  stage(mutation, silent) {
    if (!mutation.transactionId)
      throw new Error("Mutations _must_ have transactionId when submitted");
    this.lastStagedAt = /* @__PURE__ */ new Date(), debug("Staging mutation %s (pushed to pending)", mutation.transactionId), this.pending.push(mutation), this.EDGE = mutation.apply(this.EDGE), this.onMutation && !silent && this.onMutation({
      mutation,
      document: this.EDGE,
      remote: !1
    });
    const txnId = mutation.transactionId;
    return this.updateConsistencyFlag(), {
      success: () => {
        this.pendingSuccessfullySubmitted(txnId), this.updateConsistencyFlag();
      },
      failure: () => {
        this.pendingFailed(txnId), this.updateConsistencyFlag();
      }
    };
  }
  // Call to check if everything is nice and quiet and there are no unresolved mutations.
  // Means this model thinks both HEAD and EDGE is up to date with what the server sees.
  isConsistent() {
    return !this.inconsistentAt;
  }
  // Private
  // Attempts to apply any resolvable incoming patches to HEAD. Will keep patching as long as there
  // are applicable patches to be applied
  considerIncoming() {
    let mustRebase = !1, nextMut;
    const rebaseMutations = [];
    if (this.HEAD && this.HEAD._updatedAt) {
      const updatedAt = new Date(this.HEAD._updatedAt);
      this.incoming.find((mut) => mut.timestamp && mut.timestamp < updatedAt) && (this.incoming = this.incoming.filter((mut) => mut.timestamp && mut.timestamp < updatedAt));
    }
    let protect = 0;
    do {
      if (this.HEAD) {
        const HEAD = this.HEAD;
        nextMut = HEAD._rev ? this.incoming.find((mut) => mut.previousRev === HEAD._rev) : void 0;
      } else
        nextMut = this.incoming.find((mut) => mut.appliesToMissingDocument());
      if (nextMut) {
        const applied = this.applyIncoming(nextMut);
        if (mustRebase = mustRebase || applied, mustRebase && rebaseMutations.push(nextMut), protect++ > 10)
          throw new Error(
            `Mutator stuck flushing incoming mutations. Probably stuck here: ${JSON.stringify(
              nextMut
            )}`
          );
      }
    } while (nextMut);
    this.incoming.length > 0 && debug.enabled && debug(
      "Unable to apply mutations %s",
      this.incoming.map((mut) => mut.transactionId).join(", ")
    ), mustRebase && this.rebase(rebaseMutations);
  }
  // check current consistency state, update flag and invoke callback if needed
  updateConsistencyFlag() {
    const wasConsistent = this.isConsistent(), isConsistent = this.pending.length === 0 && this.submitted.length === 0 && this.incoming.length === 0;
    isConsistent ? this.inconsistentAt = null : this.inconsistentAt || (this.inconsistentAt = /* @__PURE__ */ new Date()), wasConsistent != isConsistent && this.onConsistencyChanged && (debug(isConsistent ? "Buffered document is inconsistent" : "Buffered document is consistent"), this.onConsistencyChanged(isConsistent));
  }
  // apply an incoming patch that has been prequalified as the next in line for this document
  applyIncoming(mut) {
    if (!mut)
      return !1;
    if (!mut.transactionId)
      throw new Error("Received incoming mutation without a transaction ID");
    if (debug(
      "Applying mutation %s -> %s to rev %s",
      mut.previousRev,
      mut.resultRev,
      this.HEAD && this.HEAD._rev
    ), this.HEAD = mut.apply(this.HEAD), this.onRemoteMutation && this.onRemoteMutation(mut), this.incoming = this.incoming.filter((m) => m.transactionId !== mut.transactionId), this.hasUnresolvedMutations()) {
      const needRebase = this.consumeUnresolved(mut.transactionId);
      return debug.enabled && (debug(
        `Incoming mutation ${mut.transactionId} appeared while there were pending or submitted local mutations`
      ), debug(`Submitted txnIds: ${this.submitted.map((m) => m.transactionId).join(", ")}`), debug(`Pending txnIds: ${this.pending.map((m) => m.transactionId).join(", ")}`), debug("needRebase === %s", needRebase)), needRebase;
    }
    return debug(
      "Remote mutation %s arrived w/o any pending or submitted local mutations",
      mut.transactionId
    ), this.EDGE = this.HEAD, this.onMutation && this.onMutation({
      mutation: mut,
      document: this.EDGE,
      remote: !0
    }), !1;
  }
  /**
   * Returns true if there are unresolved mutations between HEAD and EDGE, meaning we have
   * mutations that are still waiting to be either submitted, or to be confirmed by the server.
   *
   * @returns true if there are unresolved mutations between HEAD and EDGE, false otherwise
   */
  hasUnresolvedMutations() {
    return this.submitted.length > 0 || this.pending.length > 0;
  }
  /**
   * When an incoming mutation is applied to HEAD, this is called to remove the mutation from
   * the unresolved state. If the newly applied patch is the next upcoming unresolved mutation,
   * no rebase is needed, but we might have the wrong idea about the ordering of mutations, so in
   * that case we are given the flag `needRebase` to tell us that this mutation arrived out of
   * order in terms of our optimistic version, so a rebase is needed.
   *
   * @param txnId - Transaction ID of the remote mutation
   * @returns true if rebase is needed, false otherwise
   */
  consumeUnresolved(txnId) {
    if (this.submitted.length === 0 && this.pending.length === 0)
      return !1;
    if (this.submitted.length !== 0) {
      if (this.submitted[0].transactionId === txnId)
        return debug(
          "Remote mutation %s matches upcoming submitted mutation, consumed from 'submitted' buffer",
          txnId
        ), this.submitted.shift(), !1;
    } else if (this.pending.length > 0 && this.pending[0].transactionId === txnId)
      return debug(
        "Remote mutation %s matches upcoming pending mutation, consumed from 'pending' buffer",
        txnId
      ), this.pending.shift(), !1;
    return debug(
      "The mutation was not the upcoming mutation, scrubbing. Pending: %d, Submitted: %d",
      this.pending.length,
      this.submitted.length
    ), this.submitted = this.submitted.filter((mut) => mut.transactionId !== txnId), this.pending = this.pending.filter((mut) => mut.transactionId !== txnId), debug("After scrubbing: Pending: %d, Submitted: %d", this.pending.length, this.submitted.length), !0;
  }
  pendingSuccessfullySubmitted(pendingTxnId) {
    if (this.pending.length === 0)
      return;
    const first = this.pending[0];
    if (first.transactionId === pendingTxnId) {
      this.pending.shift(), this.submitted.push(first);
      return;
    }
    let justSubmitted;
    const stillPending = [];
    this.pending.forEach((mutation) => {
      if (mutation.transactionId === pendingTxnId) {
        justSubmitted = mutation;
        return;
      }
      stillPending.push(mutation);
    }), justSubmitted && this.submitted.push(justSubmitted), this.pending = stillPending, this.rebase([]);
  }
  pendingFailed(pendingTxnId) {
    this.pending = this.pending.filter((mutation) => mutation.transactionId !== pendingTxnId), this.rebase([]);
  }
  rebase(incomingMutations) {
    const oldEdge = this.EDGE;
    this.EDGE = Mutation.applyAll(this.HEAD, this.submitted.concat(this.pending)), oldEdge !== null && this.EDGE !== null && (oldEdge._rev = this.EDGE._rev), !isEqual(this.EDGE, oldEdge) && this.onRebase && this.onRebase(this.EDGE, incomingMutations, this.pending);
  }
}
class SquashingBuffer {
  /**
   * The document forming the basis of this squash
   */
  BASIS;
  /**
   * The document after the out-Mutation has been applied, but before the staged
   * operations are committed.
   */
  PRESTAGE;
  /**
   * setOperations contain the latest set operation by path. If the set-operations are
   * updating strings to new strings, they are rewritten as diffMatchPatch operations,
   * any new set operations on the same paths overwrites any older set operations.
   * Only set-operations assigning plain values to plain values gets optimized like this.
   */
  setOperations;
  /**
   * `documentPresent` is true whenever we know that the document must be present due
   * to preceeding mutations. `false` implies that it may or may not already exist.
   */
  documentPresent;
  /**
   * The operations in the out-Mutation are not able to be optimized any further
   */
  out = [];
  /**
   * Staged mutation operations
   */
  staged;
  constructor(doc) {
    doc ? debug("Reset mutation buffer to rev %s", doc._rev) : debug("Reset mutation buffer state to document being deleted"), this.staged = [], this.setOperations = {}, this.documentPresent = !1, this.BASIS = doc, this.PRESTAGE = doc;
  }
  add(mut) {
    mut.mutations.forEach((op) => this.addOperation(op));
  }
  hasChanges() {
    return this.out.length > 0 || Object.keys(this.setOperations).length > 0;
  }
  /**
   * Extracts the mutations in this buffer.
   * After this is done, the buffer lifecycle is over and the client should
   * create an new one with the new, updated BASIS.
   *
   * @param txnId - Transaction ID
   * @returns A `Mutation` instance if we had outgoing mutations pending, null otherwise
   */
  purge(txnId) {
    this.stashStagedOperations();
    let result = null;
    return this.out.length > 0 && (debug("Purged mutation buffer"), result = new Mutation({
      mutations: this.out,
      resultRev: txnId,
      transactionId: txnId
    })), this.out = [], this.documentPresent = !1, result;
  }
  addOperation(op) {
    if (op.patch && op.patch.set && "id" in op.patch && op.patch.id === this.PRESTAGE?._id && Object.keys(op.patch).length === 2) {
      const setPatch = op.patch.set, unoptimizable = {};
      for (const path of Object.keys(setPatch))
        setPatch.hasOwnProperty(path) && (this.optimiseSetOperation(path, setPatch[path]) || (unoptimizable[path] = setPatch[path]));
      Object.keys(unoptimizable).length > 0 && (debug("Unoptimizable set-operation detected, purging optimization buffer"), this.staged.push({ patch: { id: this.PRESTAGE._id, set: unoptimizable } }), this.stashStagedOperations());
      return;
    }
    if (op.createIfNotExists && this.PRESTAGE && op.createIfNotExists._id === this.PRESTAGE._id) {
      this.documentPresent || (this.staged.push(op), this.documentPresent = !0, this.stashStagedOperations());
      return;
    }
    debug("Unoptimizable mutation detected, purging optimization buffer"), this.staged.push(op), this.stashStagedOperations();
  }
  /**
     * Attempt to perform one single set operation in an optimised manner, return value
     * reflects whether or not the operation could be performed.
  
     * @param path - The JSONPath to the set operation in question
     * @param nextValue - The value to be set
     * @returns True of optimized, false otherwise
     */
  optimiseSetOperation(path, nextValue) {
    if (typeof nextValue == "object")
      return !1;
    const matches = extractWithPath(path, this.PRESTAGE);
    if (matches.length !== 1)
      return !1;
    const match = matches[0];
    if (typeof match.value == "object" || !this.PRESTAGE)
      return !1;
    let op = null;
    if (match.value === nextValue)
      op = null;
    else if (typeof match.value == "string" && typeof nextValue == "string")
      try {
        const patch = stringifyPatches(makePatches(match.value, nextValue));
        op = { patch: { id: this.PRESTAGE._id, diffMatchPatch: { [path]: patch } } };
      } catch {
        return !1;
      }
    else
      op = { patch: { id: this.PRESTAGE._id, set: { [path]: nextValue } } };
    const canonicalPath = arrayToJSONMatchPath(match.path);
    return op ? this.setOperations[canonicalPath] = op : delete this.setOperations[canonicalPath], !0;
  }
  stashStagedOperations() {
    const nextOps = [];
    Object.keys(this.setOperations).forEach((key) => {
      const op = this.setOperations[key];
      op && nextOps.push(op);
    }), nextOps.push(...this.staged), nextOps.length > 0 && (this.PRESTAGE = new Mutation({ mutations: nextOps }).apply(this.PRESTAGE), this.staged = [], this.setOperations = {}), this.out.push(...nextOps);
  }
  /**
   * Rebases given the new base-document
   *
   * @param newBasis - New base document to rebase on
   * @returns New "edge" document with buffered changes integrated
   */
  rebase(newBasis) {
    return this.stashStagedOperations(), newBasis === null ? (this.out = [], this.BASIS = newBasis, this.PRESTAGE = newBasis, this.documentPresent = !1) : (this.BASIS = newBasis, this.out ? this.PRESTAGE = new Mutation({ mutations: this.out }).apply(this.BASIS) : this.PRESTAGE = this.BASIS), this.PRESTAGE;
  }
}
const ONE_MINUTE = 1e3 * 60;
class Commit {
  mutations;
  tries;
  resolve;
  reject;
  constructor(mutations, { resolve, reject }) {
    this.mutations = mutations, this.tries = 0, this.resolve = resolve, this.reject = reject;
  }
  apply(doc) {
    return Mutation.applyAll(doc, this.mutations);
  }
  squash(doc) {
    const result = Mutation.squash(doc, this.mutations);
    return result.assignRandomTransactionId(), result;
  }
}
const mutReducerFn = (acc, mut) => acc.concat(mut.mutations);
class BufferedDocument {
  mutations;
  /**
   * The Document we are wrapping
   */
  document;
  /**
   * The Document with local changes applied
   */
  LOCAL;
  /**
   * Commits that are waiting to be delivered to the server
   */
  commits;
  /**
   * Local mutations that are not scheduled to be committed yet
   */
  buffer;
  /**
   * Assignable event handler for when the buffered document applies a mutation
   */
  onMutation;
  /**
   * Assignable event handler for when a remote mutation happened
   */
  onRemoteMutation;
  /**
   * Assignable event handler for when the buffered document rebased
   */
  onRebase;
  /**
   * Assignable event handler for when the document is deleted
   */
  onDelete;
  /**
   * Assignable event handler for when the state of consistency changed
   */
  onConsistencyChanged;
  /**
   * Assignable event handler for when the buffered document should commit changes
   */
  commitHandler;
  /**
   * Whether or not we are currently commiting
   */
  committerRunning = !1;
  constructor(doc) {
    this.buffer = new SquashingBuffer(doc), this.document = new Document(doc), this.document.onMutation = (msg) => this.handleDocMutation(msg), this.document.onRemoteMutation = (mut) => this.onRemoteMutation && this.onRemoteMutation(mut), this.document.onRebase = (edge, remoteMutations, localMutations) => this.handleDocRebase(edge, remoteMutations, localMutations), this.document.onConsistencyChanged = (msg) => this.handleDocConsistencyChanged(msg), this.LOCAL = doc, this.mutations = [], this.commits = [];
  }
  // Used to reset the state of the local document model. If the model has been inconsistent
  // for too long, it has probably missed a notification, and should reload the document from the server
  reset(doc) {
    doc ? debug("Document state reset to revision %s", doc._rev) : debug("Document state reset to being deleted"), this.document.reset(doc), this.rebase([], []), this.handleDocConsistencyChanged(this.document.isConsistent());
  }
  // Add a change to the buffer
  add(mutation) {
    this.onConsistencyChanged && this.onConsistencyChanged(!1), debug("Staged local mutation"), this.buffer.add(mutation);
    const oldLocal = this.LOCAL;
    this.LOCAL = mutation.apply(this.LOCAL), this.onMutation && oldLocal !== this.LOCAL && (debug("onMutation fired"), this.onMutation({
      mutation,
      document: this.LOCAL,
      remote: !1
    }), this.LOCAL === null && this.onDelete && this.onDelete(this.LOCAL));
  }
  // Call when a mutation arrives from Sanity
  arrive(mutation) {
    if (debug("Remote mutation arrived %s -> %s", mutation.previousRev, mutation.resultRev), mutation.previousRev === mutation.resultRev)
      throw new Error(
        `Mutation ${mutation.transactionId} has previousRev === resultRev (${mutation.previousRev})`
      );
    return this.document.arrive(mutation);
  }
  // Submit all mutations in the buffer to be committed
  commit() {
    return new Promise((resolve, reject) => {
      if (!this.buffer.hasChanges()) {
        resolve();
        return;
      }
      debug("Committing local changes");
      const pendingMutations = this.buffer.purge();
      this.commits.push(new Commit(pendingMutations ? [pendingMutations] : [], { resolve, reject })), this.buffer = new SquashingBuffer(this.LOCAL), this.performCommits();
    });
  }
  // Starts the committer that will try to committ all staged commits to the database
  // by calling the commitHandler. Will keep running until all commits are successfully
  // committed.
  performCommits() {
    if (!this.commitHandler)
      throw new Error("No commitHandler configured for this BufferedDocument");
    this.committerRunning || this._cycleCommitter();
  }
  // TODO: Error handling, right now retries after every error
  _cycleCommitter() {
    const commit = this.commits.shift();
    if (!commit) {
      this.committerRunning = !1;
      return;
    }
    this.committerRunning = !0;
    const squashed = commit.squash(this.LOCAL), docResponder = this.document.stage(squashed, !0), responder = {
      success: () => {
        debug("Commit succeeded"), docResponder.success(), commit.resolve(), this._cycleCommitter();
      },
      failure: () => {
        debug("Commit failed"), commit.tries += 1, this.LOCAL !== null && this.commits.unshift(commit), docResponder.failure(), commit.tries < 200 && setTimeout(() => this._cycleCommitter(), Math.min(commit.tries * 1e3, ONE_MINUTE));
      },
      cancel: (error) => {
        this.commits.forEach((comm) => comm.reject(error)), this.commits = [], this.reset(this.document.HEAD), this.buffer = new SquashingBuffer(this.LOCAL), this.committerRunning = !1;
      }
    };
    debug("Posting commit"), this.commitHandler && this.commitHandler({
      mutation: squashed,
      success: responder.success,
      failure: responder.failure,
      cancel: responder.cancel
    });
  }
  handleDocRebase(edge, remoteMutations, localMutations) {
    this.rebase(remoteMutations, localMutations);
  }
  handleDocumentDeleted() {
    debug("Document deleted"), this.LOCAL !== null && this.onDelete && this.onDelete(this.LOCAL), this.commits = [], this.mutations = [];
  }
  handleDocMutation(msg) {
    if (this.commits.length === 0 && !this.buffer.hasChanges()) {
      debug("Document mutated from remote with no local changes"), this.LOCAL = this.document.EDGE, this.buffer = new SquashingBuffer(this.LOCAL), this.onMutation && this.onMutation(msg);
      return;
    }
    debug("Document mutated from remote with local changes"), this.document.EDGE === null && this.handleDocumentDeleted(), this.rebase([msg.mutation], []);
  }
  rebase(remoteMutations, localMutations) {
    debug("Rebasing document"), this.document.EDGE === null && this.handleDocumentDeleted();
    const oldLocal = this.LOCAL;
    this.LOCAL = this.commits.reduce((doc, commit) => commit.apply(doc), this.document.EDGE), this.LOCAL = this.buffer.rebase(this.LOCAL), oldLocal !== null && this.LOCAL !== null && (oldLocal._rev = this.LOCAL._rev), !isEqual(this.LOCAL, oldLocal) && this.onRebase && this.onRebase(
      this.LOCAL,
      remoteMutations.reduce(mutReducerFn, []),
      localMutations.reduce(mutReducerFn, [])
    );
  }
  handleDocConsistencyChanged(isConsistent) {
    if (!this.onConsistencyChanged)
      return;
    const hasLocalChanges = this.commits.length > 0 || this.buffer.hasChanges();
    isConsistent && !hasLocalChanges && this.onConsistencyChanged(!0), isConsistent || this.onConsistencyChanged(!1);
  }
}
export {
  BufferedDocument,
  Mutation,
  arrayToJSONMatchPath,
  extract,
  extractWithPath
};
//# sourceMappingURL=index.mjs.map
