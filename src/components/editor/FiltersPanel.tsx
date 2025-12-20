import { useState } from 'react';
import { FilterPreset as FilterPresetComponent } from "./FilterPreset";
import { RewardedAdButton } from "./RewardedAdButton";
import { FREE_FILTERS, PREMIUM_FILTERS, FilterPreset } from '@/types/filters';
import { Sparkles, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FiltersPanelProps {
  imageUrl: string;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FiltersPanel = ({
  imageUrl,
  activeFilter,
  onFilterChange,
}: FiltersPanelProps) => {
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);

  const handleRewardEarned = () => {
    setPremiumUnlocked(true);
  };

  const handlePremiumFilterClick = (filter: FilterPreset) => {
    if (premiumUnlocked) {
      onFilterChange(filter.filter);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Free Filters Section */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">الفلاتر المجانية</h3>
        <div className="grid grid-cols-5 gap-2">
          {FREE_FILTERS.map((filter) => (
            <FilterPresetComponent
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

      {/* Premium Filters Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-premium" />
          <h3 className="text-sm font-semibold text-premium">الفلاتر الحصرية</h3>
        </div>
        
        {/* Rewarded Ad Button */}
        <RewardedAdButton 
          onRewardEarned={handleRewardEarned}
          isUnlocked={premiumUnlocked}
        />
        
        <div className="grid grid-cols-4 gap-2">
          {PREMIUM_FILTERS.map((filter) => (
            <div key={filter.id} className="relative">
              <FilterPresetComponent
                name={filter.name}
                filter={filter.filter}
                isActive={activeFilter === filter.filter && premiumUnlocked}
                preview={imageUrl}
                onClick={() => handlePremiumFilterClick(filter)}
                className={cn(
                  !premiumUnlocked && "opacity-50 cursor-not-allowed"
                )}
              />
              {!premiumUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/40 rounded-lg pointer-events-none">
                  <Lock className="w-4 h-4 text-premium" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
