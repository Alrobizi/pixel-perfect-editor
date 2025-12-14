import { useEffect, useState } from 'react';
import { isNativeApp } from '@/services/unityAds';

interface AdBannerProps {
  position?: 'top' | 'bottom';
}

export const AdBanner = ({ position = 'top' }: AdBannerProps) => {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setIsNative(isNativeApp());
  }, []);

  // In native app, the banner is handled by the native Unity Ads SDK
  // This component is just a placeholder for web preview
  if (isNative) {
    return null; // Native banner is rendered by the SDK
  }

  // Web preview placeholder
  return (
    <div
      className={`w-full h-14 bg-secondary/80 backdrop-blur-sm border-b border-border flex items-center justify-center gap-2 ${
        position === 'bottom' ? 'fixed bottom-0 left-0 right-0 border-t border-b-0' : ''
      }`}
    >
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span>مساحة إعلانية - Unity Ads Banner</span>
      </div>
    </div>
  );
};
