<script setup lang="ts">

import {onMounted, reactive, ref, computed} from "vue";

import { useRegisterStore } from '~/store'
import axios from "axios";
import {AddLocation} from "@element-plus/icons-vue";
import {ElNotification} from "element-plus";
import router from "~/router";

// store传入定义入口
const store = useRegisterStore()
// 中间参数
const temp: any = ref()
// 授权展示
const authoriseShows = ref({
  UserID:'',
  UserName:''
})
// 表格表头数据列接口
interface obtainLogged {
  UserID: string,
  LoginID: string,
  UserName: string,
  UserType: string,
  Role: string,
  Status: string,
  OnlineStatus: string,

  GROUP_ID: string,
  DEPART_NAME: string,
  USER_PASS: string,
  USERPWD_LAPSE: string,
  SETPWD_LAPSE: string,
  MODIFY_TIME: string,

  REMARK: string,
  OLD_PASSWORDS: string,

  ROLE_ID: string,
  ROLE_TYPE: string,
  ROLE_NAME: string
}
// 表格表头数据列变量
const userInfoTableData:obtainLogged[] = reactive([])

// 分页器控制表格展示数据
const infoTableData = ref([])

// 表格ref引用
const table = ref()

// 对话框可见性控制变量
const centerDialogVisible = ref(false);
// 对话框内不同显示内容可见性控制变量数组，顺序为增加、详情、修改、授权
const dialogDetailsVisible = ref({
  add: false,
  detail: false,
  edit: false,
  authorise: false
})
//授权界面是否可见变量
const authoriseVisible = ref(false)
// 对话框授权页面中含有一个穿梭框，初始化数据
const transferValue = ref([])
// 穿梭框，框内数据接口定义
interface Option {
  key: number
  label: string
  disabled: boolean
}
// 生成穿梭框内数据
const generateData = () => {
  const data: Option[] = []
  axios.post('api/allRole', {

  }).then(function (response){
    // console.log(response.data)
    for (let i = 1; i <= response.data.length; i++) {
      data.push({
        key: i,
        label: response.data[i].role_ID,
        disabled: response.data[i].role_TYPE == '0',
      })
    }
  }).catch(function (response) {
    console.log(response)
  })

  return data
}
// 穿梭框，初始化框内数据
const transferData = ref<Option[]>(generateData())

// 对话框标题以及对话框提交信息
const DialogTitle = ref('')

// 添加用户信息控制
const addUser = ref({
  UserID: '',
  UserName: '',
  USER_PASS: '',
  DEPART_NAME: '',
  REMARK: ''
})
// 搜索变量
const search2 = ref('')

const filterTableData = computed(() =>
    infoTableData.value.filter(
        (data) =>
            !search2.value ||
            data.UserName.toLowerCase().includes(search2.value.toLowerCase())
    )
)

//授权窗口
const authoriseClick = (row: any) => {
  console.log(row)
  centerDialogVisible.value = true;
  dialogDetailsVisible.value.authorise = true;
  DialogTitle.value = 'Authorise';
  temp.value = row
  authoriseShows.value.UserID = temp.value.UserID
  authoriseShows.value.UserName = temp.value.UserName
}
// 控制单元格内图标显示以及写入数据库控制
const unitCellClick = (row: any, val: string) => {
  // console.log(val)
  // popoverVisible.value.activate = true
  row[val] = true
}
// 状态变更嵌套弹出框的按钮控制
const popoverClick = (row: any, val: string, b: boolean) => {
  row[val] = false
  if(b){
    switch(val){
      case 'popoverActivate':
        // console.log('执行0')
        axios.post('/api/alterState',{
          user_ID: row.UserID,
          user_STATE: "0"
        }).then(function(response){
          // console.log(response)
          row.activate = false
          row.suspend = true
          row.cancel = true
        }).catch(function(response){
          console.log(response)
        })
        break;
      case 'popoverSuspend':
        // console.log('执行2')
        axios.post('/api/alterState',{
          user_ID: row.UserID,
          user_STATE: "2"
        }).then(function(response){
          // console.log(response)
          row.activate = true
          row.suspend = false
          row.cancel = true
        }).catch(function(response){
          console.log(response)
        })
        break;
      case 'popoverCancel':
        // console.log('执行4')
        axios.post('/api/alterState',{
          user_ID: row.UserID,
          user_STATE: "4"
        }).then(function(response){
          // console.log(response)
          row.activate = false
          row.suspend = false
          row.cancel = false
        }).catch(function(response){
          console.log(response)
        })
        break;
      default:
        console.log(val)
        break;
    }
  }
}


