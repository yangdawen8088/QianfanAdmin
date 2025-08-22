<template>
  <el-dialog
    v-model="dialogVisible"
    v-if="dialogVisible"
    :width="width"
    :show-close="false"
    :close-on-click-modal="false"
    align-center
    :fullscreen="fullscreen"
    draggable
    style="padding: 0 !important"
    header-class="header-container"
    footer-class="footer-container"
    body-class="body-container"
    transition="dialog-bounce"
    :before-close="
      () => {
        fullscreen = false;
        dialogVisible = false;
      }
    "
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="dialog-header">
        <h4 :id="titleId" :class="titleClass">
          <i v-if="titleIcon" class="iconfont m-r-8" :class="titleIcon" />
          <span>{{ title }}</span>
        </h4>
        <div>
          <el-button
            link
            class="iconfont"
            :class="fullscreen ? 'icon-jiechuquanping' : 'icon-ico_quanping'"
            @click="fullscreen = !fullscreen"
          />
          <el-button link class="m-l-12 iconfont icon-guanbi" @click="close" />
        </div>
      </div>
    </template>
    <el-scrollbar
      :height="fullscreen ? 'calc(100vh - 138px)' : height"
      view-style="padding: 0 16px;"
    >
      <slot name="body" />
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup name="QFDialog">
import {
  defineExpose,
  watch,
  computed,
  defineModel,
  ref,
  onMounted,
} from "vue";
const {
  title = "弹窗",
  width = "800",
  height = "500",
  titleIcon = null,
} = defineProps({
  title: {
    required: false,
    type: String,
  },
  width: {
    required: false,
    type: String,
  },
  height: {
    required: false,
    type: String,
  },
  titleIcon: {
    required: false,
    type: String,
  },
});
const fullscreen = ref(false);
const dialogVisible = ref(false);
const OpenDialog = () => {
  dialogVisible.value = true;
};
defineExpose({
  OpenDialog,
});
</script>
<style lang="scss" scoped>
.header-container {
  padding-bottom: 0 !important;
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--qf-menubar-bg-color);
  background-image: var(--qf-menubar-bg-color);
  padding: 16px;
  h4 {
    margin: 0;
    flex: 1;
  }
  div {
    width: fit-content;
    .iconfont {
      transition: 0.5s;
    }
    .iconfont:hover {
      color: var(--el-color-primary);
      animation: rubberBand;
      animation-duration: 0.5s;
    }
  }
}
.body-container {
  max-height: calc(100vh - 512px) !important;
}
.footer-container {
  padding-top: 0 !important;
}
.dialog-footer {
  background-color: transparent;
  padding: 0 16px 16px;
}
</style>
<style>
/* 弹窗动画样式 :start */
/* Scale Animation */
.dialog-scale-enter-active,
.dialog-scale-leave-active,
.dialog-scale-enter-active .el-dialog,
.dialog-scale-leave-active .el-dialog {
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.dialog-scale-enter-from,
.dialog-scale-leave-to {
  opacity: 0;
}

.dialog-scale-enter-from .el-dialog,
.dialog-scale-leave-to .el-dialog {
  transform: scale(0.5);
  opacity: 0;
}

/* Slide Animation */
.dialog-slide-enter-active,
.dialog-slide-leave-active,
.dialog-slide-enter-active .el-dialog,
.dialog-slide-leave-active .el-dialog {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.dialog-slide-enter-from,
.dialog-slide-leave-to {
  opacity: 0;
}

.dialog-slide-enter-from .el-dialog,
.dialog-slide-leave-to .el-dialog {
  transform: translateY(-100px);
  opacity: 0;
}

/* Bounce Animation */
.dialog-bounce-enter-active,
.dialog-bounce-leave-active,
.dialog-bounce-enter-active .el-dialog,
.dialog-bounce-leave-active .el-dialog {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dialog-bounce-enter-from,
.dialog-bounce-leave-to {
  opacity: 0;
}

.dialog-bounce-enter-from .el-dialog,
.dialog-bounce-leave-to .el-dialog {
  transform: scale(0.3) translateY(-50px);
  opacity: 0;
}

/* Object Configuration Animation */
.dialog-custom-object-enter-active,
.dialog-custom-object-leave-active,
.dialog-custom-object-enter-active .el-dialog,
.dialog-custom-object-leave-active .el-dialog {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.dialog-custom-object-enter-from,
.dialog-custom-object-leave-to {
  opacity: 0;
}

.dialog-custom-object-enter-from .el-dialog,
.dialog-custom-object-leave-to .el-dialog {
  transform: rotate(180deg) scale(0.5);
  opacity: 0;
}
/* 弹窗动画样式 :End */
</style>
