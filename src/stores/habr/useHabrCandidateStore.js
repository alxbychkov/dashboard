import { defineStore } from 'pinia';
import axios from '../../utils/axios/habr.js';

export const useHabrStore = defineStore('habrCandidateStore', {
    state: () => {
        return {
            isLoaded: false,
            page: null,
            pages: null,
            candidates: []
        }
    },
    actions: {
        async get(page = 1, limit = 10) {
            try {
                const response = await axios.post('candidate/', {page, limit});
        
                this.page = response.data.candidates.page;
                this.pages = response.data.candidates.pages;
                this.candidates = response.data.candidates.values;
                this.isLoaded = true;
            } catch (error) {
                console.error('Error: ', error);
                this.isLoaded = true;
            }
        }
    },
    getters: {}
});

