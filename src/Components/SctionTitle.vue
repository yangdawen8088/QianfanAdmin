<template>
	<el-divider :content-position="props.position"
							:border-style="props.style">
		<template #default>
			<div class="section-title">
				<i class="iconfont"
					 :class="props.icon" />
				<span>{{props.title}}</span>
			</div>
		</template>
	</el-divider>
</template>
<script setup name="SctionTitle">
const props = defineProps({
	title: {
		type: String,
		default: '黔帆软件科技'
	},
	icon: {
		type: String,
		default: 'icon-gongzuotai'
	},
	/** 'none' | 'solid' | 'hidden' | 'dashed' | ... */
	style: {
		type: String,
		default: 'solid'
	},
	/** 'left' | 'right' | 'center' */
	position: {
		type: String,
		default: 'left'
	}
});
</script>
<style lang="scss" scoped>
.section-title {
	font-size: 1.2rem;
	letter-spacing: 0.06em;
	font-weight: 600;
	color: var(--el-text-color-regular);
}
.section-title > i {
	margin-right: 0.5rem;
	font-size: 1.2rem;
	font-weight: bold;
}
</style>
