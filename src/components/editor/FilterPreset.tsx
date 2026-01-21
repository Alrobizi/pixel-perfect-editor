import { cn } from "@/lib/utils";

interface FilterPresetProps {
  name: string;
  filter: string;
  imageUrl: string;
  isActive: boolean;
  onSelect: () => void;
  className?: string;
}

export const FilterPreset = ({
  name,
  filter,
  imageUrl,
  isActive,
  onSelect,
  className,
}: FilterPresetProps) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center gap-2 p-2 rounded-xl transition-all duration-300 card-interactive",
        isActive
          ? "bg-cyan/20 ring-2 ring-cyan shadow-cyan-sm"
          : "bg-secondary/50 hover:bg-secondary",
        className
      )}
    >
      <div
        className="w-16 h-16 rounded-lg overflow-hidden bg-muted"
        style={{ filter: filter === "none" ? "none" : filter }}
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <span
        className={cn(
          "text-xs font-medium",
          isActive ? "text-cyan" : "text-muted-foreground"
        )}
      >
        {name}
      </span>
    </button>
  );
};
