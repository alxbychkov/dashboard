import { defineStore } from 'pinia';
import axios from '../../utils/axios/jobs.js';

export const useJobsStore = defineStore('jobsRecepientStore', {
    state: () => {
        return {
            isLoaded: false,
            page: null,
            pages: null,
            recepients: []
        }
    },
    actions: {
        async get(page = 1, limit = 10) {
            try {
                const response = await axios.post('recepient/', {page, limit});

                this.page = response.data.recepients.page;
                this.pages = response.data.recepients.pages;
                this.recepients = response.data.recepients.values;
                this.isLoaded = true;
            } catch (error) {
                console.error('Error: ', error);
                this.isLoaded = true;
            }
        },
        async update(value) {
            try {
                const response = await axios.put('recepient/', value);

                // if (response.data.recepient) {
                //     this.get();
                // }
            } catch (error) {
                console.error('Error: ', error);
            }
        },
    },
    getters: {}
});

