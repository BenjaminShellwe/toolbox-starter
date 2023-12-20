
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 导入组件
import FakeGPT from '~/views/pages/FakeChatGPT.vue';
import HelloWorld from "~/views/HelloWorld.vue";
import StudyVue from "~/views/pages/StudyVue.vue";
import MQReader from "~/views/pages/MQReader.vue";
import FunctionBeenAsked from "~/views/pages/FunctionBeenAsked.vue";
import SignAndLogin from "~/views/SignAndLogin.vue";
import UserManagement from "~/views/SystemMaintenance/UserManagement.vue";

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: HelloWorld },
    { path: '/fakeGPT', component: FakeGPT,
        meta: { transition: 'slide-left' },
    },
    { path: '/studyVue', component: StudyVue,
        meta: { transition: 'slide-left' },
    },
    { path: '/mqReader', component: MQReader,
        meta: { transition: 'slide-left' },
    },
    { path: '/rtgsFunction', component: FunctionBeenAsked,
        meta: { transition: 'slide-left' },
    },
    { path: '/register', component: SignAndLogin,
        meta: { transition: 'slide-left' },
    },
    { path: '/UserManagement', component: UserManagement,
        meta: { transition: 'slide-left' },
    }
    // 添加其他路由规则
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
