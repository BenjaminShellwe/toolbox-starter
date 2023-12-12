// store.ts
import { defineStore } from 'pinia';

export const useRegisterStore = defineStore({
    id: 'register', // 唯一的 store id

    state: () => ({
        id: '',
        username: '',
        role: '',
        fullname: '',
        gender: '',
        loginTime: '',
        password: '',
        phone: ''
    }),

    actions: {
        // 登录方法，用于设置用户信息
        login(id: string, username: string, fullname: string, password: string, gender: string, loginTime: string, phone: string, role: string) {
            this.id = id;
            this.username = username;
            this.fullname = fullname;
            this.password = password;
            this.gender = gender;
            this.loginTime = loginTime;
            this.phone = phone;
            this.role = role;
        },

        // 登出方法，用于清除用户信息
        logout() {
            this.id = '';
            this.username = '';
            this.role = '';
            this.fullname = '';
            this.gender = '';
            this.loginTime = '';
            this.password = '';
            this.phone = '';
        }
    }
});