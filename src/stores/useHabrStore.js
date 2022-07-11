import { defineStore } from 'pinia';
import axios from '../utils/axios/habr.js';

export const useHabrStore = defineStore('habrStore', {
    state: () => {
        return {
            managers: [],
            queries: [],
            candidates: []
        }
    },
    actions: {
        async getManagers() {
            try {
                const response = await axios.get('manager');
                this.managers = response.data.managers; 
                console.log('load managers.');  
            } catch (error) {
                console.error('Error: ', error);
            }
        },
        async getQueries() {
            try {
                const response = await axios.get('query');
                this.queries = response.data.queries;   
                console.log('load queries.');  
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    },
});

