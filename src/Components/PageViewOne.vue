<template>
  <div style="display: flex; flex-direction: column; height: 100%">
    <div class="option-container">
      <div>
        <el-form
          v-if="queryFields && queryFields.length > 0"
          :inline="true"
          :model="queryParams"
          class="demo-form-inline"
        >
          <el-form-item
            v-for="fildItem in queryFields"
            :key="fildItem"
            :label="fildItem.label"
          >
            <component
              :is="queryTemplates[fildItem.type ?? 'input'] ?? ''"
              v-model="queryParams[fildItem.fieldName]"
              v-bind="fildItem.attr"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button v-if="showResetBtn" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="option-btns">
		<template v-if="optionBtns !== null && optionBtns !== undefined && optionBtns.length <= 3">
			<el-button
				v-for="(item, index) in optionBtns"
				:key="index"
				:type="item.attr.type"
				@click="item.attr.click"
				>{{ item.label }}</el-button
			>
		</template>
		<template v-else>
			<el-button
				v-for="item in 2"
				:key="item"
				:type="optionBtns[item-1].attr.type"
				@click="optionBtns[item-1].attr.click"
				>{{ optionBtns[item-1].label }}</el-button
			>
			<el-dropdown>
				<el-button class="m-l-12">
					更多
					<el-icon class="el-icon--right"><ArrowDown /></el-icon>
				</el-button>
				<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item v-for="item in optionBtns.slice(2)" :key="item" @click="item.attr.click">{{item.label}}</el-dropdown-item>
				</el-dropdown-menu>
				</template>
			</el-dropdown>
		</template>
      </div>
    </div>
    <el-table :data="tableData.data" style="width: 100%; flex: 1" @selection-change="handleSelectionChange" :default-sort="queryParams.sort" @sort-change="sortChange">
	  <el-table-column v-if="selectList !== null && selectList !== undefined" type="selection" width="38" />
	  <template
        v-for="(item, index) in tableFields"
        :key="index">
		<template v-if="$slots[item.fieldName]">
			<slot :name="item.fieldName" :column="item" />
		</template>
		<el-table-column v-if="!$slots[item.fieldName] && item.show"
			:prop="item.fieldName"
			v-bind="item.attr"
		/>
	  </template>
	  <template v-if="$slots.optionColumn">
		<slot name="optionColumn" />
	  </template>
    </el-table>
    <div class="flex-between-center">
      <div style="flex: 1">
        <Pagin v-if="tableData.data.length > 0"
            @current-change="onHandleCurrentChange"
			@size-change="onHandleSizeChange"
			:currentPage="queryParams.pageIndex"
			:pageSize="queryParams.pageSize"
			:total="tableData.totalCount" />
      </div>
      <el-dropdown :hide-on-click="false">
        <div class="m-l-12 m-t-12 flex-end-center">
          <el-button link>
            <i class="iconfont icon-gengduoshezhicaidan m-r-5" />
            列筛选
          </el-button>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
			<template v-for="item in tableFields" :key="item">
				<el-dropdown-item v-if="item.attr.label">
					<el-checkbox
						:label="item.attr.label"
						v-model="item.show"
						@change="columnFilter"
					/>
				</el-dropdown-item>
			</template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup name="PageViewOne">
import { resolveComponent, watch, computed, defineModel, ref, onMounted } from "vue";
const {
  tableData = {},
  tableFields = [],
  queryFields = [],
  optionBtns = [],
  showResetBtn = true
} = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  tableFields: {
    required: false,
    type: Array,
  },
  queryFields: {
    required: false,
    type: Array,
  },
  optionBtns: {
    required: false,
    type: Array,
  },
  showResetBtn: {
    required: false,
    type: Boolean,
  }
});
const queryParams = defineModel("queryParams");
const selectList = defineModel("selectList");
const emit = defineEmits(["reloadData"]);
const initFields = () => {
  queryFields.forEach((item) => {
    queryParams.value[item.fieldName] = item.defaultValue ?? undefined;
  });
  queryParams.value.fields = tableFields
    .filter((i) => i.show)
    .map((i) => i.fieldName);
  queryParams.value.pageIndex = tableData.pageIndex ?? 1;
  queryParams.value.pageSize = tableData.pageSize ?? 10;
};
// 分页改变
const onHandleSizeChange = (val) => {
  queryParams.value.pageSize = val;
  emit("reloadData", queryParams.value);
};
// 分页改变
const onHandleCurrentChange = (val) => {
  queryParams.value.pageIndex = val;
  emit("reloadData", queryParams.value);
};
const columnFilter = () => {
  queryParams.value.fields = tableFields.filter((i) => i.show).map((i) => i.fieldName);
  emit("reloadData", queryParams.value);
};
const onSubmit = () => {
  emit("reloadData", queryParams.value);
};
const onReset = () => {
  queryFields.forEach((item) => {
    queryParams.value[item.fieldName] = item.defaultValue ?? undefined;
  });
  emit("reloadData", queryParams.value);
};
const handleSelectionChange = (val) => {
    selectList.value = val;
}
const sortChange = (val) => {
  queryParams.value.sort = {prop:val.prop,order:val.order};
  emit("reloadData", queryParams.value);
}
const queryTemplates = {
  input: resolveComponent("el-input"),
  cascader: resolveComponent("el-cascader"),
  select: resolveComponent("el-select"),
  switch: resolveComponent("el-switch"),
  timePicker: resolveComponent("el-time-picker"),
  timeSelect: resolveComponent("el-time-select"),
  treeSelect: resolveComponent("el-tree-select"),
};
onMounted(() => {
  initFields();
});
</script>
<style lang="scss" scoped>
.option-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.option-btns {
  max-width: fit-content;
  min-width: fit-content;
  text-align: end;
  height: -webkit-fill-available;
  height: fill-available;
}
</style>
