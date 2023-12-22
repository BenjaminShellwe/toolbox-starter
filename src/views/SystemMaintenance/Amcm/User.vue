<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";

import { useRegisterStore } from '~/store'

// store传入定义入口
const store = useRegisterStore()

// 表格表头数据列接口
interface obtainLogged {
  UserID: string,
  LoginID: string,
  UserName: string,
  UserType: string,
  Role: string,
  Status: string,
  OnlineStatus: string
}
// 表格表头数据列变量
const userInfoTableData:obtainLogged[] = reactive([])
// 表格ref引用
const table = ref()

// 操作激活冻结注销弹出框内按钮控制
const popoverVisible = ref({
  activate: false,
  suspend: false,
  cancel: false
})
// 操作激活冻结注销单元格内按钮控制
const unitCellVisible = ref({
  activate: true,
  suspend: true,
  cancel: true
})
// 对话框可见性控制变量
const centerDialogVisible = ref(false);
// 对话框内不同显示内容可见性控制变量数组，顺序为详情、修改、授权
const dialogDetailsVisible = ref({
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
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}
// 穿梭框，初始化框内数据
const transferData = ref<Option[]>(generateData())

//测试函数
const oneClick = (val: any) => {
  // console.log('clicked!')

  centerDialogVisible.value = true;
  (dialogDetailsVisible.value as any)[val] = true;
}
// 此方法为对话框内部控件关闭
const secondClick = (val: any) => {
  centerDialogVisible.value = false;
  (dialogDetailsVisible.value as any)[val] = false;
  for (const valKey in dialogDetailsVisible.value) {
    if((dialogDetailsVisible.value as any)[valKey]){
      (dialogDetailsVisible.value as any)[valKey] = !(dialogDetailsVisible.value as any)[valKey]
    }
  }
}

// 分页器 参数控制
const currentPage4 = ref(4)
const pageSize4 = ref(10)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
// 分页器 页面数量处理
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
// 分页器 当前页面处理
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}


//判断账户类型对栏位进行修改
const checkAccountType = () => {
  if(store.UserType == 'manager'){
    authoriseVisible.value = true
  }
}

// 非生命周期函数请在以上行中声明
// onMounted期间
onMounted(() => {
  const val = {
    UserID: "rtgs_manager_02",
    LoginID: "rtgs_manager_02",
    UserName: "RTGS Sys. Admin. B02",
    UserType: "Admin. Staff",
    Role: "Manager",
    Status: "Normal",
    OnlineStatus: "Online"
  }
  userInfoTableData.splice(userInfoTableData.length, 0, val)
  checkAccountType()
})
</script>

<template>
  <el-card>
    <el-card>
      <el-row>
        <el-col :span="1">ActionBar</el-col>
        <el-col :span="5">
          Login I.D.
          <el-input

              style="width: auto"
              placeholder="Type something"
              size="small"
          />
        </el-col>
        <el-col :span="5">
          User Name
          <el-input
              style="width: auto"
              placeholder="Type something"
              size="small"
          />
        </el-col>
        <el-col :span="4">
          <el-button
              size="small"
          >
            Search
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-divider />
    <el-table ref="table" :data="userInfoTableData" style="width: 100%">
      <el-table-column label="Detail" width="70" >
        <el-icon @click="oneClick('detail')" class="customStyle" ><Document /></el-icon>
      </el-table-column>
      <el-table-column prop="UserID" label="User I.D." >
      </el-table-column>
      <el-table-column prop="LoginID" label="User Name">
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
        <el-icon @click="oneClick('edit')" class="customStyle"><EditPen /></el-icon>
      </el-table-column>
      <el-table-column v-if="authoriseVisible" fixed="right" label="Authorise" width="95">
        <el-icon @click="oneClick('authorise')" class="customStyle"><User /></el-icon>
      </el-table-column>
      <el-table-column fixed="right" label="Activate" width="90">
        <el-popover
            :visible="popoverVisible.activate"
            placement="top"
            title="Activate"
            :width="200"
            trigger="click"
        >
          <p>This will activate suspended account. Are you sure to activate it?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="small" text @click="popoverVisible.activate = false">cancel</el-button>
            <el-button size="small" type="primary" @click="popoverVisible.activate = false"
            >confirm</el-button
            >
          </div>
          <template #reference>
            <el-icon v-show="unitCellVisible.activate" @click="popoverVisible.activate = true" class="customStyle"><CircleCheckFilled /></el-icon>
          </template>
        </el-popover>
      </el-table-column>
      <el-table-column fixed="right" label="Suspend" width="85">
        <el-popover
            :visible="popoverVisible.suspend"
            placement="top"
            title="Suspend"
            :width="200"
            trigger="click"
        >
          <p>This will suspend activated account. Are you sure to suspend it?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="small" text @click="popoverVisible.suspend = false">cancel</el-button>
            <el-button size="small" type="primary" @click="popoverVisible.suspend = false"
            >confirm</el-button
            >
          </div>
          <template #reference>
            <el-icon v-show="unitCellVisible.suspend" @click="popoverVisible.suspend = true" class="customStyle"><WarningFilled /></el-icon>
          </template>
        </el-popover>
      </el-table-column>
      <el-table-column fixed="right" label="Cancel" width="80">
        <el-popover
            :visible="popoverVisible.cancel"
            placement="top"
            title="Cancel"
            :width="200"
            trigger="click"
        >
          <p>This will cancel account. Are you sure to do this?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="small" text @click="popoverVisible.cancel = false">cancel</el-button>
            <el-button size="small" type="primary" @click="popoverVisible.cancel = false"
            >confirm</el-button
            >
          </div>
          <template #reference>
            <el-icon v-show="unitCellVisible.cancel" @click="popoverVisible.cancel = true" class="customStyle"><CircleCloseFilled /></el-icon>
          </template>
        </el-popover>
      </el-table-column>

    </el-table>

    <el-divider />
    <div class="demo-pagination-block">
      <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[10, 20, 30, 40]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="40"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </el-card>

  <el-dialog
      v-model="centerDialogVisible"
      title="标题动态绑定"
      width="50%"

  >
    <!--    此对话框（dialog）中含有三个不同表格为详情、修改、授权，dialogDetailsVisible中依次存取-->
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
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            User Name
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Login I.D.
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Bank
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Department
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Status
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Online Status
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Password Expiry Date
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Last Change Time
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Remark
          </div>
        </template>
        固定数据
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
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            User Name
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Login I.D.
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Password
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Confirm Password
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Department
          </div>
        </template>
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Remark
          </div>
        </template>
        固定数据
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
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            User Name
          </div>
        </template>
        固定数据
      </el-descriptions-item>
    </el-descriptions>
    <el-divider />
    <el-transfer v-if="dialogDetailsVisible.authorise" v-model="transferValue" :data="transferData" />

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
</style>
