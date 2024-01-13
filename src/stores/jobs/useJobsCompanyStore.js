import { defineStore } from 'pinia';
import axios from '../../utils/axios/jobs.js';

export const useJobsStore = defineStore('jobsCompanyStore', {
    state: () => {
        return {
            isLoaded: false,
            page: null,
            pages: null,
            companies: []
        }
    },
    actions: {
        async get(page = 1, limit = 10) {
            try {
                const response = await axios.post('company/', {page, limit});

                this.page = response.data.companies.page;
                this.pages = response.data.companies.pages;
                this.companies = response.data.companies.values;
                this.isLoaded = true;
            } catch (error) {
                console.error('Error: ', error);
                this.isLoaded = true;
            }
        }
    },
    getters: {}
});

