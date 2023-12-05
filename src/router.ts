import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 导入组件
import FakeGPT from '~/components/pages/FakeChatGPT.vue';
import HelloWorld from "~/components/HelloWorld.vue";
import StudyVue from "~/components/pages/StudyVue.vue";
import MQReader from "~/components/pages/MQReader.vue";
import FunctionBeenAsked from "~/components/pages/FunctionBeenAsked.vue";
import SignAndLogin from "~/components/pages/SignAndLogin.vue";

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
    }
    // 添加其他路由规则
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
