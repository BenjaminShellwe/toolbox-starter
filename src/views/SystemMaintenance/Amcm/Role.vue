<script setup lang="ts">

//Role页面

import {onMounted, reactive, ref, toRef, computed} from "vue";


//级联选择器参数导入
import { options } from "./options";
import axios from "axios";
import router from "~/router";
import {useRegisterStore} from "~/store";

const store = useRegisterStore()
// 表格表头数据列接口
interface obtainLogged {
  RoleID: string,
  RoleName: string,
}
// 添加角色控制
const roleInfo = ref({
  RoleID: '',
  RoleName: ''
})
// 表格表头数据列变量
const roleInfoTableData:obtainLogged[] = reactive([])
// 表格ref引用
const table = ref()

// 对话框可见性控制变量
const centerDialogVisible = ref(false);
// 对话框内不同显示内容可见性控制变量
const dialogDetailsVisible = ref({
  addRole: false,
  edit: false
})


// 级联选择器多选控制参数
const props = ref({multiple: true})

// 添加角色信息
const addClick = (val: any) => {
  // console.log('clicked!')
  DialogTitle.value = 'Add Role'
  centerDialogVisible.value = true;
  (dialogDetailsVisible.value as any)[val] = true;
}
const editClick = (row: any, val: string) => {
  // console.log(row)
  roleInfo.value.RoleID = row.RoleID
  roleInfo.value.RoleName = row.RoleName
  DialogTitle.value = 'Edit Role'
  centerDialogVisible.value = true;
  (dialogDetailsVisible.value as any)[val] = true;
}

// 此方法为对话框内部控件关闭
const secondClick = (val: any) => {
  if(DialogTitle.value == "Add Role"){
    if(roleInfo.value.RoleID == '' && roleInfo.value.RoleName == ''){
      ElMessage.error('Please ensure that Role Name and Role I.D. two options have been entered.')
    }else{
      axios.post('/api/insertRole',{
        role_ID: roleInfo.value.RoleID,
        role_NAME: roleInfo.value.RoleName
      }).then(function (response) {
        if(response.data == "Success!"){
          roleInfo.value.RoleID = ''
          roleInfo.value.RoleName = ''
          roleInfoTableData.length = 0
          getAllRolesInfo()
          centerDialogVisible.value = false;
          for (const valKey in dialogDetailsVisible.value) {
            if((dialogDetailsVisible.value as any)[valKey]){
              (dialogDetailsVisible.value as any)[valKey] = !(dialogDetailsVisible.value as any)[valKey]
            }
          }
        }
      }).catch(function (response){
        console.log(response)
      })
    }
  }else if(DialogTitle.value == "Edit Role"){
  // /updateRole
    axios.post('/api/updateRole',{
      role_ID: roleInfo.value.RoleID,
      role_NAME: roleInfo.value.RoleName
    }).then(function (response) {
      if(response.data == "Success!"){
        roleInfo.value.RoleID = ''
        roleInfo.value.RoleName = ''
        roleInfoTableData.length = 0
        getAllRolesInfo()
        centerDialogVisible.value = false;
        for (const valKey in dialogDetailsVisible.value) {
          if((dialogDetailsVisible.value as any)[valKey]){
            (dialogDetailsVisible.value as any)[valKey] = !(dialogDetailsVisible.value as any)[valKey]
          }
        }
      }
    }).catch(function (response){
      console.log(response)
    })
  }else{


  }

}



// 获取角色数据
const getAllRolesInfo = () => {
  axios.post('/api/allRole'
  ).then(function (response) {
    // console.log(response)
    for (let key in response.data) {
      if (Object.prototype.hasOwnProperty.call(response.data, key)) {
        let val = {
          RoleID: response.data[key].role_ID,
          RoleName: response.data[key].role_NAME,
          RoleType: response.data[key].role_TYPE,

          edit: true,
          delete: true,

          popoverDelete: false,
        }
        if(Number(val.RoleType) == 0){
          val.delete = false
          val.edit = false
        }
        roleInfoTableData.splice(roleInfoTableData.length, 0, val);
        // console.log(val)
      }
    }
  }).catch(function (response) {
    console.log(response)
  })
}

