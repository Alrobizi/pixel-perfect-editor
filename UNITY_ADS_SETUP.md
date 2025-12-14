# Unity Ads Native Plugin Setup

## متطلبات إعداد Unity Ads للأندرويد

### الخطوة 1: إنشاء حساب Unity وتسجيل اللعبة

1. قم بزيارة [Unity Dashboard](https://dashboard.unity3d.com/)
2. أنشئ مشروعاً جديداً أو استخدم مشروعاً موجوداً
3. فعّل خدمة Monetization
4. احصل على **Game ID** الخاص بك

### الخطوة 2: تحديث إعدادات Unity Ads

في ملف `src/services/unityAds.ts`، قم بتحديث:

```typescript
export const UNITY_ADS_CONFIG: UnityAdsConfig = {
  gameId: 'YOUR_ACTUAL_GAME_ID', // ← ضع Game ID الخاص بك هنا
  testMode: false, // ← غيّر إلى false للإنتاج
  bannerPlacementId: 'Banner_Android',
  rewardedPlacementId: 'Rewarded_Android',
};
```

### الخطوة 3: إضافة Unity Ads للمشروع الأصلي

بعد تحويل المشروع إلى أندرويد باستخدام Capacitor:

```bash
# 1. تنزيل المشروع من GitHub
git clone <your-repo-url>
cd <project-folder>

# 2. تثبيت الاعتماديات
npm install

# 3. إضافة منصة أندرويد
npx cap add android

# 4. بناء المشروع
npm run build
npx cap sync
```

### الخطوة 4: إعداد Unity Ads في Android Studio

افتح المشروع في Android Studio:
```bash
npx cap open android
```

#### أضف Unity Ads SDK في `android/app/build.gradle`:

```gradle
dependencies {
    implementation 'com.unity3d.ads:unity-ads:4.9.2'
}
```

#### أنشئ Capacitor Plugin لـ Unity Ads:

أنشئ ملف `android/app/src/main/java/com/yourapp/UnityAdsPlugin.java`:

```java
package com.yourapp;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.unity3d.ads.IUnityAdsInitializationListener;
import com.unity3d.ads.IUnityAdsLoadListener;
import com.unity3d.ads.IUnityAdsShowListener;
import com.unity3d.ads.UnityAds;
import com.unity3d.ads.UnityAdsShowOptions;
import com.unity3d.services.banners.BannerView;
import com.unity3d.services.banners.UnityBannerSize;

@CapacitorPlugin(name = "UnityAds")
public class UnityAdsPlugin extends Plugin {
    
    private BannerView bannerView;
    
    @PluginMethod
    public void initialize(PluginCall call) {
        String gameId = call.getString("gameId");
        Boolean testMode = call.getBoolean("testMode", true);
        
        UnityAds.initialize(getContext(), gameId, testMode, new IUnityAdsInitializationListener() {
            @Override
            public void onInitializationComplete() {
                call.resolve();
            }
            
            @Override
            public void onInitializationFailed(UnityAds.UnityAdsInitializationError error, String message) {
                call.reject(message);
            }
        });
    }
    
    @PluginMethod
    public void showBanner(PluginCall call) {
        String placementId = call.getString("placementId");
        String position = call.getString("position", "top");
        
        getActivity().runOnUiThread(() -> {
            if (bannerView != null) {
                bannerView.destroy();
            }
            
            bannerView = new BannerView(getActivity(), placementId, new UnityBannerSize(320, 50));
            bannerView.load();
            
            // Add to layout based on position
            // Implementation depends on your layout structure
            
            call.resolve();
        });
    }
    
    @PluginMethod
    public void hideBanner(PluginCall call) {
        if (bannerView != null) {
            getActivity().runOnUiThread(() -> {
                bannerView.destroy();
                bannerView = null;
            });
        }
        call.resolve();
    }
    
    @PluginMethod
    public void loadRewardedAd(PluginCall call) {
        String placementId = call.getString("placementId");
        
        UnityAds.load(placementId, new IUnityAdsLoadListener() {
            @Override
            public void onUnityAdsAdLoaded(String placementId) {
                call.resolve();
            }
            
            @Override
            public void onUnityAdsFailedToLoad(String placementId, UnityAds.UnityAdsLoadError error, String message) {
                call.reject(message);
            }
        });
    }
    
    @PluginMethod
    public void showRewardedAd(PluginCall call) {
        String placementId = call.getString("placementId");
        
        UnityAds.show(getActivity(), placementId, new UnityAdsShowOptions(), new IUnityAdsShowListener() {
            @Override
            public void onUnityAdsShowComplete(String placementId, UnityAds.UnityAdsShowCompletionState state) {
                JSObject result = new JSObject();
                result.put("rewarded", state == UnityAds.UnityAdsShowCompletionState.COMPLETED);
                call.resolve(result);
            }
            
            @Override
            public void onUnityAdsShowFailure(String placementId, UnityAds.UnityAdsShowError error, String message) {
                call.reject(message);
            }
            
            @Override
            public void onUnityAdsShowStart(String placementId) {}
            
            @Override
            public void onUnityAdsShowClick(String placementId) {}
        });
    }
    
    @PluginMethod
    public void isRewardedAdReady(PluginCall call) {
        String placementId = call.getString("placementId");
        JSObject result = new JSObject();
        result.put("ready", UnityAds.isReady());
        call.resolve(result);
    }
}
```

### الخطوة 5: تسجيل الـ Plugin

في `android/app/src/main/java/com/yourapp/MainActivity.java`:

```java
import com.yourapp.UnityAdsPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(UnityAdsPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
```

### الخطوة 6: تشغيل التطبيق

```bash
npx cap run android
```

---

## ملاحظات هامة

- **Test Mode**: اترك `testMode: true` أثناء التطوير
- **Placement IDs**: تأكد من إنشاء Placements في Unity Dashboard
- **Rewarded Ads**: سيظهر الإعلان المكافئ بعد 15 ثانية من فتح التطبيق
- **Banner Ads**: سيظهر في أعلى الشاشة تلقائياً

## الحصول على Game ID

1. سجل في [Unity Dashboard](https://dashboard.unity3d.com/)
2. أنشئ مشروع جديد
3. اذهب إلى **Monetization** → **Get Started**
4. أضف منصة Android
5. انسخ **Game ID**
