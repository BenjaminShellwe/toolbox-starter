<script setup lang="ts">
import {computed, nextTick, onMounted, reactive, ref} from "vue";

import {useRegisterStore} from '~/store'
import axios from "axios";
import {ElNotification} from "element-plus";
// 变量
let maxNumber: number = 0

const buttonName = ref("Editing")

interface obtainLogged {
  id: string;
  username: string;
  fullname: string;
  gender: string;
  phone: string;
  role: string;
}

const userInfoTableData:obtainLogged[] = reactive([])
const originData = ref()

const table = ref()
const obtainLogged = reactive({
  id: '123456',
  username: '如果展示了这个数据',
  fullname: '那么说明没有走交互',
  gender: '00',
  phone: '0123456',
  role: '00'
})
const obtainDatabaseUserInfo: {[index: string]:any} = reactive({
  object1: {
    id: '120712',
    username: 'default data2',
    fullname: 'default',
    gender: '00',
    phone: '123132',
    role: '01'
  },
  object2: {
    id: '120722',
    username: 'default data2',
    fullname: 'default',
    gender: '00',
    phone: '123132',
    role: '01'
  },
  object3: {
    id: '120732',
    username: 'default data2',
    fullname: 'default',
    gender: '00',
    phone: '123132',
    role: '01'
  }

})
const UserInfoChanged = ref(false)
const BatchInfoChanged = ref(false)

const editMap = ref(new Map<string, boolean>());

