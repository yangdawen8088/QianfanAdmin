<template>
  <div style="width: fit-content; min-width: fit-content">
    <el-breadcrumb class="breadcrumb" separator="/">
      <template v-for="(item, index) in breadcrumbs" :key="item">
        <el-breadcrumb-item
          :to="{ path: item.path }"
          v-if="index < breadcrumbs.length - 1"
        >
          <div class="breadcrumb-to">{{ item.title }}</div>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-else>
          <div class="breadcrumb-item">{{ item.title }}</div>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script setup name="Breadcrumb">
import { onMounted, ref, watch } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppSettings } from "@/Stores/appSettings";

const route = useRoute();
const { appSettings, systemTheme } = storeToRefs(useAppSettings());
const breadcrumbs = ref([]);
const getBreadcrumbs = (matched) => {
  if (matched === null || matched === undefined || matched.length === 0) return;
  let _breadcrumbs = matched
    .filter((item) => item.meta.title !== null && item.meta.title !== undefined)
    .map((item) => {
      return { path: item.path, title: item.meta.title };
    });
  if (
    systemTheme.value.subSystem &&
    systemTheme.value.layout !== "horizontal" &&
    systemTheme.value.layout !== "chapter"
  ) {
    _breadcrumbs.shift();
  }
  breadcrumbs.value = _breadcrumbs;
};
onBeforeRouteUpdate((to) => {
  getBreadcrumbs(to.matched);
});
watch(
  () => systemTheme.value.subSystem,
  () => {
    getBreadcrumbs(route.matched);
  }
);
onMounted(() => {
  getBreadcrumbs(route.matched);
});
</script>
<style lang="scss" scoped>
.breadcrumb-to,
.breadcrumb-item {
  color: var(--qf-topnav-font-color);
  transition: 0.5s;
}
.breadcrumb-to:hover {
  color: var(--el-color-primary);
}
</style>
