import { defineStore } from 'pinia';
import axios from '../../utils/axios/jobs.js';

export const useJobsStore = defineStore('jobsVacancyStore', {
    state: () => {
        return {
            isLoaded: false,
            page: null,
            pages: null,
            vacancies: []
        }
    },
    actions: {
        async get(page = 1, limit = 10, status = '') {
            try {
                const response = await axios.post('vacancy/', {page, limit, status});

                this.page = response.data.vacancies.page;
                this.pages = response.data.vacancies.pages;
                this.vacancies = response.data.vacancies.values;
                this.isLoaded = true;
            } catch (error) {
                console.error('Error: ', error);
                this.isLoaded = true;
            }
        },
        async apply(value) {
            try {
                const response = await axios.put('vacancy/', value);

                return response?.data;
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    },
    getters: {}
});

