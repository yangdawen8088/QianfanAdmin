<template>
	<div class="footer-not-hide"
			 :class="{'footer-hide':ishide}">
		<el-footer class="footer">
			<div style="text-align: center;">
				<div>Copyright © {{new Date().getFullYear()}} {{copyright}}. All Rights Reserved. </div>
				<strong>MIT License</strong>
			</div>
		</el-footer>
	</div>
</template>
<script setup name="QFLayoutFooter">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
const { systemTheme } = storeToRefs(useAppSettings());
const props = defineProps({
	isMain: {
		type: Boolean,
		default: true,
	}
});
const copyright = ref(import.meta.env.VITE_APP_COPYRIGHT)
const ishide = computed(() => {
	if (props.isMain) {
		if (systemTheme.value.layout === 'horizontal') {
			return !systemTheme.value.showFooter;
		} else {
			return true;
		}
	} else {
		if (systemTheme.value.layout === 'horizontal') {
			return true;
		} else {
			return !systemTheme.value.showFooter;
		}
	}
});
</script>
<style lang="scss" scoped>
.footer {
	background-color: var(--qf-pagefooter-bg-color);
	background-image: var(--qf-pagefooter-bg-color);
	color: var(--qf-pagefooter-font-color);
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.6rem;
}
.footer-not-hide {
	height: 60px;
	transition: 0.5s;
	overflow: hidden;
	opacity: 1;
}
.footer-hide {
	height: 0px !important;
	opacity: 0.5 !important;
	// transform: scale(0);
	filter: blur(5px);
	padding: 0;
}
</style>
