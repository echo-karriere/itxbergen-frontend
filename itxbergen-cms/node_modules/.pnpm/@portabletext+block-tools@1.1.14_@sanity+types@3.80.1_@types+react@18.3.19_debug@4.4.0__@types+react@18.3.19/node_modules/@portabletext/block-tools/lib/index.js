import flatten from "lodash/flatten.js";
import { isBlockSchemaType, isBlockChildrenObjectField, isObjectSchemaType, isBlockListObjectField, isBlockStyleObjectField, isTitledListValue, isPortableTextTextBlock, isPortableTextSpan } from "@sanity/types";
import isEqual from "lodash/isEqual.js";
import uniq from "lodash/uniq.js";
import getRandomValues from "get-random-values-esm";
function findBlockType(type) {
  return type.type ? findBlockType(type.type) : type.name === "block";
}
const objectToString = Object.prototype.toString;
function resolveJsType(val) {
  switch (objectToString.call(val)) {
    case "[object Function]":
      return "function";
    case "[object Date]":
      return "date";
    case "[object RegExp]":
      return "regexp";
    case "[object Arguments]":
      return "arguments";
    case "[object Array]":
      return "array";
    case "[object String]":
      return "string";
  }
  return val === null ? "null" : val === void 0 ? "undefined" : val && typeof val == "object" && "nodeType" in val && val.nodeType === 1 ? "element" : val === Object(val) ? "object" : typeof val;
}
var s = { 0: 8203, 1: 8204, 2: 8205, 3: 8290, 4: 8291, 5: 8288, 6: 65279, 7: 8289, 8: 119155, 9: 119156, a: 119157, b: 119158, c: 119159, d: 119160, e: 119161, f: 119162 }, c = { 0: 8203, 1: 8204, 2: 8205, 3: 65279 };
new Array(4).fill(String.fromCodePoint(c[0])).join("");
Object.fromEntries(Object.entries(c).map((t) => t.reverse()));
Object.fromEntries(Object.entries(s).map((t) => t.reverse()));
var S = `${Object.values(s).map((t) => `\\u{${t.toString(16)}}`).join("")}`, f = new RegExp(`[${S}]{4,}`, "gu");
function _(t) {
  var e;
  return { cleaned: t.replace(f, ""), encoded: ((e = t.match(f)) == null ? void 0 : e[0]) || "" };
}
function O(t) {
  return t && JSON.parse(_(JSON.stringify(t)).cleaned);
}
const PRESERVE_WHITESPACE_TAGS = ["pre", "textarea", "code"], BLOCK_DEFAULT_STYLE = "normal", DEFAULT_BLOCK = Object.freeze({
  _type: "block",
  markDefs: [],
  style: BLOCK_DEFAULT_STYLE
}), DEFAULT_SPAN = Object.freeze({
  _type: "span",
  marks: []
}), HTML_BLOCK_TAGS = {
  p: DEFAULT_BLOCK,
  blockquote: { ...DEFAULT_BLOCK, style: "blockquote" }
}, HTML_SPAN_TAGS = {
  span: { object: "text" }
}, HTML_LIST_CONTAINER_TAGS = {
  ol: { object: null },
  ul: { object: null }
}, HTML_HEADER_TAGS = {
  h1: { ...DEFAULT_BLOCK, style: "h1" },
  h2: { ...DEFAULT_BLOCK, style: "h2" },
  h3: { ...DEFAULT_BLOCK, style: "h3" },
  h4: { ...DEFAULT_BLOCK, style: "h4" },
  h5: { ...DEFAULT_BLOCK, style: "h5" },
  h6: { ...DEFAULT_BLOCK, style: "h6" }
}, HTML_MISC_TAGS = {
  br: { ...DEFAULT_BLOCK, style: BLOCK_DEFAULT_STYLE }
}, HTML_DECORATOR_TAGS = {
  b: "strong",
  strong: "strong",
  i: "em",
  em: "em",
  u: "underline",
  s: "strike-through",
  strike: "strike-through",
  del: "strike-through",
  code: "code",
  sup: "sup",
  sub: "sub",
  ins: "ins",
  mark: "mark",
  small: "small"
}, HTML_LIST_ITEM_TAGS = {
  li: {
    ...DEFAULT_BLOCK,
    style: BLOCK_DEFAULT_STYLE,
    level: 1,
    listItem: "bullet"
  }
}, ELEMENT_MAP = {
  ...HTML_BLOCK_TAGS,
  ...HTML_SPAN_TAGS,
  ...HTML_LIST_CONTAINER_TAGS,
  ...HTML_LIST_ITEM_TAGS,
  ...HTML_HEADER_TAGS,
  ...HTML_MISC_TAGS
};
uniq(
  Object.values(ELEMENT_MAP).filter((tag) => "style" in tag).map((tag) => tag.style)
);
uniq(
  Object.values(HTML_DECORATOR_TAGS)
);
function blockContentFeatures(blockContentType) {
  if (!blockContentType)
    throw new Error("Parameter 'blockContentType' required");
  const blockType = blockContentType.of.find(findBlockType);
  if (!isBlockSchemaType(blockType))
    throw new Error("'block' type is not defined in this schema (required).");
  const ofType = blockType.fields.find(isBlockChildrenObjectField)?.type?.of;
  if (!ofType)
    throw new Error("No `of` declaration found for blocks `children` field");
  const spanType = ofType.find(
    (member) => member.name === "span"
  );
  if (!spanType)
    throw new Error(
      "No `span` type found in `block` schema type `children` definition"
    );
  const inlineObjectTypes = ofType.filter(
    (inlineType) => inlineType.name !== "span" && isObjectSchemaType(inlineType)
  ), blockObjectTypes = blockContentType.of.filter(
    (memberType) => memberType.name !== blockType.name && isObjectSchemaType(memberType)
  );
  return {
    styles: resolveEnabledStyles(blockType),
    decorators: resolveEnabledDecorators(spanType),
    annotations: resolveEnabledAnnotationTypes(spanType),
    lists: resolveEnabledListItems(blockType),
    types: {
      block: blockContentType,
      span: spanType,
      inlineObjects: inlineObjectTypes,
      blockObjects: blockObjectTypes
    }
  };
}
function resolveEnabledStyles(blockType) {
  const styleField = blockType.fields.find(isBlockStyleObjectField);
  if (!styleField)
    throw new Error(
      "A field with name 'style' is not defined in the block type (required)."
    );
  const textStyles = getTitledListValuesFromEnumListOptions(
    styleField.type.options
  );
  if (textStyles.length === 0)
    throw new Error(
      "The style fields need at least one style defined. I.e: {title: 'Normal', value: 'normal'}."
    );
  return textStyles;
}
function resolveEnabledAnnotationTypes(spanType) {
  return spanType.annotations.map((annotation) => ({
    title: annotation.title,
    type: annotation,
    value: annotation.name,
    icon: annotation.icon
  }));
}
function resolveEnabledDecorators(spanType) {
  return spanType.decorators;
}
function resolveEnabledListItems(blockType) {
  const listField = blockType.fields.find(isBlockListObjectField);
  if (!listField)
    throw new Error(
      "A field with name 'list' is not defined in the block type (required)."
    );
  const listItems = getTitledListValuesFromEnumListOptions(
    listField.type.options
  );
  if (!listItems)
    throw new Error("The list field need at least to be an empty array");
  return listItems;
}
function getTitledListValuesFromEnumListOptions(options) {
  const list = options ? options.list : void 0;
  return Array.isArray(list) ? list.map(
    (item) => isTitledListValue(item) ? item : { title: item, value: item }
  ) : [];
}
const _XPathResult = {
  BOOLEAN_TYPE: 3,
  ORDERED_NODE_ITERATOR_TYPE: 5,
  UNORDERED_NODE_SNAPSHOT_TYPE: 6
};
var preprocessGDocs = (_html, doc, options) => {
  const whitespaceOnPasteMode = options?.unstable_whitespaceOnPasteMode || "preserve";
  let gDocsRootOrSiblingNode = doc.evaluate(
    '//*[@id and contains(@id, "docs-internal-guid")]',
    doc,
    null,
    _XPathResult.ORDERED_NODE_ITERATOR_TYPE,
    null
  ).iterateNext();
  if (gDocsRootOrSiblingNode) {
    const isWrappedRootTag = tagName(gDocsRootOrSiblingNode) === "b";
    switch (isWrappedRootTag || (gDocsRootOrSiblingNode = doc.body), whitespaceOnPasteMode) {
      case "normalize":
        normalizeWhitespace(gDocsRootOrSiblingNode);
        break;
      case "remove":
        removeAllWhitespace(gDocsRootOrSiblingNode);
        break;
    }
    const childNodes = doc.evaluate(
      "//*",
      doc,
      null,
      _XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    for (let i = childNodes.snapshotLength - 1; i >= 0; i--) {
      const elm = childNodes.snapshotItem(i);
      elm?.setAttribute("data-is-google-docs", "true"), (elm?.parentElement === gDocsRootOrSiblingNode || !isWrappedRootTag && elm.parentElement === doc.body) && (elm?.setAttribute("data-is-root-node", "true"), tagName(elm)), tagName(elm) === "li" && elm.firstChild && tagName(elm?.firstChild) === "img" && elm.removeChild(elm.firstChild);
    }
    return isWrappedRootTag && doc.body.firstElementChild?.replaceWith(
      ...Array.from(gDocsRootOrSiblingNode.childNodes)
    ), doc;
  }
  return doc;
};
const unwantedWordDocumentPaths = [
  "/html/text()",
  "/html/head/text()",
  "/html/body/text()",
  "/html/body/ul/text()",
  "/html/body/ol/text()",
  "//comment()",
  "//style",
  "//xml",
  "//script",
  "//meta",
  "//link"
];
var preprocessHTML = (_html, doc) => {
  const bodyTextNodes = doc.evaluate(
    "/html/body/text()",
    doc,
    null,
    _XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = bodyTextNodes.snapshotLength - 1; i >= 0; i--) {
    const node = bodyTextNodes.snapshotItem(i), text = node.textContent || "";
    if (text.replace(/[^\S\n]+$/g, "")) {
      const newNode = doc.createElement("span");
      newNode.appendChild(doc.createTextNode(text)), node.parentNode?.replaceChild(newNode, node);
    } else
      node.parentNode?.removeChild(node);
  }
  const unwantedNodes = doc.evaluate(
    unwantedWordDocumentPaths.join("|"),
    doc,
    null,
    _XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = unwantedNodes.snapshotLength - 1; i >= 0; i--) {
    const unwanted = unwantedNodes.snapshotItem(i);
    unwanted && unwanted.parentNode?.removeChild(unwanted);
  }
  return doc;
}, preprocessNotion = (html, doc) => {
  const NOTION_REGEX = /<!-- notionvc:.*?-->/g;
  if (html.match(NOTION_REGEX)) {
    const childNodes = doc.evaluate(
      "//*",
      doc,
      null,
      _XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    for (let i = childNodes.snapshotLength - 1; i >= 0; i--)
      childNodes.snapshotItem(i)?.setAttribute("data-is-notion", "true");
    return doc;
  }
  return doc;
}, preprocessWhitespace = (_2, doc) => {
  function processNode(node) {
    if (node.nodeType === _XPathResult.BOOLEAN_TYPE && !PRESERVE_WHITESPACE_TAGS.includes(
      node.parentElement?.tagName.toLowerCase() || ""
    ))
      node.textContent = node.textContent?.replace(/\s\s+/g, " ").replace(/[\r\n]+/g, " ") || "";
    else
      for (let i = 0; i < node.childNodes.length; i++)
        processNode(node.childNodes[i]);
  }
  return processNode(doc.body), doc;
};
const WORD_HTML_REGEX = /(class="?Mso|style=(?:"|')[^"]*?\bmso-|w:WordDocument|<o:\w+>|<\/font>)/, unwantedPaths = [
  "//o:p",
  "//span[@style='mso-list:Ignore']",
  "//span[@style='mso-list: Ignore']"
], mappedPaths = [
  "//p[@class='MsoTocHeading']",
  "//p[@class='MsoTitle']",
  "//p[@class='MsoToaHeading']",
  "//p[@class='MsoSubtitle']",
  "//span[@class='MsoSubtleEmphasis']",
  "//span[@class='MsoIntenseEmphasis']"
], elementMap = {
  MsoTocHeading: ["h3"],
  MsoTitle: ["h1"],
  MsoToaHeading: ["h2"],
  MsoSubtitle: ["h5"],
  MsoSubtleEmphasis: ["span", "em"],
  MsoIntenseEmphasis: ["span", "em", "strong"]
  // Remove cruft
};
function isWordHtml(html) {
  return WORD_HTML_REGEX.test(html);
}
var preprocessWord = (html, doc) => {
  if (!isWordHtml(html))
    return doc;
  const unwantedNodes = doc.evaluate(
    unwantedPaths.join("|"),
    doc,
    (prefix) => prefix === "o" ? "urn:schemas-microsoft-com:office:office" : null,
    _XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = unwantedNodes.snapshotLength - 1; i >= 0; i--) {
    const unwanted = unwantedNodes.snapshotItem(i);
    unwanted?.parentNode && unwanted.parentNode.removeChild(unwanted);
  }
  const mappedElements = doc.evaluate(
    mappedPaths.join("|"),
    doc,
    null,
    _XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = mappedElements.snapshotLength - 1; i >= 0; i--) {
    const mappedElm = mappedElements.snapshotItem(i), tags = elementMap[mappedElm.className], text = doc.createTextNode(mappedElm.textContent || "");
    if (!tags)
      continue;
    const parentElement = doc.createElement(tags[0]);
    let parent = parentElement, child = parentElement;
    tags.slice(1).forEach((tag) => {
      child = doc.createElement(tag), parent.appendChild(child), parent = child;
    }), child.appendChild(text), mappedElm?.parentNode?.replaceChild(parentElement, mappedElm);
  }
  return doc;
}, preprocessors = [
  preprocessWhitespace,
  preprocessNotion,
  preprocessWord,
  preprocessGDocs,
  preprocessHTML
];
function createRuleOptions(blockContentType) {
  const features = blockContentFeatures(blockContentType), enabledBlockStyles = features.styles.map(
    (item) => item.value || item.title
  ), enabledSpanDecorators = features.decorators.map(
    (item) => item.value || item.title
  ), enabledBlockAnnotations = features.annotations.map(
    (item) => item.value || item.title || ""
  ), enabledListTypes = features.lists.map(
    (item) => item.value || item.title || ""
  );
  return {
    enabledBlockStyles,
    enabledSpanDecorators,
    enabledBlockAnnotations,
    enabledListTypes
  };
}
function tagName(el) {
  if (el && "tagName" in el)
    return el.tagName.toLowerCase();
}
function preprocess(html, parseHtml, options) {
  const cleanHTML = O(html), doc = parseHtml(normalizeHtmlBeforePreprocess(cleanHTML));
  return preprocessors.forEach((processor) => {
    processor(cleanHTML, doc, options);
  }), doc;
}
function normalizeHtmlBeforePreprocess(html) {
  return html.trim();
}
function defaultParseHtml() {
  if (resolveJsType(DOMParser) === "undefined")
    throw new Error(
      "The native `DOMParser` global which the `Html` deserializer uses by default is not present in this environment. You must supply the `options.parseHtml` function instead."
    );
  return (html) => new DOMParser().parseFromString(html, "text/html");
}
function flattenNestedBlocks(blocks2) {
  let depth = 0;
  const flattened = [], traverse = (nodes) => {
    const toRemove = [];
    nodes.forEach((node) => {
      depth === 0 && flattened.push(node), isPortableTextTextBlock(node) && (depth > 0 && (toRemove.push(node), flattened.push(node)), depth++, traverse(node.children)), node._type === "__block" && (toRemove.push(node), flattened.push(node.block));
    }), toRemove.forEach((node) => {
      nodes.splice(nodes.indexOf(node), 1);
    }), depth--;
  };
  return traverse(blocks2), flattened;
}
function nextSpan(block, index) {
  const next = block.children[index + 1];
  return next && next._type === "span" ? next : null;
}
function prevSpan(block, index) {
  const prev = block.children[index - 1];
  return prev && prev._type === "span" ? prev : null;
}
function isWhiteSpaceChar(text) {
  return ["\xA0", " "].includes(text);
}
function trimWhitespace(blocks2) {
  return blocks2.forEach((block) => {
    isPortableTextTextBlock(block) && block.children.forEach((child, index) => {
      if (!isMinimalSpan(child))
        return;
      const nextChild = nextSpan(block, index), prevChild = prevSpan(block, index);
      index === 0 && (child.text = child.text.replace(/^[^\S\n]+/g, "")), index === block.children.length - 1 && (child.text = child.text.replace(/[^\S\n]+$/g, "")), /\s/.test(child.text.slice(Math.max(0, child.text.length - 1))) && nextChild && isMinimalSpan(nextChild) && /\s/.test(nextChild.text.slice(0, 1)) && (child.text = child.text.replace(/[^\S\n]+$/g, "")), /\s/.test(child.text.slice(0, 1)) && prevChild && isMinimalSpan(prevChild) && /\s/.test(prevChild.text.slice(Math.max(0, prevChild.text.length - 1))) && (child.text = child.text.replace(/^[^\S\n]+/g, "")), child.text || block.children.splice(index, 1), prevChild && isEqual(prevChild.marks, child.marks) && isWhiteSpaceChar(child.text) ? (prevChild.text += " ", block.children.splice(index, 1)) : nextChild && isEqual(nextChild.marks, child.marks) && isWhiteSpaceChar(child.text) && (nextChild.text = ` ${nextChild.text}`, block.children.splice(index, 1));
    });
  }), blocks2;
}
function ensureRootIsBlocks(blocks2) {
  return blocks2.reduce((memo, node, i, original) => {
    if (node._type === "block")
      return memo.push(node), memo;
    if (node._type === "__block")
      return memo.push(node.block), memo;
    const lastBlock = memo[memo.length - 1];
    if (i > 0 && !isPortableTextTextBlock(original[i - 1]) && isPortableTextTextBlock(lastBlock))
      return lastBlock.children.push(node), memo;
    const block = {
      ...DEFAULT_BLOCK,
      children: [node]
    };
    return memo.push(block), memo;
  }, []);
}
function isNodeList(node) {
  return Object.prototype.toString.call(node) === "[object NodeList]";
}
function isMinimalSpan(node) {
  return node._type === "span";
}
function isMinimalBlock(node) {
  return node._type === "block";
}
function isPlaceholderDecorator(node) {
  return node._type === "__decorator";
}
function isPlaceholderAnnotation(node) {
  return node._type === "__annotation";
}
function isElement(node) {
  return node.nodeType === 1;
}
function normalizeWhitespace(rootNode) {
  let emptyBlockCount = 0, lastParent = null;
  const nodesToRemove = [];
  for (let child = rootNode.firstChild; child; child = child.nextSibling) {
    if (!isElement(child)) {
      normalizeWhitespace(child), emptyBlockCount = 0;
      continue;
    }
    const elm = child;
    isWhitespaceBlock(elm) ? (lastParent && elm.parentElement === lastParent ? (emptyBlockCount++, emptyBlockCount > 1 && nodesToRemove.push(elm)) : emptyBlockCount = 1, lastParent = elm.parentElement) : (normalizeWhitespace(child), emptyBlockCount = 0);
  }
  nodesToRemove.forEach((node) => node.parentElement?.removeChild(node));
}
function removeAllWhitespace(rootNode) {
  const nodesToRemove = [];
  function collectNodesToRemove(currentNode) {
    if (isElement(currentNode)) {
      const elm = currentNode;
      if (tagName(elm) === "br" && (tagName(elm.nextElementSibling) === "p" || tagName(elm.previousElementSibling) === "p")) {
        nodesToRemove.push(elm);
        return;
      }
      if ((tagName(elm) === "p" || tagName(elm) === "br") && elm?.firstChild?.textContent?.trim() === "") {
        nodesToRemove.push(elm);
        return;
      }
      for (let child = elm.firstChild; child; child = child.nextSibling)
        collectNodesToRemove(child);
    }
  }
  collectNodesToRemove(rootNode), nodesToRemove.forEach((node) => node.parentElement?.removeChild(node));
}
function isWhitespaceBlock(elm) {
  return ["p", "br"].includes(tagName(elm) || "") && !elm.textContent?.trim();
}
const LIST_CONTAINER_TAGS = Object.keys(HTML_LIST_CONTAINER_TAGS);
function isEmphasis$1(el) {
  const style = isElement(el) && el.getAttribute("style");
  return /font-style\s*:\s*italic/.test(style || "");
}
function isStrong$1(el) {
  const style = isElement(el) && el.getAttribute("style");
  return /font-weight\s*:\s*700/.test(style || "");
}
function isUnderline$1(el) {
  if (!isElement(el) || tagName(el.parentNode) === "a")
    return !1;
  const style = isElement(el) && el.getAttribute("style");
  return /text-decoration\s*:\s*underline/.test(style || "");
}
function isStrikethrough(el) {
  const style = isElement(el) && el.getAttribute("style");
  return /text-decoration\s*:\s*(?:.*line-through.*;)/.test(style || "");
}
function isGoogleDocs(el) {
  return isElement(el) && !!el.getAttribute("data-is-google-docs");
}
function isRootNode(el) {
  return isElement(el) && !!el.getAttribute("data-is-root-node");
}
function getListItemStyle$1(el) {
  const parentTag = tagName(el.parentNode);
  if (!(parentTag && !LIST_CONTAINER_TAGS.includes(parentTag)))
    return tagName(el.parentNode) === "ul" ? "bullet" : "number";
}
function getListItemLevel$1(el) {
  let level = 0;
  if (tagName(el) === "li") {
    let parentNode = el.parentNode;
    for (; parentNode; ) {
      const parentTag = tagName(parentNode);
      parentTag && LIST_CONTAINER_TAGS.includes(parentTag) && level++, parentNode = parentNode.parentNode;
    }
  } else
    level = 1;
  return level;
}
const blocks = {
  ...HTML_BLOCK_TAGS,
  ...HTML_HEADER_TAGS
};
function getBlockStyle(el, enabledBlockStyles) {
  const childTag = tagName(el.firstChild), block = childTag && blocks[childTag];
  return block && enabledBlockStyles.includes(block.style) ? block.style : BLOCK_DEFAULT_STYLE;
}
function createGDocsRules(_blockContentType, options) {
  return [
    {
      deserialize(el) {
        if (isElement(el) && tagName(el) === "span" && isGoogleDocs(el)) {
          const span = {
            ...DEFAULT_SPAN,
            marks: [],
            text: el.textContent
          };
          return isStrong$1(el) && span.marks.push("strong"), isUnderline$1(el) && span.marks.push("underline"), isStrikethrough(el) && span.marks.push("strike-through"), isEmphasis$1(el) && span.marks.push("em"), span;
        }
      }
    },
    {
      deserialize(el, next) {
        if (tagName(el) === "li" && isGoogleDocs(el))
          return {
            ...DEFAULT_BLOCK,
            listItem: getListItemStyle$1(el),
            level: getListItemLevel$1(el),
            style: getBlockStyle(el, options.enabledBlockStyles),
            children: next(el.firstChild?.childNodes || [])
          };
      }
    },
    {
      deserialize(el) {
        if (tagName(el) === "br" && isGoogleDocs(el) && isElement(el) && el.classList.contains("apple-interchange-newline"))
          return {
            ...DEFAULT_SPAN,
            text: ""
          };
        if (tagName(el) === "br" && isGoogleDocs(el) && isElement(el) && el?.parentNode?.textContent === "")
          return {
            ...DEFAULT_SPAN,
            text: ""
          };
        if (tagName(el) === "br" && isGoogleDocs(el) && isElement(el) && isRootNode(el))
          return {
            ...DEFAULT_SPAN,
            text: ""
          };
      }
    }
  ];
}
function keyGenerator() {
  return randomKey(12);
}
function whatwgRNG(length = 16) {
  const rnds8 = new Uint8Array(length);
  return getRandomValues(rnds8), rnds8;
}
const byteToHex = [];
for (let i = 0; i < 256; ++i)
  byteToHex[i] = (i + 256).toString(16).slice(1);
function randomKey(length) {
  return whatwgRNG(length).reduce((str, n) => str + byteToHex[n], "").slice(0, length);
}
const whitespaceTextNodeRule = {
  deserialize(node) {
    return node.nodeName === "#text" && isWhitespaceTextNode(node) ? {
      ...DEFAULT_SPAN,
      marks: [],
      text: (node.textContent ?? "").replace(/\s\s+/g, " ")
    } : void 0;
  }
};
function isWhitespaceTextNode(node) {
  return (node.nodeType === 3 && (node.textContent || "").replace(/[\r\n]/g, " ").replace(/\s\s+/g, " ") === " " && node.nextSibling && node.nextSibling.nodeType !== 3 && node.previousSibling && node.previousSibling.nodeType !== 3 || node.textContent !== " ") && tagName(node.parentNode) !== "body";
}
function resolveListItem(listNodeTagName, enabledListTypes) {
  if (listNodeTagName === "ul" && enabledListTypes.includes("bullet"))
    return "bullet";
  if (listNodeTagName === "ol" && enabledListTypes.includes("number"))
    return "number";
}
function createHTMLRules(_blockContentType, options) {
  return [
    whitespaceTextNodeRule,
    {
      // Pre element
      deserialize(el) {
        if (tagName(el) !== "pre")
          return;
        const isCodeEnabled = options.enabledBlockStyles.includes("code");
        return {
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              ...DEFAULT_SPAN,
              marks: isCodeEnabled ? ["code"] : [],
              text: el.textContent || ""
            }
          ]
        };
      }
    },
    // Blockquote element
    {
      deserialize(el, next) {
        if (tagName(el) !== "blockquote")
          return;
        const blocks2 = {
          ...HTML_BLOCK_TAGS,
          ...HTML_HEADER_TAGS
        };
        delete blocks2.blockquote;
        const nonBlockquoteBlocks = Object.keys(blocks2), children = [];
        return el.childNodes.forEach((node, index) => {
          if (el.ownerDocument)
            if (node.nodeType === 1 && nonBlockquoteBlocks.includes(
              node.localName.toLowerCase()
            )) {
              const span = el.ownerDocument.createElement("span"), previousChild = children[children.length - 1];
              previousChild && previousChild.nodeType === 3 && previousChild.textContent?.trim() && span.appendChild(el.ownerDocument.createTextNode("\r")), node.childNodes.forEach((cn) => {
                span.appendChild(cn.cloneNode(!0));
              }), index !== el.childNodes.length && span.appendChild(el.ownerDocument.createTextNode("\r")), children.push(span);
            } else
              children.push(node);
        }), {
          _type: "block",
          style: "blockquote",
          markDefs: [],
          children: next(children)
        };
      }
    },
    // Block elements
    {
      deserialize(el, next) {
        const blocks2 = {
          ...HTML_BLOCK_TAGS,
          ...HTML_HEADER_TAGS
        }, tag = tagName(el);
        let block = tag ? blocks2[tag] : void 0;
        if (block)
          return el.parentNode && tagName(el.parentNode) === "li" ? next(el.childNodes) : (options.enabledBlockStyles.includes(block.style) || (block = DEFAULT_BLOCK), {
            ...block,
            children: next(el.childNodes)
          });
      }
    },
    // Ignore span tags
    {
      deserialize(el, next) {
        const tag = tagName(el);
        if (!(!tag || !(tag in HTML_SPAN_TAGS)))
          return next(el.childNodes);
      }
    },
    // Ignore div tags
    {
      deserialize(el, next) {
        if (tagName(el) === "div")
          return next(el.childNodes);
      }
    },
    // Ignore list containers
    {
      deserialize(el, next) {
        const tag = tagName(el);
        if (!(!tag || !(tag in HTML_LIST_CONTAINER_TAGS)))
          return next(el.childNodes);
      }
    },
    // Deal with br's
    {
      deserialize(el) {
        if (tagName(el) === "br")
          return {
            ...DEFAULT_SPAN,
            text: `
`
          };
      }
    },
    // Deal with list items
    {
      deserialize(el, next, block) {
        const tag = tagName(el), listItem = tag ? HTML_LIST_ITEM_TAGS[tag] : void 0, parentTag = tagName(el.parentNode) || "";
        if (!listItem || !el.parentNode || !HTML_LIST_CONTAINER_TAGS[parentTag])
          return;
        const enabledListItem = resolveListItem(
          parentTag,
          options.enabledListTypes
        );
        return enabledListItem ? (listItem.listItem = enabledListItem, {
          ...listItem,
          children: next(el.childNodes)
        }) : block({ _type: "block", children: next(el.childNodes) });
      }
    },
    // Deal with decorators - this is a limited set of known html elements that we know how to deserialize
    {
      deserialize(el, next) {
        const decorator = HTML_DECORATOR_TAGS[tagName(el) || ""];
        if (!(!decorator || !options.enabledSpanDecorators.includes(decorator)))
          return {
            _type: "__decorator",
            name: decorator,
            children: next(el.childNodes)
          };
      }
    },
    // Special case for hyperlinks, add annotation (if allowed by schema),
    // If not supported just write out the link text and href in plain text.
    {
      deserialize(el, next) {
        if (tagName(el) !== "a")
          return;
        const linkEnabled = options.enabledBlockAnnotations.includes("link"), href = isElement(el) && el.getAttribute("href");
        if (!href)
          return next(el.childNodes);
        let markDef;
        return linkEnabled ? (markDef = {
          _key: options.keyGenerator ? options.keyGenerator() : keyGenerator(),
          _type: "link",
          href
        }, {
          _type: "__annotation",
          markDef,
          children: next(el.childNodes)
        }) : el.appendChild(el.ownerDocument.createTextNode(` (${href})`)) && next(el.childNodes);
      }
    }
  ];
}
function isEmphasis(el) {
  const style = isElement(el) && el.getAttribute("style");
  return /font-style:italic/.test(style || "");
}
function isStrong(el) {
  const style = isElement(el) && el.getAttribute("style");
  return /font-weight:700/.test(style || "") || /font-weight:600/.test(style || "");
}
function isUnderline(el) {
  const style = isElement(el) && el.getAttribute("style");
  return /text-decoration:underline/.test(style || "");
}
function isNotion(el) {
  return isElement(el) && !!el.getAttribute("data-is-notion");
}
function createNotionRules(_blockContentType) {
  return [
    {
      deserialize(el) {
        if (isElement(el) && tagName(el) === "span" && isNotion(el)) {
          const span = {
            ...DEFAULT_SPAN,
            marks: [],
            text: el.textContent
          };
          return isStrong(el) && span.marks.push("strong"), isUnderline(el) && span.marks.push("underline"), isEmphasis(el) && span.marks.push("em"), span;
        }
      }
    }
  ];
}
function getListItemStyle(el) {
  const style = isElement(el) && el.getAttribute("style");
  if (style && style.match(/lfo\d+/))
    return style.match("lfo1") ? "bullet" : "number";
}
function getListItemLevel(el) {
  const style = isElement(el) && el.getAttribute("style");
  if (!style)
    return;
  const levelMatch = style.match(/level\d+/);
  if (!levelMatch)
    return;
  const [level] = levelMatch[0].match(/\d/) || [];
  return (level ? Number.parseInt(level, 10) : 1) || 1;
}
function isWordListElement(el) {
  return isElement(el) && el.className ? el.className === "MsoListParagraphCxSpFirst" || el.className === "MsoListParagraphCxSpMiddle" || el.className === "MsoListParagraphCxSpLast" : !1;
}
function createWordRules() {
  return [
    {
      deserialize(el, next) {
        if (tagName(el) === "p" && isWordListElement(el))
          return {
            ...DEFAULT_BLOCK,
            listItem: getListItemStyle(el),
            level: getListItemLevel(el),
            style: BLOCK_DEFAULT_STYLE,
            children: next(el.childNodes)
          };
      }
    }
  ];
}
function createRules(blockContentType, options) {
  return [
    ...createWordRules(),
    ...createNotionRules(),
    ...createGDocsRules(blockContentType, options),
    ...createHTMLRules(blockContentType, options)
  ];
}
class HtmlDeserializer {
  blockContentType;
  rules;
  parseHtml;
  _markDefs = [];
  /**
   * Create a new serializer respecting a Sanity block content type's schema
   *
   * @param blockContentType - Schema type for array containing _at least_ a block child type
   * @param options - Options for the deserialization process
   */
  constructor(blockContentType, options = {}) {
    const { rules = [], unstable_whitespaceOnPasteMode = "preserve" } = options;
    if (!blockContentType)
      throw new Error("Parameter 'blockContentType' is required");
    const standardRules = createRules(blockContentType, {
      ...createRuleOptions(blockContentType),
      keyGenerator: options.keyGenerator
    });
    this.rules = [...rules, ...standardRules];
    const parseHtml = options.parseHtml || defaultParseHtml();
    this.blockContentType = blockContentType, this.parseHtml = (html) => preprocess(html, parseHtml, { unstable_whitespaceOnPasteMode }).body;
  }
  /**
   * Deserialize HTML.
   *
   * @param html - The HTML to deserialize, as a string
   * @returns Array of blocks - either portable text blocks or other allowed blocks
   */
  deserialize = (html) => {
    this._markDefs = [];
    const { parseHtml } = this, fragment = parseHtml(html), children = Array.from(fragment.childNodes), blocks2 = trimWhitespace(
      flattenNestedBlocks(
        ensureRootIsBlocks(this.deserializeElements(children))
      )
    );
    this._markDefs.length > 0 && blocks2.filter(
      (block) => block._type === "block"
    ).forEach((block) => {
      block.markDefs = block.markDefs || [], block.markDefs = block.markDefs.concat(
        this._markDefs.filter((def) => flatten(
          block.children.map((child) => child.marks || [])
        ).includes(def._key))
      );
    });
    const type = this.blockContentType.of.find(findBlockType);
    return type ? blocks2.map((block) => (block._type === "block" && (block._type = type.name), block)) : blocks2;
  };
  /**
   * Deserialize an array of DOM elements.
   *
   * @param elements - Array of DOM elements to deserialize
   * @returns
   */
  deserializeElements = (elements = []) => {
    let nodes = [];
    return elements.forEach((element) => {
      nodes = nodes.concat(this.deserializeElement(element));
    }), nodes;
  };
  /**
   * Deserialize a DOM element
   *
   * @param element - Deserialize a DOM element
   * @returns
   */
  deserializeElement = (element) => {
    const next = (elements) => {
      if (isNodeList(elements))
        return this.deserializeElements(Array.from(elements));
      if (Array.isArray(elements))
        return this.deserializeElements(elements);
      if (elements)
        return this.deserializeElement(elements);
    }, block = (props) => ({
      _type: "__block",
      block: props
    });
    let node;
    for (let i = 0; i < this.rules.length; i++) {
      const rule = this.rules[i];
      if (!rule.deserialize)
        continue;
      const ret = rule.deserialize(element, next, block), type = resolveJsType(ret);
      if (type !== "array" && type !== "object" && type !== "null" && type !== "undefined")
        throw new Error(
          `A rule returned an invalid deserialized representation: "${node}".`
        );
      if (ret !== void 0) {
        {
          if (ret === null)
            throw new Error("Deserializer rule returned `null`");
          Array.isArray(ret) ? node = ret : isPlaceholderDecorator(ret) ? node = this.deserializeDecorator(ret) : isPlaceholderAnnotation(ret) ? node = this.deserializeAnnotation(ret) : node = ret;
        }
        if (ret && !Array.isArray(ret) && isMinimalBlock(ret) && "listItem" in ret) {
          let parent = element.parentNode?.parentNode;
          for (; parent && tagName(parent) === "li"; )
            parent = parent.parentNode?.parentNode, ret.level = ret.level ? ret.level + 1 : 1;
        }
        ret && !Array.isArray(ret) && isMinimalBlock(ret) && ret.style === "blockquote" && ret.children.forEach((child, index) => {
          isMinimalSpan(child) && child.text === "\r" && (child.text = `
`, (index === 0 || index === ret.children.length - 1) && ret.children.splice(index, 1));
        });
        break;
      }
    }
    return node || next(element.childNodes) || [];
  };
  /**
   * Deserialize a `__decorator` type
   * (an internal made up type to process decorators exclusively)
   *
   * @param decorator -
   * @returns array of ...
   */
  deserializeDecorator = (decorator) => {
    const { name } = decorator, applyDecorator = (node) => {
      if (isPlaceholderDecorator(node))
        return this.deserializeDecorator(node);
      if (isMinimalSpan(node))
        node.marks = node.marks || [], node.text.trim() && node.marks.unshift(name);
      else if ("children" in node && Array.isArray(node.children)) {
        const block = node;
        block.children = block.children.map(applyDecorator);
      }
      return node;
    };
    return decorator.children.reduce((children, node) => {
      const ret = applyDecorator(node);
      return Array.isArray(ret) ? children.concat(ret) : (children.push(ret), children);
    }, []);
  };
  /**
   * Deserialize a `__annotation` object.
   * (an internal made up type to process annotations exclusively)
   *
   * @param annotation -
   * @returns Array of...
   */
  deserializeAnnotation = (annotation) => {
    const { markDef } = annotation;
    this._markDefs.push(markDef);
    const applyAnnotation = (node) => {
      if (isPlaceholderAnnotation(node))
        return this.deserializeAnnotation(node);
      if (isMinimalSpan(node))
        node.marks = node.marks || [], node.text.trim() && node.marks.unshift(markDef._key);
      else if ("children" in node && Array.isArray(node.children)) {
        const block = node;
        block.children = block.children.map(applyAnnotation);
      }
      return node;
    };
    return annotation.children.reduce((children, node) => {
      const ret = applyAnnotation(node);
      return Array.isArray(ret) ? children.concat(ret) : (children.push(ret), children);
    }, []);
  };
}
function normalizeBlock(node, options = {}) {
  if (node._type !== (options.blockTypeName || "block"))
    return "_key" in node ? node : {
      ...node,
      _key: options.keyGenerator ? options.keyGenerator() : keyGenerator()
    };
  const block = {
    _key: options.keyGenerator ? options.keyGenerator() : keyGenerator(),
    children: [],
    markDefs: [],
    ...node
  }, lastChild = block.children[block.children.length - 1];
  if (!lastChild)
    return block.children = [
      {
        _type: "span",
        _key: options.keyGenerator ? options.keyGenerator() : keyGenerator(),
        text: "",
        marks: []
      }
    ], block;
  const usedMarkDefs = [], allowedDecorators = options.allowedDecorators && Array.isArray(options.allowedDecorators) ? options.allowedDecorators : !1;
  return block.children = block.children.reduce(
    (acc, child) => {
      const previousChild = acc[acc.length - 1];
      return previousChild && isPortableTextSpan(child) && isPortableTextSpan(previousChild) && isEqual(previousChild.marks, child.marks) ? (lastChild && lastChild === child && child.text === "" && block.children.length > 1 || (previousChild.text += child.text), acc) : (acc.push(child), acc);
    },
    []
  ).map((child) => {
    if (!child)
      throw new Error("missing child");
    return child._key = options.keyGenerator ? options.keyGenerator() : keyGenerator(), isPortableTextSpan(child) && (child.marks ? allowedDecorators && (child.marks = child.marks.filter((mark) => {
      const isAllowed = allowedDecorators.includes(mark), isUsed = block.markDefs?.some((def) => def._key === mark);
      return isAllowed || isUsed;
    })) : child.marks = [], usedMarkDefs.push(...child.marks)), child;
  }), block.markDefs = (block.markDefs || []).filter(
    (markDef) => usedMarkDefs.includes(markDef._key)
  ), block;
}
function htmlToBlocks(html, blockContentType, options = {}) {
  return new HtmlDeserializer(blockContentType, options).deserialize(html).map((block) => normalizeBlock(block, { keyGenerator: options.keyGenerator }));
}
function getBlockContentFeatures(blockContentType) {
  return blockContentFeatures(blockContentType);
}
export {
  getBlockContentFeatures,
  htmlToBlocks,
  normalizeBlock,
  randomKey
};
//# sourceMappingURL=index.js.map
