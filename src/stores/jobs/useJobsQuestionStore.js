import { defineStore } from 'pinia';
import axios from '../../utils/axios/jobs.js';

export const useJobsStore = defineStore('jobsQuestionStore', {
    state: () => {
        return {
            isLoaded: false,
            page: null,
            pages: null,
            questions: []
        }
    },
    actions: {
        async get(page = 1, limit = 10) {
            try {
                const response = await axios.post('question/', {page, limit});

                this.page = response.data.questions.page;
                this.pages = response.data.questions.pages;
                this.questions = response.data.questions.values;
                this.isLoaded = true;
            } catch (error) {
                console.error('Error: ', error);
                this.isLoaded = true;
            }
        },
        async update(value) {
            try {
                const response = await axios.put('question/', value);

                if (response.data.question) {
                    this.get();
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        },
    },
    getters: {}
});

