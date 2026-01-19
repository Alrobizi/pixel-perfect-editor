import { FilterPreset as FilterPresetComponent } from "./FilterPreset";
import { FILTERS, FilterPreset } from '@/types/filters';
import { Sparkles } from 'lucide-react';

interface FiltersPanelProps {
  imageUrl: string;
  activeFilter: string;
  onFilterSelect: (filter: string) => void;
}

export const FiltersPanel = ({
  imageUrl,
  activeFilter,
  onFilterSelect,
}: FiltersPanelProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-gold" />
        <h3 className="text-sm font-semibold text-foreground">الفلاتر</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {FILTERS.map((filter: FilterPreset) => (
          <FilterPresetComponent
            key={filter.id}
            name={filter.name}
            filter={filter.filter}
            imageUrl={imageUrl}
            isActive={activeFilter === filter.filter}
            onSelect={() => onFilterSelect(filter.filter)}
          />
        ))}
      </div>
    </div>
  );
};
