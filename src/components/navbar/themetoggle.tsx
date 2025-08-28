"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/shadcn-ui/button";

import { SunIcon, MoonIcon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents SSR issues

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <MoonIcon className="w-5 h-5 text-white" />
      ) : (
        <SunIcon className="w-5 h-5 text-white" />
      )}
    </button>
  );
}
