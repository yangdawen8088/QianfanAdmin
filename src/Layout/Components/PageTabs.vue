<template>
  <div
    class="header-not-hide"
    :class="{
      'header-hide': ishide,
      'border-bottom-style': systemTheme.affixHeader && !ishide,
    }"
  >
    <el-header
      height="100%"
      style="display: flex; justify-content: flex-start; padding: 0 6px"
      class="page-tabs-container"
    >
      <div class="page-tabs page-tabs-style-one">
        <el-dropdown
          trigger="contextmenu"
          hide-on-click
          v-for="item in pageTabs"
          :key="item"
          v-show="item.meta.isAffix"
        >
          <div
            class="page-tab-item"
            :class="{ 'drag-disabled': item.meta.isAffix }"
            @click="OnTabsChange(item)"
          >
            <div :class="{ 'item-active': item.isSelected }">
              <i class="menu-icon iconfont" :class="item.meta.icon" />
              <span>{{ item.meta.title }}</span>
              <div class="close-btn-container">
                <i
                  class="close-btn iconfont icon-pinned"
                  @click.stop="OnCancelAffixTabs(item)"
                />
              </div>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="menu in dropdownAffixOptions"
                :key="menu"
                @click="OnTabDropdownClick(item, menu.label)"
              >
                <i class="iconfont" :class="menu.icon" />
                <span>{{ menu.label }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-scrollbar
        ref="scrollbarRef"
        view-style="display:flex;justify-content:flex-start;box-sizing: border-box;"
        @wheel.prevent="onHandleScroll"
      >
        <div
          ref="dragTable"
          class="page-tabs page-tabs-style-one"
          :class="`tabs-drag-${props.isTopNav ? 'top' : 'nottop'}`"
        >
          <el-dropdown
            trigger="contextmenu"
            hide-on-click
            v-for="item in pageTabs"
            :key="item"
            v-show="!item.meta.isAffix"
          >
            <div
              class="page-tab-item"
              :class="{ 'drag-disabled': item.meta.isAffix }"
              @click="OnTabsChange(item)"
            >
              <div :class="{ 'item-active': item.isSelected }">
                <i class="menu-icon iconfont" :class="item.meta.icon" />
                <span>{{ item.meta.title }}</span>
                <div class="close-btn-container">
                  <i
                    class="close-btn iconfont icon-guanbi2"
                    @click.stop="OnCloseTabs(item)"
                  />
                </div>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="menu in dropdownOptions"
                  :key="menu"
                  @click="OnTabDropdownClick(item, menu.label)"
                >
                  <i class="iconfont" :class="menu.icon" />
                  <span>{{ menu.label }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-scrollbar>
    </el-header>
  </div>
</template>
<script setup name="PageTabs">
import { ref, onMounted, nextTick, computed } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import pinia from "@/Stores/index";
import { storeToRefs } from "pinia";
import { useKeepALiveNames } from "@/Stores/keepAliveNames";
import { useAppSettings } from "@/Stores/appSettings";
import Sortable from "sortablejs";
const props = defineProps({
  isTopNav: {
    type: Boolean,
    default: true,
  },
});
const storesUseAppSettings = useAppSettings(pinia);
const storesUseKeepALiveNames = useKeepALiveNames(pinia);
const storesUseKeepALiveName = useKeepALiveNames();
const stores = useAppSettings();
const { cachedViews } = storeToRefs(storesUseKeepALiveName);
const { pageTabs, appSettings, systemTheme } = storeToRefs(stores);
const route = useRoute();
const router = useRouter();
const scrollbarRef = ref();
const onHandleScroll = (e) => {
  scrollbarRef.value.wrapRef.scrollLeft -= e.wheelDelta / 4;
};
const ishide = computed(() => {
  // !systemTheme.showPageTabs || systemTheme.layout === 'chapter'
  if (props.isTopNav) {
    return (
      !systemTheme.value.showPageTabs ||
      (systemTheme.value.showPageTabs &&
        systemTheme.value.layout !== "horizontal")
    );
  } else {
    return (
      !systemTheme.value.showPageTabs ||
      systemTheme.value.layout === "horizontal" ||
      systemTheme.value.layout === "chapter"
    );
  }
});
/** 页签控制 Start */
const dropdownOptions = ref([
  { label: "刷新", icon: "icon-shuaxin" },
  { label: "关闭其它", icon: "icon-guanbiqitawenjian" },
  { label: "关闭左边", icon: "icon-guanbizuobian" },
  { label: "关闭右边", icon: "icon-guanbizuobianbeifen" },
  { label: "关闭所有", icon: "icon-guanbisuoyou1" },
  { label: "固定此页", icon: "icon-pinned" },
  // { label: '页面全屏', icon: 'icon-yulanyemianquanping' },
  // { label: '新窗口打开', icon: 'icon-xinchuangkoudakai' },
]);
const dropdownAffixOptions = ref([
  { label: "刷新", icon: "icon-shuaxin" },
  { label: "关闭其它", icon: "icon-guanbiqitawenjian" },
  { label: "关闭右边", icon: "icon-guanbizuobianbeifen" },
  { label: "关闭所有", icon: "icon-guanbisuoyou1" },
  // { label: '页面全屏', icon: 'icon-yulanyemianquanping' },
  // { label: '新窗口打开', icon: 'icon-xinchuangkoudakai' },
]);
const OnTabDropdownClick = (tab, label) => {
  let _delTabs = [];
  switch (label) {
    case "刷新":
      router.replace({ path: tab.path, query: { t: Date.now() } });
      break;
    case "关闭":
      OnCloseTabs(tab);
      break;
    case "关闭其它":
      pageTabs.value = pageTabs.value.filter((item) =>{ item.path === tab.path || item.meta.isAffix || item.meta.mainPage; });
      storesUseAppSettings.setPageTabs(pageTabs.value);
      storesUseKeepALiveNames.setCacheKeepAlive(
        pageTabs.value
          .filter((item) => item.meta.keepAlive)
          .map((item) => item.name)
      );
      if (tab.path !== route.path) {
        router.push(tab.path);
      }
      break;
    case "关闭左边":
      _delTabs = [];
      for (let index = 0; index < pageTabs.value.length; index++) {
        if (pageTabs.value[index].path === tab.path) break;
        if (
          !pageTabs.value[index].meta.isAffix &&
          !pageTabs.value[index].meta.mainPage
        ) {
          _delTabs.push(pageTabs.value[index].name);
          continue;
        }
      }
      pageTabs.value = pageTabs.value.filter((item) => _delTabs.indexOf(item.name) === -1);
      storesUseAppSettings.setPageTabs(pageTabs.value);
      storesUseKeepALiveNames.setCacheKeepAlive(
        pageTabs.value
          .filter((item) => item.meta.keepAlive)
          .map((item) => item.name)
      );
      if (
        tab.path !== route.path &&
        pageTabs.value.filter((item) => item.path === route.path).length === 0
      ) {
        router.push(tab.path);
      }
      break;
    case "关闭右边":
      _delTabs = [];
      for (
        let index = pageTabs.value.length - 1;
        index < pageTabs.value.length;
        index--
      ) {
        if (pageTabs.value[index].path === tab.path) break;
        if (
          !pageTabs.value[index].meta.isAffix &&
          !pageTabs.value[index].meta.mainPage
        ) {
          _delTabs.push(pageTabs.value[index].name);
          continue;
        }
      }
      pageTabs.value = pageTabs.value.filter((item) => _delTabs.indexOf(item.name) === -1);
      storesUseAppSettings.setPageTabs(pageTabs.value);
      storesUseKeepALiveNames.setCacheKeepAlive(
        pageTabs.value
          .filter((item) => item.meta.keepAlive)
          .map((item) => item.name)
      );
      if (
        tab.path !== route.path &&
        pageTabs.value.filter((item) => item.path === route.path).length === 0
      ) {
        router.push(tab.path);
      }
      break;
    case "关闭所有":
      pageTabs.value = pageTabs.value.filter((item) => item.meta.isAffix || item.meta.mainPage);
      storesUseAppSettings.setPageTabs(pageTabs.value);
      storesUseKeepALiveNames.setCacheKeepAlive(
        pageTabs.value
          .filter((item) => item.meta.keepAlive)
          .map((item) => item.name)
      );
      if (
        pageTabs.value.length !== 0 &&
        pageTabs.value.filter((item) => item.path === route.path).length === 0
      ) {
        router.push(pageTabs.value[0].path);
      }
      break;
    case "固定此页":
      if (tab.meta.isAffix) return;
      tab.meta.isAffix = true;
      storesUseAppSettings.setPageTabs(pageTabs.value);
      break;
  }
};
const OnTabsChange = (toRoute) => {
  if (toRoute.isSelected) return;
  storesUseKeepALiveNames.addCachedView(toRoute);
  pageTabs.value.forEach((item) => {
    item.isSelected = item.path === toRoute.path;
  });
  router.push(toRoute.path);
  storesUseAppSettings.setPageTabs(pageTabs.value);
};
const OnCancelAffixTabs = (tab) => {
  if (tab.meta.mainPage) return;
  tab.meta.isAffix = false;
  storesUseAppSettings.setPageTabs(pageTabs.value);
};
const OnCloseTabs = (toRoute) => {
  if (pageTabs.value.length === 1) return;
  if (toRoute.meta.isAffix) return;
  if (toRoute.meta.mainPage) return;
  const index = pageTabs.value.findIndex((item) => item.path === toRoute.path);
  let nextPath = "";
  let nextindex = "";
  if (index === pageTabs.value.length - 1) {
    nextindex = index - 1;
    nextPath = pageTabs.value[index - 1].path;
  } else if (toRoute.path === route.path) {
    nextindex = index + 1;
    nextPath = pageTabs.value[index + 1].path;
  }
  pageTabs.value.splice(index, 1);
  storesUseAppSettings.setPageTabs(pageTabs.value);
  storesUseKeepALiveNames.delCachedView(toRoute);
  if (pageTabs.value.filter((i) => i.path === route.path).length === 0) {
    pageTabs.value[nextindex].isSelected = true;
    router.push(nextPath);
  }
};
const OnInitTabList = () => {
  const routeList = [];
  const GetRouteList = (routeTree) => {
    let _tabList = [];
    routeTree.forEach((item) => {
      if (
        item.children !== null &&
        item.children !== undefined &&
        item.children.length > 0
      ) {
        _tabList = _tabList.concat(GetRouteList(item.children));
      } else if (item.meta && item.meta.isAffix) {
        _tabList.push(item);
      }
    });
    return _tabList;
  };
  // 获取路由列表
  GetRouteList(route.matched).forEach((item) => {
    if (
      item.meta &&
      item.meta.isAffix &&
      routeList.filter((i) => i.path === item.path).length === 0
    ) {
      item.isSelected = item.path === route.path;
      routeList.push(item);
      storesUseKeepALiveNames.addCachedView(item);
    }
  });
  // 获取本地存储列表
  pageTabs.value.forEach((item) => {
    if (routeList.filter((i) => i.path === item.path).length === 0) {
      item.isSelected = item.path === route.path;
      routeList.push(item);
      storesUseKeepALiveNames.addCachedView(item);
    }
  });
  // 获取当前路由
  if (routeList.filter((i) => i.path === route.path).length === 0) {
    route.isSelected = true;
    routeList.push(route);
    storesUseKeepALiveNames.addCachedView(route);
  }
  return routeList;
};
const dragTable = ref();
const InitDropTable = () => {
  if (dragTable.value) {
    Sortable.create(
      document.querySelector(`.tabs-drag-${props.isTopNav ? "top" : "nottop"}`),
      {
        animation: 500,
        disabled: false, //拖拽不可用? false 启用（刚刚渲染表格的时候起作用，后面不起作用）
        handle: ".page-tab-item",
        filter: ".drag-disabled", // 指定不可拖拽的目标类名
        dragClass: ".dragClass", //设置拖拽样式类名
        ghostClass: ".ghostClass", //设置拖拽停靠样式类名
        chosenClass: ".chosenClass", //设置选中样式类名
        onEnd: ({ newIndex, oldIndex }) => {
          const arr = pageTabs.value;
          const currRow = arr.splice(oldIndex, 1)[0];
          arr.splice(newIndex, 0, currRow);
          pageTabs.value = [];
          nextTick(() => {
            pageTabs.value = arr;
            storesUseAppSettings.setPageTabs(pageTabs.value);
          });
        },
      }
    );
  }
};

onBeforeRouteUpdate((to) => {
  if (pageTabs.value.filter((item) => to.path === item.path).length === 0) {
    pageTabs.value.forEach((item) => {
      item.isSelected = false;
    });
    to.isSelected = true;
    pageTabs.value.push(to);
  } else {
    pageTabs.value.forEach((item) => {
      item.isSelected = item.path === to.path;
    });
  }
  storesUseAppSettings.setPageTabs(pageTabs.value);
  if (
    to.meta.isAffix &&
    to.meta.keepAlive &&
    cachedViews.value.indexOf(to.name) === -1
  ) {
    storesUseKeepALiveNames.addCachedView(to);
  }
});
/** 页签控制 End */
onMounted(() => {
  storesUseAppSettings.setPageTabs(OnInitTabList());
  nextTick(() => {
    InitDropTable();
  });
});
</script>
<style lang="scss" scoped>
.header-not-hide {
  --tab-header-height: 30px;
  --tab-item-height: 26px;
  height: var(--tab-header-height) !important;
  min-height: var(--tab-header-height);
  outline: 1px solid var(--el-border-color-dark);
  transition: 0.5s;
  overflow: hidden;
  position: relative;
  opacity: 1;
  z-index: 1;
}
.header-hide {
  height: 0px !important;
  min-height: 0px !important;
  opacity: 0.5 !important;
  // transform: scale(0);
  filter: blur(5px);
}
.border-bottom-style {
  outline: none !important;
  box-shadow: 0 1px 3px var(--el-border-color-dark);
  transition: 0.5s;
}
.page-tabs-container {
  padding: 0px;
  box-sizing: border-box;
  background-color: var(--el-bg-color);
  z-index: 1;
  transition: 0.5s;
  overflow: hidden;
  opacity: 1;
}
.page-tabs {
  display: flex;
  height: var(--tab-header-height);
  width: fit-content;
  // > div:first-child {
  // 	margin-left: 12px;
  // }
  // > div:last-child {
  // 	margin-right: 12px;
  // }
}
.page-tab-item {
  margin: 0 2px;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    padding-left: 12px;
    height: var(--tab-item-height);
    transition: 0.5s;
    .menu-icon {
      margin: auto 6px auto auto;
      font-size: 0.8rem;
      height: var(--tab-item-height);
      line-height: var(--tab-item-height);
    }
    span {
      font-size: 0.7rem;
      width: fit-content;
      height: 100%;
      line-height: var(--tab-item-height);
    }
    .close-btn-container {
      height: var(--tab-item-height);
      line-height: var(--tab-item-height);
      padding: 0 5px;
      .close-btn {
        margin: auto;
        font-size: 0.6rem;
        padding: 2px;
        box-sizing: border-box;
        border-radius: 50%;
      }
      .close-btn:hover {
        background-color: var(--el-color-primary);
        color: #ffffff;
      }
    }
  }
}
.page-tabs-style-one {
  align-items: center;
  .page-tab-item > div {
    background-color: transparent;
    color: var(--el-text-color-regular);
    border: 1px solid var(--el-border-color);
    .close-btn {
      transition: 0.5s;
    }
  }
  .page-tab-item > div:hover:not(.item-active) {
    background-color: var(--el-menu-hover-bg-color);
    border: 1px solid var(--el-color-primary-light-3);
    color: var(--el-color-primary);
  }
  .page-tab-item > div.item-active {
    background-color: var(--el-color-primary);
    border: 1px solid var(--el-color-primary);
    color: #ffffff;
    .close-btn:hover {
      background-color: var(--el-text-color-regular);
      color: #ffffff;
    }
  }
}
</style>
