import { Wand2, Hand, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface RemoveBackgroundPanelProps {
  onAutoRemove: () => Promise<void>;
  onManualRemove: () => void;
}

export const RemoveBackgroundPanel = ({
  onAutoRemove,
  onManualRemove,
}: RemoveBackgroundPanelProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAutoRemove = async () => {
    setIsProcessing(true);
    try {
      await onAutoRemove();
      toast.success("تمت إزالة الخلفية بنجاح ✨");
    } catch (error) {
      toast.error("حدث خطأ أثناء إزالة الخلفية");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-cyan" />
        <h3 className="text-sm font-semibold text-foreground">إزالة الخلفية</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Auto Remove */}
        <button
          onClick={handleAutoRemove}
          disabled={isProcessing}
          className={cn(
            "relative flex flex-col items-center gap-3 p-5 rounded-2xl",
            "bg-gradient-to-br from-cyan/20 to-cyan/5",
            "border border-cyan/30 transition-all duration-300",
            "hover:border-cyan/50 hover:shadow-cyan-sm hover:scale-[1.02]",
            "active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isProcessing ? (
            <div className="w-12 h-12 rounded-xl gradient-cyan flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-cyan-foreground animate-spin" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl gradient-cyan flex items-center justify-center shadow-cyan-sm">
              <Wand2 className="w-6 h-6 text-cyan-foreground" />
            </div>
          )}
          <div className="text-center">
            <h4 className="text-sm font-semibold text-foreground mb-1">Auto Remove</h4>
            <p className="text-xs text-muted-foreground">إزالة تلقائية بالذكاء الاصطناعي</p>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Manual Remove */}
        <button
          onClick={onManualRemove}
          disabled={isProcessing}
          className={cn(
            "relative flex flex-col items-center gap-3 p-5 rounded-2xl",
            "bg-gradient-to-br from-secondary to-secondary/50",
            "border border-border/50 transition-all duration-300",
            "hover:border-cyan/30 hover:shadow-cyan-sm hover:scale-[1.02]",
            "active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
            <Hand className="w-6 h-6 text-foreground" />
          </div>
          <div className="text-center">
            <h4 className="text-sm font-semibold text-foreground mb-1">Manual Remove</h4>
            <p className="text-xs text-muted-foreground">تحديد يدوي دقيق للمناطق</p>
          </div>
        </button>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        اختر الطريقة المناسبة لإزالة خلفية الصورة
      </p>
    </div>
  );
};
