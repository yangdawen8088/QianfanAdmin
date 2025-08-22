import { defineStore } from 'pinia';

/**
 * 路由缓存列表
 * @methods setCacheKeepAlive 设置要缓存的路由 names（开启 Tagsview）
 * @methods addCachedView 添加要缓存的路由 names（关闭 Tagsview）
 * @methods delCachedView 删除要缓存的路由 names（关闭 Tagsview）
 * @methods delOthersCachedViews 右键菜单`关闭其它`，删除要缓存的路由 names（关闭 Tagsview）
 * @methods delAllCachedViews 右键菜单`全部关闭`，删除要缓存的路由 names（关闭 Tagsview）
 */
export const useKeepALiveNames = defineStore('keepALiveNames', {
  state: () => ({
    keepAliveNames: [],
    cachedViews: [],
  }),
  actions: {
    async setCacheKeepAlive (data) {
      this.keepAliveNames = data;
    },
    async addCachedView (_route) {
      if (_route !== null && _route !== undefined && _route !== '' && _route.meta.keepAlive && this.cachedViews.indexOf(_route.name) === -1) {
        this.cachedViews.push(_route.name);
      };
    },
    async delCachedView (_route) {
      const index = this.cachedViews.indexOf(_route.name);
      index > -1 && this.cachedViews.splice(index, 1);
    },
    async delOthersCachedViews (_route) {
      if (_route.meta.keepAlive) this.cachedViews = [_route.name];
      else this.cachedViews = [];
    },
    async delAllCachedViews () {
      this.cachedViews = [];
    },
  },
});
