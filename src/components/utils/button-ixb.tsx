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
    >
      {label}
    </Button>
  );
}
