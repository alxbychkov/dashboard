import { defineStore } from 'pinia';
import axios from '../../utils/axios/habr.js';

export const useProccessStore = defineStore('serverProccessStore', {
    state: () => {
        return {
            isLoaded: false,
            list: []
        }
    },
    actions: {
        async get() {
            try {
                const response = await axios.post('pm2/list');
                this.list = response.data.list;
                this.isLoaded = true;
            } catch (error) {
                console.error('Error: ', error);
                this.isLoaded = true;
            }
        },
        async refresh() {
            this.isLoaded = false;
            try {
                const response = await axios.post('pm2/list');
                this.list = response.data.list;
            } catch (error) {
                console.error('Error: ', error);
            } finally {
                this.isLoaded = true;
            }
        }
    }
});