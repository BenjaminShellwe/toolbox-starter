// store.ts
import { defineStore } from 'pinia';

// 定义你的全局状态
export const useStore = defineStore({
    id: 'toolBoxStore',
    state: () => ({
        message: '初始消息',
    }),
    actions: {
        updateMessage(newMessage: string) {
            this.message = newMessage;
        },
    },
});
