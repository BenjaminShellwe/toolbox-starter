<script setup lang="ts">
// 登录界面重构
  import {reactive,ref} from "vue";

  import {FormInstance,ElNotification} from "element-plus";

  import { useRegisterStore } from '~/store'

  import router from "~/router";

  // 仅前端登录校验对话框窗体
  const dialogVisible = ref(false)

  // 登录参数校验
  const loginValueRef = ref<FormInstance>()

  // 登录参数获取
  const loginValue = reactive({
      LoginID: '',
      password: '',
      module: '',
      check: false
  })

  // 登录窗体使用加载中覆盖变量
  const loading = ref(false)

  // 输入框校验规则
  const rules = reactive({
    LoginID: [
      { required: true, message: 'can not be empty', trigger: 'blur' },
      { min: 6, max: 10, message: 'Length: 6 to 10 Characters', trigger: 'blur' },

    ],
    password: [
      { required: true, message: 'can not be empty', trigger: 'blur' },
      { min: 6, max: 12, message: 'Length: 6 to 12 Characters', trigger: 'blur' },
    ]
  })

  // store传入定义入口
  const store = useRegisterStore()

  // 对话框内按钮控制
  const handleClick = async(b: boolean) => {
    if(b){
      await writeToStores(2, loginValue)
      console.log(store)
      await router.push('/UserManagement2')
    }else{
      ElNotification({
        title: 'Login failed!',
        message: 'Login action refused.',
        type: 'warning',
      })
      handleFollowingSteps()
      dialogVisible.value = false
    }
  }

  //登录校验主方法
  const submitLoginForm = async (formEl: FormInstance | undefined) => {
    // 定义默认登录方式
    if(loginValue.module == ''){
      loginValue.module = "mix"
      console.log(loginValue.module)
    }
    // 开启加载窗体
    loading.value = true
    // 检查格式内容
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
        //前端手动验证
        if(loginValue.module != 'mix'){
          dialogVisible.value = true
        }else{
          ElNotification({
            title: 'info',
            message: '后端登录制作中',
            type: 'info',
          })
          handleFollowingSteps()
        }


      } else {
        console.log('error submit!', fields)
        ElNotification({
          title: 'Login failed!',
          message: 'Please check the inputs.',
          type: 'warning',
        })
        handleFollowingSteps()
      }
    })
  }

  // 封装 加载状态覆盖停止，重置登录表格信息
  const handleFollowingSteps = () => {
    loading.value = false
    loginValue.LoginID = ''
    loginValue.password = ''
    loginValue.module = ''
  }

  //后端登录使用store存入登录信息，非cookie
  const writeToStores = async (t: number, val: any) => {
    // 后端校验着传入获取的数据
    if(t == 1){
      store.login(
          val.UserID,
          val.LoginID,
          val.UserName,
          val.UserType
      )
    }else{// 前端则使用预设值
      store.login(
          '2001',
          val.LoginID,
          'defaultName',
          'admin'
      )
      store.filled(
          'all',
          'normal',
          'online'
      )
    }
    console.log(store)
  }

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
            <el-form-item label="用户" prop="LoginID">
              <el-input v-model="loginValue.LoginID" placeholder="setup before login" />
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
              <el-button type="primary" @click="submitLoginForm(loginValueRef)">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-dialog
      v-model="dialogVisible"
      title="Warning"
      width="30%"
      :show-close=false
      align-center
  >
    选择仅前端是调试页面<br>
    将机械验证的过程换成人为的手动<br>
    登录请求为<br>
    用户：{{ loginValue.LoginID }}<br>
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
