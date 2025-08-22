<template>
	<div>
		<el-form ref="ruleFormRef"
					 :model="ruleForm"
					 label-width="auto">
			<SctionTitle title="后台页面布局"
									icon="icon-bujushezhi" />
			<el-form-item prop="layout"
										label="页面布局：">
				<el-radio-group v-model="ruleForm.layout"
												@change="OnThemeChange('layout')">
					<div class="common-layout">
						<el-container class="layout-container">
							<el-aside class="layout-aside"></el-aside>
							<el-container>
								<el-header class="layout-header"></el-header>
								<el-main class="layout-main"></el-main>
								<el-footer v-if="systemTheme.showFooter"
													class="layout-footer"></el-footer>
							</el-container>
						</el-container>
						<el-radio value="default"
											size="large">默认布局</el-radio>
					</div>
					<div class="common-layout">
						<el-container class="layout-container">
							<el-header class="layout-header"></el-header>
							<el-main class="layout-main"></el-main>
							<el-footer v-if="systemTheme.showFooter"
												class="layout-footer"></el-footer>
						</el-container>
						<el-radio value="horizontal"
											size="large">横向布局</el-radio>
					</div>
					<div class="common-layout">
						<el-container class="layout-container">
							<el-header class="layout-header"></el-header>
							<el-container>
								<el-aside class="layout-aside"></el-aside>
								<el-container>
									<el-main class="layout-main"></el-main>
									<el-footer v-if="systemTheme.showFooter"
														class="layout-footer"></el-footer>
								</el-container>
							</el-container>
						</el-container>
						<el-radio value="classic"
											size="large">经典布局</el-radio>
					</div>
					<div class="common-layout">
						<el-container class="layout-container">
							<el-aside class="layout-columns"></el-aside>
							<el-aside class="layout-aside"></el-aside>
							<el-container>
								<el-header class="layout-header"></el-header>
								<el-main class="layout-main"></el-main>
								<el-footer v-if="systemTheme.showFooter"
													class="layout-footer"></el-footer>
							</el-container>
						</el-container>
						<el-radio value="columns"
											size="large">分栏布局</el-radio>
					</div>
					<div class="common-layout">
						<el-container class="layout-container">
							<el-aside class="layout-aside"></el-aside>
							<el-container>
								<el-main class="layout-main"></el-main>
								<el-footer v-if="systemTheme.showFooter"
													class="layout-footer"></el-footer>
							</el-container>
						</el-container>
						<el-radio value="chapter"
											size="large">章节布局</el-radio>
					</div>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop="subSystem">
				<template #label>
					<el-popover class="box-item"
											width="300px"
											content="仅默认布局、经典布局、分栏布局等才可以设置子系统，如果设置为 True 将自动匹配后台页面一级菜单为子系统，二级菜单为子系统下的菜单。">
						<template #reference>
							<i class="remind-icon iconfont icon-guanyu" />
						</template>
					</el-popover>
					<span>子系统：</span>
				</template>
				<el-switch v-model="ruleForm.subSystem"
									@change="OnThemeChange('subSystem')"
									:disabled="ruleForm.layout !== 'default' && ruleForm.layout !== 'classic' && ruleForm.layout !== 'columns'" />
			</el-form-item>
			<el-form-item prop="pageZoom"
										label="页面缩放：">
				<el-slider v-model="ruleForm.pageZoom"
									:min="0.0"
									:max="2.0"
									:step="0.1"
									show-input
									@change="OnThemeChange('pageZoom')" />
			</el-form-item>
			<el-form-item prop="showFooter"
										label="显示页脚：">
				<el-switch v-model="ruleForm.showFooter"
									@change="OnThemeChange('showFooter')" />
			</el-form-item>
			<el-form-item prop="affixHeader">
				<template #label>
					<el-popover class="box-item"
											width="300px"
											content="仅默认布局、横向布局、分栏布局等才可以设置固定头部，如果设置为 True 将固定布局头部。">
						<template #reference>
							<i class="remind-icon iconfont icon-guanyu" />
						</template>
					</el-popover>
					<span>固定头部：</span>
				</template>
				<el-switch v-model="ruleForm.affixHeader"
									@change="OnThemeChange('affixHeader')"
									:disabled="ruleForm.layout === 'classic' || ruleForm.layout === 'chapter'" />
			</el-form-item>
			<el-form-item prop="headerHeight">
				<template #label>
					<el-popover class="box-item"
											width="300px"
											content="章节布局不可以设置页头高度。">
						<template #reference>
							<i class="remind-icon iconfont icon-guanyu" />
						</template>
					</el-popover>
					<span>页头高度：</span>
				</template>
				<el-input-number v-model="ruleForm.headerHeight"
												:min="60"
												:max="200"
												@change="OnThemeChange('headerHeight')"
												:disabled="ruleForm.layout === 'chapter'" />
			</el-form-item>
			<el-form-item prop="menuWidth">
				<template #label>
					<el-popover class="box-item"
											width="300px"
											content="横向布局不可以设置页头高度。">
						<template #reference>
							<i class="remind-icon iconfont icon-guanyu" />
						</template>
					</el-popover>
					<span>菜单宽度：</span>
				</template>
				<el-input-number v-model="ruleForm.menuWidth"
												:min="200"
												:max="800"
												@change="OnThemeChange('menuWidth')"
												:disabled="ruleForm.layout === 'horizontal'" />
			</el-form-item>
			<el-form-item prop="showPageTabs"
										label="显示页签：">
				<template #label>
					<el-popover class="box-item"
											width="300px"
											content="章节布局不支持设置页签，如果设置为 True 将显示页签。">
						<template #reference>
							<i class="remind-icon iconfont icon-guanyu" />
						</template>
					</el-popover>
					<span>显示页签：</span>
				</template>
				<el-switch v-model="ruleForm.showPageTabs"
									@change="OnThemeChange('showPageTabs')"
									:disabled="ruleForm.layout === 'chapter'" />
			</el-form-item>
			<el-form-item prop="themeType"
										label="系统主题：">
				<el-radio-group v-model="ruleForm.themeType"
												@change="OnThemeChange('themeType')">
					<div class="theme-item"
							v-for="(value, key) in Themes"
							:key="key"
							:id="`theme-radio-${key}`">
						<div class="theme-item-container">
							<div v-for="color in value.colorSummary"
									:key="color"
									:style="{'background-color': color}"></div>
						</div>
						<el-radio :value="key"
											size="large">{{value.name}}</el-radio>
					</div>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="配色方案：">
				<div class="color-scheme">
					<div class="color-scheme-view scheme-view-topnavcolor flex-center-center">头部顶栏</div>
					<div class="color-scheme-option flex-around-center p-5">
						<el-button type="primary"
											link
											@click="OnSelectColor('topNavBGColor', ruleForm.topNavBGColor, true)">背景颜色</el-button>
						<el-button type="primary"
											link
											@click="OnSelectColor('topNavFontColor', ruleForm.topNavFontColor, false)">文字颜色</el-button>
					</div>
				</div>
				<div class="color-scheme">
					<div class="color-scheme-view scheme-view-sidebarColor flex-center-center">左侧分栏</div>
					<div class="color-scheme-option flex-around-center p-5">
						<el-button type="primary"
											link
											@click="OnSelectColor('sidebarBGColor', ruleForm.sidebarBGColor, true)">背景颜色</el-button>
						<el-button type="primary"
											link
											@click="OnSelectColor('sidebarFontColor', ruleForm.sidebarFontColor, false)">文字颜色</el-button>
					</div>
				</div>
				<div class="color-scheme">
					<div class="color-scheme-view scheme-view-menuBarColor flex-center-center">左侧菜单</div>
					<div class="color-scheme-option flex-around-center p-5">
						<el-button type="primary"
											link
											@click="OnSelectColor('menuBarBGColor', ruleForm.menuBarBGColor, true)">背景颜色</el-button>
						<el-button type="primary"
											link
											@click="OnSelectColor('menuBarFontColor', ruleForm.menuBarFontColor, false)">文字颜色</el-button>
					</div>
				</div>
				<div class="color-scheme">
					<div class="color-scheme-view scheme-view-pageFooterColor flex-center-center">网站页脚</div>
					<div class="color-scheme-option flex-around-center p-5">
						<el-button type="primary"
											link
											@click="OnSelectColor('pageFooterBGColor', ruleForm.pageFooterBGColor, true)">背景颜色</el-button>
						<el-button type="primary"
											link
											@click="OnSelectColor('pageFooterFontColor', ruleForm.pageFooterFontColor, false)">文字颜色</el-button>
					</div>
				</div>
				<div class="color-scheme">
					<div class="color-item"
							:style="{'background-color': ruleForm.primaryColor}"
							@click="OnSelectColor('primaryColor', ruleForm.primaryColor, false)">主题</div>
					<div class="color-item"
							:style="{'background-color': ruleForm.successColor}"
							@click="OnSelectColor('successColor', ruleForm.successColor, false)">成功</div>
					<div class="color-item"
							:style="{'background-color': ruleForm.warningColor}"
							@click="OnSelectColor('warningColor', ruleForm.warningColor, false)">警告</div>
					<div class="color-item"
							:style="{'background-color': ruleForm.dangerColor}"
							@click="OnSelectColor('dangerColor', ruleForm.dangerColor, false)">危险</div>
					<div class="color-item"
							:style="{'background-color': ruleForm.infoColor}"
							@click="OnSelectColor('infoColor', ruleForm.infoColor, false)">信息</div>
				</div>
			</el-form-item>
			<el-form-item label="组件大小"
										prop="componentSize">
				<el-radio-group v-model="ruleForm.componentSize"
												@change="OnThemeChange('componentSize')">
					<el-radio value="large">大型</el-radio>
					<el-radio value="default">默认</el-radio>
					<el-radio value="small">小型</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop="showWatermark"
										label="显示水印：">
				<el-switch v-model="ruleForm.showWatermark"
									@change="OnThemeChange('showWatermark')" />
			</el-form-item>
			<el-form-item prop="watermarkContent"
										label="水印文字：">
				<el-input v-model="ruleForm.watermarkContent" style="width: 240px" :placeholder="ruleForm.watermarkContent" @change="OnThemeChange('watermarkContent')" />
			</el-form-item>
			<el-form-item>
				<el-button @click="OnResetForm(ruleFormRef)">撤 销</el-button>
			</el-form-item>
		</el-form>
		<SelectColorDialog ref="SelectColorDialogRef"
											@commitColor="OnCommitColor" />
	</div>
