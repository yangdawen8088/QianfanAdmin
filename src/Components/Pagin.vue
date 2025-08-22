<template>
	<div class="pagin-container">
		<el-pagination @size-change="onHandleSizeChange"
									 @current-change="onHandleCurrentChange"
									 class="mt15"
									 :pager-count="props.pagerCount"
									 :page-sizes="props.pageSizes"
									 :current-page="props.currentPage"
									 :page-size="props.pageSize"
									 :layout="props.leftLayout"
									 :total="props.total">
		</el-pagination>
		<el-pagination @size-change="onHandleSizeChange"
									 @current-change="onHandleCurrentChange"
									 class="mt15"
									 :pager-count="props.pagerCount"
									 :page-sizes="props.pageSizes"
									 :current-page="props.currentPage"
									 :page-size="props.pageSize"
									 :layout="props.rightLayout"
									 :total="props.total">
		</el-pagination>
	</div>
</template>
<script setup name="Pagin">
const props = defineProps({
	pagerCount: {
		type: Number,
		default: 5,
	},
	pageSizes: {
		type: Array,
		default: () => [10, 20, 50, 100],
	},
	currentPage: {
		type: Number,
		default: 1,
	},
	pageSize: {
		type: Number,
		default: 10,
	},
	total: {
		type: Number,
		default: 0,
	},
	leftLayout: {
		type: String,
		default: "total, sizes",
	},
	rightLayout: {
		type: String,
		default: "prev, pager, next, jumper",
	},
});
const emit = defineEmits(["size-change", "current-change"]);
// 分页改变
const onHandleSizeChange = (val) => {
	emit("size-change", val);
};
// 分页改变
const onHandleCurrentChange = (val) => {
	emit("current-change", val);
};
</script>
<style lang="scss" scoped>
.pagin-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 12px;
}
</style>