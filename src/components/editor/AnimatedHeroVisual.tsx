import { useEffect, useState } from "react";
import { Sparkles, Scissors } from "lucide-react";

export const AnimatedHeroVisual = () => {
  const [showBefore, setShowBefore] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBefore((prev) => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      {/* Main animated card */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-cyan shadow-cyan animate-scale-in">
        {/* Before/After mockup */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary">
          {/* Split view line */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-cyan z-20 transition-all duration-700 ease-in-out"
            style={{ left: showBefore ? '30%' : '70%' }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full gradient-cyan flex items-center justify-center shadow-cyan">
              <Scissors className="w-3 h-3 text-cyan-foreground" />
            </div>
          </div>

          {/* Before side */}
          <div 
            className="absolute inset-0 transition-all duration-700 ease-in-out overflow-hidden"
            style={{ clipPath: `inset(0 ${showBefore ? '70%' : '30%'} 0 0)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-24 bg-gradient-to-t from-cyan/40 to-cyan/20 rounded-t-full" />
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-muted-foreground/20" />
            <div className="absolute bottom-6 left-3 w-8 h-8 rounded-lg bg-muted-foreground/20" />
          </div>

          {/* After side */}
          <div 
            className="absolute inset-0 transition-all duration-700 ease-in-out overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${showBefore ? '30%' : '70%'})` }}
          >
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%),
                linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%),
                linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)
              `,
              backgroundSize: '12px 12px',
              backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
              opacity: 0.5
            }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-24 bg-gradient-to-t from-cyan to-cyan-light rounded-t-full shadow-cyan" />
          </div>

          {/* Labels */}
          <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-background/80 backdrop-blur-sm">
            <span className="text-[10px] font-medium text-muted-foreground">قبل</span>
          </div>
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-cyan/20 backdrop-blur-sm border border-cyan/30">
            <span className="text-[10px] font-medium text-cyan">بعد</span>
          </div>
        </div>

        {/* Sparkles */}
        <div className="absolute top-3 left-3 animate-pulse" style={{ animationDuration: '2s' }}>
          <Sparkles className="w-4 h-4 text-cyan/60" />
        </div>
      </div>

      {/* Animated ring */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[110%] h-[110%] rounded-full border border-cyan/20 animate-pulse-cyan" />
      </div>

      {/* Description */}
      <div className="mt-6 text-center">
        <h2 className="text-base font-bold text-cyan-gradient mb-1">محرر صور احترافي</h2>
        <p className="text-xs text-muted-foreground">إزالة الخلفية • فلاتر • تعديلات</p>
      </div>
    </div>
  );
};