</template>
<script setup name="ThemeSettings">
import { ref, nextTick, onMounted, watch } from 'vue';
import pinia from '@/Stores/index';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
import { ChangeColor } from '@/Utils/colorutils.js';
import Themes from '@/Views/BackendVIews/ThemeSettings/themes.json';
const storesUseAppSettings = useAppSettings(pinia);
const { appSettings, systemTheme } = storeToRefs(useAppSettings());
const ruleForm = ref({
	layout: systemTheme.value.layout,
	subSystem: systemTheme.value.subSystem,
	pageZoom: systemTheme.value.pageZoom,
	showFooter: systemTheme.value.showFooter,
	affixHeader: systemTheme.value.affixHeader,
	headerHeight: systemTheme.value.headerHeight,
	menuWidth: systemTheme.value.menuWidth,
	showPageTabs: systemTheme.value.showPageTabs,
	themeType: systemTheme.value.themeType,
	topNavBGColor: systemTheme.value.topNavBGColor,
	topNavFontColor: systemTheme.value.topNavFontColor,
	sidebarBGColor: systemTheme.value.sidebarBGColor,
	sidebarFontColor: systemTheme.value.sidebarFontColor,
	menuBarBGColor: systemTheme.value.menuBarBGColor,
	menuBarFontColor: systemTheme.value.menuBarFontColor,
	pageFooterBGColor: systemTheme.value.pageFooterBGColor,
	pageFooterFontColor: systemTheme.value.pageFooterFontColor,
	primaryColor: systemTheme.value.primaryColor,
	successColor: systemTheme.value.successColor,
	warningColor: systemTheme.value.warningColor,
	dangerColor: systemTheme.value.dangerColor,
	infoColor: systemTheme.value.infoColor,
	componentSize: systemTheme.value.componentSize,
	showWatermark: systemTheme.value.showWatermark,
	watermarkContent: systemTheme.value.watermarkContent
});
const OnLayoutChange = () => {
	nextTick(() => {
		Object.keys(ruleForm.value).forEach((key) => {
			if (systemTheme.value.hasOwnProperty(key)) {
				systemTheme.value[key] = ruleForm.value[key];
			}
		});
		storesUseAppSettings.setSystemTheme(systemTheme.value);
		document.body.style.zoom = ruleForm.value.pageZoom;
		OnThemeChange();
	});
}
const OnThemeChange = (key) => {
	nextTick(() => {
		systemTheme.value[key] = ruleForm.value[key];
		storesUseAppSettings.setSystemTheme(systemTheme.value);
		switch (key) {
			case 'pageZoom':
				document.body.style.zoom = ruleForm.value.pageZoom;
				break;
			case 'themeType':
				const transition = document.startViewTransition(() => {
					const el = document.querySelector('html');
					el.className = '';
					el.classList.add("system-theme-" + ruleForm.value.themeType);
				});
				transition.ready.then(() => {
					const el = document.getElementById(`theme-radio-${ruleForm.value[key]}`);
					const rect = el.getBoundingClientRect();
					const elX = rect.left + el.clientWidth / 2;
					const elY = rect.top + el.clientHeight / 2;
					const radius = Math.hypot(
						Math.max(elX, window.innerWidth - elX),
						Math.max(elY, window.innerHeight - elY)
					);
					const shapes = {
						circle: [
							`circle(0px at ${elX}px ${elY}px)`,
							`circle(${radius}px at ${elX}px ${elY}px)`
						],
						ellipse: [
							`ellipse(0px 0px at ${elX}px ${elY}px)`,
							`ellipse(${window.innerWidth}px ${window.innerHeight}px at ${elX}px ${elY}px)`
						],
						inset: [
							`inset(${elY}px ${window.innerWidth - elX}px ${window.innerHeight - elY}px ${elX}px)`,
							`inset(0px 0px 0px 0px)`
						]
					};
					const clipPath = shapes['inset'];
					document.documentElement.animate({ clipPath }, { duration: 500, pseudoElement: '::view-transition-new(root)' });
				});
				transition.updateCallbackDone.then(() => {
					OnThemeTypeChange();
				});
				break;
		}
	});
}
const OnThemeTypeChange = () => {
	const currentTheme = Themes[systemTheme.value.themeType];
	for (let index = 0; index < currentTheme.colorTypes.length; index++) {
		ruleForm.value[currentTheme.colorTypes[index].key] = currentTheme.colorTypes[index].value;
		systemTheme.value[currentTheme.colorTypes[index].key] = currentTheme.colorTypes[index].value;
		document.documentElement.style.setProperty(currentTheme.colorTypes[index].property, currentTheme.colorTypes[index].value);
	}
	for (let index = 0; index < currentTheme.functionColor.length; index++) {
		ruleForm.value[currentTheme.functionColor[index].key] = currentTheme.functionColor[index].value;
		systemTheme.value[currentTheme.functionColor[index].key] = currentTheme.functionColor[index].value;
		// 颜色加深
		document.documentElement.style.setProperty(`--el-color-${currentTheme.functionColor[index].key.replace('Color', '')}-dark-2`, `${ChangeColor.getDarkColor(currentTheme.functionColor[index].value, 0.1)}`);
		document.documentElement.style.setProperty(`--el-color-${currentTheme.functionColor[index].key.replace('Color', '')}`, currentTheme.functionColor[index].value);
		// 颜色变浅
		for (let i = 1; i <= 9; i++) {
			document.documentElement.style.setProperty(`--el-color-${currentTheme.functionColor[index].key.replace('Color', '')}-light-${i}`, `${ChangeColor.getLightColor(currentTheme.functionColor[index].value, i / 10)}`);
		}
	}
	// 设置水印颜色 Start
	let textColor = getComputedStyle(document.documentElement).getPropertyValue('--el-text-color-regular').trim();
	if (textColor.startsWith('#')) {
		textColor= `${textColor}15`
	} else {
		textColor = textColor.replace('rgb(', '').replace(')', '');
		textColor = textColor.split(',');
		textColor = `rgba(${textColor[0]},${textColor[1]},${textColor[2]},0.15)`;
	}
	systemTheme.value.watermarkTextColor = textColor;
	// 设置水印颜色 End
	storesUseAppSettings.setSystemTheme(systemTheme.value);
}
const ruleFormRef = ref();
const rules = ref([]);
const OnResetForm = (formEl) => {
	if (!formEl) return;
	formEl.resetFields();
	OnLayoutChange();
}
const SelectColorDialogRef = ref();
const setColor = ref('');
const OnSelectColor = (type, color, isGradient) => {
	setColor.value = type;
	SelectColorDialogRef.value.openDialog(color, isGradient);
}
const OnCommitColor = (color) => {
	if (ruleForm.value[setColor.value] !== null && ruleForm.value[setColor.value] !== undefined) {
		ruleForm.value[setColor.value] = color;
		systemTheme.value[setColor.value] = ruleForm.value[setColor.value];
		const elColors = {
			primaryColor: ['primary'],
			successColor: ['success'],
			warningColor: ['warning'],
			dangerColor: ['danger', 'error'],
			infoColor: ['info'],
		}
		let property = {
			topNavBGColor: '--qf-topnav-bg-color',
			topNavFontColor: '--qf-topnav-font-color',
			menuBarBGColor: '--qf-menubar-bg-color',
			menuBarFontColor: '--qf-menubar-font-color',
			sidebarBGColor: '--qf-sidebar-bg-color',
			sidebarFontColor: '--qf-sidebar-font-color',
			pageFooterBGColor: '--qf-pagefooter-bg-color',
			pageFooterFontColor: '--qf-pagefooter-font-color',
			systemBGColor: '--el-bg-color',
			systemFontColor: '--el-text-color-regular',
		};
		if (elColors[setColor.value] !== null && elColors[setColor.value] !== undefined) {
			if (color === null || color === undefined || color === '') return ElMessage.warning('全局主题 primary 颜色值不能为空');
			for (let index = 0; index < elColors[setColor.value].length; index++) {
				// 颜色加深
				document.documentElement.style.setProperty(`--el-color-${elColors[setColor.value][index]}-dark-2`, `${ChangeColor.getDarkColor(color, 0.1)}`);
				document.documentElement.style.setProperty(`--el-color-${elColors[setColor.value][index]}`, color);
				// 颜色变浅
				for (let i = 1; i <= 9; i++) {
					document.documentElement.style.setProperty(`--el-color-${elColors[setColor.value][index]}-light-${i}`, `${ChangeColor.getLightColor(color, i / 10)}`);
				}
			}
		}
		else if (property[setColor.value] !== null && property[setColor.value] !== undefined) {
			document.documentElement.style.setProperty(property[setColor.value], color);
		} else {
			return ElMessage.warning('未知颜色类型');
		}
		storesUseAppSettings.setSystemTheme(systemTheme.value);
	}
}
onMounted(() => {
	nextTick(() => {
		Object.keys(systemTheme.value).forEach((key) => {
			if (ruleForm.value.hasOwnProperty(key)) {
				ruleForm.value[key] = systemTheme.value[key];
			}
		});
	});
});
</script>
<style lang="scss" scoped>
.common-layout {
	width: 200px;
	height: 150px;
	box-shadow: 0 0 10px var(--el-border-color-dark);
	margin: 10px 50px 50px;
}
.layout-container {
	height: 100%;
	border: 1px var(--el-border-color) var(--el-border-style);
}
.layout-header {
	height: 30px;
	background-color: var(--qf-topnav-bg-color);
	background-image: var(--qf-topnav-bg-color);
	border-bottom: 1px var(--el-border-color) var(--el-border-style);
}
.layout-aside {
	width: 50px;
	background-color: var(--qf-menubar-bg-color);
	background-image: var(--qf-menubar-bg-color);
	border-right: 1px var(--el-border-color) var(--el-border-style);
}
.layout-columns {
	width: 20px;
	background-color: var(--qf-sidebar-bg-color);
}
.layout-main {
	background-color: var(--el-bg-color);
	height: 100%;
}
.layout-footer {
	height: 20px;
	background-color: var(--qf-pagefooter-bg-color);
	background-image: var(--qf-pagefooter-bg-color);
	border-top: 1px var(--el-border-color) var(--el-border-style);
}
.remind-icon {
	color: var(--qf-text-color);
	margin-right: 5px;
}
.theme-item {
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	margin: 10px;
	.theme-item-container {
		width: 150px;
		height: 60px;
		border: 1px solid var(--el-border-color);
		display: flex;
		justify-content: center;
		align-items: center;
		white-space: nowrap;
		div {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			border: 1px solid var(--el-border-color);
			margin-left: -10px;
		}
		:first-child {
			margin-left: 0px;
		}
	}
}
.color-scheme {
	width: 150px;
	height: 120px;
	border: 1px solid var(--el-border-color);
	margin: 10px;
	.color-scheme-view {
		height: 80px;
		border-bottom: 1px solid var(--el-border-color);
	}
	.scheme-view-topnavcolor {
		background-color: var(--qf-topnav-bg-color);
		background-image: var(--qf-topnav-bg-color);
		color: var(--qf-topnav-font-color);
	}
	.scheme-view-sidebarColor {
		background-color: var(--qf-sidebar-bg-color);
		background-image: var(--qf-sidebar-bg-color);
		color: var(--qf-sidebar-font-color);
	}
	.scheme-view-menuBarColor {
		background-color: var(--qf-menubar-bg-color);
		background-image: var(--qf-menubar-bg-color);
		color: var(--qf-menubar-font-color);
	}
	.scheme-view-pageFooterColor {
		background-color: var(--qf-pagefooter-bg-color);
		background-image: var(--qf-pagefooter-bg-color);
		color: var(--qf-pagefooter-font-color);
	}
	.scheme-view-systemColor {
		background-color: var(--el-bg-color);
		background-image: var(--el-bg-color);
		color: var(--el-text-color-regular);
	}
	.color-scheme-option {
		height: 40px;
	}
	.color-item {
		width: 150px;
		height: 24px;
		font-size: 0.6rem;
		line-height: 24px;
		background-color: #00000030;
		text-align: center;
		color: var(--el-text-color-regular);
		user-select: none;
		cursor: pointer;
		transition: 0.5s;
	}
	.color-item:hover {
		transform: scale(1.1);
		font-size: 1rem;
	}
}
</style>
