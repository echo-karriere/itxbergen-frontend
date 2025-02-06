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
  onSelect
}: OrganisationCardProps) {
  return (
    <div
      style={{ width, height }}
      className={`bg-white border border-gray-200 rounded-lg cursor-pointer ${
        selected ? 'bg-[#EEEFFF] shadow-2xl' : 'hover:bg-[#EEEFFF] hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      {/* Purple bar */}
      <div className="h-[3px] w-full bg-IXBPurple rounded-t-lg"></div>

      <div className="p-4">
        <h5 className="text-md font-montSerrat font-bold text-black mb-2 leading-7">
          {name}
        </h5>

        <p className="font-sourceSans text-gray-500 text-sm">
          <i className="ri-map-pin-line mr-1"></i>
          {location}
        </p>
      </div>
    </div>
  );
}
