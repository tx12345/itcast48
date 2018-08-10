<template>
    <el-container class="homeContainer">
      <!-- Header -->
      <el-header class="homeHeader">
        <el-row>
          <el-col :span="4"><img src="@/assets/logo.png"></el-col>
          <el-col :span="18"><h2>电商后台管理系统</h2></el-col>
          <el-col :span="2"><a href="#" class="logout" @click="handleLogout">退出</a></el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- Aside -->
        <el-aside class="homeAside" width="200px">
          <!-- default-openeds 默认展开导航项 -->
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-location-outline"></i>用户管理</template>
                <el-menu-item index="1-1">用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>权限管理</template>
                <el-menu-item index="2-1">角色列表</el-menu-item>
                <el-menu-item index="2-2">权限列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>商品管理</template>
                <el-menu-item index="3-1">商品列表</el-menu-item>
                <el-menu-item index="3-2">分类参数</el-menu-item>
                <el-menu-item index="3-3">商品分类</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
                <el-menu-item index="4-1">订单列表</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-setting"></i>数据统计</template>
                <el-menu-item index="4-1">数据列表</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="homeMain">Main</el-main>
      </el-container>
    </el-container>
</template>
<script type="text/javascript">
  export default {
    // 判断用户是否登录是否携带token
    beforeCreate () {
      var token = sessionStorage.getItem('token');
      if(!token) {
        // 不带token，提示，跳转登录页
        this.$message.warning('请先登录');
        this.$router.push('/login')
      }
    },
    methods : {
      handleLogout () {
        // 点击退出按钮 清除sessionStorage 跳转到登录页
        this.$message.success('退出成功');
        sessionStorage.clear();
        setTimeout(()=>{
          this.$router.push('/login');
        },1000)

      }
    }
  }
</script>
<style scoped>
  .homeContainer {
    height: 100%;
  }
  .homeHeader {
    background-color: #b3c0d1;
    padding: 0;
    line-height: 60px;
  }
  .homeAside {
    background-color: #d3dce6;
    height: 100%;
  }
  .homeMain {
    background-color: #e9e1f3;
  }
  .homeHeader img {
    vertical-align: middle;
  }
  .homeHeader h2 {
    text-align: center;
    font-weight: 400;
  }
  .homeHeader a {
    text-align: right;
    text-decoration: none;
  }
</style>
