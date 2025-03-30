import { Component } from 'react';
import { CSSProperties } from 'react';
import type { FunctionComponent } from 'react';
import { JSX } from 'react/jsx-runtime';
import type { PropsWithChildren } from 'react';
import { ReactNode } from 'react';

/**
 * @public
 */
export declare type MinimalTouchEvent = MouseEvent & {
  touches: Array<{
    clientX: number;
    clientY: number;
  }>;
};

/**
 * @public
 */
export declare const Pane: FunctionComponent<PaneProps>;

/**
 * @public
 */
export declare type PaneProps = PropsWithChildren<{
  className?: string;
  size?: number;
  split?: 'vertical' | 'horizontal';
  style?: CSSProperties;
  eleRef?: (el: HTMLDivElement) => void;
}>;

/**
 * @public
 */
export declare class SplitPane extends Component<
  SplitPaneProps,
  SplitPaneState
> {
  static defaultProps: {
    allowResize: boolean;
    minSize: number;
    primary: string;
    split: string;
    paneClassName: string;
    pane1ClassName: string;
    pane2ClassName: string;
  };
  pane1: HTMLDivElement | null;
  pane2: HTMLDivElement | null;
  splitPane: HTMLDivElement | null;
  constructor(props: SplitPaneProps);
  componentDidMount(): void;
  static getDerivedStateFromProps(
    nextProps: SplitPaneProps,
    prevState: SplitPaneState
  ): {};
  componentWillUnmount(): void;
  onMouseDown(event: MouseEvent): void;
  onTouchStart(event: MinimalTouchEvent | TouchEvent): void;
  onMouseMove(event: MouseEvent): void;
  onTouchMove(event: MinimalTouchEvent | TouchEvent): void;
  onMouseUp(): void;
  static getSizeUpdate(props: SplitPaneProps, state: SplitPaneState): {};
  render(): JSX.Element;
}

/**
 * @public
 */
export declare interface SplitPaneProps {
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
export declare interface SplitPaneState {
  active: boolean;
  resized: boolean;
  pane1Size?: number;
  pane2Size?: number;
  position?: number;
  draggedSize?: number;
  instanceProps: {
    size?: number;
  };
}

export {};
