// Unity Ads Service for Capacitor/Native Android
// This service provides an abstraction layer for Unity Ads

export interface UnityAdsConfig {
  gameId: string;
  testMode: boolean;
  bannerPlacementId: string;
  rewardedPlacementId: string;
}

// Default configuration - Replace with your Unity Ads Game ID
export const UNITY_ADS_CONFIG: UnityAdsConfig = {
  gameId: 'YOUR_UNITY_GAME_ID', // Replace with your actual Game ID from Unity Dashboard
  testMode: true, // Set to false in production
  bannerPlacementId: 'Banner_Android',
  rewardedPlacementId: 'Rewarded_Android',
};

// Check if running in Capacitor native environment
export const isNativeApp = (): boolean => {
  return !!(window as any).Capacitor?.isNativePlatform?.();
};

// Unity Ads bridge interface for native communication
interface UnityAdsBridge {
  initialize: (gameId: string, testMode: boolean) => Promise<void>;
  showBanner: (placementId: string, position: 'top' | 'bottom') => Promise<void>;
  hideBanner: () => Promise<void>;
  loadRewardedAd: (placementId: string) => Promise<void>;
  showRewardedAd: (placementId: string) => Promise<{ rewarded: boolean }>;
  isRewardedAdReady: (placementId: string) => Promise<boolean>;
}

// Get the native bridge if available
const getUnityAdsBridge = (): UnityAdsBridge | null => {
  const capacitor = (window as any).Capacitor;
  if (capacitor?.Plugins?.UnityAds) {
    return capacitor.Plugins.UnityAds as UnityAdsBridge;
  }
  return null;
};

class UnityAdsService {
  private initialized = false;
  private config: UnityAdsConfig;

  constructor(config: UnityAdsConfig) {
    this.config = config;
  }

  async initialize(): Promise<boolean> {
    if (this.initialized) return true;
    
    const bridge = getUnityAdsBridge();
    if (!bridge) {
      console.log('[UnityAds] Running in web mode - ads disabled');
      return false;
    }

    try {
      await bridge.initialize(this.config.gameId, this.config.testMode);
      this.initialized = true;
      console.log('[UnityAds] Initialized successfully');
      return true;
    } catch (error) {
      console.error('[UnityAds] Initialization failed:', error);
      return false;
    }
  }

  async showBannerAd(position: 'top' | 'bottom' = 'top'): Promise<void> {
    const bridge = getUnityAdsBridge();
    if (!bridge || !this.initialized) {
      console.log('[UnityAds] Banner ad not available');
      return;
    }

    try {
      await bridge.showBanner(this.config.bannerPlacementId, position);
      console.log('[UnityAds] Banner shown');
    } catch (error) {
      console.error('[UnityAds] Show banner failed:', error);
    }
  }

  async hideBannerAd(): Promise<void> {
    const bridge = getUnityAdsBridge();
    if (!bridge) return;

    try {
      await bridge.hideBanner();
    } catch (error) {
      console.error('[UnityAds] Hide banner failed:', error);
    }
  }

  async loadRewardedAd(): Promise<void> {
    const bridge = getUnityAdsBridge();
    if (!bridge || !this.initialized) return;

    try {
      await bridge.loadRewardedAd(this.config.rewardedPlacementId);
      console.log('[UnityAds] Rewarded ad loaded');
    } catch (error) {
      console.error('[UnityAds] Load rewarded ad failed:', error);
    }
  }

  async showRewardedAd(): Promise<boolean> {
    const bridge = getUnityAdsBridge();
    if (!bridge || !this.initialized) {
      console.log('[UnityAds] Rewarded ad not available');
      return false;
    }

    try {
      const isReady = await bridge.isRewardedAdReady(this.config.rewardedPlacementId);
      if (!isReady) {
        console.log('[UnityAds] Rewarded ad not ready, loading...');
        await this.loadRewardedAd();
        return false;
      }

      const result = await bridge.showRewardedAd(this.config.rewardedPlacementId);
      console.log('[UnityAds] Rewarded ad result:', result);
      return result.rewarded;
    } catch (error) {
      console.error('[UnityAds] Show rewarded ad failed:', error);
      return false;
    }
  }

  async isRewardedAdReady(): Promise<boolean> {
    const bridge = getUnityAdsBridge();
    if (!bridge || !this.initialized) return false;

    try {
      return await bridge.isRewardedAdReady(this.config.rewardedPlacementId);
    } catch {
      return false;
    }
  }
}

// Singleton instance
export const unityAdsService = new UnityAdsService(UNITY_ADS_CONFIG);
