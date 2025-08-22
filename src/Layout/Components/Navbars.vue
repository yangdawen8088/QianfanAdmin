<template>
	<div style="width:fit-content;min-width:fit-content;display:flex;align-items:center;">
		<el-tooltip effect="dark"
								content="通知"
								placement="bottom">
			<el-popover :width="300">
				<template #reference>
					<div class="navbars">
						<i class="iconfont icon-tongzhixiaoxi" />
					</div>
				</template>
				<div class="flex-between-center"
						 style="border-bottom:1px solid var(--el-border-color); padding-bottom:10px;">
					<el-text style="font-size:1rem;">通知消息</el-text>
					<el-button type="success"
										 link>全部已读</el-button>
				</div>
				<el-scrollbar height="280px">
					<div class="message-item"
							 v-for="item in 10"
							 :key="item">
						<div>
							<h3 class="ellipsis-one">这是消息的标题</h3>
							<span>21:40</span>
						</div>
						<el-text line-clamp="2"
										 style="font-size:0.8rem;">
							这里是消息的内容，犯得上反对开始计划科。技发达及时反馈进度和发反倒是尽快发货的思考近乎疯，狂的世界回复计划反倒是卡，解放后大汉价格反对
						</el-text>
					</div>
				</el-scrollbar>
				<div class="flex-center-center"
						 style="border-top:1px solid var(--el-border-color); padding-top:10px;">
					<el-button type="primary"
										 link>前往消息中心</el-button>
				</div>
			</el-popover>
		</el-tooltip>
		<el-tooltip effect="dark"
								content="主题"
								placement="bottom">
			<div class="navbars"
					 @click="OnOpenDrawer">
				<i class="iconfont icon-zhuti" />
			</div>
		</el-tooltip>
		<el-tooltip effect="dark"
								:content="appSettings.screenfull? '退出全屏':'全屏'"
								placement="bottom">
			<div class="navbars">
				<i class="iconfont"
					 @click="OnIsFullscreen"
					 :class="appSettings.screenfull? 'icon-jiechuquanping':'icon-ico_quanping'" />
			</div>
		</el-tooltip>
		<el-dropdown>
			<div class="dropdown-span">
				<el-avatar :size="32"
									 shape="square"
									 src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
				<span>Admin</span>
				<el-icon class="el-icon--right">
					<arrow-down />
				</el-icon>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item class="select-none">个人中心</el-dropdown-item>
					<el-dropdown-item class="select-none">修改密码</el-dropdown-item>
					<el-dropdown-item divided class="select-none" @click="$router.push('/Login')">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
	<SettingsDrawer ref="settingsDrawerRef" />
</template>
<script setup name="Navbars">
import { nextTick, ref, defineAsyncComponent } from 'vue';
import screenfull from 'screenfull';
import { ElMessage } from 'element-plus';
import pinia from '@/Stores/index';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const storesUseAppSettings = useAppSettings(pinia);
const { appSettings } = storeToRefs(useAppSettings());
const SettingsDrawer = defineAsyncComponent(() => import('./SettingsDrawer.vue'));
const OnIsFullscreen = () => {
	if (!screenfull.isEnabled) {
		ElMessage.warning('您的浏览器不支持全屏');
	}
	screenfull.toggle();
	nextTick(() => {
		appSettings.value.screenfull = !screenfull.isFullscreen;
		storesUseAppSettings.setAppSettings(appSettings.value);
	});
}
const settingsDrawerRef = ref();
const OnOpenDrawer = () => {
	settingsDrawerRef.value?.openDrawer();
}
</script>
<style lang="scss" scoped>
.navbars {
	height: 100%;
	width: 38px;
	min-width: 38px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.5s;
	user-select: none;
	color: var(--qf-topnav-font-color);
	cursor: pointer;
	i {
		transition: 0.3s;
	}
}
.navbars:hover {
	i {
		font-size: 1.2rem;
	}
	animation: rubberBand;
	animation-duration: 0.5s;
}
.dropdown-span {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	cursor: pointer;
	color: var(--qf-topnav-font-color);
	margin-left: 15px;
}
.dropdown-span:focus-visible {
	outline: none;
}
.message-item {
	border-bottom: 1px solid var(--el-border-color);
	cursor: pointer;
	padding-top: 8px;
	transition: 0.5s;
	color: var(--el-text-color-regular);
	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		h3 {
			font-weight: 500;
			margin: 0px;
			flex: 1;
		}
		span {
			font-size: 0.8rem;
			width: fit-content;
		}
	}
}
.message-item:hover {
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.message-item:last-child {
	border-bottom: none;
}
</style>
