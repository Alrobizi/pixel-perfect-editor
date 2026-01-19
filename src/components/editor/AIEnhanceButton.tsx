import { Wand2, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIEnhanceButtonProps {
  onEnhance: () => void;
  isEnhancing: boolean;
}

export const AIEnhanceButton = ({ onEnhance, isEnhancing }: AIEnhanceButtonProps) => {
  return (
    <Button
      onClick={onEnhance}
      disabled={isEnhancing}
      className={cn(
        "relative gap-2 px-4 py-2",
        "gradient-gold text-gold-foreground",
        "shadow-gold-sm hover:shadow-gold",
        "transition-all duration-300",
        "hover:scale-105 active:scale-95",
        "disabled:opacity-70 disabled:hover:scale-100",
        "overflow-hidden btn-gold"
      )}
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
      
      {isEnhancing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm font-semibold">جاري التحسين...</span>
        </>
      ) : (
        <>
          <div className="relative">
            <Wand2 className="w-4 h-4" />
            <Sparkles className="absolute -top-1 -right-1 w-2 h-2 text-gold-light animate-pulse" />
          </div>
          <span className="text-sm font-semibold">تحسين بالذكاء الاصطناعي</span>
        </>
      )}
    </Button>
  );
};
