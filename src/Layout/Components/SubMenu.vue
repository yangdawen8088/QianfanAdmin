<template>
	<template v-for="(item, index) in props.systemMenus"
						:key="index">
		<el-sub-menu v-if="item.children && item.children.length > 0 && props.showChildren"
								 :index="item.path">
			<template #title>
				<el-icon><i class="iconfont"
						 :class="item.meta.icon" /></el-icon>
				<div class="ellipsis-one select-none">{{item.meta.title}}</div>
			</template>
			<SubMenu :systemMenus="item.children" />
		</el-sub-menu>
		<el-menu-item v-else
									:index="item.path">
			<el-icon><i class="iconfont"
					 :class="item.meta.icon" /></el-icon>
			<template #title>
				<div class="ellipsis-one select-none">{{item.meta.title}}</div>
			</template>
		</el-menu-item>
	</template>
</template>
<script setup name="SubMenu">
const props = defineProps({
	systemMenus: {
		type: Array,
		default: () => [],
	},
	showChildren: {
		type: Boolean,
		default: true,
	}
});
</script>
<style lang="scss" scoped>

</style>
