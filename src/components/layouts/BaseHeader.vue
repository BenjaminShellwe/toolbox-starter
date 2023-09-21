<script lang="ts" setup>
import { toggleDark } from "~/composables";
</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">
      <router-link to="/">主页</router-link>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">
        <router-link to="/studyVue">Vue.js</router-link>

      </el-menu-item>
      <el-menu-item index="2-2" >
        <router-link to="/mqReader">MQ队列查看器</router-link>
      </el-menu-item>
      <el-menu-item index="2-3" disabled>建设中</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1" disabled>建设中</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>FakeGPT
<!--      <router-link to="/fakeGPT" >FakeGPT</router-link>-->
      </el-menu-item>
    <el-menu-item index="4" disabled>建设中</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button
        class="border-none w-full bg-transparent cursor-pointer"
        style="height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
  </el-menu>
</template>
