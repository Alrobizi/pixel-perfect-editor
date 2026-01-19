import { useState, useRef, useCallback } from "react";
import { ImageUploader } from "./ImageUploader";
import { ImageCanvas } from "./ImageCanvas";
import { EditorToolbar } from "./EditorToolbar";
import { AdjustmentsPanel } from "./AdjustmentsPanel";
import { FiltersPanel } from "./FiltersPanel";
import { FloatingUploadButton } from "./FloatingUploadButton";
import { AIEnhanceButton } from "./AIEnhanceButton";
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

type Tool = "adjust" | "filters";

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
    
    // Simulate AI enhancement - في التطبيق الحقيقي سيتم استخدام API
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Apply enhancement adjustments
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

  if (!imageUrl) {
    return (
      <div className="min-h-screen bg-background flex flex-col relative">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse-gold" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl animate-pulse-gold" style={{ animationDelay: '1s' }} />
        </div>
        
        <header className="p-4 flex items-center justify-center gap-3 border-b border-border/30 relative z-10">
          <div className="w-12 h-12 rounded-2xl gradient-gold flex items-center justify-center shadow-gold animate-glow">
            <Sparkles className="w-6 h-6 text-gold-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gold-gradient">Pixie</h1>
            <p className="text-xs text-muted-foreground">محرر الصور الذكي</p>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 relative z-10">
          <ImageUploader onImageUpload={handleImageUpload} />
        </main>

        {/* Floating upload button */}
        <FloatingUploadButton onImageUpload={handleImageUpload} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-gold/5 rounded-full blur-3xl" />
      </div>
      
      <header className="p-3 flex items-center justify-between gap-3 border-b border-border/30 glass-gold relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-gold flex items-center justify-center shadow-gold-sm">
            <Sparkles className="w-4 h-4 text-gold-foreground" />
          </div>
          <span className="text-lg font-bold text-gold-gradient">Pixie</span>
        </div>
        
        <AIEnhanceButton 
          onEnhance={handleAIEnhance}
          isEnhancing={isEnhancing}
        />
      </header>

      <main className="flex-1 flex flex-col gap-3 p-3 overflow-hidden relative z-10">
        <ImageCanvas
          imageUrl={imageUrl}
          adjustments={adjustments}
          filter={activeFilter}
          canvasRef={canvasRef}
        />

        <EditorToolbar
          activeTool={activeTool}
          onToolChange={setActiveTool}
          onReset={handleReset}
          onDownload={handleDownload}
          onNewImage={handleNewImage}
        />

        <div className="glass-gold rounded-2xl p-4 max-h-[35vh] overflow-y-auto">
          {activeTool === "adjust" ? (
            <AdjustmentsPanel
              adjustments={adjustments}
              onAdjustmentChange={handleAdjustmentChange}
            />
          ) : (
            <FiltersPanel
              imageUrl={imageUrl}
              activeFilter={activeFilter}
              onFilterSelect={setActiveFilter}
            />
          )}
        </div>
      </main>

      {/* Floating upload button */}
      <FloatingUploadButton onImageUpload={handleImageUpload} />
    </div>
  );
};
