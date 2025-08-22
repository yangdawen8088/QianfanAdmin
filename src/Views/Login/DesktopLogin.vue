<template>
  <div class="desktop-bg">
    <div class="login-container">
      <div class="title-container"></div>
      <div class="form-container"><slot name="default" /></div>
    </div>
  </div>
</template>
<script setup name="DesktopLogin">
</script>
<style lang="scss" scoped>
.desktop-bg {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../Assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  .login-container {
    background-color: white;
    border-radius: 18px;
    width: 800px;
    height: 450px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    .title-container {
      background-color: rebeccapurple;
      flex: 1;
      height: 100%;
    }
    .form-container {
      width: 45%;
      height: 100%;
    }
  }
}
</style>
