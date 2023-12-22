<script setup lang="ts">

//Role页面

import {onMounted, reactive, ref} from "vue";
//级联选择器参数导入
import { options } from "./options";
// 表格表头数据列接口
interface obtainLogged {
  RoleID: string,
  RoleName: string,
}
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

// 弹出框可见性变量
const popoverVisible = ref(false)

// 级联选择器多选控制参数
const props = ref({multiple: true})

//测试函数
const oneClick = (val: any) => {
  // console.log('clicked!')

  centerDialogVisible.value = true;
  (dialogDetailsVisible.value as any)[val] = true;
}
// 此方法为对话框内部控件关闭
const secondClick = (val: any) => {
  centerDialogVisible.value = false;
  for (const valKey in dialogDetailsVisible.value) {
    if((dialogDetailsVisible.value as any)[valKey]){
      (dialogDetailsVisible.value as any)[valKey] = !(dialogDetailsVisible.value as any)[valKey]
    }
  }
  // (dialogDetailsVisible.value as any)[val] = false;
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

// 非生命周期函数请在以上行中声明
// onMounted期间
onMounted(() => {
  const val = {
    RoleID: "102",
    RoleName: "RO02"
  }
  roleInfoTableData.splice(roleInfoTableData.length, 0, val)
})
</script>

<template>
  <el-card>
    <el-card>
      <el-row>
        <el-col :span="1">ActionBar</el-col>
        <el-col :span="4">
          Role Name
          <el-input
              style="width: auto"
              placeholder="Type something"
              size="small"
          />
        </el-col>
        <el-col :span="1">
          <el-button
              size="small"
          >
            Search
          </el-button>
        </el-col>
        <el-col :span="1">
          <el-button
              size="small"
              @click="oneClick('addRole')"
          >
            Add Role
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-divider />
    <el-table ref="table" :data="roleInfoTableData" style="width: 100%">
      <el-table-column prop="RoleID" label="Role I.D." >
      </el-table-column>
      <el-table-column prop="RoleID" label="Role Name">
      </el-table-column>
      <el-table-column fixed="right" label="Edit" width="55">
        <el-icon @click="oneClick('edit')" class="customStyle"><EditPen /></el-icon>
      </el-table-column>
      <el-table-column fixed="right" label="Delete" width="95">
        <el-popover
            :visible="popoverVisible"
            placement="top"
            title="Activate"
            :width="200"
            trigger="click"
        >
          <p>This will delete selected role. Are you sure to delete it?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="small" text @click="popoverVisible = false">cancel</el-button>
            <el-button size="small" type="primary" @click="popoverVisible = false"
            >confirm</el-button
            >
          </div>
          <template #reference>
            <el-icon @click="popoverVisible = true" class="customStyle"><Delete /></el-icon>
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
            Role Name
          </div>
        </template>
        固定数据
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
        固定数据
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            Role Name
          </div>
        </template>
        固定数据
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
