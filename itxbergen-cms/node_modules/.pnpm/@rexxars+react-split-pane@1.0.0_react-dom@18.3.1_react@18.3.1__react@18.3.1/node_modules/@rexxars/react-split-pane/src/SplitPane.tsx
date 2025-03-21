import { Children, Component, CSSProperties, ReactNode } from 'react';
import { Pane } from './Pane.js';
import { Resizer, RESIZER_DEFAULT_CLASSNAME } from './Resizer.js';

const BASE_STYLES: CSSProperties = {
  display: 'flex',
  flex: 1,
  height: '100%',
  position: 'absolute',
  outline: 'none',
  overflow: 'hidden',
  MozUserSelect: 'text',
  WebkitUserSelect: 'text',
  msUserSelect: 'text',
  userSelect: 'text',
};

const VERTICAL_STYLES: CSSProperties = {
  ...BASE_STYLES,
  flexDirection: 'row',
  left: 0,
  right: 0,
};

const HORIZONTAL_STYLES: CSSProperties = {
  ...BASE_STYLES,
  bottom: 0,
  flexDirection: 'column',
  minHeight: '100%',
  top: 0,
  width: '100%',
};

const EMPTY_STYLES: CSSProperties = {};

/**
 * @public
 */
export interface SplitPaneProps {
  allowResize?: boolean;
  className?: string;
  primary?: 'first' | 'second';
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  size?: number;
  split?: 'vertical' | 'horizontal';
  onDragStarted?: () => void;
  onDragFinished?: (newSize: number) => void;
  onChange?: (newSize: number) => void;
  onResizerClick?: (event: MouseEvent) => void;
  onResizerDoubleClick?: (event: MouseEvent) => void;
  style?: CSSProperties;
  resizerStyle?: CSSProperties;
  paneStyle?: CSSProperties;
  pane1Style?: CSSProperties;
  pane2Style?: CSSProperties;
  paneClassName?: string;
  pane1ClassName?: string;
  pane2ClassName?: string;
  resizerClassName?: string;
  step?: number;
  children?: ReactNode;
}

/**
 * @public
 */
export interface SplitPaneState {
  active: boolean;
  resized: boolean;

  pane1Size?: number;
  pane2Size?: number;

  position?: number;
  draggedSize?: number;

  instanceProps: { size?: number };
}

/**
 * @public
 */
export type MinimalTouchEvent = MouseEvent & {
  touches: Array<{ clientX: number; clientY: number }>;
};

/**
 * @public
 */
export class SplitPane extends Component<SplitPaneProps, SplitPaneState> {
  static defaultProps = {
    allowResize: true,
    minSize: 50,
    primary: 'first',
    split: 'vertical',
    paneClassName: '',
    pane1ClassName: '',
    pane2ClassName: '',
  };

  pane1: HTMLDivElement | null = null;
  pane2: HTMLDivElement | null = null;
  splitPane: HTMLDivElement | null = null;

  constructor(props: SplitPaneProps) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    // order of setting panel sizes.
    // 1. size
    // 2. getDefaultSize(defaultSize, minsize, maxSize)

    const { size, defaultSize, minSize, maxSize, primary } = props;

    const initialSize =
      size !== undefined
        ? size
        : getDefaultSize(defaultSize, minSize, maxSize, undefined);

