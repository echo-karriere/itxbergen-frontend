import React from "react";
import { Button } from "../ui/button";

interface buttonProps {
  label: string;
  subLabel?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  className?: string;
}

export default function ButtonIXB({
  label,
  subLabel,
  onClick,
  variant,
  disabled,
  className,
}: buttonProps) {
  const variantStyle =
    variant === "primary"
      ? "bg-IXBbg text-white"
      : variant === "secondary"
        ? "bg-IXBfg text-white font-bold"
        : "bg-transparent border border-IXBfg text-IXBfg font-bold";

  return (
    <Button
      onClick={onClick}
      className={`${variantStyle} ${className}`}
      disabled={disabled}
      style={{
        borderTopLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        borderTopRightRadius: "5px",
        borderBottomLeftRadius: "5px",
        padding: "30px 60px",
        fontSize: "16px",
        textAlign: "center",
      }}
    >
      <div>
        {label}
        {subLabel && (
          <>
            <br />
            <span className="text-xs text-white block mt-1">{subLabel}</span>
          </>
        )}
      </div>
    </Button>
  );
}
