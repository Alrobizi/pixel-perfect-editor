import { FILTERS, FilterPreset } from '@/types/filters';
import { cn } from "@/lib/utils";

interface CompactFiltersProps {
  imageUrl: string;
  activeFilter: string;
  onFilterSelect: (filter: string) => void;
}

export const CompactFilters = ({
  imageUrl,
  activeFilter,
  onFilterSelect,
}: CompactFiltersProps) => {
  return (
    <div className="h-full p-3 overflow-x-auto overflow-y-hidden">
      <div className="flex gap-2 h-full">
        {FILTERS.map((filter: FilterPreset) => (
          <button
            key={filter.id}
            onClick={() => onFilterSelect(filter.filter)}
            className={cn(
              "flex-shrink-0 flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200",
              activeFilter === filter.filter
                ? "bg-cyan/20 ring-2 ring-cyan shadow-cyan-sm"
                : "bg-secondary/30 hover:bg-secondary/50"
            )}
          >
            <div
              className="w-14 h-14 rounded-lg overflow-hidden bg-muted"
              style={{ filter: filter.filter === "none" ? "none" : filter.filter }}
            >
              <img
                src={imageUrl}
                alt={filter.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={cn(
                "text-[10px] font-medium",
                activeFilter === filter.filter ? "text-cyan" : "text-muted-foreground"
              )}
            >
              {filter.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
