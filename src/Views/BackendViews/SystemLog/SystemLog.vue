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
      >
        <template #timestamp="{ column }">
          <el-table-column
            prop="timestamp"
            v-bind="column.attr"
            v-if="column.show"
            ><template #default="scope">
              <div style="display: flex; align-items: center">
                <el-icon><timer /></el-icon>
                <span style="margin-left: 10px">{{ scope.row.timestamp.split('T')[0] }}</span>
              </div>
            </template>
          </el-table-column>
        </template>
        <template #level="{ column }">
          <el-table-column
            prop="level"
            v-bind="column.attr"
            v-if="column.show"
            ><template #default="scope">
			  <el-tag :type="GetLevelType(scope.row.level)">{{ scope.row.level }}</el-tag>
            </template>
          </el-table-column>
        </template>
      </PageViewOne>
    </template>
  </PageContainer>
</template>
<script setup name="SystemLog">
import { ref, reactive, defineAsyncComponent } from "vue";
const queryParams = ref({
  pageIndex: 1,
  pageSize: 10,
});
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
    fieldName: "timestamp",
    show: true,
    attr: { label: "时间", width: "180", sortable: false },
  },
  { fieldName: "level", show: true, attr: { label: "日志等级", width: "180" } },
  {
    fieldName: "message",
    show: true,
    attr: { label: "日志消息", "show-overflow-tooltip": true },
  },
  { fieldName: "module", show: true, attr: { label: "模块", width: "180" } },
  { fieldName: "userId", show: true, attr: { label: "用户 ID", width: "180" } },
  {
    fieldName: "ipAddress",
    show: true,
    attr: { label: "IP 地址", width: "180" },
  },
  { fieldName: "details", show: false, attr: { label: "详情", width: "180" } },
]);
const ExportData = () => {
  console.info("导出");
};
const optionBtns = ref([
  {
    label: "导出",
    attr: { type: "primary", click: ExportData, icon: "el-icon-plus" },
  },
]);
const tableData = ref({
  data: [
    {
      timestamp: "2023-11-15T08:30:45.123Z",
      level: "INFO",
      message: "系统启动完成",
      module: "system",
      userId: "admin",
      ipAddress: "192.168.1.100",
      details: {
        startupTime: 3.5,
        version: "1.2.0",
      },
    },
    {
      timestamp: "2023-11-15T09:15:22.456Z",
      level: "WARNING",
      message: "内存使用率超过80%",
      module: "monitor",
      userId: "system",
      ipAddress: "127.0.0.1",
      details: {
        memoryUsage: 82.5,
        threshold: 80,
      },
    },
    {
      timestamp: "2023-11-15T10:45:33.789Z",
      level: "ERROR",
      message: "数据库连接失败",
      module: "database",
      userId: "service",
      ipAddress: "192.168.1.105",
      details: {
        errorCode: "DB_CONN_001",
        retryCount: 3,
        errorMessage: "Connection timeout after 30 seconds",
      },
    },
    {
      timestamp: "2023-11-15T11:20:10.012Z",
      level: "DEBUG",
      message: "用户认证成功",
      module: "auth",
      userId: "user123",
      ipAddress: "192.168.1.200",
      details: {
        authMethod: "password",
        sessionDuration: 3600,
      },
    },
    {
      timestamp: "2023-11-15T12:05:55.345Z",
      level: "INFO",
      message: "定时任务执行完成",
      module: "scheduler",
      userId: "system",
      ipAddress: "127.0.0.1",
      details: {
        taskName: "dataBackup",
        executionTime: 45.2,
        recordsProcessed: 1250,
      },
    },
  ],
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
const GetLevelType = (level) => {
  switch (level) {
    case "INFO":
      return "info";
    case "WARNING":
      return "warning";
    case "ERROR":
      return "danger";
    case "DEBUG":
      return "primary";
    default:
      return "success";
  }
}
</script>
<style lang="scss" scoped>
</style>
