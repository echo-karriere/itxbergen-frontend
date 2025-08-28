import { Button } from "@/components/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/shadcn-ui/dropdown-menu";
import { BriefcaseIcon, ChevronDownIcon } from "lucide-react";
import Link from "next/link";

export default function CompanyDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <BriefcaseIcon className="w-5 h-5" />
          For bedrifter
          <ChevronDownIcon className="w-4 h-4 ml-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/bedrift/service1">Service 1</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/bedrift/service2">Service 2</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/bedrift/service3">Service 3</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
