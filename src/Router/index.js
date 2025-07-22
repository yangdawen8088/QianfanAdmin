import { createRouter, createWebHashHistory } from "vue-router"
import { dynamicRoutes, errorPages } from '@/router/route'
import pinia from '@/stores/index';
import { useRouteList } from '@/stores/routeList';
import { useThemeConfig } from '@/stores/themeConfig';
import { Session } from "@/utils/storage";
const storesUseThemeConfig = useThemeConfig(pinia);
export const routes = createRouter({
  history: createWebHashHistory(),
  routes: [...dynamicRoutes, ...errorPages]
});

const storesUseRouteList = useRouteList(pinia);
storesUseRouteList.setRoutesList(dynamicRoutes[0].children);
routes.beforeEach((to, form, next) => {
  if (to.path.toLowerCase().startsWith('/backend')) {
    const token = Session.get('token');
    if (token === null || token === undefined || token === '') {
      next('/Login');
    } else {
      next();
    }
  } else {
    window.scrollTo(0, 0);
    storesUseThemeConfig.changeIsShowOverview(true);
    storesUseThemeConfig.changeDocumentTitle(to.meta.title);
    next();
  }
})
export default routes;