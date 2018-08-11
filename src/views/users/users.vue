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
              <el-button @click="handleAdd" type="success" plain>添加</el-button>
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
        <!-- 分页 -->
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pagesize"
        :pager-count="9"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
      <!-- 添加用户对话框 -->
      <el-dialog title="添加用户" :visible.sync="addUserdialogFormVisible">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" type="password" prop="password">
            <el-input v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserdialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
</template>
<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        tableData : [
        // 发送请求展示用户列表数据
        ],
        // 页码
        pagenum : 1,
        // 每页显示多少条数据
        pagesize : 2,
        count : 0,
        // 控制添加用户的对话框的显示隐藏
        addUserdialogFormVisible : false,
        // 添加用户dialog表单
        form : {
          email : '',
          mobile : '',
          username : '',
          password : ''
        },
        // 添加用户dialog表单验证
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
          ]

        }
      }
    },
    created () {
      // 渲染用户列表
      this.loadData()

    },
    methods : {
      loadData () {
        var token = sessionStorage.getItem('token');
        // 发送请求时，在请求头中携带token，查axios官网设置
        axios.defaults.headers.common['Authorization'] = token;
        // axios.get('http://localhost:8888/api/private/v1/users?pagenum=1&pagesize=9')
        // axios.get('users?pagenum=1&pagesize=9')
        axios.get(`users?pagenum=${ this.pagenum }&pagesize=${ this.pagesize }`)
              .then((response)=>{
                console.log(response)
                var { meta : { status, msg } ,data : { users, total } } = response.data;
                console.log(users)
                if(status === 200){
                  this.tableData = users;
                  this.count = total;
                }else{
                  this.$message.error(msg);
                }
            })
      },
      // 添加用户
      handleAdd () {
        // 点击添加按钮，添加用户对话框显示
        this.addUserdialogFormVisible = true;
      },

     async submitForm (ruleForm) {
        // 获取表单数据
        var formData = this.form;
        this.$refs[ruleForm].validate( async (valid) => {
          console.log(ruleForm)
          if (valid) {
            // 发送请求（使用async与await可以不再.then，this.$http在main.js中定义了代替了axios）
            const response = await this.$http.post('users',formData)
            console.log(response);
            var { meta : { status, msg } } = response.data
            // console.log(status)
            if( status === 201 ){
              this.$message.success(msg);
              // 清空form表单中的内容
              for(var key in formData){
                formData[key] = '';
              }
              //关闭对话框
              this.addUserdialogFormVisible = false;
            }else{
              this.$message.error(msg)
            }
          }else{
            return false;
          }
        })
      },
      handleDelete () {
      },
      // 每页条数发生变化
      handleSizeChange (val) {
        console.log(val);
        this.pagesize = val;
        this.loadData();
      },
      // 页码发生变化
      handleCurrentChange (val) {
        console.log(val)
        this.pagenum = val;
        this.loadData();
      }
    }
  }
</script>
<style>
  .box-card {
    height: 100%;
  }
</style>
