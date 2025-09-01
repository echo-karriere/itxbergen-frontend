import { Button } from "@/components/shadcn-ui/button";

interface FilterButtonRowProps<T extends string> {
  buttons: T[];
  selectedButton: T;
  onSelect: (button: T) => void;
}

export default function FilterButtonRow<T extends string>({
  buttons,
  selectedButton,
  onSelect,
}: FilterButtonRowProps<T>) {
  return (
    <div className="flex flex-col">
      <div className="flex overflow-x-auto space-x-4 md:space-x-8 no-scrollbar text-sm">
        {buttons.map((location, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`shrink-0 hover:underline hover:text-IXBPurple ${
              selectedButton === location ? "text-IXBPurple font-bold" : ""
            }`}
            onClick={() => onSelect(location)}
          >
            {location}
          </Button>
        ))}
      </div>
      <div className="w-full border-t-2 border-black"></div>
    </div>
  );
}
