<template>
  <PageContainer>
    <template #Default>
      <div>
        角色管理
        <el-input
          v-model="input"
          style="width: 240px"
          placeholder="Please input"
        />
      </div>
    </template>
  </PageContainer>
</template>
<script setup name="Role">
import { ref } from "vue";
const input = ref("");
</script>
<style lang="scss" scoped>
</style>
