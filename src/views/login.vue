<template>
  <div class="login">
    <el-form :label-position="labelPosition" label-width="80px" :model="formData">
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-button type="primary">登录</el-button>
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

</style>
