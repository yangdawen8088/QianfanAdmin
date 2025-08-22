import { toRaw } from "vue";
import { defineStore } from "pinia";
import { Local } from "@/Utils/storage.js";
export const useAppSettings = defineStore('appSettings', {
  state: () => ({
    appSettings: {
      /** 国际化语言配置，默认 zh-CN ，可选配置 zh-CN | zh-TW | en-US | de-DE */
      globalI18n: 'zh-CN',
      /** 系统当前页面名称 */
      documentTitle: '首页',
      /** 系统 视窗高度 */
      viewHeight: 0,
      /** 系统 视窗宽度 */
      viewWidth: 0,
      /** 客户端当前的设备， DESKTOP | PAD | MOBILE */
      currentDevice: 'DESKTOP',
      /** 系统 滚动条位置 */
      scroll: 0,
      /** 系统菜单是否展开 */
      menuIsExpand: true,
      /** 当 subSystem = true 时，系统当前所处的子系统 */
      currentSubSystem: '',
      /** 当 layout = columns 时，分栏所处的菜单子项 */
      currentColumnsSystem: '',
      /** 是否开启全屏 */
      screenfull: false
    },
    systemTheme: {
      /** 开启水印 */
      showWatermark: true,
      /** 水印的颜色 */
      watermarkTextColor: '#60626615',
      /** 水印文本 */
      watermarkContent: 'Qianfan Admin',
      /** 组件大小 */
      componentSize: 'default',
      /** 是否显示页签 */
      showPageTabs: true,
      /** 是否固定头部 */
      affixHeader: true,
      /** 页头高度 */
      headerHeight: 60,
      /** 菜单宽度 */
      menuWidth: 200,
      /** 是否显示页脚 */
      showFooter: true,
      /** 系统布局切换，default | horizontal | classic | columns | chapter */
      layout: 'default',
      /** 页面缩放大小，倍数 */
      pageZoom: 1,
      /** 是否拆分子系统：这将自动匹配后台路由一级菜单为子系统 */
      subSystem: false,
      /** 主题类型，light | dark | darkBlue */
      themeType: 'light',
      /** 顶部导航背景颜色 */
      topNavBGColor: '',
      /** 顶部导航字体颜色 */
      topNavFontColor: '',
      /** 左侧菜单栏背景颜色 */
      menuBarBGColor: '',
      /** 左侧菜单栏字体颜色 */
      menuBarFontColor: '',
      /** 左侧分栏背景颜色 */
      sidebarBGColor: '',
      /** 左侧分栏字体颜色 */
      sidebarFontColor: '',
      /** 页脚背景颜色 */
      pageFooterBGColor: '',
      /** 页脚字体颜色 */
      pageFooterFontColor: '',
      /** 页脚背景颜色 */
      systemBGColor: '',
      /** 主题颜色 */
      primaryColor: '#1890ff',
      /** 成功的颜色 */
      successColor: '#67C23A',
      /** 警告的颜色 */
      warningColor: '#E6A23C',
      /** 危险的颜色 */
      dangerColor: '#F56C6C',
      /** 信息的颜色 */
      infoColor: '#909399',
    },
    pageTabs: []
  }),
  actions: {
    setPageTabs(data) {
      let _pageTabs = [];
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        _pageTabs.push({
          fullPath: item.fullPath,
          href: item.href,
          isSelected: item.isSelected,
          meta: item.meta,
          name: item.name,
          path: item.path,
          query: item.query
        });
      }
      this.pageTabs = _pageTabs;
      Local.remove('pageTabs');
      Local.set('pageTabs', this.pageTabs);
    },
    setAppSettings(data) {
      this.appSettings = data;
      Local.remove('appSettings');
      Local.set('appSettings', this.appSettings);
    },
    setSystemTheme(data) {
      this.systemTheme = data;
      Local.remove('systemTheme');
      Local.set('systemTheme', this.systemTheme);
    },
    changeDocumentTitle(value) {
      this.appSettings.documentTitle = value
      Local.remove('appSettings');
      Local.set('appSettings', this.appSettings);
    },
    changeCurrentDevice(value) {
      this.appSettings.currentDevice = value
      Local.remove('appSettings');
      Local.set('appSettings', this.appSettings);
    },
    changeViewSize(value) {
      this.appSettings.viewHeight = value.height;
      this.appSettings.viewWidth = value.width;
      Local.set('appSettings', this.appSettings);
    },
    changeScroll(value) {
      this.appSettings.scroll = value
      Local.remove('appSettings');
      Local.set('appSettings', this.appSettings);
    },
  }
})