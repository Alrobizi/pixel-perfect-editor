import { useState } from 'react';
import { Crown, Play, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAds } from '@/components/ads/AdsProvider';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface RewardedAdButtonProps {
  onRewardEarned: () => void;
  isUnlocked: boolean;
}

export const RewardedAdButton = ({ onRewardEarned, isUnlocked }: RewardedAdButtonProps) => {
  const { showRewardedAd, isNative } = useAds();
  const [isLoading, setIsLoading] = useState(false);

  const handleWatchAd = async () => {
    if (isUnlocked) return;
    
    setIsLoading(true);
    
    try {
      // For web preview, simulate the ad
      if (!isNative) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success('🎉 تم فتح الفلاتر الحصرية!');
        onRewardEarned();
        setIsLoading(false);
        return;
      }
      
      // For native app
      const rewarded = await showRewardedAd();
      if (rewarded) {
        onRewardEarned();
      }
    } catch (error) {
      toast.error('حدث خطأ، حاول مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  if (isUnlocked) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-premium/20 border border-premium/30">
        <CheckCircle className="w-5 h-5 text-premium" />
        <span className="text-sm font-medium text-premium">الفلاتر الحصرية مفتوحة!</span>
      </div>
    );
  }

  return (
    <Button
      onClick={handleWatchAd}
      disabled={isLoading}
      className={cn(
        "w-full gap-3 py-6 text-base font-semibold",
        "gradient-premium",
        "text-premium-foreground border-0",
        "shadow-premium transition-all duration-300",
        "hover:opacity-90",
        "disabled:opacity-70"
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>جاري تحميل الإعلان...</span>
        </>
      ) : (
        <>
          <Crown className="w-5 h-5" />
          <span>شاهد إعلان لفتح الفلاتر الحصرية</span>
          <Play className="w-5 h-5" />
        </>
      )}
    </Button>
  );
};