// 函数
const isUserInfoChanged = () => {
  UserInfoChanged.value = !UserInfoChanged.value
  if(UserInfoChanged.value) {
    buttonName.value = "Confirm"
  }else{
    buttonName.value = "Editing"
  }
}
// 前端获取表格数据
const getVariableContinuously = () => {

  axios.post('/api/fetch', {
  })
      .then(function (response) {
        // console.log(response.data);
        for (let key in response.data) {
          if (Object.prototype.hasOwnProperty.call(response.data, key)) {
            userInfoTableData.splice(userInfoTableData.length, 0, response.data[key]);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  // 00角色去除所以注释，已进插入其他非00的记录入数组
  // userInfoTableData.splice(userInfoTableData.length, 0, obtainLogged);
  // console.log(userInfoTableData)
}
// 前端删除用户操作
const removeInfo = (index: string) => {
  for (const key in userInfoTableData) {
    // console.log(userInfoTableData[key].id)
    if (userInfoTableData[key].id == index){
      delete userInfoTableData[key];
      console.log(userInfoTableData)
      break; // 找到并删除后跳出循环
    }
  }
}
//前端添加用户操作
const addUserInfo = () => {
  const n: number = fetchMaxId(userInfoTableData)
  // console.log(n)
  if(n != -1){
    userInfoTableData.push({
      fullname: "编辑后确认",
      gender: "写入数据库",
      id: n.toString(),
      phone: "删除则抛弃",
      role: "01",
      username: "请点击编辑",
    })
    maxNumber++
  }else{
    userInfoTableData.push({
      fullname: "编辑后确认",
      gender: "写入数据库",
      id: maxNumber.toString(),
      phone: "删除则抛弃",
      role: "01",
      username: "请点击编辑",
    })
    maxNumber++
  }
  // console.log(table.value)

  nextTick(() => {
    const tableBody = document.querySelector('.ep-table__body');
    if (tableBody) {
      const bodyHeight = tableBody.clientHeight;
      // console.log('表格体高度:', bodyHeight);
      table.value.scrollTo(0,bodyHeight)
    }
  });
}

//辅助函数用于创建新数据时id的自增
const fetchMaxId = (val: any) => {
  let a: number[] = []

  for (const key in val) {
    // console.log(val[key].id)
    let n: number = val[key].id
    a.push(n)
  }
  // 对数组进行排序
  a.sort((a, b) => a - b) // 升序排序 其底层原理是快排的一种

  // 获取排序后数组的最后一个元素，即最大值
  if(maxNumber < Number(a[a.length - 1])){
    maxNumber = Number(a[a.length - 1])
    return Number(a[a.length - 1]) + 1 // 返回最大值+1得到
  }
  else{
    return -1
  }

};
const handleBatchInfoChanged = (id: string) => {
  const currentValue = editMap.value.get(id) ?? false;
  editMap.value.set(id, !currentValue);
  BatchInfoChanged.value = !BatchInfoChanged.value

  const index = userInfoTableData.findIndex(obj => obj.id === id)
  originData.value = userInfoTableData[index]

}

const handleBatchInfoConfirm = (id: string) => {
  const currentValue = editMap.value.get(id) ?? false;
  editMap.value.set(id, !currentValue);
  BatchInfoChanged.value = !BatchInfoChanged.value
  const index = userInfoTableData.findIndex(obj => obj.id === id)
  console.log(id)
  console.log(maxNumber)
  if(Number(id) !== maxNumber){

    axios.post('/api/update',{
      fullname: userInfoTableData[index].fullname,
      gender: userInfoTableData[index].gender,
      id: userInfoTableData[index].id,
      phone: userInfoTableData[index].phone,
      role: userInfoTableData[index].role,
      username: userInfoTableData[index].username
    }
    )
        .then(function (response) {
          console.log(response);
          for (let key in response.data) {
            if (Object.prototype.hasOwnProperty.call(response.data, key)) {
              userInfoTableData.splice(userInfoTableData.length, 0, response.data[key]);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }else{
    let sendingData = {}
    sendingData = userInfoTableData[index]
    console.log(sendingData)
    axios.post('/api/insert', {
          fullname: userInfoTableData[index].fullname,
          gender: userInfoTableData[index].gender,
          id: userInfoTableData[index].id,
          phone: userInfoTableData[index].phone,
          role: userInfoTableData[index].role,
          username: userInfoTableData[index].username
    }
    )
        .then(function (response) {
          console.log(response);
          for (let key in response.data) {
            if (Object.prototype.hasOwnProperty.call(response.data, key)) {
              userInfoTableData.splice(userInfoTableData.length, 0, response.data[key]);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }
}


const isAdminPermission = computed(() => {
  return obtainLogged.role == '00';
})


onMounted(() => {
  // 组件挂载时自动调用获取数据的方法
  getVariableContinuously();
  fetchMaxId(userInfoTableData)
//登录后将信息修改为已登录的用户信息
  const store = useRegisterStore()
  // 对未获取数据的进行处理
    obtainLogged.id= store.id
    obtainLogged.username= store.username
    obtainLogged.fullname= store.fullname
    obtainLogged.gender= store.gender
    obtainLogged.phone= store.phone
    obtainLogged.role= store.role

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
        <span v-show="!UserInfoChanged" >{{ obtainLogged.id }}</span>
        <el-input v-show="UserInfoChanged" v-model="obtainLogged.id" placeholder="obtainLogged.id" disabled />
      </el-descriptions-item>
      <el-descriptions-item width="300px">
        <template #label>
          <div class="cell-item">
            <el-tag size="large">username/login name</el-tag>
          </div>
        </template>
        <span v-show="!UserInfoChanged" >{{ obtainLogged.username }}</span>
        <el-input v-show="UserInfoChanged" v-model="obtainLogged.username" placeholder="obtainLogged.username" />
      </el-descriptions-item>
      <el-descriptions-item width="300px">
        <template #label>
          <div class="cell-item">
            <el-tag size="large">Full name/Real name</el-tag>
          </div>
        </template>
        <span v-show="!UserInfoChanged" >{{ obtainLogged.fullname }}</span>
        <el-input v-show="UserInfoChanged" v-model="obtainLogged.fullname" placeholder="obtainLogged.fullname" />
      </el-descriptions-item>
      <el-descriptions-item width="300px">
        <template #label>
          <div class="cell-item">
            <el-tag size="large">Gender</el-tag>
          </div>
        </template>
        <span v-show="!UserInfoChanged" >{{ obtainLogged.gender }}</span>
        <el-input v-show="UserInfoChanged" v-model="obtainLogged.gender" placeholder="obtainLogged.gender" />
      </el-descriptions-item>
      <el-descriptions-item width="300px">
        <template #label>
          <div class="cell-item">
            <el-tag size="large">Phone</el-tag>
          </div>
        </template>
        <span v-show="!UserInfoChanged" >{{ obtainLogged.phone }}</span>
        <el-input v-show="UserInfoChanged" v-model="obtainLogged.phone" placeholder="obtainLogged.phone" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-tag size="large">Role</el-tag>
          </div>
        </template>
        <span v-show="!UserInfoChanged" >{{ obtainLogged.role }}</span>
        <el-input v-show="UserInfoChanged" v-model="obtainLogged.role" placeholder="obtainLogged.role" disabled />
      </el-descriptions-item>

    </el-descriptions>

    <el-divider />
    <div v-if="isAdminPermission" >

      <el-table ref="table" :data="userInfoTableData" max-height="470" style="width: 100%">
        <el-table-column label="All User Management">
          <el-table-column prop="id" label="Index" width="180">
            <template #default="{ row }">
              <span v-show="!editMap.get(row.id)" >{{ row.id }}</span>
              <el-input v-show="editMap.get(row.id)" v-model="row.id" placeholder="id" disabled />
            </template>
          </el-table-column>
          <el-table-column prop="username" label="User Name">
            <template #default="{ row }">
              <span v-show="!editMap.get(row.id)" >{{ row.username }}</span>
              <el-input v-show="editMap.get(row.id)" v-model="row.username" placeholder="row.username" />
            </template>
          </el-table-column>
          <el-table-column prop="fullname" label="Full Name">
            <template #default="{ row }">
              <span v-show="!editMap.get(row.id)" >{{ row.fullname }}</span>
              <el-input v-show="editMap.get(row.id)" v-model="row.fullname" placeholder="row.fullname" />
            </template>
          </el-table-column>
          <el-table-column prop="gender" label="Gender">
            <template #default="{ row }">
              <span v-show="!editMap.get(row.id)" >{{ row.gender }}</span>
              <el-input v-show="editMap.get(row.id)" v-model="row.gender" placeholder="row.gender" />
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="Phone">
            <template #default="{ row }">
              <span v-show="!editMap.get(row.id)" >{{ row.phone }}</span>
              <el-input v-show="editMap.get(row.id)" v-model="row.phone" placeholder="row.phone" />
            </template>
          </el-table-column>
          <el-table-column prop="role" label="Role">
            <template #default="{ row }">
              <span v-show="!editMap.get(row.id)" >{{ row.role }}</span>
              <el-input v-show="editMap.get(row.id)" v-model="row.role" placeholder="row.role" disabled />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column fixed="right"  width="180">
          <template #header>
            <el-button line @click="addUserInfo" size="large">添加用户</el-button>
          </template>
          <template #default="{ row }">
            <el-button v-show="!editMap.get(row.id)" type="primary" size="default" @click="handleBatchInfoChanged(row.id)"
            >Edit</el-button
            >
            <el-button-group v-show="editMap.get(row.id)" size="small">
              <el-button type="primary" @click="handleBatchInfoConfirm(row.id)">confirm</el-button>
              <el-button type="danger" @click="removeInfo(row.id)">delete</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-divider />
    </div>


  </el-card>
</template>

<style scoped>

</style>
