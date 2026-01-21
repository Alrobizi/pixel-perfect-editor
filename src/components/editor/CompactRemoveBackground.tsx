import { Wand2, Hand, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface CompactRemoveBackgroundProps {
  onAutoRemove: () => Promise<void>;
  onManualRemove: () => void;
}

export const CompactRemoveBackground = ({
  onAutoRemove,
  onManualRemove,
}: CompactRemoveBackgroundProps) => {
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
    <div className="h-full p-4 flex items-center justify-center">
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {/* Auto Remove */}
        <button
          onClick={handleAutoRemove}
          disabled={isProcessing}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-2xl",
            "bg-gradient-to-br from-cyan/20 to-cyan/5",
            "border border-cyan/30 transition-all duration-300",
            "hover:border-cyan/50 hover:shadow-cyan-sm hover:scale-[1.02]",
            "active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isProcessing ? (
            <div className="w-10 h-10 rounded-xl gradient-cyan flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-cyan-foreground animate-spin" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl gradient-cyan flex items-center justify-center shadow-cyan-sm">
              <Wand2 className="w-5 h-5 text-cyan-foreground" />
            </div>
          )}
          <div className="text-center">
            <h4 className="text-xs font-semibold text-foreground">Auto Remove</h4>
            <p className="text-[10px] text-muted-foreground">إزالة تلقائية AI</p>
          </div>
        </button>

        {/* Manual Remove */}
        <button
          onClick={onManualRemove}
          disabled={isProcessing}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-2xl",
            "bg-gradient-to-br from-secondary to-secondary/50",
            "border border-border/50 transition-all duration-300",
            "hover:border-cyan/30 hover:shadow-cyan-sm hover:scale-[1.02]",
            "active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Hand className="w-5 h-5 text-foreground" />
          </div>
          <div className="text-center">
            <h4 className="text-xs font-semibold text-foreground">Manual Remove</h4>
            <p className="text-[10px] text-muted-foreground">تحديد يدوي دقيق</p>
          </div>
        </button>
      </div>
    </div>
  );
};
