import { useCallback, useRef } from "react";
import { Sliders, Palette, Eraser, RotateCcw, Download, Plus, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tool = "adjust" | "filters" | "background";

interface BottomToolbarProps {
  onImageUpload: (imageUrl: string) => void;
  showUploadOnly?: boolean;
  activeTool?: Tool;
  onToolChange?: (tool: Tool) => void;
  onReset?: () => void;
  onDownload?: () => void;
  onNewImage?: () => void;
}

export const BottomToolbar = ({
  onImageUpload,
  showUploadOnly = false,
  activeTool,
  onToolChange,
  onReset,
  onDownload,
  onNewImage,
}: BottomToolbarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          onImageUpload(result);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const tools = [
    { id: "adjust" as Tool, icon: Sliders, label: "تعديل" },
    { id: "filters" as Tool, icon: Palette, label: "فلاتر" },
    { id: "background" as Tool, icon: Eraser, label: "الخلفية" },
  ];

  if (showUploadOnly) {
    return (
      <div className="h-20 flex-shrink-0 glass-cyan border-t border-cyan/20">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="h-full flex items-center justify-center px-4">
          <button
            onClick={handleUploadClick}
            className={cn(
              "flex items-center gap-3 px-8 py-3 rounded-2xl",
              "gradient-cyan text-cyan-foreground shadow-cyan",
              "transition-all duration-300",
              "hover:scale-105 active:scale-95",
              "font-semibold"
            )}
          >
            <Plus className="w-5 h-5" />
            <span>إضافة صورة</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-16 flex-shrink-0 glass-cyan border-t border-cyan/20 px-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="h-full flex items-center justify-between">
        {/* Left actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleUploadClick}
            className="p-2 rounded-lg text-muted-foreground hover:text-cyan hover:bg-cyan/10 transition-all"
            title="صورة جديدة"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={onNewImage}
            className="p-2 rounded-lg text-muted-foreground hover:text-cyan hover:bg-cyan/10 transition-all"
            title="إزالة الصورة"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Center tools */}
        <div className="flex items-center gap-1 bg-secondary/50 rounded-xl p-1">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onToolChange?.(tool.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200",
                activeTool === tool.id
                  ? "gradient-cyan text-cyan-foreground shadow-cyan-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tool.icon className="w-4 h-4" />
              <span className="text-xs font-medium hidden sm:inline">{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onReset}
            className="p-2 rounded-lg text-muted-foreground hover:text-cyan hover:bg-cyan/10 transition-all"
            title="إعادة تعيين"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg gradient-cyan text-cyan-foreground shadow-cyan-sm transition-all hover:scale-105 active:scale-95"
            title="تحميل"
          >
            <Download className="w-4 h-4" />
            <span className="text-xs font-medium hidden sm:inline">تحميل</span>
          </button>
        </div>
      </div>
    </div>
  );
};
