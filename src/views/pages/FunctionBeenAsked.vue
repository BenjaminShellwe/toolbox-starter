<script setup lang="ts">
import { reactive } from 'vue'
import { ref } from 'vue'

// 折叠窗口控制
const activeNames = ref(['4'])
const handleChange = (val: string[]) => {
  console.log(val)
}


// 表单控制 do not use same name with ref
const form = reactive({
  part1: {
    AppID: '', ServiceID: '', LTAddress: '', SessionNumber: '', SequenceNumber: ''
  },
  part2: {
    InoutOutputID: '', SWIFTMessageType: '', InputTime: '', MessageInputReference: '',
    OutputDate: '', OutputTime: '', DestinationAddress: '', Priority: '', DeliveryMonitoring: '', ObsolescencePeriod: ''
  },
  part3: {
    Tag103: '', Tag113: '', Tag108: '', Tag119: '',
    Tag423: '', Tag106: '', Tag424: '', Tag111: '',
    Tag121: '', Tag115: '', Tag165: '', Tag433: '', Tag434: ''
  },
  part4: {
    P20 : '', P23B: '', P23E: '', P26T: '', P32A: '',
    P33B: '', P36 : '', P50A: '', P52A: '', P53A: '',
    P54A: '', P55A: '', P56A: '', P57A: '', P59 : '',
    P70 : '', P71A: '', P71G: '', P72 : '', P77B: ''
  },
  part5: {
    CHK: '', TNG: '', PDE: '',
    DLM: '',
    MRF: '',
    PDM: '',
    SYS: '',
  },
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<template>
  <el-row>
    <el-col :span="8">
      <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="基本报头 | BASIC HEADER BLOCK" name="1">
            <div>
              <el-form :model="form.part1" label-width="150px">
                <el-form-item label="AppID">
                  <el-input v-model="form.part1.AppID" />
                </el-form-item>
                <el-form-item label="LTAddress">
                  <el-input v-model="form.part1.LTAddress" />
                </el-form-item>
                <el-form-item label="SequenceNumber">
                  <el-input v-model="form.part1.SequenceNumber" />
                </el-form-item>
                <el-form-item label="ServiceID">
                  <el-input v-model="form.part1.ServiceID" />
                </el-form-item>
                <el-form-item label="SessionNumber">
                  <el-input v-model="form.part1.SessionNumber" />
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-item>
          <el-collapse-item title="应用报头 | APPLICATION HEADER BLOCK" name="2">
            <div>
              <el-form :model="form.part2" label-width="150px">
                <el-form-item label="InoutOutputID">
                  <el-input v-model="form.part2.InoutOutputID" />
                </el-form-item>
                <el-form-item label="SWIFTMessageType">
                  <el-input v-model="form.part2.SWIFTMessageType" />
                </el-form-item>
                <el-form-item label="InputTime">
                  <el-input v-model="form.part2.InputTime" />
                </el-form-item>
                <el-form-item label="MessageInputReference">
                  <el-input v-model="form.part2.MessageInputReference" />
                </el-form-item>
                <el-form-item label="OutputDate">
                  <el-input v-model="form.part2.OutputDate" />
                </el-form-item>
                <el-form-item label="OutputTime">
                  <el-input v-model="form.part2.OutputTime" />
                </el-form-item>
                <el-form-item label="DestinationAddress">
                  <el-input v-model="form.part2.DestinationAddress" />
                </el-form-item>
                <el-form-item label="Priority">
                  <el-input v-model="form.part2.Priority" />
                </el-form-item>
                <el-form-item label="DeliveryMonitoring">
                  <el-input v-model="form.part2.DeliveryMonitoring" />
                </el-form-item>
                <el-form-item label="ObsolescencePeriod">
                  <el-input v-model="form.part2.ObsolescencePeriod" />
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-item>
          <el-collapse-item title="用户报头 | USER HEADER BLOCK" name="3">
            <div>
              <el-form :model="form.part3" label-width="150px">
                <el-form-item label="Tag103">
                  <el-input v-model="form.part3.Tag103" />
                </el-form-item>
                <el-form-item label="Tag113">
                  <el-input v-model="form.part3.Tag113" />
                </el-form-item>
                <el-form-item label="Tag108">
                  <el-input v-model="form.part3.Tag108" />
                </el-form-item>
<!--                <el-form-item label="Tag119">-->
<!--                  <el-input v-model="form.part3.Tag119" />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Tag423">-->
<!--                  <el-input v-model="form.part3.Tag423" />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Tag106">-->
<!--                  <el-input v-model="form.part3.Tag106" />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Tag424">-->
<!--                  <el-input v-model="form.part3.Tag424" />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Tag111">-->
<!--                  <el-input v-model="form.part3.Tag111" />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Tag121">-->
<!--                  <el-input v-model="form.part3.Tag121" />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Tag115">-->
<!--                  <el-input v-model="form.part3.Tag115" />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Tag165">-->
<!--                  <el-input v-model="form.part3.Tag165" />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Tag433">-->
<!--                  <el-input v-model="form.part3.Tag433" />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Tag434">-->
<!--                  <el-input v-model="form.part3.Tag434" />-->
<!--                </el-form-item>-->
              </el-form>
            </div>
          </el-collapse-item>
          <el-collapse-item title="正文 | TEXT BLOCK" name="4">
            <div>
              <el-form :model="form.part4" label-width="150px">
                <el-form-item label="20">
                  <el-input v-model="form.part4.P20" />
                </el-form-item>
                <el-form-item label="23B">
                  <el-input v-model="form.part4.P23B" />
                </el-form-item>
                <el-form-item label="23E">
                  <el-input v-model="form.part4.P23E" />
                </el-form-item>
                <el-form-item label="26T">
                  <el-input v-model="form.part4.P26T" />
                </el-form-item>
                <el-form-item label="32A">
                  <el-input v-model="form.part4.P32A" />
                </el-form-item>
                <el-form-item label="33B">
                  <el-input v-model="form.part4.P33B" />
                </el-form-item>
                <el-form-item label="36">
                  <el-input v-model="form.part4.P36" />
                </el-form-item>
                <el-form-item label="50A">
                  <el-input v-model="form.part4.P50A" />
                </el-form-item>
                <el-form-item label="52A">
                  <el-input v-model="form.part4.P52A" />
                </el-form-item>
                <el-form-item label="59">
                  <el-input v-model="form.part4.P59" />
                </el-form-item>
                <el-form-item label="70">
                  <el-input v-model="form.part4.P70" />
                </el-form-item>
                <el-form-item label="71A">
                  <el-input v-model="form.part4.P71A" />
                </el-form-item>
                <el-form-item label="71G">
                  <el-input v-model="form.part4.P71G" />
                </el-form-item>
                <el-form-item label="72">
                  <el-input v-model="form.part4.P72" />
                </el-form-item>
                <el-form-item label="77B">
                  <el-input v-model="form.part4.P77B" />
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-item>
          <el-collapse-item title="报尾 | TRAILER BLOCK" name="5">
            <div>
              <el-form :model="form.part5" label-width="150px">
                <el-form-item label="CHK">
                  <el-input v-model="form.part5.CHK" />
                </el-form-item>
                <el-form-item label="TNG">
                  <el-input v-model="form.part5.TNG" />
                </el-form-item>
                <el-form-item label="PDE">
                  <el-input v-model="form.part5.PDE" />
                </el-form-item>
                <el-form-item label="DLM">
                  <el-input v-model="form.part5.DLM" />
                </el-form-item>
                <el-form-item label="MRF">
                  <el-input v-model="form.part5.MRF" />
                </el-form-item>
                <el-form-item label="PDM">
                  <el-input v-model="form.part5.PDM" />
                </el-form-item>
                <el-form-item label="SYS">
                  <el-input v-model="form.part5.SYS" />
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-button>
          确认提交
        </el-button>
        <el-button>
          取消
        </el-button>
      </div>
    </el-col>
    <el-col :span="8"><div class="grid-content ep-bg-purple-light" /></el-col>
    <el-col :span="8"><div class="grid-content ep-bg-purple-light" /></el-col>
  </el-row>

</template>

<style scoped>

</style>