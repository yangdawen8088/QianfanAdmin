<template>
	<div :class="`page-container-${systemTheme.affixHeader && systemTheme.layout !== 'horizontal' && systemTheme.layout !== 'chapter'? '0' : '1'}`">
		<el-scrollbar ref="scrollbarRef"
									height="100%"
									max-height="100%"
									wrap-style="height: 100%;"
									view-style="height: 100%;"
									style="width: 100%;padding: 8px;box-sizing: border-box;">
			<slot name="Default" />
		</el-scrollbar>
	</div>
</template>
<script setup name="PageContainer">
import { nextTick, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const { systemTheme } = storeToRefs(useAppSettings());
const scrollbarRef = ref();
watch(systemTheme.value.affixHeader, () => {
	nextTick(() => {
		scrollbarRef.value.update();
	});
});
</script>
<style lang="scss" scoped>
.page-container-0 {
	padding: 10px;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	box-sizing: border-box;
}
.page-container-1 {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}
</style>
