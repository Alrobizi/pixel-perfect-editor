import { Lock, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterPreset } from '@/types/filters';

interface FilterCardProps {
  filter: FilterPreset;
  isSelected: boolean;
  isUnlocked: boolean;
  thumbnail?: string;
  onSelect: () => void;
}

export const FilterCard = ({ 
  filter, 
  isSelected, 
  isUnlocked, 
  thumbnail,
  onSelect 
}: FilterCardProps) => {
  const isLocked = filter.isPremium && !isUnlocked;

  return (
    <button
      onClick={onSelect}
      disabled={isLocked}
      className={cn(
        "relative flex flex-col items-center gap-2 p-2 rounded-lg transition-all duration-200",
        "border-2 min-w-[80px]",
        isSelected 
          ? "border-primary bg-primary/20 glow-effect" 
          : "border-border bg-card hover:border-primary/50",
        isLocked && "opacity-60 cursor-not-allowed",
        filter.isPremium && !isLocked && "border-premium/50"
      )}
    >
      {/* Thumbnail preview */}
      <div 
        className={cn(
          "w-16 h-16 rounded-md bg-muted overflow-hidden relative",
          filter.isPremium && "ring-1 ring-premium/30"
        )}
      >
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={filter.name}
            className="w-full h-full object-cover"
            style={{ filter: filter.filter }}
          />
        ) : (
          <div 
            className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30"
            style={{ filter: filter.filter }}
          />
        )}
        
        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <Lock className="w-5 h-5 text-premium" />
          </div>
        )}
        
        {/* Premium badge */}
        {filter.isPremium && !isLocked && (
          <div className="absolute top-1 right-1">
            <Crown className="w-3 h-3 text-premium" />
          </div>
        )}
      </div>
      
      {/* Filter name */}
      <span className={cn(
        "text-xs font-medium",
        filter.isPremium ? "text-premium" : "text-foreground"
      )}>
        {filter.name}
      </span>
    </button>
  );
};
