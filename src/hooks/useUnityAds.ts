import { useEffect, useState, useCallback, useRef } from 'react';
import { unityAdsService, isNativeApp } from '@/services/unityAds';
import { toast } from 'sonner';

interface UseUnityAdsOptions {
  showBannerOnMount?: boolean;
  bannerPosition?: 'top' | 'bottom';
  showRewardedAfterSeconds?: number;
}

export const useUnityAds = (options: UseUnityAdsOptions = {}) => {
  const {
    showBannerOnMount = true,
    bannerPosition = 'top',
    showRewardedAfterSeconds,
  } = options;

  const [isInitialized, setIsInitialized] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [rewardedAdReady, setRewardedAdReady] = useState(false);
  const rewardedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasShownRewardedRef = useRef(false);

  // Initialize Unity Ads
  useEffect(() => {
    const init = async () => {
      const native = isNativeApp();
      setIsNative(native);

      if (!native) {
        console.log('[useUnityAds] Not running in native app, ads disabled');
        return;
      }

      const success = await unityAdsService.initialize();
      setIsInitialized(success);

      if (success) {
        // Preload rewarded ad
        await unityAdsService.loadRewardedAd();
        const ready = await unityAdsService.isRewardedAdReady();
        setRewardedAdReady(ready);
      }
    };

    init();
  }, []);

  // Show banner on mount if enabled
  useEffect(() => {
    if (isInitialized && showBannerOnMount) {
      unityAdsService.showBannerAd(bannerPosition);
    }

    return () => {
      if (isInitialized) {
        unityAdsService.hideBannerAd();
      }
    };
  }, [isInitialized, showBannerOnMount, bannerPosition]);

  // Show rewarded ad after specified seconds
  useEffect(() => {
    if (!isInitialized || !showRewardedAfterSeconds || hasShownRewardedRef.current) {
      return;
    }

    rewardedTimerRef.current = setTimeout(async () => {
      if (hasShownRewardedRef.current) return;
      
      hasShownRewardedRef.current = true;
      const rewarded = await unityAdsService.showRewardedAd();
      
      if (rewarded) {
        toast.success('شكراً لمشاهدة الإعلان! 🎉');
      }
    }, showRewardedAfterSeconds * 1000);

    return () => {
      if (rewardedTimerRef.current) {
        clearTimeout(rewardedTimerRef.current);
      }
    };
  }, [isInitialized, showRewardedAfterSeconds]);

  // Manual show rewarded ad
  const showRewardedAd = useCallback(async (): Promise<boolean> => {
    if (!isInitialized) {
      toast.error('الإعلانات غير متاحة');
      return false;
    }

    const rewarded = await unityAdsService.showRewardedAd();
    
    if (rewarded) {
      toast.success('تم الحصول على المكافأة! 🎁');
    }
    
    // Reload for next time
    await unityAdsService.loadRewardedAd();
    const ready = await unityAdsService.isRewardedAdReady();
    setRewardedAdReady(ready);
    
    return rewarded;
  }, [isInitialized]);

  // Show/hide banner manually
  const showBanner = useCallback(async (position: 'top' | 'bottom' = 'top') => {
    if (isInitialized) {
      await unityAdsService.showBannerAd(position);
    }
  }, [isInitialized]);

  const hideBanner = useCallback(async () => {
    if (isInitialized) {
      await unityAdsService.hideBannerAd();
    }
  }, [isInitialized]);

  return {
    isInitialized,
    isNative,
    rewardedAdReady,
    showRewardedAd,
    showBanner,
    hideBanner,
  };
};
