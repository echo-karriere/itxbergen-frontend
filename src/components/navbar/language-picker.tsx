'use client'

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { GlobeIcon } from "lucide-react";

export default function LanguagePicker() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" size="icon">
          <GlobeIcon className="w-5 h-5 text-white" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-2"
      >
        <DropdownMenuLabel className="text-gray-700 dark:text-gray-200">
          Language
        </DropdownMenuLabel>

        {/* Enhanced Visual Separator */}
        <DropdownMenuSeparator className="border-t-2 border-gray-300 dark:border-gray-600 my-2" />

        <DropdownMenuCheckboxItem
          className="text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 p-2">
          Norwegian
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          className="text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 p-2">
          English
        </DropdownMenuCheckboxItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
