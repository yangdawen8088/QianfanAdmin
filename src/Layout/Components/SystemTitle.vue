<template>
	<a class="system-title"
		 :class="{'p-lr-12': props.isPadding}"
		 href="/"
		 :style="{'height': `${systemTheme.headerHeight}px`}">
		<img class="logo"
				 src="../../Assets/logo.png"
				 alt=""
				 srcset="">
		<div v-if="props.isShowText"
				 class="font-20 m-l-5 ellipsis-one">{{appName}}</div>
	</a>
</template>
<script setup name="SystemTitle">
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const props = defineProps({
	isPadding: {
		type: Boolean,
		default: true
	},
	isShowText: {
		type: Boolean,
		default: true
	}
});
const { systemTheme } = storeToRefs(useAppSettings());
const appName = ref(import.meta.env.VITE_APP_NAME)
</script>
<style lang="scss" scoped>
.system-title {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	box-sizing: border-box;
	font-weight: bold;
	color: var(--el-color-primary);
	text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
	transition: 0.5s;
}
.logo {
	height: 38px;
	filter: drop-shadow(0px 2px 5px var(--el-color-primary));
}
a {
	text-decoration: none;
	outline: none;
}
</style>
