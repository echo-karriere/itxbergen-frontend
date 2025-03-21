import type { CSSProperties, FunctionComponent } from 'react';

export const RESIZER_DEFAULT_CLASSNAME = 'Resizer';

interface ResizerProps {
  className?: string;
  onClick?: (event: MouseEvent) => void;
  onDoubleClick?: (event: MouseEvent) => void;
  onMouseDown: (event: MouseEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  resizerClassName?: string;
  split: 'vertical' | 'horizontal';
  style: CSSProperties;
}

export const Resizer: FunctionComponent<ResizerProps> = function Resizer(
  props
) {
  const {
    className = RESIZER_DEFAULT_CLASSNAME,
    onClick,
    onDoubleClick,
    onMouseDown,
    onTouchEnd,
    onTouchStart,
    resizerClassName,
    split,
    style,
  } = props;

  const classes = [resizerClassName, split, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      role="separator"
      className={classes}
      style={style}
      onMouseDown={(event) => onMouseDown(event.nativeEvent)}
      onTouchStart={(event) => {
        event.preventDefault();
        onTouchStart(event.nativeEvent);
      }}
      onTouchEnd={(event) => {
        event.preventDefault();
        onTouchEnd(event.nativeEvent);
      }}
      onClick={(event) => {
        if (onClick) {
          event.preventDefault();
          onClick(event.nativeEvent);
        }
      }}
      onDoubleClick={(event) => {
        if (onDoubleClick) {
          event.preventDefault();
          onDoubleClick(event.nativeEvent);
        }
      }}
    />
  );
};
