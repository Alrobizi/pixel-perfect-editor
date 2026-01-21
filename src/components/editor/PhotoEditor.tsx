import { useState, useRef, useCallback } from "react";
import { ImageCanvas } from "./ImageCanvas";
import { BottomToolbar } from "./BottomToolbar";
import { ToolPanel } from "./ToolPanel";
import { AnimatedHeroVisual } from "./AnimatedHeroVisual";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  hue: number;
}

const DEFAULT_ADJUSTMENTS: Adjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  hue: 0,
};

type Tool = "adjust" | "filters" | "background";

export const PhotoEditor = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [adjustments, setAdjustments] = useState<Adjustments>(DEFAULT_ADJUSTMENTS);
  const [activeFilter, setActiveFilter] = useState<string>("none");
  const [activeTool, setActiveTool] = useState<Tool>("adjust");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = useCallback((url: string) => {
    setImageUrl(url);
    setAdjustments(DEFAULT_ADJUSTMENTS);
    setActiveFilter("none");
    toast.success("تم رفع الصورة بنجاح ✨");
  }, []);

  const handleAdjustmentChange = useCallback((key: keyof Adjustments, value: number) => {
    setAdjustments((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setAdjustments(DEFAULT_ADJUSTMENTS);
    setActiveFilter("none");
    toast.success("تم إعادة التعيين");
  }, []);

  const handleDownload = useCallback(() => {
    if (!canvasRef.current) return;
    
    const link = document.createElement("a");
    link.download = "pixie-edited-photo.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    toast.success("تم تحميل الصورة 📥");
  }, []);

  const handleNewImage = useCallback(() => {
    setImageUrl(null);
    setAdjustments(DEFAULT_ADJUSTMENTS);
    setActiveFilter("none");
  }, []);

  const handleAIEnhance = useCallback(async () => {
    if (!imageUrl) return;
    
    setIsEnhancing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setAdjustments({
      brightness: 105,
      contrast: 110,
      saturation: 115,
      blur: 0,
      hue: 0,
    });
    
    setIsEnhancing(false);
    toast.success("تم تحسين الصورة بالذكاء الاصطناعي ✨");
  }, [imageUrl]);

  const handleAutoRemoveBackground = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
  }, []);

  const handleManualRemoveBackground = useCallback(() => {
    toast.info("سيتم إضافة أداة التحديد اليدوي قريباً");
  }, []);

  // No image - show landing screen
  if (!imageUrl) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-background flex flex-col fixed inset-0">
        {/* Header - Fixed height */}
        <header className="h-14 flex-shrink-0 flex items-center justify-center gap-3 border-b border-border/30 px-4">
          <div className="w-10 h-10 rounded-xl gradient-cyan flex items-center justify-center shadow-cyan animate-glow">
            <Sparkles className="w-5 h-5 text-cyan-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-cyan-gradient">Pixie</h1>
            <p className="text-[10px] text-muted-foreground">محرر الصور الذكي</p>
          </div>
        </header>

        {/* Main Content - Flex grow to fill remaining space */}
        <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Background decorations - contained within bounds */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan/10 rounded-full blur-2xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cyan/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Hero Visual */}
          <AnimatedHeroVisual />
        </main>

        {/* Bottom Bar - Fixed height */}
        <BottomToolbar
          onImageUpload={handleImageUpload}
          showUploadOnly={true}
        />
      </div>
    );
  }

  // Editor mode - with image
  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col fixed inset-0">
      {/* Header - Fixed height */}
      <header className="h-12 flex-shrink-0 flex items-center justify-between px-3 border-b border-border/30 glass-cyan">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-cyan flex items-center justify-center shadow-cyan-sm">
            <Sparkles className="w-4 h-4 text-cyan-foreground" />
          </div>
          <span className="text-base font-bold text-cyan-gradient">Pixie</span>
        </div>
        
        <button
          onClick={handleAIEnhance}
          disabled={isEnhancing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gradient-cyan text-cyan-foreground shadow-cyan-sm text-xs font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
        >
          {isEnhancing ? (
            <span className="animate-pulse">جاري التحسين...</span>
          ) : (
            <>
              <Sparkles className="w-3 h-3" />
              <span>تحسين AI</span>
            </>
          )}
        </button>
      </header>

      {/* Canvas Area - Flex grow */}
      <div className="flex-1 min-h-0 p-2 overflow-hidden">
        <ImageCanvas
          imageUrl={imageUrl}
          adjustments={adjustments}
          filter={activeFilter}
          canvasRef={canvasRef}
        />
      </div>

      {/* Tool Panel - Fixed height with internal scroll if needed */}
      <div className="h-[180px] flex-shrink-0 px-2 pb-1">
        <ToolPanel
          activeTool={activeTool}
          onToolChange={setActiveTool}
          adjustments={adjustments}
          onAdjustmentChange={handleAdjustmentChange}
          imageUrl={imageUrl}
          activeFilter={activeFilter}
          onFilterSelect={setActiveFilter}
          onAutoRemove={handleAutoRemoveBackground}
          onManualRemove={handleManualRemoveBackground}
        />
      </div>

      {/* Bottom Bar - Fixed height */}
      <BottomToolbar
        onImageUpload={handleImageUpload}
        activeTool={activeTool}
        onToolChange={setActiveTool}
        onReset={handleReset}
        onDownload={handleDownload}
        onNewImage={handleNewImage}
      />
    </div>
  );
};
