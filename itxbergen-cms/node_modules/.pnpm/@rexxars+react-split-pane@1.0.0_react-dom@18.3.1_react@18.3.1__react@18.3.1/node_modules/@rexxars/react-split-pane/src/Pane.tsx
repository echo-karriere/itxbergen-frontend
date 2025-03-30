import type {
  CSSProperties,
  FunctionComponent,
  PropsWithChildren,
} from 'react';

/**
 * @public
 */
export type PaneProps = PropsWithChildren<{
  className?: string;
  size?: number;
  split?: 'vertical' | 'horizontal';
  style?: CSSProperties;
  eleRef?: (el: HTMLDivElement) => void;
}>;

/**
 * @public
 */
export const Pane: FunctionComponent<PaneProps> = function Pane(props) {
  const { children, className, split, style: styleProps, size, eleRef } = props;

  let style: CSSProperties = {
    flex: 1,
    position: 'relative',
    outline: 'none',
  };

  if (size !== undefined) {
    if (split === 'vertical') {
      style.width = size;
    } else {
      style.height = size;
      style.display = 'flex';
    }
    style.flex = 'none';
  }

  style = { ...style, ...styleProps };

  const classes = ['Pane', split, className].filter(Boolean).join(' ');
  return (
    <div role="region" ref={eleRef} className={classes} style={style}>
      {children}
    </div>
  );
};
