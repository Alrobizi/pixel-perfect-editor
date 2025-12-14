import { Slider } from "@/components/ui/slider";
import { LucideIcon } from "lucide-react";

interface AdjustmentSliderProps {
  icon: LucideIcon;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export const AdjustmentSlider = ({
  icon: Icon,
  label,
  value,
  min,
  max,
  onChange,
}: AdjustmentSliderProps) => {
  const percentage = Math.round(((value - min) / (max - min)) * 100);

  return (
    <div className="space-y-3 p-3 rounded-xl bg-secondary/50 transition-all duration-200 hover:bg-secondary">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          {percentage}%
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(values) => onChange(values[0])}
        className="cursor-pointer"
      />
    </div>
  );
};
