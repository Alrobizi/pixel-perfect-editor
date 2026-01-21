import { Sun, Contrast, Droplets, Circle, Palette } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  hue: number;
}

interface CompactAdjustmentsProps {
  adjustments: Adjustments;
  onAdjustmentChange: (key: keyof Adjustments, value: number) => void;
}

export const CompactAdjustments = ({
  adjustments,
  onAdjustmentChange,
}: CompactAdjustmentsProps) => {
  const sliders = [
    { key: "brightness" as const, icon: Sun, label: "السطوع", min: 0, max: 200 },
    { key: "contrast" as const, icon: Contrast, label: "التباين", min: 0, max: 200 },
    { key: "saturation" as const, icon: Droplets, label: "التشبع", min: 0, max: 200 },
    { key: "hue" as const, icon: Palette, label: "اللون", min: 0, max: 360 },
    { key: "blur" as const, icon: Circle, label: "ضبابية", min: 0, max: 20 },
  ];

  return (
    <div className="h-full p-3 overflow-y-auto">
      <div className="grid grid-cols-1 gap-2">
        {sliders.map((slider) => {
          const Icon = slider.icon;
          const percentage = Math.round(((adjustments[slider.key] - slider.min) / (slider.max - slider.min)) * 100);
          
          return (
            <div 
              key={slider.key} 
              className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30"
            >
              <Icon className="w-4 h-4 text-cyan flex-shrink-0" />
              <span className="text-xs text-foreground w-12 flex-shrink-0">{slider.label}</span>
              <Slider
                value={[adjustments[slider.key]]}
                min={slider.min}
                max={slider.max}
                step={1}
                onValueChange={(values) => onAdjustmentChange(slider.key, values[0])}
                className="flex-1"
              />
              <span className="text-[10px] text-cyan font-mono w-8 text-left">{percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