    this.state = {
      active: false,
      resized: false,
      pane1Size: primary === 'first' ? initialSize : undefined,
      pane2Size: primary === 'second' ? initialSize : undefined,

      // these are props that are needed in static functions. ie: gDSFP
      instanceProps: {
        size,
      },
    };
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('touchmove', this.onTouchMove);
    this.setState(SplitPane.getSizeUpdate(this.props, this.state));
  }

  static getDerivedStateFromProps(
    nextProps: SplitPaneProps,
    prevState: SplitPaneState
  ) {
    return SplitPane.getSizeUpdate(nextProps, prevState);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('touchmove', this.onTouchMove);
  }

  onMouseDown(event: MouseEvent) {
    this.onTouchStart({
      ...event,
      touches: [{ clientX: event.clientX, clientY: event.clientY }],
    });
  }

  onTouchStart(event: MinimalTouchEvent | TouchEvent) {
    const { allowResize, onDragStarted, split } = this.props;
    if (allowResize) {
      unFocus(document, window);
      const position =
        split === 'vertical'
          ? event.touches[0].clientX
          : event.touches[0].clientY;

      if (typeof onDragStarted === 'function') {
        onDragStarted();
      }
      this.setState({
        active: true,
        position,
      });
    }
  }

  onMouseMove(event: MouseEvent) {
    const eventWithTouches = Object.assign({}, event, {
      touches: [{ clientX: event.clientX, clientY: event.clientY }],
    });
    this.onTouchMove(eventWithTouches);
  }

  onTouchMove(event: MinimalTouchEvent | TouchEvent) {
    if (!this.state.active || !this.props.allowResize) {
      return;
    }

    const { position = 0 } = this.state;
    const {
      maxSize,
      minSize = SplitPane.defaultProps.minSize,
      onChange,
      split = SplitPane.defaultProps.split,
      step,
    } = this.props;

    unFocus(document, window);
    const isPrimaryFirst = this.props.primary === 'first';
    const ref = isPrimaryFirst ? this.pane1 : this.pane2;
    const ref2 = isPrimaryFirst ? this.pane2 : this.pane1;

    if (!ref || !ref2 || !ref.getBoundingClientRect) {
      return;
    }

    const node = ref;
    const node2 = ref2;

    const width = node.getBoundingClientRect().width;
    const height = node.getBoundingClientRect().height;
    const current =
      split === 'vertical'
        ? event.touches[0].clientX
        : event.touches[0].clientY;
    const size = split === 'vertical' ? width : height;

    let positionDelta = position - current;
    if (step) {
      if (Math.abs(positionDelta) < step) {
        return;
      }
      // Integer division
      positionDelta = ~~(positionDelta / step) * step;
    }
    let sizeDelta = isPrimaryFirst ? positionDelta : -positionDelta;

    const pane1Order = parseInt(window.getComputedStyle(node).order);
    const pane2Order = parseInt(window.getComputedStyle(node2).order);
    if (pane1Order > pane2Order) {
      sizeDelta = -sizeDelta;
    }

    let newMaxSize = maxSize;
    if (this.splitPane && maxSize !== undefined && maxSize <= 0) {
      if (split === 'vertical') {
        newMaxSize = this.splitPane.getBoundingClientRect().width + maxSize;
      } else {
        newMaxSize = this.splitPane.getBoundingClientRect().height + maxSize;
      }
    }

    let newSize = size - sizeDelta;
    const newPosition = position - positionDelta;

    if (minSize && newSize < minSize) {
      newSize = minSize;
    } else if (newMaxSize !== undefined && newSize > newMaxSize) {
      newSize = newMaxSize;
    } else {
      this.setState({
        position: newPosition,
        resized: true,
      });
    }

    if (onChange) onChange(newSize);

    const sizeState = isPrimaryFirst
      ? { pane1Size: newSize, pane2Size: undefined }
      : { pane2Size: newSize, pane1Size: undefined };

    this.setState({ draggedSize: newSize, ...sizeState });
  }

  onMouseUp() {
    if (!this.state.active || !this.props.allowResize) {
      return;
    }

    const { onDragFinished } = this.props;
    const { draggedSize } = this.state;

    if (
      typeof draggedSize !== 'undefined' &&
      typeof onDragFinished === 'function'
    ) {
      onDragFinished(draggedSize);
    }

    this.setState({ active: false });
  }

  // we have to check values since gDSFP is called on every render and more in StrictMode
  static getSizeUpdate(props: SplitPaneProps, state: SplitPaneState) {
    const { instanceProps } = state;

    if (instanceProps.size === props.size && props.size !== undefined) {
      return {};
    }

    const newSize =
      props.size !== undefined
        ? props.size
        : getDefaultSize(
            props.defaultSize,
            props.minSize,
            props.maxSize,
            state.draggedSize
          );

    const isPrimaryFirst = props.primary === 'first';
    const sizeState = isPrimaryFirst
      ? { pane1Size: newSize, pane2Size: undefined }
      : { pane2Size: newSize, pane1Size: undefined };

    return {
      ...sizeState,
      ...(typeof props.size === 'undefined' ? {} : { draggedSize: newSize }),
      instanceProps: { size: props.size },
    };
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
      style: styleProps,
    } = this.props;

    const { pane1Size, pane2Size } = this.state;

    const disabledClass = allowResize ? '' : 'disabled';
    const resizerClassNamesIncludingDefault = resizerClassName
      ? `${resizerClassName} ${RESIZER_DEFAULT_CLASSNAME}`
      : resizerClassName;

    const notNullChildren = removeNullChildren(children);

    const baseStyles =
      split === 'vertical' ? VERTICAL_STYLES : HORIZONTAL_STYLES;

    const style: CSSProperties = styleProps
      ? { ...baseStyles, ...styleProps }
      : baseStyles;

    const classes = ['SplitPane', className, split, disabledClass]
      .filter(Boolean)
      .join(' ');

    const pane1Style = coalesceOnEmpty(
      { ...paneStyle, ...pane1StyleProps },
      EMPTY_STYLES
    );
    const pane2Style = coalesceOnEmpty(
      { ...paneStyle, ...pane2StyleProps },
      EMPTY_STYLES
    );

    const pane1Classes = ['Pane1', paneClassName, pane1ClassName].join(' ');
    const pane2Classes = ['Pane2', paneClassName, pane2ClassName].join(' ');

    return (
      <div
        data-testid="split-pane"
        className={classes}
        style={style}
        ref={(node) => {
          this.splitPane = node;
        }}
      >
        <Pane
          className={pane1Classes}
          key="pane1"
          eleRef={(node) => {
            this.pane1 = node;
          }}
          size={pane1Size}
          split={split}
          style={pane1Style}
        >
          {notNullChildren[0]}
        </Pane>
        <Resizer
          className={disabledClass}
          onClick={onResizerClick}
          onDoubleClick={onResizerDoubleClick}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onMouseUp}
          key="resizer"
          resizerClassName={resizerClassNamesIncludingDefault}
          split={split || 'vertical'}
          style={resizerStyle || EMPTY_STYLES}
        />
        <Pane
          className={pane2Classes}
          key="pane2"
          eleRef={(node) => {
            this.pane2 = node;
          }}
          size={pane2Size}
          split={split}
          style={pane2Style}
        >
          {notNullChildren[1]}
        </Pane>
      </div>
    );
  }
}

