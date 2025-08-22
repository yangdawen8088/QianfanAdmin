import FrontLayout from '@/Layout/FrontLayout.vue'
import BackendLayout from '@/Layout/BackendLayout.vue'
/**
 * @isHide 是否在菜单栏显示
 * @isAffix 是否固定在标签栏
 * @keepAlive 是否缓存页面
 */
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
        icon: "icon-shouye2"
      }
    }]
  },
  {
    path: '/Backend',
    name: 'Backend',
    component: BackendLayout,
    redirect: '/Backend/Dashboard',
    children: [{
      path: '/Backend/Dashboard',
      name: 'Dashboard',
      component: () => import('@/Views/BackendViews/Dashboard/Dashboard.vue'),
      meta: {
        title: '首页',
        isHide: false,
        mainPage: true,
        isAffix: true,
        keepAlive: true,
        isShowOverview: true,
        icon: "icon-shouye2"
      }
    }, {
      path: '/Backend/SystemManagement',
      name: 'SystemManagement',
      redirect: '/Backend/SystemManagement/ThemeSettings',
      meta: {
        title: '系统管理',
        isHide: false,
        keepAlive: true,
        isShowOverview: true,
        icon: "icon-peizhi-xitongpeizhi"
      },
      children: [{
        path: '/Backend/SystemManagement/ThemeSettings',
        name: 'ThemeSettings',
        component: () => import('@/Views/BackendViews/ThemeSettings/ThemeSettings.vue'),
        meta: {
          title: '主题设置',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-zhuti"
        }
      }, {
        path: '/Backend/SystemManagement/UserManagement',
        name: 'UserManagement',
        component: () => import('@/Views/BackendViews/UserManagement/UserManagement.vue'),
        meta: {
          title: '用户管理',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-gongzhonghao"
        }
      }, {
        path: '/Backend/SystemManagement/Role',
        name: 'Role',
        component: () => import('@/Views/BackendViews/Role/Role.vue'),
        meta: {
          title: '角色管理',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-jiaoseguanli"
        }
      }, {
        path: '/Backend/SystemManagement/Menu',
        name: 'Menu',
        component: () => import('@/Views/BackendViews/Menu/Menu.vue'),
        meta: {
          title: '菜单管理',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-bumenguanli1"
        }
      }, {
        path: '/Backend/SystemManagement/Organization',
        name: 'Organization',
        component: () => import('@/Views/BackendViews/Organization/Organization.vue'),
        meta: {
          title: '组织架构',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-bumenguanli"
        }
      }, {
        path: '/Backend/SystemManagement/DataDictionary',
        name: 'DataDictionary',
        component: () => import('@/Views/BackendViews/DataDictionary/DataDictionary.vue'),
        meta: {
          title: '数据字典',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-list-v3-full"
        }
      }, {
        path: '/Backend/SystemManagement/Interface',
        name: 'Interface',
        component: () => import('@/Views/BackendViews/Interface/Interface.vue'),
        meta: {
          title: '接口管理',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-zhongmingming1"
        }
      }, {
        path: '/Backend/SystemManagement/Message',
        name: 'Message',
        component: () => import('@/Views/BackendViews/Message/Message.vue'),
        meta: {
          title: '通知消息',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-weixin1"
        }
      }, {
        path: '/Backend/SystemManagement/SystemLog',
        name: 'SystemLog',
        component: () => import('@/Views/BackendViews/SystemLog/SystemLog.vue'),
        meta: {
          title: '系统日志',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-timeAxis"
        }
      }]
    }, {
      path: '/Backend/FunctionDemo',
      name: 'FunctionDemo',
      redirect: '/Backend/FunctionDemo/DataList',
      meta: {
        title: '功能演示',
        isHide: false,
        keepAlive: true,
        isShowOverview: true,
        icon: "icon-gongzuotai"
      },
      children: [{
        path: '/Backend/FunctionDemo/DataList',
        name: 'DataList',
        component: () => import('@/Views/BackendViews/DataList/DataList.vue'),
        meta: {
          title: '数据列表',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-list-v3-full"
        }
      }, {
        path: '/Backend/FunctionDemo/Dragging',
        name: 'Dragging',
        component: () => import('@/Views/BackendViews/Dragging/Dragging.vue'),
        meta: {
          title: '元素拖拽',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-line-dragmovetuozhuai-02"
        }
      }, {
        path: '/Backend/FunctionDemo/VerificationCode',
        name: 'VerificationCode',
        component: () => import('@/Views/BackendViews/VerificationCode/VerificationCode.vue'),
        meta: {
          title: '验证码',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-jiami"
        }
      }, {
        path: '/Backend/FunctionDemo/TextareaEditor',
        name: 'TextareaEditor',
        component: () => import('@/Views/BackendViews/TextareaEditor/TextareaEditor.vue'),
        meta: {
          title: '文本编辑器',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-beizhu"
        }
      }, {
        path: '/Backend/FunctionDemo/FrontendPermission',
        name: 'FrontendPermission',
        component: () => import('@/Views/BackendViews/FrontendPermission/FrontendPermission.vue'),
        meta: {
          title: '前端权限',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-yanjianghuibao-xianxing"
        }
      }, {
        path: '/Backend/FunctionDemo/BackendPermission',
        name: 'BackendPermission',
        component: () => import('@/Views/BackendViews/BackendPermission/BackendPermission.vue'),
        meta: {
          title: '后端权限',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-bujushezhi"
        }
      }, {
        path: '/Backend/FunctionDemo/Iframe',
        name: 'Iframe',
        component: () => import('@/Views/BackendViews/Iframe/Iframe.vue'),
        meta: {
          title: '外部页面',
          isHide: false,
          keepAlive: true,
          isShowOverview: true,
          icon: "icon-lianxiwomen1"
        }
      }]
    }
    ]
  },
  {
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