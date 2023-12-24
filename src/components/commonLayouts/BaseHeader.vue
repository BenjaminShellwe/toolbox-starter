<script lang="ts" setup>
import { toggleDark } from "~/composables";

import { useRegisterStore } from '~/store'
import router from "~/router";
import {ref, watch} from "vue";
// 用户信息菜单可见变量
const menuVisible = ref(false)
// store传入定义入口
const store = useRegisterStore()
// 登出操作
const logoutAction = async () => {
  store.logout()
  await router.push('/Register2')
}
// 监听变量变化的变化，并在其变更后执行对应的方法
watch(store, () => {
  menuVisible.value = store.LoginID != '';
  // console.log(menuVisible.value);
});

</script>

<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
  >
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
      <el-menu-item index="2-3" >
        <router-link to="/rtgsFunction">所谓的功能？？</router-link>
      </el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1" disabled>建设中</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="2-5">
        <router-link to="/register">功能2？？</router-link>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3" disabled>FakeAPI
<!--      <router-link to="/fakeGPT" >FakeGPT</router-link>-->
      </el-menu-item>
    <el-menu-item index="4" disabled>建设中</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button
        class="border-none w-full bg-transparent cursor-pointer"
        style="/*noinspection CssUnresolvedCustomProperty*/height: var(--ep-menu-item-height)"
      >
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
    <div class="flex-grow" />
    <el-popover
          placement="top-start"
          :width="200"
          trigger="hover"
      >
        <el-descriptions
            title="Information"
            direction="vertical"
            :column="1"
            size="small"
            border
        >
          <template #extra>
            <el-button
                size="small"
                type="primary"
                @click="logoutAction"
            >
              logout
            </el-button>
          </template>
          <el-descriptions-item label="User I.D.">
            <el-tag size="small">{{ store.UserID }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Login I.D.">
            <el-tag size="small">{{ store.LoginID }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="UserName" >
            <el-tag size="small">{{ store.UserName }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="UserType">
            <el-tag size="small">{{ store.UserType }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>


        <template #reference>
          <el-menu-item v-show="menuVisible" index="5">
            USER:[{{store.UserID}}]{{store.UserName}}
          </el-menu-item>
        </template>
      </el-popover>


  </el-menu>
</template>

<style>

</style>
