import { Button } from "@/components/shadcn-ui/button";

interface OrganisationCardProps {
  name: string;
  location: string;
  width?: string;
  height?: string;
  selected: boolean;
  onSelect: () => void;
}

export default function OrganisationCard({
  name,
  location,
  width = "320px",
  height = "90px",
  selected,
  onSelect,
}: OrganisationCardProps) {
  return (
    <Button
      onClick={onSelect}
      style={{ width, height }}
      variant="ghost"
      className={`border border-gray-200 rounded-lg text-left flex flex-col items-start p-0 transition-all overflow-hidden
        ${selected ? "bg-[#EEEFFF] shadow-2xl" : "bg-white hover:bg-[#EEEFFF] hover:shadow-md"}
      `}
    >
      {/* Card Wrapper */}
      <div className="w-full h-full p-4 relative">
        {/* Purple Bar */}
        <div className="absolute top-0 left-0 h-[3px] w-full bg-IXBPurple rounded-t-lg"></div>

        {/* Content */}
        <h5 className="text-md font-montSerrat font-bold text-black mb-2 leading-7">
          {name}
        </h5>
        <p className="font-sourceSans text-gray-500 text-sm">
          <i className="ri-map-pin-line mr-1"></i>
          {location}
        </p>
      </div>
    </Button>
  );
}
