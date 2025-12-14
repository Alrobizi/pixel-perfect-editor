import { Sliders, Palette, RotateCcw, Download, Image } from "lucide-react";
import { cn } from "@/lib/utils";

type Tool = "adjust" | "filters";

interface EditorToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  onReset: () => void;
  onDownload: () => void;
  onNewImage: () => void;
}

export const EditorToolbar = ({
  activeTool,
  onToolChange,
  onReset,
  onDownload,
  onNewImage,
}: EditorToolbarProps) => {
  const tools = [
    { id: "adjust" as Tool, icon: Sliders, label: "تعديل" },
    { id: "filters" as Tool, icon: Palette, label: "فلاتر" },
  ];

  return (
    <div className="flex items-center justify-between gap-2 p-3 glass rounded-2xl animate-slide-up">
      <div className="flex items-center gap-1">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300",
              activeTool === tool.id
                ? "gradient-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <tool.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tool.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onNewImage}
          className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          title="صورة جديدة"
        >
          <Image className="w-5 h-5" />
        </button>
        <button
          onClick={onReset}
          className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          title="إعادة تعيين"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105"
          title="تحميل"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">تحميل</span>
        </button>
      </div>
    </div>
  );
};
