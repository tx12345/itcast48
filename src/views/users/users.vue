<template>
    <!-- 面包屑 -->
    <el-card class="box-card">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框部分 -->
      <el-row>
        <el-col :span="24" style="margin-bottom: 20px">
          <div class="grid-content bg-purple">
            <!-- 搜索框 -->
            <div style="margin-top: 15px;">
              <el-input placeholder="请输入内容" class="input-with-select" style="width: 300px">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <!-- 添加按钮 -->
              <el-button type="success" plain>添加</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 表格部分 -->
      <el-table
        :data="tableData"
        border>
        <el-table-column
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          width="180"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="create_time"
          width="180"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="mg_state"
          width="150"
          label="用户状态">
          <template slot-scope="scope">
            <el-switch  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle plain></el-button>
            <el-button @click="handleDelete" type="danger" icon="el-icon-delete" circle plain></el-button>
            <el-button type="success" icon="el-icon-check" circle plain></el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
</template>
<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        tableData : [
        // 发送请求展示用户列表数据
        ]
      }
    },
    created () {
      // 渲染用户列表
      var token = sessionStorage.getItem('token');
      // 发送请求时，在请求头中携带token，查axios官网设置
      axios.defaults.headers.common['Authorization'] = token;
      axios.get('http://localhost:8888/api/private/v1/users?pagenum=1&pagesize=9')
            .then((response)=>{
              console.log(response)
              var { meta : { status, msg } ,data : { users } } = response.data;
              console.log(users)
              if(status === 200){
                this.tableData = users
              }else{
                this.$message.error(msg);
              }
            })
    },
    methods : {
      handleDelete () {

      },

    }
  }
</script>
<style>
  .box-card {
    height: 100%;
  }
</style>
