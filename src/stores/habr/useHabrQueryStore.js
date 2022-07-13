import { defineStore } from 'pinia';
import axios from '../../utils/axios/habr.js';

export const useHabrStore = defineStore('habrQueryStore', {
    state: () => {
        return {
            isLoaded: false,
            queries: []
        }
    },
    actions: {
        async get() {
            try {
                const response = await axios.get('query');
                this.queries = response.data.queries;
                this.isLoaded = true; 
            } catch (error) {
                console.error('Error: ', error);
            }
        },
        async update(value) {
            const updatedQuery = this.queries.find(q => q._id === value._id);
            if (updatedQuery) {
                Object.keys(updatedQuery).forEach(k => {
                    if (updatedQuery[k] !== value[k]) updatedQuery[k] = value[k];
                });
            }
        },
        async delete(id) {
            this.queries = this.queries.filter(q => q._id !== id);
        },
        async add(value) {
            this.queries.push(value);
        }
    },
    getters: {
        getActive() {
            return this.queries.filter((q) => q.isActive);
        }
    }
});

