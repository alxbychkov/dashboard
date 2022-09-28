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
                const response = await axios.get('manager/');
                this.managers = response.data.managers;
                this.isLoaded = true;
            } catch (error) {
                console.error('Error: ', error);
                this.isLoaded = true;
            }
        },
        async update(value) {
            try {
                const response = await axios.put('manager/', value);
                if (response.data.manager) this.get();
            } catch (error) {
                console.error('Error: ', error);
            }
        },
        async delete(value) {
            try {
                const response = await axios.delete('manager/', {data: value});
                if (response.data.deleted.deletedCount) this.get();
            } catch (error) {
                console.error('Error: ', error);
            }
        },
        async add(value) {
            try {
                const response = await axios.post('manager/', value);
                if (response.data.manager) this.get();
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    },
    getters: {
        getActive() {
            return this.managers.filter((m) => m.isActive);
        }
    }
});
