<template>
	<el-drawer v-model="isOpen"
						 header-class="drawer-header"
						 :show-close="false">
		<template #header="{ close, titleId, titleClass }">
			<div style="display: flex;flex-direction: column;">
				<div style="display: flex;justify-content: space-between;align-items: center;">
					<span :id="titleId"
								:class="titleClass">系统设置</span>
					<div @click="close"
							 class="drawer-close">
						<i class="iconfont icon-guanbi2" />
					</div>
				</div>
				<el-divider style="margin: 8px 0 0 0 !important;" />
			</div>
		</template>
		<template #default>
			<div>set content by slot</div>
		</template>
		<template #footer>
			<div style="flex: auto">
				<el-button @click="closeDrawer">取消</el-button>
				<el-button type="primary"
									 @click="confirmClick">确定</el-button>
			</div>
		</template>
	</el-drawer>
</template>
<script setup name="SettingsDrawer">
import { ref } from 'vue';
const props = defineProps({
	isMain: {
		type: Boolean,
		default: true,
	}
});
const direction = ref('rtl');
const isOpen = ref(false);
const confirmClick = () => { };
const openDrawer = () => { isOpen.value = true; };
const closeDrawer = () => { isOpen.value = false; };
defineExpose({
	openDrawer
});
</script>
<style lang="scss" scoped>
.drawer-close {
	border: 1px solid var(--el-border-color);
	padding: 6px;
	width: 1.2rem;
	height: 1.2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	cursor: pointer;
	transition: 0.5s;
}
.drawer-close:hover {
	background-color: var(--el-color-primary);
	color: var(--el-color-white);
	transform: rotate(180deg);
}
</style>
<style>
.drawer-header {
	margin-bottom: 0px !important;
}
</style>
