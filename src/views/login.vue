<template>
  <div class="loginWrap">
    <el-form class="loginForm" :label-position="labelPosition" label-width="80px" :model="formData">
        <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn"type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        labelPosition: 'top',
        formData: {
          username: '',
          password: ''
        }
      };
    }
  }
</script>
<style type="text/css">
  .loginWrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h2 {
    text-align: center;
    font-weight: 400;
  }
  .loginForm {
    background-color: #fff;
    width: 400px;
    padding: 30px;
  }
  .loginBtn {
    width: 100%;
  }
</style>
