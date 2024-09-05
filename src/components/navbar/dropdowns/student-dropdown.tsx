import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UserIcon, ChevronDownIcon } from "lucide-react";
import Link from "next/link";

export default function StudentDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <UserIcon className="w-5 h-5" />
          For studenter
          <ChevronDownIcon className="w-4 h-4 ml-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/studenter/course1">Course 1</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/studenter/course2">Course 2</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/studenter/course3">Course 3</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
