import React from 'react';
import { Button } from '../ui/button';

interface buttonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  className?: string;
}

export default function ButtonIXB({
  label,
  onClick,
  variant,
  disabled,
  className,
}: buttonProps) {
  const variantStyle = variant === "primary"
    ? 'bg-IXBbg text-white'
    : variant === "secondary"
      ? 'bg-IXBfg text-white font-bold'
      : 'bg-transparent border border-IXBfg text-IXBfg font-bold';

  return (
    <Button
      onClick={onClick}
      className={`${variantStyle} ${className}`}
      disabled={disabled}
      style={{
        borderTopLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        borderTopRightRadius: '5px',
        borderBottomLeftRadius: '5px',
        padding: '30px 60px',
        fontSize: '16px',
      }}>
      {label}
    </Button>
  );
}