function unFocus(
  document: (typeof globalThis)['document'],
  window: (typeof globalThis)['window']
) {
  if (
    'selection' in document &&
    typeof document.selection === 'object' &&
    document.selection &&
    'empty' in document.selection &&
    typeof document.selection.empty === 'function'
  ) {
    try {
      document.selection.empty();
    } catch (e) {}
  } else if (
    typeof window !== 'undefined' &&
    typeof window.getSelection === 'function'
  ) {
    try {
      window.getSelection()?.removeAllRanges();
    } catch (e) {}
  }
}

function getDefaultSize(
  defaultSize: number | undefined,
  minSize: number | undefined,
  maxSize: number | undefined,
  draggedSize: number | undefined
) {
  if (typeof draggedSize === 'number') {
    const min = typeof minSize === 'number' ? minSize : 0;
    const max =
      typeof maxSize === 'number' && maxSize >= 0 ? maxSize : Infinity;
    return Math.max(min, Math.min(max, draggedSize));
  }
  if (defaultSize !== undefined) {
    return defaultSize;
  }
  return minSize;
}

function removeNullChildren(children: ReactNode): ReactNode[] {
  return Children.toArray(children).filter((c) => c);
}

function isEmptyish(obj: Record<string, unknown> | null | undefined): boolean {
  return (
    obj === null || typeof obj === 'undefined' || Object.keys(obj).length === 0
  );
}

function coalesceOnEmpty<T>(
  obj: Record<string, unknown> | null | undefined,
  useOnEmpty: T
): T {
  return isEmptyish(obj) ? useOnEmpty : (obj as T);
}
