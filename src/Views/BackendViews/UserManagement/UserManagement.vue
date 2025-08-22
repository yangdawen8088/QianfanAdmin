<template>
  <PageContainer>
    <template #Default>
      <PageViewOne
        :queryFields="queryFields"
        :tableFields="tableFields"
        :optionBtns="optionBtns"
        v-model:queryParams="queryParams"
        :tableData="tableData"
        @reloadData="loadData"
        v-model:selectList="selectList"
      >
        <template #name="{ column }">
          <el-table-column
            prop="name"
            v-bind="column.attr"
            v-if="column.show"
          />
        </template>
        <template #optionColumn>
          <el-table-column align="right" label="操作" width="120">
            <template #default="scope">
              <el-button link @click="EditData"> 编辑 </el-button>
              <el-button link type="danger" @click="DelData(scope)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </template>
      </PageViewOne>
      <QFDialog ref="QFDialogRef" titleIcon="icon-shuzidaping">
        <template #body>
          <div v-for="item in 300" :key="item">内容{{ item }}</div>
        </template>
      </QFDialog>
    </template>
  </PageContainer>
</template>
<script setup name="UserManagement">
import { ref, reactive, defineAsyncComponent } from "vue";
const queryParams = ref({
  pageIndex: 1,
  pageSize: 10,
});
const selectList = ref([]);
// 查询条件部分
// 按钮区域
// 数据部分、分页部分（当前页、页大小、是否可以上一页、是否可以下一页、总页数、总数据条数）
const queryFields = ref([
  {
    label: "关键字",
    fieldName: "keyName",
    type: "input",
    attr: { maxlength: 10, placeholder: "请输入关键字" },
  },
]);
const tableFields = ref([
  {
    fieldName: "date",
    show: true,
    attr: { label: "日期", width: "180", sortable: true },
  },
  { fieldName: "name", show: true, attr: { label: "名字", width: "180" } },
  {
    fieldName: "address",
    show: true,
    attr: { label: "地址", "show-overflow-tooltip": true },
  },
]);
const QFDialogRef = ref();
const AddData = () => {
  console.info("新增");
  QFDialogRef.value?.OpenDialog();
};
const EditData = () => {
  console.info("编辑");
};
const DelData = () => {
  console.info("删除");
  console.info(selectList.value);
};
const ImportData = () => {
  console.info("导入");
};
const ExportData = () => {
  console.info("导出");
};
const optionBtns = ref([
  {
    label: "新增",
    attr: { type: "primary", click: AddData, icon: "el-icon-plus" },
  },
  {
    label: "编辑",
    attr: { type: "success", click: EditData, icon: "el-icon-plus" },
  },
  {
    label: "删除",
    attr: { type: "warning", click: DelData, icon: "el-icon-plus" },
  },
  {
    label: "导入",
    attr: { type: "primary", click: ImportData, icon: "el-icon-plus" },
  },
  {
    label: "导出",
    attr: { type: "primary", click: ExportData, icon: "el-icon-plus" },
  },
]);
const tableData = ref({
  data: Array.from({ length: 30 }).map(() => ({
    date: new Date().toLocaleDateString(),
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  })),
  pageIndex: 1,
  pageSize: 10,
  totalCount: 100,
});
const onSubmit = () => {
  console.log("submit!");
};
const loadData = () => {
  console.info("加载数据", queryParams.value);
};
</script>
<style lang="scss" scoped>
</style>
