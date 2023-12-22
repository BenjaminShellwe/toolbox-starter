<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>管理界面预览</span></template>
        <el-menu-item index="1-1">
          <router-link to="/UserManagement2" >金管局用户管理</router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
          <router-link to="/RoleManagement2" >金管局角色管理</router-link>
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="登录界面预览">
        <el-menu-item index="1-3">
          <router-link to="/Register2" >登录入口</router-link>
        </el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">建设中</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>
        建设中
      </template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>建设中</template>
    </el-menu-item>
    <el-menu-item index="4" disabled>
      <el-icon><setting /></el-icon>
      <template #title>建设中</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
