<template>
  <component :is="loginLayout[`${appSettings.currentDevice}Login`]">
    <div style="padding: 0 38px; box-size: border-box; height: 100%">
      <h2
        style="
          text-align: right;
          padding-top: 60px;
          box-size: border-box;
          margin-top: 0;
        "
      >
        欢迎登录 | Welcome
      </h2>
      <el-form label-position="top" label-width="auto" :model="loginData">
        <el-form-item label="登录账号：">
          <el-input
            v-model="loginData.loginAccount"
            placeholder="账号 | 电话 | 邮箱"
          />
        </el-form-item>
        <el-form-item label="登录密码：">
          <el-input
            type="password"
            show-password
            v-model="loginData.loginPassword"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="验证码：">
          <div style="display: flex; justify-content: space-between">
            <el-input
              v-model="loginData.verificationCode"
              style="flex: 1"
              placeholder="请输入验证码"
            />
            <el-image
              :src="src"
              style="
                width: 100px;
                height: 30px;
                border-radius: 3px;
                margin-left: 10px;
                cursor: pointer;
              "
            />
          </div>
        </el-form-item>
        <el-form-item>
          <div style="text-align: center; width: 100%">
            <el-button
              type="primary"
              style="width: 80%"
              @click="$router.push('/Backend')"
              >登&emsp;录</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <div style="width: 100%; dislay: flex; justify-content: flex-start">
        <el-button type="primary" link>用户注册</el-button>
        <el-button type="info" link>忘记密码</el-button>
      </div>
    </div>
  </component>
</template>
<script setup name="Login">
import { ref, onUnmounted, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useAppSettings } from "@/Stores/appSettings";
const { appSettings } = storeToRefs(useAppSettings());
const loginLayout = {
  MOBILELogin: defineAsyncComponent(() => import("./MobileLogin.vue")),
  PADLogin: defineAsyncComponent(() => import("./PadLogin.vue")),
  DESKTOPLogin: defineAsyncComponent(() => import("./DesktopLogin.vue")),
};
const src =
  "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";
const loginData = ref({
  loginAccount: "",
  loginPassword: "",
  verificationCode: "",
});
const input = ref("");
</script>
<style lang="scss" scoped>
</style>
