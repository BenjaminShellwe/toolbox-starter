<script setup lang="ts">
import { ref } from 'vue'
import axios from "axios";

const input1 = ref('')
const input2 = ref('')
let emptyVisible = ref(true)
let MQResponse = ref()
let optionsValue: Record<any, any> ={
  1: '单次监听',
  2: '连续监听',
  3: '持续监听(不建议)',}
const radio1 = ref('1')
const inputs = ref([{ text: '' }])
const centerDialogVisible = ref(false)
const loadingVisible = ref(false)
let contentAbout = ref('暂未监听')
let tabIndex = 1
const editableTabsValue = ref('0')
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

const addInput = () => {
  if (inputs.value.length  < 5){
    inputs.value.push({ text: '' })
    addTab(editableTabsValue.value)
  }else{
    ElMessage.error('请不要监听过多队列')
  }

}
const removeInput = (index: number) => {
  inputs.value.splice(index, 1)
}

const singleListen = () => {
  console.log(radio1.value)
  switch (radio1.value) {
    case '1':
      contentAbout.value = '正在监听'
      loadingVisible.value = true
        axios.post('http://localhost:3000/api/fake')
            .then(function (response) {
              setTimeout(() => {
                contentAbout.value = '暂未监听'
                loadingVisible.value = false
                MQResponse = response.data
                emptyVisible.value = false
                ElNotification({
                  title: 'Info',
                  message: '监听队列结束',
                  type: 'info',
                  duration: 2000,
                })
              }, 3000)

              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })

      break
    case '2':
      contentAbout.value = '正在监听'
      loadingVisible.value = true
      setTimeout(() => {
        contentAbout.value = '暂未监听'
        loadingVisible.value = false
        ElNotification({
          title: 'Info',
          message: '监听队列结束',
          type: 'info',
          duration: 2000,
        })
      }, 25000)
      break
    case '3':
      contentAbout.value = '正在监听'
      loadingVisible.value = true
      ElNotification({
        title: 'Warning',
        message: '持续监听会获取大量数据！',
        type: 'warning',
        duration: 10000,
      })
      setTimeout(() => {
        loadingVisible.value = false
        contentAbout.value = '暂未监听'
      }, 300000)
      break
  }
}
const editableTabs = ref([
  {
    title: '其他队列1',
    name: '1',
    content: '此处还需要继续添加控制，属于额外',
  }
])

const addTab = (targetName: string) => {
  const newTabName = `${++tabIndex}`
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  })
  editableTabsValue.value = newTabName
}
const removeTab = (targetName: any) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}
</script>

<template>
  <el-row>
    <el-col :span= 8>
      <div>
        <el-input v-model="input1" placeholder="默认172.168.200.104">
          <template #prepend>MQ服务器IP</template>
        </el-input>
      </div>
      <div class="mt-4">
        <el-input v-model="input1" placeholder="默认1414">
          <template #prepend>MQ服务器端口</template>
        </el-input>
      </div>
      <div class="mt-4">
        <el-input v-model="input1" placeholder="默认RTGSUAT.SWIFT">
          <template #prepend>MQ服务器通道</template>
        </el-input>
      </div>
      <div class="mt-4">
        <el-input v-model="input1" placeholder="默认QMRTGS">
          <template #prepend>MQ服务器管理器</template>
        </el-input>
      </div>
      <div class="mt-4">
        <el-input v-model="input2" placeholder="默认空">
          <template #append>IN QUEUE队列名称</template>
        </el-input>
      </div>
      <div class="mt-4">
        <el-input v-model="input2" placeholder="默认空">
          <template #append>OUT QUEUE队列名称</template>
        </el-input>
      </div>
      <div class="mt-4">

        <el-button @click="addInput">添加其他队列</el-button>
        <div v-for="(input, index) in inputs" :key="index">
          <el-input v-model="input.text" placeholder="默认空" class="mt-4">
            <template #prepend>其他队列名称 {{ index+1 }}</template>
            <template #append>
              <el-button @click="removeInput(index)">删除</el-button>
            </template>
          </el-input>

        </div>
      </div>
    </el-col>
    <el-col :span= 8>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>操作选项</span>
            <el-button text @click="centerDialogVisible = true">说明</el-button>
          </div>
        </template>
        <div class="mb-2 flex items-center text-sm">
          <el-radio-group v-model="radio1" class="ml-20">
            <el-radio label="1" size="large">单次监听</el-radio>
            <el-radio label="2" size="large">连续监听</el-radio>
            <el-radio label="3" size="large">持续监听(不建议)</el-radio>
          </el-radio-group>
        </div>
        <el-button type="primary" size="small" @click="singleListen">队列获取</el-button>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="此操作不能取消"
            placement="bottom"
        >
          <el-button type="warning" size="small">清空队列</el-button>
        </el-tooltip>

        <el-button type="primary" size="small">清空窗口</el-button>

      </el-card>
    </el-col>
    <el-col :span= 8>
      <el-card>
        <el-space wrap
                  fill
                  :fill-ratio="100"
                  :size="10"
        >
          <div class="card-header">
            <span>MQ返回内容</span>
            <el-tooltip
                class="box-item"
                effect="dark"
                content="点击中止"
                placement="bottom"
            >
              <el-button type="primary"
                         v-loading="loadingVisible"
                         :element-loading-spinner="svg"
                         element-loading-svg-view-box="-10, -10, 50, 50"
                         element-loading-background="rgba(122, 122, 122, 0.8)"
              >
                {{contentAbout}}
              </el-button>
            </el-tooltip>
          </div>
          <el-tabs type="border-card">
            <el-tab-pane label="实时结果">
              <el-empty description="Not listening" v-show="emptyVisible" />
              {{MQResponse}}
            </el-tab-pane>
            <el-tab-pane label="查看代码">
              <el-empty description="Not listening" v-show="emptyVisible" />
            </el-tab-pane>
            <el-tab-pane label="队列历史">
              <el-empty description="Not listening" v-show="emptyVisible" />
            </el-tab-pane>
            <el-tab-pane label="队列详情">
              <el-empty description="Not listening" v-show="emptyVisible" />
            </el-tab-pane>
          </el-tabs>
          <el-tabs
              v-model="editableTabsValue"
              type="border-card"
              class="demo-tabs"
              closable
              @tab-remove="removeTab"
          >
            <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
            >
              {{ item.content }}
            </el-tab-pane>
          </el-tabs>
        </el-space>

      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="centerDialogVisible" title="使用前说明" width="30%" center>
      这里控制着监听控制程序的运行方式<br>
      其他内容补充中<br>
      因为需要数据传输，实际获取数据速度将会和本地运行Java程序有所差异<br>
      获取数据越多速度越慢 但是是以 毫秒 (1/1000 秒) 计算<br>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  margin-left: 10px;
  margin-right: 10px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}
.el-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-button-text-color);
  stroke-linecap: round;
}
</style>
