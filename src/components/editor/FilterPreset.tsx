import { cn } from "@/lib/utils";

interface FilterPresetProps {
  name: string;
  filter: string;
  isActive: boolean;
  preview: string;
  onClick: () => void;
}

export const FilterPreset = ({
  name,
  filter,
  isActive,
  preview,
  onClick,
}: FilterPresetProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-2 rounded-xl transition-all duration-300",
        isActive
          ? "bg-primary/20 ring-2 ring-primary shadow-glow"
          : "bg-secondary/50 hover:bg-secondary"
      )}
    >
      <div
        className="w-16 h-16 rounded-lg overflow-hidden bg-muted"
        style={{ filter }}
      >
        <img
          src={preview}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <span
        className={cn(
          "text-xs font-medium",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        {name}
      </span>
    </button>
  );
};
