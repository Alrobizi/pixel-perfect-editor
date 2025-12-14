import { FilterPreset } from "./FilterPreset";

interface FiltersPanelProps {
  imageUrl: string;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FILTERS = [
  { id: "none", name: "أصلي", filter: "none" },
  { id: "grayscale", name: "رمادي", filter: "grayscale(100%)" },
  { id: "sepia", name: "سيبيا", filter: "sepia(80%)" },
  { id: "vintage", name: "كلاسيك", filter: "sepia(30%) contrast(110%)" },
  { id: "warm", name: "دافئ", filter: "sepia(20%) saturate(130%)" },
  { id: "cool", name: "بارد", filter: "saturate(80%) hue-rotate(180deg)" },
  { id: "dramatic", name: "درامي", filter: "contrast(150%) brightness(90%)" },
  { id: "fade", name: "باهت", filter: "contrast(80%) brightness(110%)" },
  { id: "vivid", name: "حيوي", filter: "saturate(150%) contrast(110%)" },
  { id: "noir", name: "نوار", filter: "grayscale(100%) contrast(130%)" },
];

export const FiltersPanel = ({
  imageUrl,
  activeFilter,
  onFilterChange,
}: FiltersPanelProps) => {
  return (
    <div className="animate-fade-in">
      <h3 className="text-sm font-semibold text-foreground mb-4">الفلاتر</h3>
      <div className="grid grid-cols-5 gap-2">
        {FILTERS.map((filter) => (
          <FilterPreset
            key={filter.id}
            name={filter.name}
            filter={filter.filter}
            isActive={activeFilter === filter.filter}
            preview={imageUrl}
            onClick={() => onFilterChange(filter.filter)}
          />
        ))}
      </div>
    </div>
  );
};
