import { Sun, Contrast, Droplets, Circle, Palette } from "lucide-react";
import { AdjustmentSlider } from "./AdjustmentSlider";

interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  hue: number;
}

interface AdjustmentsPanelProps {
  adjustments: Adjustments;
  onAdjustmentChange: (key: keyof Adjustments, value: number) => void;
}

export const AdjustmentsPanel = ({
  adjustments,
  onAdjustmentChange,
}: AdjustmentsPanelProps) => {
  const sliders = [
    { key: "brightness" as const, icon: Sun, label: "السطوع", min: 0, max: 200 },
    { key: "contrast" as const, icon: Contrast, label: "التباين", min: 0, max: 200 },
    { key: "saturation" as const, icon: Droplets, label: "التشبع", min: 0, max: 200 },
    { key: "hue" as const, icon: Palette, label: "درجة اللون", min: 0, max: 360 },
    { key: "blur" as const, icon: Circle, label: "الضبابية", min: 0, max: 20 },
  ];

  return (
    <div className="space-y-3 animate-fade-in">
      <h3 className="text-sm font-semibold text-foreground mb-4">أدوات التعديل</h3>
      {sliders.map((slider) => (
        <AdjustmentSlider
          key={slider.key}
          icon={slider.icon}
          label={slider.label}
          value={adjustments[slider.key]}
          min={slider.min}
          max={slider.max}
          onChange={(value) => onAdjustmentChange(slider.key, value)}
        />
      ))}
    </div>
  );
};
