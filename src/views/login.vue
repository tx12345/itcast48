<template>
  <div class="loginWrap">
    <el-form class="loginForm" :label-position="labelPosition" label-width="80px" :model="formData">
        <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input  type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
          <!-- <el-button :plain="true" @click="open2">成功</el-button> -->
        <el-button class="loginBtn" type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        labelPosition: 'top',
        formData: {
          username: '',
          password: ''
        }
      };
    },
    methods : {
      handleLogin (){
        axios.post('http://localhost:8888/api/private/v1/login',this.formData)
              .then(response => {
                console.log(response)
                var { data : { meta : { status, msg }}} = response; //解构赋值
                console.log(status)
                console.log(msg)
                if(response.status === 200){
                  // 登录成功信息提示
                  this.$message.success(msg);//来自element-ui
                  // 记录token
                  var token = response.data.data.token;
                  //存放token到sessionStorage中
                  sessionStorage.setItem('token',token);
                  //跳转到后台首页users
                  this.$router.push('/login');
                }else {
                  this.$message.error(msg)
                }
              })
              .catch(err => {
                console.log(err)
              })
      }
    }
  }
</script>
<style scoped>
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
