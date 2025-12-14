import { createContext, useContext, ReactNode } from 'react';
import { useUnityAds } from '@/hooks/useUnityAds';

interface AdsContextType {
  isInitialized: boolean;
  isNative: boolean;
  rewardedAdReady: boolean;
  showRewardedAd: () => Promise<boolean>;
  showBanner: (position?: 'top' | 'bottom') => Promise<void>;
  hideBanner: () => Promise<void>;
}

const AdsContext = createContext<AdsContextType | null>(null);

interface AdsProviderProps {
  children: ReactNode;
  showBannerOnMount?: boolean;
  bannerPosition?: 'top' | 'bottom';
  showRewardedAfterSeconds?: number;
}

export const AdsProvider = ({
  children,
  showBannerOnMount = true,
  bannerPosition = 'top',
  showRewardedAfterSeconds = 15,
}: AdsProviderProps) => {
  const ads = useUnityAds({
    showBannerOnMount,
    bannerPosition,
    showRewardedAfterSeconds,
  });

  return (
    <AdsContext.Provider value={ads}>
      {children}
    </AdsContext.Provider>
  );
};

export const useAds = () => {
  const context = useContext(AdsContext);
  if (!context) {
    throw new Error('useAds must be used within AdsProvider');
  }
  return context;
};
