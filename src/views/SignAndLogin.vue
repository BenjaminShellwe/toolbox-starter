<script setup lang="ts">

  import {reactive,ref} from "vue";

  import {FormInstance,ElNotification} from "element-plus";

  import { useRegisterStore } from '~/store'

  import axios from "axios";
  import router from "~/router";


  let resolveFunc = null as (() => void) | null // Promise 的 resolve 函数

  const store = useRegisterStore()

  const showValue = ref(false)
  const loginValueRef = ref<FormInstance>()
  const loading = ref(false)
  const loginValue = reactive({
      username: '',
      password: '',
      module: '',
      check: false
  })

  // 输入框校验规则
  const rules = reactive({
    username: [
      { required: true, message: 'can not be empty', trigger: 'blur' },
      { min: 6, max: 10, message: 'Length: 6 to 10 Characters', trigger: 'blur' },

    ],
    password: [
      { required: true, message: 'can not be empty', trigger: 'blur' },
      { min: 6, max: 12, message: 'Length: 6 to 12 Characters', trigger: 'blur' },
    ]
  })

  //登录校验主方法
  const submitForm = async (formEl: FormInstance | undefined) => {
    // 默认登录方式
    if(loginValue.module == ''){
      loginValue.module = "mix"
      console.log(loginValue.module)
    }
    loading.value = true
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
        //走前端在这里验证
        if(loginValue.module != 'mix'){
          //模拟后端校验，但是是手动确定
          staticValue(true)
          watching()
          // cleanup()
          // loading.value = false
        }else{
            ElNotification({
              title: 'Info',
              message: '后端正在进行中，可能发生本地机器性能有限，或远端服务器网络延迟',
              type: 'warning',
            })

          axios.post('/api/login', {
            username: loginValue.username,
            password: loginValue.password
          })
          .then(function (response) {
            // console.log(response);
            openSuccess("back react with Java controlling MySQL")
            cleanup()
            loading.value = false
            writeToStores(response.data)
          })
          .catch(function (error) {
            console.log(error);
            ElNotification({
              title: 'Error',
              message: error,
              type: 'error',
            })
            loading.value = false
          });
        }


      } else {
        console.log('error submit!', fields)
        openError()
        cleanup()
        loading.value = false
        staticValue(false)
      }
    })
  }
  const staticValue = (b: boolean) => {
    showValue.value = b
  }
  const handleClick = (b: boolean) => {
    // 设置变量为 true，并执行 resolve 函数
    if (b) {
      resolveFunc?.()
      cleanup()
      loading.value = false
      staticValue(false)
    }else{
      openError()
      cleanup()
      loading.value = false
      staticValue(false)
    }
  }

  const waitForButtonClick = (): Promise<void> => {
    return new Promise((resolve) => {
      // 将 resolve 函数保存到组件实例中
      resolveFunc = resolve;
    });
  }
  const executeAfterButtonClick = async () =>{
    await waitForButtonClick(); // 等待按钮点击事件
    // 按钮点击后执行的操作
    openSuccess("front end by Vue.js only")
    cleanup()
    loading.value = false

    // store.login(sendUserInfo.id, sendUserInfo.username, sendUserInfo.role)
    console.log(store)
    await router.push('/UserManagement2')
  }

  // 登录成功后保存部分信息
  const writeToStores = async (val: any) => {
    // 后端忘记上传了，用预设的数据
    // store.login(
    //     val.id,
    //     val.username,
    //     val.fullname,
    //     val.password,
    //     val.gender,
    //     val.loginTime,
    //     val.phone,
    //     val.role
    // )

    // store.login(
    //     "120701",
    //     "shellwe",
    //     "Benjaminshellwe",
    //     "shellwe",
    //     "1",
    //     "val.loginTime",
    //     "123123123123",
    //     "00"
    // )
    console.log(store)
    await router.push('/UserManagement')
  }
  //


  //监听按钮
  const watching = async () => {
    await executeAfterButtonClick()
  }
  const cleanup = () =>{
    loginValue.username = ''
    loginValue.password = ''
    loginValue.module = ''
    loginValue.check = false
  }

  const openSuccess = (val: string) => {
    ElNotification({
      title: 'Success',
      message: val +' login success',
      type: 'success',
    })
  }
  const openError = () => {
    ElNotification({
      title: 'Error',
      message: 'I know this looks suck, but login failed',
      type: 'error',
    })
  }
  //走java验证的代码
</script>

<template>
  <el-row>
    <el-col
            class="centered-card">
      <el-card
          style="height: 300px;width: 300px;"
      >
        <div class="login-form" v-loading="loading">
          <el-form :model="loginValue" :rules="rules" ref="loginValueRef" size="small">
            <el-form-item label="用户" prop="username">
              <el-input v-model="loginValue.username" placeholder="setup before login" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginValue.password" placeholder="setup before login"></el-input>
            </el-form-item>
            <el-form-item label="交互方式" prop="type">
              <el-select v-model="loginValue.module" placeholder="默认前后端交互">
                <el-option label="仅前端Vue.js无数据库" value="pure" ></el-option>
                <el-option label="走交互Java含数据库" value="mix"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm(loginValueRef)">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-dialog
      v-model="showValue"
      title="Warning"
      width="30%"
      :show-close=false
      align-center
  >
    选择仅前端是调试页面<br>
    将机械验证的过程换成人为的手动<br>
    登录请求为<br>
    用户：{{ loginValue.username }}<br>
    密码：{{ loginValue.password }}<br>
    模式：{{ loginValue.module }}<br>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClick(false)">Cancel</el-button>
        <el-button type="primary" @click="handleClick(true)">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.centered-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}
</style>
