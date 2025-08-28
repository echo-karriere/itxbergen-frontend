"use client";

import React from "react";
import { Button } from "../shadcn-ui/button";
import { useRouter } from "next/navigation";

interface ITxButtonProps {
  variant: "primary" | "secondary" | "ghost";
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function ITxButton({
  label,
  href,
  variant,
  className,
}: ITxButtonProps) {
  const router = useRouter();

  const variantStyles: Record<string, string> = {
    primary: "bg-IXBbg text-white",
    secondary: "bg-IXBfg text-white font-bold",
    ghost: "bg-transparent border border-IXBfg text-IXBfg font-bold",
  };

  const variantStyle = variantStyles[variant];

  const handleClick = () => {
    if (href) {
      if (href.startsWith("http")) {
        window.open(href, "_blank");
      } else {
        router.push(href);
      }
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`${variantStyle} ${className}`}
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
      {label}
    </Button>
  );
}
