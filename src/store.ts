// store.ts
import { defineStore } from 'pinia';

export const useRegisterStore = defineStore({
    id: 'register', // 唯一的 store id

    state: () => ({
        UserID: '',
        LoginID: '',
        UserName: '',
        UserType: '',
        Role: '',
        Status: '',
        OnlineStatus: ''
    }),

    actions: {
        // 登录方法，用于设置用户信息
        login(UserID: string,
              LoginID: string,
              UserName: string,
              UserType: string,
        ) {
            this.UserID = UserID;
            this.LoginID = LoginID;
            this.UserName = UserName;
            this.UserType = UserType;
        },

        filled(
            Role: string,
            Status: string,
            OnlineStatus: string
        ){
            this.Role = Role;
            this.Status = Status;
            this.OnlineStatus = OnlineStatus;
        },

        // 登出方法，用于清除用户信息
        logout() {
            this.UserID = '';
            this.LoginID = '';
            this.UserName = '';
            this.UserType = '';
            this.Role = '';
            this.Status = '';
            this.OnlineStatus = '';
        }
    }
});
