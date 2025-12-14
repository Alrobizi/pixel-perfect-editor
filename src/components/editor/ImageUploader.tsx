import { useCallback } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
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

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 animate-fade-in">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative w-full max-w-md aspect-square rounded-2xl border-2 border-dashed border-primary/40 bg-card/50 backdrop-blur-sm flex flex-col items-center justify-center gap-6 cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-glow group"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-110">
          <Upload className="w-10 h-10 text-primary-foreground" />
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            رفع صورة
          </h3>
          <p className="text-muted-foreground text-sm">
            اسحب وأفلت أو انقر للاختيار
          </p>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <ImageIcon className="w-4 h-4" />
          <span>PNG, JPG, WEBP</span>
        </div>
      </div>
    </div>
  );
};
