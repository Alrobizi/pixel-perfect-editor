import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  hue: number;
}

interface ImageCanvasProps {
  imageUrl: string;
  adjustments: Adjustments;
  filter: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const ImageCanvas = ({
  imageUrl,
  adjustments,
  filter,
  canvasRef,
}: ImageCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !imageUrl) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Calculate dimensions to fit container
      const maxWidth = containerRef.current?.clientWidth || 600;
      const maxHeight = containerRef.current?.clientHeight || 500;
      
      let width = img.width;
      let height = img.height;
      
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);

      canvas.width = width;
      canvas.height = height;

      // Apply CSS filter for preview
      const filterString = buildFilterString(adjustments, filter);
      ctx.filter = filterString;
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = imageUrl;
  }, [imageUrl, adjustments, filter, canvasRef]);

  const buildFilterString = (adj: Adjustments, presetFilter: string): string => {
    const filters = [
      `brightness(${adj.brightness}%)`,
      `contrast(${adj.contrast}%)`,
      `saturate(${adj.saturation}%)`,
      `blur(${adj.blur}px)`,
      `hue-rotate(${adj.hue}deg)`,
    ];

    if (presetFilter && presetFilter !== "none") {
      return `${presetFilter} ${filters.join(" ")}`;
    }

    return filters.join(" ");
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 flex items-center justify-center p-4 bg-background/50 rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05),transparent_70%)]" />
      <canvas
        ref={canvasRef}
        className={cn(
          "max-w-full max-h-full rounded-xl shadow-card animate-scale-in",
          "transition-all duration-300"
        )}
      />
    </div>
  );
};
