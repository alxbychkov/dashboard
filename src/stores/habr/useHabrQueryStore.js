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
            } catch (error) {
                console.error('Error: ', error);
            } finally {
                this.isLoaded = true;
            }
        },
        async update(value) {
            try {
                const response = await axios.put('query', value);
                if (response.data.query) this.get();
            } catch (error) {
                console.error('Error: ', error);
            }
        },
        async delete(value) {
            try {
                const response = await axios.delete('query', {data: value});
                console.log(response)
                if (response.data.deleted.deletedCount) this.get();
            } catch (error) {
                console.error('Error: ', error);
            }
        },
        async add(value) {
            try {
                const response = await axios.post('query', value);
                if (response.data.query) this.get();
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    },
    getters: {
        getActive() {
            return this.queries.filter((q) => q.isActive);
        }
    }
});

