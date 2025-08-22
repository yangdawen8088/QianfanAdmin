<template>
  <el-aside
    class="columns"
    :class="{ 'columns-hide': systemTheme.layout !== 'columns' }"
    :width="`64px`"
    style="background-color: var(--qf-sidebar-bg-color)"
  >
    <Transition
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
    >
      <SystemTitle :isShowText="false" v-if="!appSettings.menuIsExpand" />
    </Transition>
    <el-scrollbar>
      <div
        class="columns-menu"
        v-for="item in systemMenus"
        :key="item"
        :class="{
          'columns-menu-active': appSettings.currentColumnsSystem === item.path,
        }"
        @click="OnHorMenuColumnsSelect(item)"
      >
        <i class="iconfont" :class="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </div>
    </el-scrollbar>
  </el-aside>
</template>
<script setup name="QFLayoutColumns">
import {
  computed,
  onMounted,
  ref,
  watch,
  nextTick,
  defineAsyncComponent,
} from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import pinia from "@/Stores/index";
import { storeToRefs } from "pinia";
import { useAppSettings } from "@/Stores/appSettings";
const SystemTitle = defineAsyncComponent(() => import("./SystemTitle.vue"));
const { appSettings, systemTheme } = storeToRefs(useAppSettings());
const storesUseAppSettings = useAppSettings(pinia);
const route = useRoute();
const router = useRouter();
const systemMenus = ref([]);
const OnHorMenuColumnsSelect = (item) => {
  if (item.path === appSettings.value.currentColumnsSystem) return;
  router.push(item.path);
};
const resetSystemMenus = (to) => {
  systemMenus.value =
    systemTheme.value.layout === "columns"
      ? to.matched[systemTheme.value.subSystem ? 1 : 0].children
      : [];
  if (systemTheme.value.layout === "columns") {
    if (systemTheme.value.subSystem) {
      appSettings.value.currentColumnsSystem = to.matched[2]?.path || "";
    } else {
      appSettings.value.currentColumnsSystem = to.matched[1].path;
    }
  }
  storesUseAppSettings.setAppSettings(appSettings.value);
};
watch(
  () => [systemTheme.value.subSystem, systemTheme.value.layout],
  () => {
    resetSystemMenus(route);
  }
);
onBeforeRouteUpdate((to) => {
  resetSystemMenus(to);
});
onMounted(() => {
  resetSystemMenus(route);
});
</script>
<style lang="scss" scoped>
.columns {
  background-color: var(--qf-sidebar-bg-color);
  transition: 0.5s;
  overflow: hidden;
}
.columns-hide {
  width: 0px !important;
  opacity: 0.5 !important;
  // transform: scale(0);
  filter: blur(5px);
}
.columns-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--qf-sidebar-bg-color);
  color: var(--qf-sidebar-font-color);
  border-radius: 5px;
  height: 58px;
  justify-content: center;
  margin: 3px;
  user-select: none;
  transition: 0.5s;
  cursor: pointer;
  i {
    font-size: 18px;
    margin-bottom: 3px;
  }
  span {
    font-size: 12px;
  }
}
.columns-menu:hover:not(.columns-menu-active) {
  background-color: var(--el-color-primary-light-5);
  color: #ffffff;
}
.columns-menu-active {
  background-color: var(--el-color-primary);
  font-weight: bold;
  color: #ffffff;
}
</style>
