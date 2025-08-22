<template>
	<el-aside class="aside"
						:class="{'aside-hide':systemTheme.layout === 'horizontal'}"
						:width="`${menuWidth}px`"
						:style="{
              'border-right':isShowBorder ? '1px var(--el-border-color) var(--el-border-style)':'none'}">
		<SystemTitle v-if="systemTheme.layout !== 'classic'" />
		<el-scrollbar style="flex: 1;">
			<el-menu :default-active="route.path"
							 :collapse="!appSettings.menuIsExpand"
							 background-color="transparent"
							 text-color="var(--qf-menubar-font-color)"
							 style="border-right: 0;"
							 router>
				<SubMenu :systemMenus="systemMenus" />
			</el-menu>
		</el-scrollbar>
		<div class="info-span"
				 v-if="systemTheme.layout === 'chapter'">
			<div class="dropdown-span">
				<el-avatar :size="32"
									 shape="square"
									 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
				<span>Admin</span>
			</div>
			<el-button type="primary"
								 text>个人中心</el-button>
			<el-button style="margin-left: 0px"
								 type="primary"
								 text
								 @click="$router.push('/Backend/SystemManagement/ThemeSettings')">主题设置</el-button>
			<el-button style="margin-left: 0px"
								 type="primary"
								 plain @click="$router.push('/Login')">退出登录</el-button>
		</div>
	</el-aside>
</template>
<script setup name="QFLayoutAside">
import { computed, onMounted, ref, watch, nextTick, defineAsyncComponent } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import pinia from '@/Stores/index';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const SystemTitle = defineAsyncComponent(() => import('./SystemTitle.vue'));
const SubMenu = defineAsyncComponent(() => import('./SubMenu.vue'));
const storesUseAppSettings = useAppSettings(pinia);
const { appSettings, systemTheme } = storeToRefs(useAppSettings());
const isShowBorder = computed(() => {
	if (systemTheme.value.menuBarBGColor === '' || systemTheme.value.menuBarBGColor === 'transparent') {
		return true;
	}
	if (systemTheme.value.menuBarBGColor.startsWith('#') && systemTheme.value.menuBarBGColor.endsWith('00') && systemTheme.value.menuBarBGColor.length === 9) {
		return true;
	}
	return false;
});
const route = useRoute();
const router = useRouter();
const systemMenus = ref([]);
const resetSystemMenus = (to) => {
	switch (systemTheme.value.layout) {
		case 'horizontal':
			appSettings.value.currentSubSystem = to.path;
			systemMenus.value = [];
			break;
		case 'chapter':
			appSettings.value.currentSubSystem = '';
			systemMenus.value = to.matched[0].children;
			break;
		case 'columns':
			appSettings.value.currentSubSystem = systemTheme.value.subSystem ? to.matched[1].path : '';
			systemMenus.value = to.matched[systemTheme.value.subSystem ? 2 : 1]?.children ?? [];
			break;
		case 'default':
			appSettings.value.currentSubSystem = systemTheme.value.subSystem ? to.matched[1].path : '';
			systemMenus.value = to.matched[systemTheme.value.subSystem ? 1 : 0].children;
			break;
		case 'classic':
			appSettings.value.currentSubSystem = systemTheme.value.subSystem ? to.matched[1].path : '';
			systemMenus.value = to.matched[systemTheme.value.subSystem ? 1 : 0].children;
			break;
	}
	storesUseAppSettings.setAppSettings(appSettings.value);
	OnMenuExpandOrCollapse();
};
watch(
	() => [systemTheme.value.subSystem, systemTheme.value.layout],
	() => {
		resetSystemMenus(route);
		InitMenuWidth();
	}
);
const menuWidth = ref(systemTheme.value.menuWidth);
const InitMenuWidth = () => {
	if (systemTheme.value.layout === 'columns') {
		menuWidth.value = appSettings.value.menuIsExpand ? systemTheme.value.menuWidth : 0;
	}
	else {
		menuWidth.value = appSettings.value.menuIsExpand ? systemTheme.value.menuWidth : 65;
	}
}
const OnMenuExpandOrCollapse = () => {
	if (systemMenus.value.length === 0 && appSettings.value.menuIsExpand) {
		appSettings.value.menuIsExpand = false;
		storesUseAppSettings.setAppSettings(appSettings.value);
	} else if (systemMenus.value.length > 0 && !appSettings.value.menuIsExpand) {
		appSettings.value.menuIsExpand = true;
		storesUseAppSettings.setAppSettings(appSettings.value);
	}
}
watch(
	() => [appSettings.value.menuIsExpand, systemTheme.value.menuWidth],
	() => {
		InitMenuWidth();
	}
);
/** 当 tab 页签点击使得路由切换时，刷新一下菜单列表 */
onBeforeRouteUpdate((to) => {
	resetSystemMenus(to)
})
onMounted(() => {
	resetSystemMenus(route);
	InitMenuWidth();
});
</script>
<style lang="scss" scoped>
.aside {
	transition: 0.5s;
	display: flex;
	flex-direction: column;
	background-color: var(--qf-menubar-bg-color);
	background-image: var(--qf-menubar-bg-color);
	z-index: 2;
}
.aside-hide {
	width: 0px !important;
	opacity: 0.5 !important;
	// transform: scale(0);
	filter: blur(5px);
}
.info-span {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 50px 15px 10px;
	color: var(--qf-topnav-font-color);
}
.dropdown-span {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
	margin-bottom: 18px;
}
</style>
<style>
.el-menu--vertical > .el-sub-menu {
	height: var(--el-header-height);
	transition: 0.5s;
}
.el-menu--vertical > .el-menu {
	background-color: var(--qf-menubar-bg-color);
	background-image: var(--qf-menubar-bg-color);
}
</style>