// 显示添加用户界面
const addClick = (val: string) => {
  DialogTitle.value = 'Add User'
  centerDialogVisible.value = true;
  (dialogDetailsVisible.value as any)[val] = true;
}
// 查看详情方法
const examineClick = (val: string, line: any) => {
  DialogTitle.value = 'Examine details'
  centerDialogVisible.value = true;
  (dialogDetailsVisible.value as any)[val] = true;
  // console.log('Clicked row data:', line);
  detailEdit.value.UserID = line.UserID
  detailEdit.value.UserName = line.UserName
  detailEdit.value.LoginID = line.LoginID
  detailEdit.value.GROUP_ID = line.GROUP_ID
  detailEdit.value.DEPART_NAME = line.DEPART_NAME
  detailEdit.value.Status = line.Status
  detailEdit.value.OnlineStatus = line.OnlineStatus
  detailEdit.value.MODIFY_TIME = line.MODIFY_TIME
  detailEdit.value.REMARK = line.REMARK
  detailEdit.value.USERPWD_LAPSE = line.USERPWD_LAPSE
}
//编辑表格方法
const editClick = (val: string, line: any) => {
  DialogTitle.value = 'Edit details'
  centerDialogVisible.value = true;
  (dialogDetailsVisible.value as any)[val] = true;
  detailEdit.value = {
    DEPART_NAME: line.DEPART_NAME,
    GROUP_ID: line.GROUP_ID,
    LoginID: line.LoginID,
    MODIFY_TIME: line.MODIFY_TIME,
    OnlineStatus: line.OnlineStatus,
    REMARK: line.REMARK,
    Status: line.Status,
    USERPWD_LAPSE: line.USERPWD_LAPSE,
    UserID: line.UserID,
    UserName: line.UserName,
    CreatePassword: '',
    ConfirmPassword: ''
  }

}

// 分页器 参数控制
const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)

// 详情以及编辑变量方法
const detailEdit = ref({
  UserID: '',
  UserName: '',
  LoginID: '',

  GROUP_ID: '',
  DEPART_NAME: '',
  Status: '',
  OnlineStatus: '',
  MODIFY_TIME: '',
  USERPWD_LAPSE: '',
  REMARK: '',
  CreatePassword: '',
  ConfirmPassword: ''
})

