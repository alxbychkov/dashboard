import { defineStore } from 'pinia';
import axios from '../utils/axios/habr.js';

export const useHabrStore = defineStore('habrStore', {
    state: () => {
        return {
            managers: {
                isLoaded: false,
                values: []
            },
            queries: {
                isLoaded: false,
                values: []
            },
            candidates: {
                isLoaded: false,
                values: []
            }
        }
    },
    actions: {
        async getManagers() {
            try {
                const response = await axios.get('manager');
                this.managers.values = response.data.managers;
                this.managers.isLoaded = true;
                console.log('load managers.');  
            } catch (error) {
                console.error('Error: ', error);
            }
        },
        async updateManager(value) {
            const updatedManager = this.managers.values.find(m => m._id === value._id);
            if (updatedManager) {
                Object.keys(updatedManager).forEach(k => {
                    if (updatedManager[k] !== value[k]) updatedManager[k] = value[k];
                });
            }
        },
        async deleteManager(id) {
            this.managers.values = this.managers.values.filter(m => m._id !== id);
        },
        async addManager(value) {
            this.managers.values.push(value);
        },
        async getQueries() {
            try {
                const response = await axios.get('query');
                this.queries.values = response.data.queries;
                this.queries.isLoaded = true;
                console.log('load queries.');  
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    },
    getters: {
        getActiveManagers() {
            return this.managers.values.filter((m) => m.isActive);
        },

        getActiveQueries() {
            return this.queries.values.filter((q) => q.isActive);
        }
    }
});

