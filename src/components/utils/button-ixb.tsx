import React from 'react';
import { Button } from '../ui/button';

interface buttonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
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
    : 'bg-IXBfg text-white';

  return (
    <Button
      onClick={onClick}
      className={`${variantStyle} ${className}`}
      disabled={disabled}
      style={{
        borderTopLeftRadius: '25px',
        borderBottomRightRadius: '25px',
        borderTopRightRadius: '5px',
        borderBottomLeftRadius: '5px',
        padding: '32px 64px',
        fontSize: '16px',
      }}>
      {label}
    </Button>
  );
}