// 删除信息嵌套弹出框的按钮控制
const popoverClick = (row: any, b: boolean, val: string) => {
  row[val] = false
  if(b){
    axios.post('/api/deleteOneRole',{
      role_ID: row.RoleID
    })
        .then(function(response){
            console.log(response.data)
          if(response.data == 'Success!'){
            roleInfoTableData.length = 0
            getAllRolesInfo()
          }
        }).catch(function(response){
          console.log(response)
    })
  }
}
// 搜索变量
const search = ref('')
const arrayRef  = toRef(roleInfoTableData)
const filterTableData = computed(() =>
    arrayRef.value.filter(
        (data) =>
            !search.value ||
            data.RoleName.toLowerCase().includes(search.value.toLowerCase())
    )
)
// 对话框标题以及对话框提交信息
const DialogTitle = ref('')
// 此方法为对话框内部控件关闭
const handleBeforeClose = (val: any) => {
  // console.log(val)
  roleInfo.value.RoleID = ''
  roleInfo.value.RoleName = ''
  centerDialogVisible.value = false;
  if(val != ''){
    (dialogDetailsVisible.value as any)[val] = false;
  }
  for (const valKey in dialogDetailsVisible.value) {
    if((dialogDetailsVisible.value as any)[valKey]){
      (dialogDetailsVisible.value as any)[valKey] = !(dialogDetailsVisible.value as any)[valKey]
    }
  }
}


// 非生命周期函数请在以上行中声明
// onMounted期间
onMounted(async () => {

  getAllRolesInfo()

  if (store.LoginID == '') {
    await router.push('/Register2')
  }
})
</script>

<template>
  <el-card>
    <el-card>
      <el-row>
        <el-col :span="1">ActionBar</el-col>
        <el-col :span="5">
          Search Role Name
          <el-input
              v-model="search"
              style="width: auto"
              placeholder="Type something"
              size="small"
          />
        </el-col>

        <el-col :span="1">
          <el-button
              size="small"
              @click="addClick('addRole')"
          >
            Add Role
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-divider />
    <el-table ref="table" :data="filterTableData" max-height="535" style="width: 100%">
      <el-table-column prop="RoleID" label="Role I.D." >
      </el-table-column>
      <el-table-column prop="RoleName" label="Role Name">
      </el-table-column>
      <el-table-column fixed="right" label="Edit" width="55">
        <template #default="{ row }">
          <el-icon v-show="row.edit" @click="editClick(row, 'edit')" class="customStyle"><EditPen /></el-icon>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Delete" width="95">
        <template #default="{ row }">
          <el-popover
              :visible="row.popoverDelete"
              placement="top"
              title="Delete"
              :width="200"
              trigger="click"
          >
            <p>This will delete selected role. Are you sure to delete it?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="small" text @click="popoverClick(row,false, 'popoverDelete')">cancel</el-button>
              <el-button size="small" type="primary" @click="popoverClick(row, true, 'popoverDelete')"
              >confirm</el-button
              >
            </div>
            <template #reference>
              <el-icon v-show="row.delete" @click="row.popoverDelete = true" class="customStyle"><Delete /></el-icon>
            </template>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-divider />

  </el-card>

  <el-dialog
      v-model="centerDialogVisible"
      :title="DialogTitle"
      width="50%"
      :before-close="handleBeforeClose"
  >
    <el-descriptions
        v-if="dialogDetailsVisible.addRole"
        class="margin-top"
        :column="1"
        size="large"
        border
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Role I.D.
          </div>
        </template>
        <el-input v-model="roleInfo.RoleID" placeholder="input Role I.D." />
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Role Name
          </div>
        </template>
        <el-input v-model="roleInfo.RoleName" placeholder="input Role Name" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Privileges
          </div>
        </template>
        <el-cascader-panel :options="options" :props="props" style="width: 715px"/>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
        v-if="dialogDetailsVisible.edit"
        class="margin-top"
        :column="1"
        size="large"
        border
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Role I.D.
          </div>
        </template>
        {{ roleInfo.RoleID }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Role Name
          </div>
        </template>
        <el-input v-model="roleInfo.RoleName" placeholder="roleInfo.RoleName" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Privileges
          </div>
        </template>
        <el-cascader-panel :options="options" :props="props" style="width: 715px"/>
      </el-descriptions-item>
    </el-descriptions>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="secondClick">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.customStyle{
  cursor: pointer;
}
.cell-item{
  width: 130px;
}
</style>
