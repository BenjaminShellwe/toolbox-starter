<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const select = ref('')
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
        <el-input
            v-model="input3"
            placeholder="Please input"
            class="input-with-select"
        >
          <template #prepend>
            <el-select v-model="select" placeholder="Select" style="width: 115px">
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
      <div class="mt-4">
        <el-input
            v-model="input3"
            placeholder="Please input"
            class="input-with-select"
        >
          <template #prepend>
            <el-button :icon="Search" />
          </template>
          <template #append>
            <el-select v-model="select" placeholder="Select" style="width: 115px">
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template>
        </el-input>
      </div>
    </el-col>
    <el-col :span= 8>
      特殊选项<br>
      连续监听<br>
      重复获取<br>
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
</style>
