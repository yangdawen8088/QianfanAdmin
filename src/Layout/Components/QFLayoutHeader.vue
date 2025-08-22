<template>
	<div class="header-not-hide"
			 :class="{'header-hide':ishide}"
			 :style="{height:`${systemTheme.headerHeight}px`,'min-height':`${systemTheme.headerHeight}px`}">
		<el-header class="header"
							 :height="`${systemTheme.headerHeight}px`"
							 :style="{'border-bottom':isShowBorder ? '1px var(--el-border-color) var(--el-border-style)':'1px solid transparent'}">
			<div v-if="systemTheme.layout === 'horizontal' || systemTheme.layout === 'classic'"
					 :style="{width: systemTitleWidth}">
				<SystemTitle :isPadding="systemTitleWidth !== 'fit-content'" />
			</div>
			<i v-if="systemTheme.layout !== 'horizontal' && systemTheme.layout !== 'chapter'"
				 class="expand-collapse-btn iconfont icon-daohangzhankai"
				 :class="{'collapse-btn':appSettings.menuIsExpand,'m-l-12':systemTheme.layout === 'horizontal' || systemTheme.layout === 'classic'}"
				 @click="OnChangeMenuIsExpand" />
			<Breadcrumb v-if="systemTheme.layout !== 'horizontal' && appSettings.currentDevice === 'DESKTOP'" />
			<div style="flex-grow:1;height:100%;">
				<el-menu v-if="systemMenus.length > 0"
								 :default-active="appSettings.currentSubSystem"
								 :router="systemTheme.layout === 'horizontal'"
								 @select="OnHorMenuSelect"
								 background-color="transparent"
								 text-color="var(--qf-topnav-font-color)"
								 style="width: 100%;display: flex;justify-content: flex-end;"
								 mode="horizontal">
					<SubMenu :systemMenus="systemMenus"
									 :showChildren="systemTheme.layout === 'horizontal'" />
				</el-menu>
			</div>
			<Navbars />
		</el-header>
	</div>
</template>
<script setup name="QFLayoutHeader">
import { computed, onMounted, ref, watch, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import pinia from '@/Stores/index';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const SystemTitle = defineAsyncComponent(() => import('./SystemTitle.vue'));
const Breadcrumb = defineAsyncComponent(() => import('./Breadcrumb.vue'));
const Navbars = defineAsyncComponent(() => import('./Navbars.vue'));
const SubMenu = defineAsyncComponent(() => import('./SubMenu.vue'));
const props = defineProps({
	isTopNav: {
		type: Boolean,
		default: true,
	}
});
const { appSettings, systemTheme } = storeToRefs(useAppSettings());
const OnHorMenuSelect = (key) => {
	if (key === appSettings.value.currentSubSystem) return;
	appSettings.value.currentSubSystem = key;
	storesUseAppSettings.setAppSettings(appSettings.value);
	if (systemTheme.layout !== 'horizontal') {
		router.push(key);
	}
}
const ishide = computed(() => {
	if (props.isTopNav) {
		return systemTheme.value.layout !== 'horizontal' && systemTheme.value.layout !== 'classic';
	} else {
		return systemTheme.value.layout !== 'default' && systemTheme.value.layout !== 'columns'
	}
});
const systemTitleWidth = computed(() => {
	return systemTheme.value.layout === 'horizontal' || systemTheme.value.layout === 'classic' ?
		'fit-content' : `${systemTheme.value.menuWidth}px`;
});
const storesUseAppSettings = useAppSettings(pinia);
const OnChangeMenuIsExpand = () => {
	appSettings.value.menuIsExpand = !appSettings.value.menuIsExpand;
	storesUseAppSettings.setAppSettings(appSettings.value);
}
const isShowBorder = computed(() => {
	if (systemTheme.value.topNavBGColor === '' || systemTheme.value.topNavBGColor === 'transparent') {
		return true;
	}
	if (systemTheme.value.topNavBGColor.startsWith('#') && systemTheme.value.topNavBGColor.endsWith('00') && systemTheme.value.topNavBGColor.length === 9) {
		return true;
	}
	return false;
});
const route = useRoute();
const router = useRouter();
const systemMenus = ref([]);
const resetSystemMenus = () => {
	if (systemTheme.value.layout === 'horizontal') {
		systemMenus.value = route.matched[0].children;
		appSettings.value.currentSubSystem = route.path;
	} else if (systemTheme.value.subSystem) {
		systemMenus.value = route.matched[0].children;
		appSettings.value.currentSubSystem = route.matched[1].path;
	} else {
		systemMenus.value = [];
		appSettings.value.currentSubSystem = '';
	}
	storesUseAppSettings.setAppSettings(appSettings.value);
};
watch(
	() => [systemTheme.value.subSystem, systemTheme.value.layout],
	() => {
		resetSystemMenus();
	}
);
onMounted(() => {
	resetSystemMenus();
});
</script>
<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	background-color: var(--qf-topnav-bg-color);
	background-image: var(--qf-topnav-bg-color);
}
.header-not-hide {
	transition: 0.5s;
	overflow: hidden;
	opacity: 1;
}
.header-hide {
	height: 0px !important;
	min-height: 0px !important;
	opacity: 0.5 !important;
	// transform: scale(0);
	filter: blur(5px);
}
.expand-collapse-btn {
	cursor: pointer;
	font-weight: 600;
	transition: 0.5s;
	user-select: none;
	margin-right: 12px;
	color: var(--qf-topnav-font-color);
}
.expand-collapse-btn:hover {
	color: var(--el-color-primary);
}
.collapse-btn {
	transform: rotateY(180deg);
}
.el-menu--horizontal.el-menu {
	border-bottom: none;
	height: var(--el-header-height);
	transition: 0.5s;
}
</style>
<style>
.el-menu--horizontal > .el-sub-menu {
	height: var(--el-header-height);
	transition: 0.5s;
}
.el-menu--horizontal > .el-menu {
	background-color: var(--qf-topnav-bg-color);
	background-image: var(--qf-topnav-bg-color);
}
</style>