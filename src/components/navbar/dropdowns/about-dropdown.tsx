import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { InfoIcon, ChevronDownIcon } from "lucide-react";
import Link from "next/link";

export default function AboutDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <InfoIcon className="w-5 h-5" />
          Om oss
          <ChevronDownIcon className="w-4 h-4 ml-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/about/team">Team</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/about/contact">Contact</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/about/careers">Careers</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
