import Cookies from "js-cookie";

const Funcs = {
  /**
   * 为了规避同一域部署不同的系统引起缓存混乱，所以采用 SystemName 作前缀区分
   * @param {string} key 缓存的键
   * @returns 返回完整的键
   */
  setKey (key) {
    return `${__SYSTEM_NAME__}:${key}`;
  }
}
/**
 * window.localStorage 永久缓存
 * @method set 根据 Key 设置永久缓存
 * @method get 根据 Key 获取永久缓存
 * @method remove 根据 key 移除永久缓存
 * @method clear 清楚全部的永久缓存
 */
export const Local = {
  /**
   * 根据 Key 设置永久缓存
   * @param {string} key 缓存的键
   * @param {string} val 缓存的值
   */
  set (key, val) {
    window.localStorage.setItem(Funcs.setKey(key), JSON.stringify(val));
  },
  /**
   * 根据 Key 获取永久缓存
   * @param {string} key 缓存的键
   * @returns 
   */
  get (key) {
    let storageContent = window.localStorage.getItem(Funcs.setKey(key));
    return storageContent === null || storageContent === undefined || storageContent === 'null' || storageContent === 'undefined' ? null : JSON.parse(storageContent);
  },
  /**
   * 根据 key 移除永久缓存
   * @param {string} key 缓存的键
   */
  remove (key) {
    window.localStorage.removeItem(Funcs.setKey(key));
  },
  /**
   * 清楚全部的永久缓存
   */
  clear () {
    window.localStorage.clear();
  }
}

/**
 * window.localStorage 临时缓存
 * @method set 根据 Key 设置临时缓存
 * @method get 根据 Key 获取临时缓存
 * @method remove 根据 key 移除临时缓存
 * @method clear 清楚全部的临时缓存
 */
export const Session = {
  /**
   * 根据 key 设置临时缓存
   * @param {string} key 缓存的键
   * @param {string} val 缓存的值
   * @returns 
   */
  set (key, val) {
    if (key === 'token') return Cookies.set(key, val);
    window.sessionStorage.setItem(Funcs.setKey(key), JSON.stringify(val));
  },
  /**
   * 根据 Key 获取临时缓存
   * @param {string} key 缓存的键
   * @returns 
   */
  get (key) {
    if (key === 'token') return Cookies.get(key);
    let sessionContent = window.sessionStorage.getItem(Funcs.setKey(key));
    return sessionContent ? JSON.parse(sessionContent) : null;
  },
  /**
   * 根据 key 移除临时缓存
   * @param {string} key 缓存的键
   * @returns 
   */
  remove (key) {
    if (key === 'token') return Cookies.remove(key);
    window.sessionStorage.removeItem(Funcs.setKey(key));
  },
  /**
   * 清楚全部的临时缓存
   */
  clear () {
    Cookies.remove('token');
    window.sessionStorage.clear();
  }
}