// 提交内容
const handleConfirmClick = (val: string) => {
  console.log(val)
  // console.log(addUser)
  // handleBeforeClose('')
  if(val == "Add User"){
    axios.post('/api/create',{
          user_LOGIN_ID: addUser.value.UserID,
          user_NAME: addUser.value.UserName,
          user_PASS: addUser.value.USER_PASS,
          depart_NAME: addUser.value.DEPART_NAME,
          remark: addUser.value.REMARK
        }
    )
        .then(function (response) {
          console.log(response);
          if(response.data != "Success!"){
            ElMessage.error(response.data)
          }else{
            ElMessage({
              message: response.data,
              type: 'success',
            })
          }
          addUser.value = {DEPART_NAME: "", REMARK: "", USER_PASS: "", UserID: "", UserName: ""}
          handleBeforeClose('')
          getAllUsersInfo()
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  if(val == "Examine details"){
    handleBeforeClose('')
  }
  if(val == "Edit details"){
    if(detailEdit.value.LoginID =='' || detailEdit.value.UserName == ''){
      ElMessage.error('Please ensure that User Name and Login I.D. two options have been entered.')
    }
    else if(detailEdit.value.ConfirmPassword != detailEdit.value.CreatePassword ||
        detailEdit.value.ConfirmPassword =='' ||
        detailEdit.value.CreatePassword == ''
    ){
      ElMessage.error('Please ensure that two passwords have been entered and match.')
      detailEdit.value.ConfirmPassword = ''
      detailEdit.value.CreatePassword = ''
    }else{
      axios.post('/api/alter',{
        user_ID: detailEdit.value.UserID,
        user_LOGIN_ID: detailEdit.value.LoginID,
        user_NAME: detailEdit.value.UserName,
        depart_NAME: detailEdit.value.DEPART_NAME,
        user_PASS: detailEdit.value.CreatePassword,
        remark: detailEdit.value.REMARK
      }).then(function (response) {
        if(response.data != 'Success!'){
          ElMessage.error(response.data)
        }else{
          ElMessage({
            message: response.data,
            type: 'success',
          })
        }
        handleBeforeClose('')
        getAllUsersInfo()
      }).catch(function (response) {
        console.log(response)
      })
    }
  }
  if(val == "Authorise"){
    // console.log(temp)

    axios.post('/api/alterState',{
      user_ID: temp.value.UserID,
      user_STATE: "0"
    }).then(function(response){
      // console.log(response)
      temp.activate = false
      temp.suspend = true
      temp.cancel = true
    }).catch(function(response){
      console.log(response)
    })
    handleBeforeClose('')
    getAllUsersInfo()
    temp.value = {}
  }
}

// 此方法为对话框内部控件关闭
const handleBeforeClose = (val: any) => {
  // console.log(val)
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


// 分页器 页面数量处理
const handleSizeChange = (val: number) => {
  infoTableData.value = []
  for (const Key in userInfoTableData.slice(0, val - 1)) {
    // console.log(userInfoTableData.slice(0, val)[Key])
    let obtainLogged1: obtainLogged = userInfoTableData[Key];
    infoTableData.value.push(obtainLogged1)
    // console.log(userInfoTableData.slice(0, val)[Key])
  }
  // console.log(`${val} items per page`)

}
// 分页器 当前页面处理
const handleCurrentChange = (val: number) => {
  infoTableData.value = []
  // console.log(`current page: ${val}`)
  let start = pageSize.value * val - pageSize.value
  let end = pageSize.value * val
  for (const Key in userInfoTableData.slice(start, end)) {
    let obtainLogged2: obtainLogged = userInfoTableData.slice(start, end)[Key] as obtainLogged;
    infoTableData.value.push(obtainLogged2)
  }
  // console.log(infoTableData)
  // console.log("---------------")
  // console.log(userInfoTableData)
}


//判断账户类型对栏位进行修改
const checkAccountType = () => {
  if(store.UserType == '2'){
    authoriseVisible.value = true
  }
}

//获取用户表格数据
const getAllUsersInfo = () => {
  axios.post('/api/all', {
  })
      .then(function (response) {
        // console.log(response.data);
        userInfoTableData.length = 0
        for (let key in response.data) {
          if (Object.prototype.hasOwnProperty.call(response.data, key)) {
            let val = {
              UserID: response.data[key].user_ID,
              LoginID: response.data[key].user_LOGIN_ID,
              UserName: response.data[key].user_NAME,
              UserType: response.data[key].user_TYPE,
              Role: response.data[key].role_NAME,
              Status: response.data[key].user_STATE,
              OnlineStatus: response.data[key].online_STATE,

              GROUP_ID: response.data[key].group_ID,
              DEPART_NAME: response.data[key].depart_NAME,
              USER_PASS: response.data[key].user_PASS,
              USERPWD_LAPSE: response.data[key].userpwd_LAPSE,
              MODIFY_TIME: response.data[key].modify_TIME,

              REMARK: response.data[key].remark,
              OLD_PASSWORDS: response.data[key].old_PASSWORDS,

              ROLE_ID: response.data[key].role_ID,
              ROLE_TYPE: response.data[key].role_TYPE,

              authorise: true,
              activate: false,
              suspend:  false,
              cancel: false,

              popoverActivate: false,
              popoverSuspend:  false,
              popoverCancel: false
            }
            if(Number(val.UserType) != 0){
              switch(Number(val.Status)){
                case 0:
                  // console.log('0')
                  val.activate = false
                  val.suspend = true
                  val.cancel = true
                  val.authorise = true
                  break;
                case 1:
                  // console.log('1')
                  val.activate = false
                  val.suspend = false
                  val.cancel = true
                  break;
                case 2:
                  // console.log('2')
                  val.activate = true
                  val.suspend = false
                  val.cancel = true
                  break;
                case 3:
                  // console.log('3')
                  val.activate = false
                  val.suspend = false
                  val.cancel = false
                  break;
                case 4:
                  // console.log('4')
                  val.activate = false
                  val.suspend = false
                  val.cancel = false
                  val.authorise = false
                  break;
                default:
                  console.log('skip')
                  break;
              }
            }else{
              val.activate = false
              val.suspend = false
              val.cancel = false
              val.authorise = false
            }
            userInfoTableData.splice(userInfoTableData.length, 0, val);
          }
          // 默认每次获取到数据后展示10条数据
          handleSizeChange(10)
          // 默认每次获取到数据后展示从第一页开始
          currentPage.value = 1
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

// 非生命周期函数请在以上行中声明
// onMounted期间
onMounted(async () => {
  getAllUsersInfo()
  // const val = {
  //   UserID: "rtgs_manager_02",
  //   LoginID: "rtgs_manager_02",
  //   UserName: "RTGS Sys. Admin. B02",
  //   UserType: "Admin. Staff",
  //   Role: "Manager",
  //   Status: "Normal",
  //   OnlineStatus: "Online"
  // }

  checkAccountType()

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
          User Name
          <el-input
              v-model="search2"
              style="width: auto"
              placeholder="Type something"
              size="small"
          />
        </el-col>
        <el-col :span="4">
          <el-button
              size="small"
              @click="addClick('add')"
          >
            Add
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-divider />
    <el-table ref="table" :data="filterTableData" max-height="535" style="width: 100%">
      <el-table-column label="Detail" width="70" >
        <template #default="{ row }">
          <el-icon @click="examineClick('detail', row)" class="customStyle" ><Document /></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="UserID" label="User I.D." >
        <template #default="{ row }">
          <span>AMCM{{ row.UserID }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="LoginID" label="Login I.D.">
      </el-table-column>
      <el-table-column prop="UserName" label="User Name">
      </el-table-column>
      <el-table-column prop="UserType" label="User Type">
      </el-table-column>
      <el-table-column prop="Role" label="Role" width="400">
      </el-table-column>
      <el-table-column prop="Status" label="Status">
      </el-table-column>
      <el-table-column prop="OnlineStatus" label="Online Status">
      </el-table-column>
      <el-table-column fixed="right" label="Edit" width="55">
        <template #default="{ row }">
          <el-icon @click="editClick('edit', row)" class="customStyle"><EditPen /></el-icon>
        </template>
      </el-table-column>
      <el-table-column v-if="authoriseVisible" fixed="right" label="Authorise" width="95">
        <template #default="{ row }">
          <el-icon v-show="row.authorise" @click="authoriseClick(row)" class="customStyle"><User /></el-icon>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Activate" width="90">
        <template #default="{ row }">
          <el-popover
              :visible="row.popoverActivate"
              placement="top"
              title="Activate"
              :width="200"
              trigger="click"
          >
            <p>This will activate suspended account. Are you sure to activate it?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="small" text @click="popoverClick(row, 'popoverActivate', false)">cancel</el-button>
              <el-button size="small" type="primary" @click="popoverClick(row, 'popoverActivate', true)"
              >confirm</el-button
              >
            </div>
            <template #reference>
              <el-icon v-show="row.activate" @click="unitCellClick(row, 'popoverActivate')" class="customStyle"><CircleCheckFilled /></el-icon>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Suspend" width="85">
        <template #default="{ row }">
          <el-popover
              :visible="row.popoverSuspend"
              placement="top"
              title="Suspend"
              :width="200"
              trigger="click"
          >
            <p>This will suspend activated account. Are you sure to suspend it?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="small" text @click="popoverClick(row, 'popoverSuspend', false)">cancel</el-button>
              <el-button size="small" type="primary" @click="popoverClick(row, 'popoverSuspend', true)"
              >confirm</el-button
              >
            </div>
            <template #reference>
              <el-icon v-show="row.suspend" @click="unitCellClick(row, 'popoverSuspend')" class="customStyle"><WarningFilled /></el-icon>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Cancel" width="80">
        <template #default="{ row }">
          <el-popover
              :visible="row.popoverCancel"
              placement="top"
              title="Cancel"
              :width="200"
              trigger="click"
          >
            <p>This will cancel account. Are you sure to do this?</p>
            <div style="text-align: right; margin: 0">
              <el-button size="small" text @click="popoverClick(row, 'popoverCancel', false)">cancel</el-button>
              <el-button size="small" type="primary" @click="popoverClick(row, 'popoverCancel', true)"
              >confirm</el-button
              >
            </div>
            <template #reference>
              <el-icon v-show="row.cancel" @click="unitCellClick(row, 'popoverCancel')" class="customStyle"><CircleCloseFilled /></el-icon>
            </template>
          </el-popover>
        </template>
      </el-table-column>

    </el-table>

    <el-divider />
    <div class="demo-pagination-block">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userInfoTableData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </el-card>

  <el-dialog
      v-model="centerDialogVisible"
      :title="DialogTitle"
      width="50%"
      :before-close="handleBeforeClose"

  >
    <!--    此对话框（dialog）中含有三个不同表格为详情、修改、授权，dialogDetailsVisible中依次存取-->
    <el-descriptions
        v-if="dialogDetailsVisible.add"
        class="margin-top"
        :column="1"
        size="large"
        border
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Login I.D.
          </div>
        </template>
        <el-input v-model="addUser.UserID" placeholder="设置对应的登录账户名"/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            User Name
          </div>
        </template>
        <el-input v-model="addUser.UserName" placeholder="设置对应的登录账户用户名"/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Password
          </div>
        </template>
        <el-input v-model="addUser.USER_PASS" placeholder="设置对应的登录账户密码"/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Department
          </div>
        </template>
        <el-input v-model="addUser.DEPART_NAME" placeholder="设置账户的管理部门"/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Remark
          </div>
        </template>
        <el-input v-model="addUser.REMARK" placeholder="备注信息"/>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
        v-if="dialogDetailsVisible.detail"
        class="margin-top"
        :column="1"
        size="large"
        border
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            User I.D.
          </div>
        </template>
        {{ detailEdit.UserID }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            User Name
          </div>
        </template>
        {{ detailEdit.UserName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Login I.D.
          </div>
        </template>
        {{ detailEdit.LoginID }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Bank
          </div>
        </template>
        {{ detailEdit.GROUP_ID }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Department
          </div>
        </template>
        {{ detailEdit.DEPART_NAME }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Status
          </div>
        </template>
        {{ detailEdit.Status }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Online Status
          </div>
        </template>
        {{ detailEdit.OnlineStatus }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Password Expiry Date
          </div>
        </template>
        {{ detailEdit.USERPWD_LAPSE }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Last Change Time
          </div>
        </template>
        {{ detailEdit.MODIFY_TIME }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Remark
          </div>
        </template>
        {{ detailEdit.REMARK }}
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
            User I.D.
          </div>
        </template>
        <el-input v-model="detailEdit.UserID" placeholder="detailEdit.UserID" disabled/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            User Name
          </div>
        </template>
        <el-input v-model="detailEdit.UserName" placeholder="detailEdit.UserName" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Login I.D.
          </div>
        </template>
        <el-input v-model="detailEdit.LoginID" placeholder="detailEdit.LoginID" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Password
          </div>
        </template>
        <el-input v-model="detailEdit.CreatePassword" placeholder="password changing" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Confirm Password
          </div>
        </template>
        <el-input v-model="detailEdit.ConfirmPassword" placeholder="Confirm changing" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Department
          </div>
        </template>
        <el-input v-model="detailEdit.DEPART_NAME" placeholder="detailEdit.DEPART_NAME" />
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Remark
          </div>
        </template>
        <el-input v-model="detailEdit.REMARK" placeholder="detailEdit.REMARK" />
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
        v-if="dialogDetailsVisible.authorise"
        class="margin-top"
        :column="1"
        size="large"
        border
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            User I.D.
          </div>
        </template>
        {{ authoriseShows.UserID }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            User Name
          </div>
        </template>
        {{ authoriseShows.UserName }}
      </el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <el-transfer
        v-if="dialogDetailsVisible.authorise"
        v-model="transferValue"
        :titles="['Source', 'Target']"
        :data="transferData" />

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleConfirmClick(DialogTitle)">
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
</style>
