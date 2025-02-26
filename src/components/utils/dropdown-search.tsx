import { useState } from "react";

interface DropdownSearchProp {
  filterFrom: string;
  onSearch: (value: string) => void; // Callback function to return search term
}

export default function DropdownSearch({
  filterFrom,
  onSearch,
}: DropdownSearchProp) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onSearch(value); // Send updated search term to the parent component
  };

  return (
    <div className="my-2">
      <label className="font-bold text-sm">
        {filterFrom.charAt(0).toUpperCase() + filterFrom.slice(1)}:
      </label>
      <input
        type="search"
        className="w-full px-4 py-2 mt-1 border border-black rounded-md text-gray-600"
        placeholder={`Filtrer etter ${filterFrom}`}
        value={inputValue}
        onChange={handleChange} // Call function on input change
      />
    </div>
  );
}
