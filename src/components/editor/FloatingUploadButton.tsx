import { useCallback, useRef } from "react";
import { Plus, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingUploadButtonProps {
  onImageUpload: (imageUrl: string) => void;
}

export const FloatingUploadButton = ({ onImageUpload }: FloatingUploadButtonProps) => {
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

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        onClick={handleClick}
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
          "w-16 h-16 rounded-full",
          "gradient-gold shadow-gold-lg",
          "flex items-center justify-center",
          "transition-all duration-300 ease-out",
          "hover:scale-110 hover:shadow-gold-lg",
          "active:scale-95",
          "animate-glow btn-gold",
          "group"
        )}
        aria-label="رفع صورة جديدة"
      >
        {/* Outer ring animation */}
        <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-ping opacity-20" />
        
        {/* Icon container with rotation effect */}
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:rotate-90">
          <Plus className="w-7 h-7 text-gold-foreground" strokeWidth={2.5} />
        </div>
        
        {/* Camera icon appears on hover */}
        <Camera 
          className={cn(
            "absolute w-4 h-4 text-gold-foreground/80",
            "opacity-0 group-hover:opacity-100",
            "transition-all duration-300",
            "-bottom-1 -right-1",
            "bg-gold-dark rounded-full p-0.5"
          )} 
        />
      </button>
      
      {/* Label below button */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40">
        <span className="text-xs text-muted-foreground">إضافة صورة</span>
      </div>
    </>
  );
};
