<script setup lang="ts">
import {reactive, ref, onMounted, nextTick } from "vue";

// 变量
const buttonName = ref("Editing")

interface UserInfo {
  id: number;
  username: string;
  fullname: string;
  gender: string;
  phone: string;
  role: string;
}

const userInfoTableData:UserInfo[] = reactive([])

const userInfo = reactive({
  id: '0120701',
  username: '0shellwe',
  fullname: '0Benjaminshellwe',
  gender: '00',
  phone: '0123132',
  role: '00'
})
const UserInfoChanged = ref(false)

// 函数
const isUserInfoChanged = () => {
  UserInfoChanged.value = !UserInfoChanged.value
  if(UserInfoChanged.value) {
    buttonName.value = "Confirm"
  }else{
    buttonName.value = "Editing"
  }
}

const getVariableContinuously = () => {
  userInfoTableData.splice(userInfoTableData.length, 0, userInfo);

}
onMounted(() => {
  // 组件挂载时自动调用获取数据的方法
  getVariableContinuously();

  nextTick(() => {
    // 在这里调用需要在所有子组件加载完成后执行的函数

  });
});
</script>

<template>
  <el-card class="user-card">
    <el-descriptions
        class="margin-top"
        title="User Information"
        size="large"
        :column="3"
        border
    >
      <template #extra>
        <el-button type="primary" @click="isUserInfoChanged">{{ buttonName }}</el-button>
      </template>
      <el-descriptions-item width="300px">
        <template #label>
          <div class="cell-item">
            <el-tag size="large">ID</el-tag>
          </div>
        </template>
        <span v-show="!UserInfoChanged" >{{ userInfo.id }}</span>
        <el-input v-show="UserInfoChanged" v-model="userInfo.id" placeholder="userInfo.id" disabled />
      </el-descriptions-item>
      <el-descriptions-item width="300px">
        <template #label>
          <div class="cell-item">
            <el-tag size="large">username/login name</el-tag>
          </div>
        </template>
        <span v-show="!UserInfoChanged" >{{ userInfo.username }}</span>
        <el-input v-show="UserInfoChanged" v-model="userInfo.username" placeholder="userInfo.username" />
      </el-descriptions-item>
      <el-descriptions-item width="300px">
        <template #label>
          <div class="cell-item">
            <el-tag size="large">Full name/Real name</el-tag>
          </div>
        </template>
        <span v-show="!UserInfoChanged" >{{ userInfo.fullname }}</span>
        <el-input v-show="UserInfoChanged" v-model="userInfo.fullname" placeholder="userInfo.fullname" />
      </el-descriptions-item>
      <el-descriptions-item width="300px">
        <template #label>
          <div class="cell-item">
            <el-tag size="large">Gender</el-tag>
          </div>
        </template>
        <span v-show="!UserInfoChanged" >{{ userInfo.gender }}</span>
        <el-input v-show="UserInfoChanged" v-model="userInfo.gender" placeholder="userInfo.gender" />
      </el-descriptions-item>
      <el-descriptions-item width="300px">
        <template #label>
          <div class="cell-item">
            <el-tag size="large">Phone</el-tag>
          </div>
        </template>
        <span v-show="!UserInfoChanged" >{{ userInfo.phone }}</span>
        <el-input v-show="UserInfoChanged" v-model="userInfo.phone" placeholder="userInfo.phone" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-tag size="large">Role</el-tag>
          </div>
        </template>
        <span v-show="!UserInfoChanged" >{{ userInfo.role }}</span>
        <el-input v-show="UserInfoChanged" v-model="userInfo.role" placeholder="userInfo.role" disabled />
      </el-descriptions-item>

    </el-descriptions>

    <el-divider />
    <el-table :data="userInfoTableData" height="250" style="width: 100%">
      <el-table-column prop="id" label="Index" width="180" />
      <el-table-column prop="username" label="User Name" />
      <el-table-column prop="fullname" label="Full Name" />
      <el-table-column prop="gender" label="Gender" />
      <el-table-column prop="phone" label="Phone" />
      <el-table-column prop="role" label="Role" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
          >Detail</el-button
          >
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>


  </el-card>
</template>

<style scoped>

</style>