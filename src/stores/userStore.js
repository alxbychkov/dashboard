import { defineStore } from 'pinia';
import axios from '../utils/axios';

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            user: null,
            isAuth: false,
            isLoading: true
        }
    },
    actions: {
        login(user) {
            this.isAuth = true;
            this.user = user;
            this.isLoading = false;
        },
        logout() {
          this.isLoading = true;  
          this.isAuth = false;
          this.user = null;
        },
        async auth() {
            try {
                const response = await axios.get('me/');
                if (response.data.user && response.data.user.id) {
                    this.isAuth = true;
                    this.user = response.data.user;
                }   
            } catch (error) {
                console.error('Error: ', error);
            } finally {
                this.isLoading = false;
            }
        }
    },
});

