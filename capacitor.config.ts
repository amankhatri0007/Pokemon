import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.pokemon',
  appName: 'Pokemon',
  webDir: 'www',
  bundledWebRuntime: false,
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound"]
    }
  }
};

export default config;
