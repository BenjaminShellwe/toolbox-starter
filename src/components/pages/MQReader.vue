<script setup lang="ts">
import { ref } from 'vue'

const input1 = ref('')
const input2 = ref('')

let optionsValue: Record<any, any> ={
  1: '单次监听',
  2: '连续监听',
  3: '持续监听(不建议)',}
const radio1 = ref('1')

const inputs = ref([{ text: '' }])

const centerDialogVisible = ref(false)

let contentAbout = ref('暂未监听')


const addInput = () => {
  if (inputs.value.length  < 5){
    inputs.value.push({ text: '' })
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
      setTimeout(() => {
        contentAbout.value = '暂未监听'
        ElNotification({
          title: 'Info',
          message: '监听队列结束',
          type: 'info',
          duration: 2000,
        })
      }, 3000)

      break
    case '2':
      contentAbout.value = '正在监听'
      setTimeout(() => {
        contentAbout.value = '暂未监听'
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
      ElNotification({
        title: 'Warning',
        message: '持续监听会获取大量数据！',
        type: 'warning',
        duration: 10000,
      })
      setTimeout(() => {
        contentAbout.value = '暂未监听'
      }, 300000)
      break
  }


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
        <div class="card-header">
          <span>MQ返回内容</span>
          <el-button class="button" text>{{contentAbout}}</el-button>
        </div>

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
</style>
