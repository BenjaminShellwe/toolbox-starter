<script setup lang="ts">
import { ref } from 'vue'

import {ElMessage, ElMessageBox} from "element-plus";
const input1 = ref('')
const input2 = ref('')

const radio1 = ref('1')

const inputs = ref([{ text: '' }])
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


const handleClose = () => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        // done()
      })
      .catch(() => {
        // catch error
      })
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
            <span>特殊选项</span>
            <el-button text @click="handleClose" class="button" >说明</el-button>
          </div>
        </template>
        <div class="mb-2 flex items-center text-sm">
          <el-radio-group v-model="radio1" class="ml-20">
            <el-radio label="1" size="large">单次监听</el-radio>
            <el-radio label="2" size="large">连续监听</el-radio>
            <el-radio label="3" size="large">持续监听(不建议)</el-radio>
          </el-radio-group>
        </div>
        <el-button-group class="ml-4" size="small">
          <el-button type="primary" >队列获取</el-button>
          <el-button type="primary" >清空队列</el-button>
          <el-button type="primary" >清空窗口</el-button>
        </el-button-group>

      </el-card>

      说明：因为需要数据传输，实际获取数据速度将会和本地运行Java程序有所差异<br>
      获取数据越多速度越慢 但是是以 毫秒 (1/1000 秒) 计算<br>

    </el-col>
    <el-col :span= 8>
      <el-card>
        MQ返回内容
      </el-card>
    </el-col>
  </el-row>

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
</style>
