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
        async getQueries() {
            try {
                const response = await axios.get('query');
                this.queries = response.data.queries;
                this.isLoaded = true; 
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    },
    getters: {
        getActiveQueries() {
            return this.queries.filter((q) => q.isActive);
        }
    }
});

