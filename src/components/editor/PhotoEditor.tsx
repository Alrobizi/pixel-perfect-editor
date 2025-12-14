import { useState, useRef, useCallback } from "react";
import { ImageUploader } from "./ImageUploader";
import { ImageCanvas } from "./ImageCanvas";
import { EditorToolbar } from "./EditorToolbar";
import { AdjustmentsPanel } from "./AdjustmentsPanel";
import { FiltersPanel } from "./FiltersPanel";
import { AdBanner } from "@/components/ads/AdBanner";
import { AdsProvider } from "@/components/ads/AdsProvider";
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

const PhotoEditorContent = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [adjustments, setAdjustments] = useState<Adjustments>(DEFAULT_ADJUSTMENTS);
  const [activeFilter, setActiveFilter] = useState<string>("none");
  const [activeTool, setActiveTool] = useState<"adjust" | "filters">("adjust");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = useCallback((url: string) => {
    setImageUrl(url);
    setAdjustments(DEFAULT_ADJUSTMENTS);
    setActiveFilter("none");
    toast.success("تم رفع الصورة بنجاح!");
  }, []);

  const handleAdjustmentChange = useCallback(
    (key: keyof Adjustments, value: number) => {
      setAdjustments((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleReset = useCallback(() => {
    setAdjustments(DEFAULT_ADJUSTMENTS);
    setActiveFilter("none");
    toast.info("تم إعادة التعيين");
  }, []);

  const handleDownload = useCallback(() => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = `edited-photo-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
    toast.success("تم تحميل الصورة!");
  }, []);

  const handleNewImage = useCallback(() => {
    setImageUrl(null);
    setAdjustments(DEFAULT_ADJUSTMENTS);
    setActiveFilter("none");
  }, []);

  if (!imageUrl) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Banner Ad at Top */}
        <AdBanner position="top" />
        
        <header className="p-4 flex items-center justify-center gap-3 border-b border-border/50">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">محرر الصور</h1>
        </header>
        <ImageUploader onImageUpload={handleImageUpload} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Banner Ad at Top */}
      <AdBanner position="top" />
      
      <header className="p-4 flex items-center gap-3 border-b border-border/50">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold text-foreground">محرر الصور</h1>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          <EditorToolbar
            activeTool={activeTool}
            onToolChange={setActiveTool}
            onReset={handleReset}
            onDownload={handleDownload}
            onNewImage={handleNewImage}
          />
          <ImageCanvas
            imageUrl={imageUrl}
            adjustments={adjustments}
            filter={activeFilter}
            canvasRef={canvasRef}
          />
        </div>

        {/* Controls Panel */}
        <div className="lg:w-80 glass rounded-2xl p-4 overflow-y-auto animate-slide-up">
          {activeTool === "adjust" ? (
            <AdjustmentsPanel
              adjustments={adjustments}
              onAdjustmentChange={handleAdjustmentChange}
            />
          ) : (
            <FiltersPanel
              imageUrl={imageUrl}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const PhotoEditor = () => {
  return (
    <AdsProvider
      showBannerOnMount={true}
      bannerPosition="top"
      showRewardedAfterSeconds={15}
    >
      <PhotoEditorContent />
    </AdsProvider>
  );
};
