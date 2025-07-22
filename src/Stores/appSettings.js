import { defineStore } from "pinia";
import { Local } from "@/utils/storage.js";
export const useAppSettingsStore = defineStore({
  state: () => ({
    appSettings: {
      /** 国际化语言配置，默认 zh-CN ，可选配置 zh-CN | zh-TW | en-US | de-DE */
      globalI18n: 'zh-CN',
    }
  }),
  actions: {
    setAppSettings (data) {
      this.appSettings = data;
      Local.remove('appSettings');
      Local.set('appSettings', this.appSettings);
    }
  }
})