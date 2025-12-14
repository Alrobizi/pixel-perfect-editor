import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.52d947b304b8481d8ad1ed34b205aa84',
  appName: 'محرر الصور',
  webDir: 'dist',
  server: {
    url: 'https://52d947b3-04b8-481d-8ad1-ed34b205aa84.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    // Unity Ads configuration will be handled natively
  }
};

export default config;
