<template>
    <!-- element-ui card -->
    <el-card class="box-card">
      <!-- 面包屑 -->
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
              <el-input v-model="searchKey" placeholder="请输入内容" class="input-with-select" style="width: 300px">
                <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
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
            <el-switch @change="handleChangStatus(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <!-- scope.row 查element-ui table表格获取当前操作对象 -->
            <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" circle plain></el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" circle plain></el-button>
            <el-button @click="handleSetRoles(scope.row)" type="success" icon="el-icon-check" circle plain></el-button>
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
      <el-dialog title="添加用户" @close="addCansoleForm('ruleForm')" :visible.sync="addUserdialogFormVisible">
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
          <el-button @click="addCansoleForm('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="addSureForm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑用户对话框 -->
      <el-dialog title="编辑用户" :visible.sync="editUserdialogFormVisible">
        <el-form :model="form" :rules="rules" ref="editForm" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editUserdialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="EditSureForm('editForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分配角色对话框 -->
      <el-dialog title="角色管理" :visible.sync="setRolesdialogFormVisible">
        <el-form :model="form" :rules="rules" ref="setRolesForm" label-width="80px">
          <el-form-item label="用户名">
            {{ form.currentName }}
          </el-form-item>
          <el-form-item label="选择角色">
            <el-select v-model="form.currentRoleId">
              <el-option label="请选择" value="-1" disabled></el-option>
              <el-option v-for="item in form.roles" :key="item.id" :label="item.roleName" :value="item.id">
                <!-- 循环roles -->
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="setRolesdialogFormVisible=false">取 消</el-button>
          <el-button type="primary" @click="setRolesSureForm('setRolesForm')">确 定</el-button>
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
        searchKey : '',
        // 控制添加用户的对话框的显示隐藏,控编辑加用户的对话框的显示隐藏,控制分配角色的对话框的显示隐藏
        addUserdialogFormVisible : false,
        editUserdialogFormVisible : false,
        setRolesdialogFormVisible : false,
        // 添加用户dialog表单
        form : {
          email : '',
          mobile : '',
          username : '',
          password : '',
          // 分配角色绑定的下来框
          currentId : '-1',
          currentRoleId: '-1',
          currentName : '',
          roles : []
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
        },
      }
    },
    created () {
      // 渲染用户列表
      this.loadData()
    },
    methods : {
      // 加载页面
      loadData () {
        // var token = sessionStorage.getItem('token');
        // 发送请求时，在请求头中携带token，查axios官网设置
        // axios.defaults.headers.common['Authorization'] = token;
        // axios.get('http://localhost:8888/api/private/v1/users?pagenum=1&pagesize=9')
        // axios.get('users?pagenum=1&pagesize=9')
        // axios.get(`users?pagenum=${ this.pagenum }&pagesize=${ this.pagesize }`)
        axios.get(`users?pagenum=${ this.pagenum }&pagesize=${ this.pagesize }&query=${ this.searchKey }`)
              .then((response)=>{
                console.log(response)
                var { meta : { status, msg } } = response.data;
                if(status === 200){
                  this.tableData = response.data.data.users;
                  this.count = response.data.data.total;
                }else{
                  this.$message.error(msg);
                }
            })
      },
      //搜索用户
      handleSearch () {
        // console.log(this.searchKey)
        // 发送请求，由于搜索功能的发送请求的地址与加载用户页面是一个借口，再拼接查询的关键字就可以，直接在加载用户页面修改并不会有影响
        this.loadData()
      },
      // 添加用户
      handleAdd () {
        // 点击添加按钮，添加用户对话框显示
        this.addUserdialogFormVisible = true;
      },
      // 点击添加对话框确定按钮
      async addSureForm (ruleForm) {
        // 获取表单数据
        var formData = this.form;
        //表单数据验证
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
      // 点击添加对话框取消按钮
      addCansoleForm (ruleForm) {
        // 关闭对话框
        this.addUserdialogFormVisible = false;
        // 清除表单数据
        for(var key in this.form){
          this.form[key] = '';
        }
      },
      //点击修改用户状态按钮
      async handleChangStatus (users) {
        // 发送请求
        const response = await this.$http.put(`users/${users.id}/state/${users.mg_state}`)
        console.log(response)
        const { meta : {status, msg}} = response.data;
        if(status === 200){
          this.$message.success(msg);
        }else{
          this.$message.error(msg);
        }
      },
      // 编辑用户
      handleEdit (users) {
        this.editUserdialogFormVisible = true;
        console.log(users);
        // 点击编辑按钮渲染数据
        this.form.username = users.username;
        this.form.email = users.email;
        this.form.mobile = users.mobile;
        // 记录当前用户id（发送请求需要id）
        this.form.id = users.id
      },
      // 点击编辑对话框确认按钮
      async EditSureForm () {
        // 根据修改的内容发送请求修改数据
        const response = await this.$http.put(`users/${this.form.id}`,{ email : this.form.email, mobile : this.form.mobile})
        console.log(response);
        const { meta : { status, msg} } = response.data;
        if(status === 200){
          this.$message.success(msg);
          this.loadData();
          this.editUserdialogFormVisible = false;
          for(var key in this.form){
          this.form[key] = '';
        }
        }
      },
      // 删除用户
      async handleDelete (users) {
        var id = users.id
        this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(async () => {
            const response = await this.$http.delete(`users/${id}`)
            console.log(response)
            const { meta : {status, msg } } = response.data;
            if(status === 200){
              this.$message.success(msg);
              this.loadData()
            }
        })
      },
      // 角色管理
      async handleSetRoles (users) {
        // 渲染对话框数据
        this.setRolesdialogFormVisible = true;
        console.log(users);
        this.form.currentName = users.username;
        this.form.currentUserId = users.id;
        this.form.currentRolesName = users.role_name
        // 根据当前用户id查询用户信息
        const response = await this.$http.get('roles');
        console.log(response);
        // 显示角色选择列表（下拉框）
        this.form.roles = response.data.data;
      },
      // 点击角色管理对话框确认按钮
      async setRolesSureForm () {
        // 修改currentUserId发送请求
        const response = await this.$http.put(`users/${ this.form.currentUserId }/role`,{rid: this.form.currentRoleId})
        console.log(response)
        const { meta : { status, msg}} = response.data;
        if(status === 200){
          this.$message.success(msg);
          this.setRolesdialogFormVisible = false;
        }
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
