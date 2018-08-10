<template>
    <!-- 面包屑 -->
    <el-card class="box-card">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="24">
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
    </el-card>
</template>
<script>

</script>
<style>
  .box-card {
    height: 100%;
  }
</style>
