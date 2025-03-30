"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var jsxRuntime = require("react/jsx-runtime"), react = require("react"), __defProp$1 = Object.defineProperty, __getOwnPropSymbols$1 = Object.getOwnPropertySymbols, __hasOwnProp$1 = Object.prototype.hasOwnProperty, __propIsEnum$1 = Object.prototype.propertyIsEnumerable, __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value, __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    __hasOwnProp$1.call(b, prop) && __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b))
      __propIsEnum$1.call(b, prop) && __defNormalProp$1(a, prop, b[prop]);
  return a;
};
const Pane = function(props) {
  const { children, className, split, style: styleProps, size, eleRef } = props;
  let style = {
    flex: 1,
    position: "relative",
    outline: "none"
  };
  size !== void 0 && (split === "vertical" ? style.width = size : (style.height = size, style.display = "flex"), style.flex = "none"), style = __spreadValues$1(__spreadValues$1({}, style), styleProps);
  const classes = ["Pane", split, className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsx("div", { role: "region", ref: eleRef, className: classes, style, children });
}, RESIZER_DEFAULT_CLASSNAME = "Resizer", Resizer = function(props) {
  const {
    className = RESIZER_DEFAULT_CLASSNAME,
    onClick,
    onDoubleClick,
    onMouseDown,
    onTouchEnd,
    onTouchStart,
    resizerClassName,
    split,
    style
  } = props, classes = [resizerClassName, split, className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      role: "separator",
      className: classes,
      style,
      onMouseDown: (event) => onMouseDown(event.nativeEvent),
      onTouchStart: (event) => {
        event.preventDefault(), onTouchStart(event.nativeEvent);
      },
      onTouchEnd: (event) => {
        event.preventDefault(), onTouchEnd(event.nativeEvent);
      },
      onClick: (event) => {
        onClick && (event.preventDefault(), onClick(event.nativeEvent));
      },
      onDoubleClick: (event) => {
        onDoubleClick && (event.preventDefault(), onDoubleClick(event.nativeEvent));
      }
    }
  );
};
var __defProp = Object.defineProperty, __defProps = Object.defineProperties, __getOwnPropDescs = Object.getOwnPropertyDescriptors, __getOwnPropSymbols = Object.getOwnPropertySymbols, __hasOwnProp = Object.prototype.hasOwnProperty, __propIsEnum = Object.prototype.propertyIsEnumerable, __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value }) : obj[key] = value, __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b))
      __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);
  return a;
}, __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b)), __publicField = (obj, key, value) => __defNormalProp(obj, typeof key != "symbol" ? key + "" : key, value);
const BASE_STYLES = {
  display: "flex",
  flex: 1,
  height: "100%",
  position: "absolute",
  outline: "none",
  overflow: "hidden",
  MozUserSelect: "text",
  WebkitUserSelect: "text",
  msUserSelect: "text",
  userSelect: "text"
}, VERTICAL_STYLES = __spreadProps(__spreadValues({}, BASE_STYLES), {
  flexDirection: "row",
  left: 0,
  right: 0
}), HORIZONTAL_STYLES = __spreadProps(__spreadValues({}, BASE_STYLES), {
  bottom: 0,
  flexDirection: "column",
  minHeight: "100%",
  top: 0,
  width: "100%"
}), EMPTY_STYLES = {}, _SplitPane = class _SplitPane2 extends react.Component {
  constructor(props) {
    super(props), __publicField(this, "pane1", null), __publicField(this, "pane2", null), __publicField(this, "splitPane", null), this.onMouseDown = this.onMouseDown.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.onMouseMove = this.onMouseMove.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.onMouseUp = this.onMouseUp.bind(this);
    const { size, defaultSize, minSize, maxSize, primary } = props, initialSize = size !== void 0 ? size : getDefaultSize(defaultSize, minSize, maxSize, void 0);
    this.state = {
      active: !1,
      resized: !1,
      pane1Size: primary === "first" ? initialSize : void 0,
      pane2Size: primary === "second" ? initialSize : void 0,
      // these are props that are needed in static functions. ie: gDSFP
      instanceProps: {
        size
      }
    };
  }
  componentDidMount() {
    document.addEventListener("mouseup", this.onMouseUp), document.addEventListener("mousemove", this.onMouseMove), document.addEventListener("touchmove", this.onTouchMove), this.setState(_SplitPane2.getSizeUpdate(this.props, this.state));
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return _SplitPane2.getSizeUpdate(nextProps, prevState);
  }
  componentWillUnmount() {
    document.removeEventListener("mouseup", this.onMouseUp), document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("touchmove", this.onTouchMove);
  }
  onMouseDown(event) {
    this.onTouchStart(__spreadProps(__spreadValues({}, event), {
      touches: [{ clientX: event.clientX, clientY: event.clientY }]
    }));
  }
  onTouchStart(event) {
    const { allowResize, onDragStarted, split } = this.props;
    if (allowResize) {
      unFocus(document, window);
      const position = split === "vertical" ? event.touches[0].clientX : event.touches[0].clientY;
      typeof onDragStarted == "function" && onDragStarted(), this.setState({
        active: !0,
        position
      });
    }
  }
  onMouseMove(event) {
    const eventWithTouches = Object.assign({}, event, {
      touches: [{ clientX: event.clientX, clientY: event.clientY }]
    });
    this.onTouchMove(eventWithTouches);
  }
  onTouchMove(event) {
    if (!this.state.active || !this.props.allowResize)
      return;
    const { position = 0 } = this.state, {
      maxSize,
      minSize = _SplitPane2.defaultProps.minSize,
      onChange,
      split = _SplitPane2.defaultProps.split,
      step
    } = this.props;
    unFocus(document, window);
    const isPrimaryFirst = this.props.primary === "first", ref = isPrimaryFirst ? this.pane1 : this.pane2, ref2 = isPrimaryFirst ? this.pane2 : this.pane1;
    if (!ref || !ref2 || !ref.getBoundingClientRect)
      return;
    const node = ref, node2 = ref2, width = node.getBoundingClientRect().width, height = node.getBoundingClientRect().height, current = split === "vertical" ? event.touches[0].clientX : event.touches[0].clientY, size = split === "vertical" ? width : height;
    let positionDelta = position - current;
    if (step) {
      if (Math.abs(positionDelta) < step)
        return;
      positionDelta = ~~(positionDelta / step) * step;
    }
    let sizeDelta = isPrimaryFirst ? positionDelta : -positionDelta;
    const pane1Order = parseInt(window.getComputedStyle(node).order), pane2Order = parseInt(window.getComputedStyle(node2).order);
    pane1Order > pane2Order && (sizeDelta = -sizeDelta);
    let newMaxSize = maxSize;
    this.splitPane && maxSize !== void 0 && maxSize <= 0 && (split === "vertical" ? newMaxSize = this.splitPane.getBoundingClientRect().width + maxSize : newMaxSize = this.splitPane.getBoundingClientRect().height + maxSize);
    let newSize = size - sizeDelta;
    const newPosition = position - positionDelta;
    minSize && newSize < minSize ? newSize = minSize : newMaxSize !== void 0 && newSize > newMaxSize ? newSize = newMaxSize : this.setState({
      position: newPosition,
      resized: !0
    }), onChange && onChange(newSize);
    const sizeState = isPrimaryFirst ? { pane1Size: newSize, pane2Size: void 0 } : { pane2Size: newSize, pane1Size: void 0 };
    this.setState(__spreadValues({ draggedSize: newSize }, sizeState));
  }
  onMouseUp() {
    if (!this.state.active || !this.props.allowResize)
      return;
    const { onDragFinished } = this.props, { draggedSize } = this.state;
    typeof draggedSize < "u" && typeof onDragFinished == "function" && onDragFinished(draggedSize), this.setState({ active: !1 });
  }
  // we have to check values since gDSFP is called on every render and more in StrictMode
  static getSizeUpdate(props, state) {
    const { instanceProps } = state;
    if (instanceProps.size === props.size && props.size !== void 0)
      return {};
    const newSize = props.size !== void 0 ? props.size : getDefaultSize(
      props.defaultSize,
      props.minSize,
      props.maxSize,
      state.draggedSize
    ), sizeState = props.primary === "first" ? { pane1Size: newSize, pane2Size: void 0 } : { pane2Size: newSize, pane1Size: void 0 };
    return __spreadProps(__spreadValues(__spreadValues({}, sizeState), typeof props.size > "u" ? {} : { draggedSize: newSize }), {
      instanceProps: { size: props.size }
    });
  }
  render() {
    const {
      allowResize,
      children,
      className,
      onResizerClick,
      onResizerDoubleClick,
      paneClassName,
      pane1ClassName,
      pane2ClassName,
      paneStyle,
      pane1Style: pane1StyleProps,
      pane2Style: pane2StyleProps,
      resizerClassName = RESIZER_DEFAULT_CLASSNAME,
      resizerStyle,
      split,
      style: styleProps
    } = this.props, { pane1Size, pane2Size } = this.state, disabledClass = allowResize ? "" : "disabled", resizerClassNamesIncludingDefault = resizerClassName && `${resizerClassName} ${RESIZER_DEFAULT_CLASSNAME}`, notNullChildren = removeNullChildren(children), baseStyles = split === "vertical" ? VERTICAL_STYLES : HORIZONTAL_STYLES, style = styleProps ? __spreadValues(__spreadValues({}, baseStyles), styleProps) : baseStyles, classes = ["SplitPane", className, split, disabledClass].filter(Boolean).join(" "), pane1Style = coalesceOnEmpty(
      __spreadValues(__spreadValues({}, paneStyle), pane1StyleProps),
      EMPTY_STYLES
    ), pane2Style = coalesceOnEmpty(
      __spreadValues(__spreadValues({}, paneStyle), pane2StyleProps),
      EMPTY_STYLES
    ), pane1Classes = ["Pane1", paneClassName, pane1ClassName].join(" "), pane2Classes = ["Pane2", paneClassName, pane2ClassName].join(" ");
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        "data-testid": "split-pane",
        className: classes,
        style,
        ref: (node) => {
          this.splitPane = node;
        },
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            Pane,
            {
              className: pane1Classes,
              eleRef: (node) => {
                this.pane1 = node;
              },
              size: pane1Size,
              split,
              style: pane1Style,
              children: notNullChildren[0]
            },
            "pane1"
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            Resizer,
            {
              className: disabledClass,
              onClick: onResizerClick,
              onDoubleClick: onResizerDoubleClick,
              onMouseDown: this.onMouseDown,
              onTouchStart: this.onTouchStart,
              onTouchEnd: this.onMouseUp,
              resizerClassName: resizerClassNamesIncludingDefault,
              split: split || "vertical",
              style: resizerStyle || EMPTY_STYLES
            },
            "resizer"
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            Pane,
            {
              className: pane2Classes,
              eleRef: (node) => {
                this.pane2 = node;
              },
              size: pane2Size,
              split,
              style: pane2Style,
              children: notNullChildren[1]
            },
            "pane2"
          )
        ]
      }
    );
  }
};
__publicField(_SplitPane, "defaultProps", {
  allowResize: !0,
  minSize: 50,
  primary: "first",
  split: "vertical",
  paneClassName: "",
  pane1ClassName: "",
  pane2ClassName: ""
});
let SplitPane = _SplitPane;
function unFocus(document2, window2) {
  var _a;
  if ("selection" in document2 && typeof document2.selection == "object" && document2.selection && "empty" in document2.selection && typeof document2.selection.empty == "function")
    try {
      document2.selection.empty();
    } catch (e) {
    }
  else if (typeof window2 < "u" && typeof window2.getSelection == "function")
    try {
      (_a = window2.getSelection()) == null || _a.removeAllRanges();
    } catch (e) {
    }
}
function getDefaultSize(defaultSize, minSize, maxSize, draggedSize) {
  if (typeof draggedSize == "number") {
    const min = typeof minSize == "number" ? minSize : 0, max = typeof maxSize == "number" && maxSize >= 0 ? maxSize : 1 / 0;
    return Math.max(min, Math.min(max, draggedSize));
  }
  return defaultSize !== void 0 ? defaultSize : minSize;
}
function removeNullChildren(children) {
  return react.Children.toArray(children).filter((c) => c);
}
function isEmptyish(obj) {
  return obj === null || typeof obj > "u" || Object.keys(obj).length === 0;
}
function coalesceOnEmpty(obj, useOnEmpty) {
  return isEmptyish(obj) ? useOnEmpty : obj;
}
exports.Pane = Pane;
exports.SplitPane = SplitPane;
//# sourceMappingURL=index.cjs.map
