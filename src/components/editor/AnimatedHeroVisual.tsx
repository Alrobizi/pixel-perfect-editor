import { useEffect, useState } from "react";
import { Sparkles, ImageIcon, Scissors } from "lucide-react";

export const AnimatedHeroVisual = () => {
  const [showBefore, setShowBefore] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBefore((prev) => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Main animated card */}
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-cyan shadow-cyan animate-scale-in">
        {/* Before/After mockup */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary">
          {/* Split view line */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-cyan z-20 transition-all duration-700 ease-in-out"
            style={{ left: showBefore ? '30%' : '70%' }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full gradient-cyan flex items-center justify-center shadow-cyan">
              <Scissors className="w-4 h-4 text-cyan-foreground" />
            </div>
          </div>

          {/* Before side - with background */}
          <div 
            className="absolute inset-0 transition-all duration-700 ease-in-out overflow-hidden"
            style={{ clipPath: `inset(0 ${showBefore ? '70%' : '30%'} 0 0)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/10" />
            {/* Simulated person silhouette */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-32 bg-gradient-to-t from-cyan/40 to-cyan/20 rounded-t-full" />
            {/* Background elements */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted-foreground/20" />
            <div className="absolute top-8 right-16 w-6 h-6 rounded-full bg-muted-foreground/15" />
            <div className="absolute bottom-8 left-4 w-12 h-12 rounded-lg bg-muted-foreground/20" />
          </div>

          {/* After side - without background */}
          <div 
            className="absolute inset-0 transition-all duration-700 ease-in-out overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${showBefore ? '30%' : '70%'})` }}
          >
            {/* Transparent checkered pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%),
                linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%),
                linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)
              `,
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
              opacity: 0.5
            }} />
            {/* Simulated person silhouette - same position */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-32 bg-gradient-to-t from-cyan to-cyan-light rounded-t-full shadow-cyan" />
          </div>

          {/* Labels */}
          <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm">
            <span className="text-xs font-medium text-muted-foreground">قبل</span>
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-cyan/20 backdrop-blur-sm border border-cyan/30">
            <span className="text-xs font-medium text-cyan">بعد</span>
          </div>
        </div>

        {/* Floating sparkles */}
        <div className="absolute top-4 left-4 animate-pulse" style={{ animationDuration: '2s' }}>
          <Sparkles className="w-5 h-5 text-cyan/60" />
        </div>
        <div className="absolute top-6 right-8 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
          <Sparkles className="w-4 h-4 text-cyan/40" />
        </div>
      </div>

      {/* Floating icon */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl gradient-cyan flex items-center justify-center shadow-cyan-lg animate-float">
        <ImageIcon className="w-7 h-7 text-cyan-foreground" />
      </div>

      {/* Animated rings */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-cyan/10 animate-pulse-cyan" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full border border-dashed border-cyan/5" />
      </div>

      {/* Description */}
      <div className="mt-12 text-center">
        <h2 className="text-lg font-bold text-cyan-gradient mb-2">محرر صور احترافي</h2>
        <p className="text-sm text-muted-foreground">إزالة الخلفية • فلاتر متقدمة • تعديلات دقيقة</p>
      </div>
    </div>
  );
};
