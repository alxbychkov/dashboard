import { defineStore } from 'pinia';
import axios from '../../utils/axios/habr.js';

export const useHabrStore = defineStore('habrManagerStore', {
    state: () => {
        return {
            isLoaded: false,
            managers: []
        }
    },
    actions: {
        async get() {
            try {
                const response = await axios.get('manager');
                this.managers = response.data.managers;
                this.isLoaded = true;
            } catch (error) {
                console.error('Error: ', error);
            }
        },
        async update(value) {
            const updatedManager = this.managers.find(m => m._id === value._id);
            if (updatedManager) {
                Object.keys(updatedManager).forEach(k => {
                    if (updatedManager[k] !== value[k]) updatedManager[k] = value[k];
                });
            }
        },
        async delete(id) {
            this.managers = this.managers.filter(m => m._id !== id);
        },
        async add(value) {
            this.managers.push(value);
        }
    },
    getters: {
        getActive() {
            return this.managers.filter((m) => m.isActive);
        }
    }
});

