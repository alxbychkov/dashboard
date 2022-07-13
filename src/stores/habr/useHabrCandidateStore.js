import { defineStore } from 'pinia';
import axios from '../../utils/axios/habr.js';

export const useHabrStore = defineStore('habrCandidateStore', {
    state: () => {
        return {
            isLoaded: false,
            candidates: []
        }
    },
    actions: {},
    getters: {}
});

