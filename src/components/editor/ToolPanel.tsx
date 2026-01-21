import { CompactAdjustments } from "./CompactAdjustments";
import { CompactFilters } from "./CompactFilters";
import { CompactRemoveBackground } from "./CompactRemoveBackground";

type Tool = "adjust" | "filters" | "background";

interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  hue: number;
}

interface ToolPanelProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  adjustments: Adjustments;
  onAdjustmentChange: (key: keyof Adjustments, value: number) => void;
  imageUrl: string;
  activeFilter: string;
  onFilterSelect: (filter: string) => void;
  onAutoRemove: () => Promise<void>;
  onManualRemove: () => void;
}

export const ToolPanel = ({
  activeTool,
  adjustments,
  onAdjustmentChange,
  imageUrl,
  activeFilter,
  onFilterSelect,
  onAutoRemove,
  onManualRemove,
}: ToolPanelProps) => {
  return (
    <div className="h-full glass-cyan rounded-2xl overflow-hidden">
      {activeTool === "adjust" && (
        <CompactAdjustments
          adjustments={adjustments}
          onAdjustmentChange={onAdjustmentChange}
        />
      )}
      {activeTool === "filters" && (
        <CompactFilters
          imageUrl={imageUrl}
          activeFilter={activeFilter}
          onFilterSelect={onFilterSelect}
        />
      )}
      {activeTool === "background" && (
        <CompactRemoveBackground
          onAutoRemove={onAutoRemove}
          onManualRemove={onManualRemove}
        />
      )}
    </div>
  );
};
