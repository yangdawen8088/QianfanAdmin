import { createRouter, createWebHashHistory } from "vue-router"
import { dynamicRoutes, errorPages } from '@/Router/route'
import pinia from '@/Stores/index';
import { useRouteList } from '@/Stores/routeList';
import { storeToRefs } from 'pinia';
import { useKeepALiveNames } from '@/Stores/keepAliveNames';
import { useAppSettings } from '@/Stores/appSettings.js';
import { Session } from "@/Utils/storage";
const storesUseAppSettings = useAppSettings(pinia);
const storesUseKeepALiveNames = useKeepALiveNames(pinia);
export const routes = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes: [...dynamicRoutes, ...errorPages]
});

const storesUseRouteList = useRouteList(pinia);
storesUseRouteList.setRoutesList(dynamicRoutes[0].children);
const { appSettings, systemTheme } = storeToRefs(useAppSettings());
routes.beforeEach((to, form, next) => {
  storesUseKeepALiveNames.addCachedView(to);
  // if (to.path.toLowerCase().startsWith('/backend')) {
  if (false) {
    const token = Session.get('token');
    if (token === null || token === undefined || token === '') {
      next('/Login');
    } else {
      next();
    }
  } else {
    window.scrollTo(0, 0);
    storesUseAppSettings.changeDocumentTitle(to.meta.title);
    next();
  }
});
export default routes;