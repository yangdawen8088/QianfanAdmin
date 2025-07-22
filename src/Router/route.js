import FrontLayout from '@/Layout/FrontLayout.vue'
import BackendLayout from '@/Layout/BackendLayout.vue'
export const dynamicRoutes = [
  {
    path: '/',
    name: 'Front',
    component: FrontLayout,
    children: [{
      path: '/',
      name: 'Home',
      component: () => import('@/Views/FrontViews/HomePage/index.vue'),
      meta: {
        title: '首页',
        isHide: false,
        isShowOverview: true,
        icon: "icon-shouye4"
      }
    }]
  },
  {
    path: '/Backend',
    name: 'Backend',
    component: BackendLayout,
    children: [{
      path: '/Backend',
      name: 'Dashboard',
      component: () => import('@/Views/BackendViews/Dashboard/index.vue'),
      meta: {
        title: '首页',
        isHide: false,
        isShowOverview: true,
        icon: "icon-shouye4"
      }
    }]
  }, {
    path: '/Login',
    name: 'Login',
    component: () => import('@/Views/Login/index.vue'),
    meta: {
      title: '登录',
      isHide: true
    }
  }
];
export const errorPages = [
  {
    path: '/:path(.*)*',
    name: 'notFound',
    component: () => import('@/Views/Error/error404.vue'),
    meta: {
      title: 'notFound',
      isHide: true,
    }
  },
  {
    path: '/401',
    name: 'NoPower',
    component: () => import('@/Views/Error/error401.vue'),
    meta: {
      title: 'NoPower',
      isHide: true,
    }
  }
]