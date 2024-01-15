<script setup>
import { toRef, ref } from "vue";
import JobsNav from "./JobsNav.vue";
import Pagination from "../../components/Pagination.vue";
import { useJobsQuestionStore, useJobsVacancyStore } from "../../stores/jobs";
import VacancyModal from "../../components/modals/jobs/VacancyModal.vue";

const INITIAL_VACANCY = {
    id: '',
    name: '',
    status: '',
    questions: []
}

const jobsQuestion = useJobsQuestionStore();
const jobsVacancy = useJobsVacancyStore();
const vacancies = toRef(jobsVacancy, "vacancies");
const vacancyRow = ref(INITIAL_VACANCY);
const currentPage = toRef(jobsVacancy, "page");

let isLoading = ref(false);
const count = ref(10);

const changeCountHandler = (value) => {
    count.value = value;
};

const loadVacancyHandler = async (page) => {
    isLoading.value = true;
    await jobsVacancy.get(page, count.value);
    isLoading.value = false;
};

const setVacancy = async (value = INITIAL_QUESTION) => {
    vacancyRow.value.id = value.id ? value.id : '';
    vacancyRow.value.name = value.name ? value.name : '';
    vacancyRow.value.status = value.status ? value.status : 'relevant';
    
    const vacancyQuestionsParsedJSON = value.questions ? JSON.parse(value.questions) : [];
    const vacancyQuestions = vacancyQuestionsParsedJSON.map(v => Object.values(v)[0]);
    const questions = vacancyQuestions.length ? await jobsQuestion.find(vacancyQuestions) : [];
    vacancyRow.value.questions = [...questions];
};
</script>
<template>
    <div class="h2 pb-2 mb-4 text-success border-bottom border-success">
        Jobs (Vacancies)
    </div>
    <JobsNav />
    <div class="bord border border-secondary p-3 rounded mt-4 overflow-auto">
        <div class="mb-3 d-flex justify-content-between flex-sm-row flex-column">
            <div class="btn-group mb-sm-0 mb-2" role="group" aria-label="Count candidates">
                <button type="button" class="btn btn-outline-secondary" :class="count === 10 ? 'btn-warning' : ''"
                    @click="changeCountHandler(10)">
                    10
                </button>
                <button type="button" class="btn btn-outline-secondary" :class="count === 50 ? 'btn-warning' : ''"
                    @click="changeCountHandler(50)">
                    50
                </button>
                <button type="button" class="btn btn-outline-secondary" :class="count === 100 ? 'btn-warning' : ''"
                    @click="changeCountHandler(100)">
                    100
                </button>
                <button type="button" class="btn btn-outline-secondary" :class="count === 500 ? 'btn-warning' : ''"
                    @click="changeCountHandler(500)">
                    500
                </button>
            </div>
            <button class="btn btn-success" type="button" :disabled="jobsVacancy.isLoaded"
                @click="loadVacancyHandler(1)">
                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ isLoading ? "Loading..." : "Load vacancies" }}
            </button>
        </div>
        <table v-if="vacancies.length" class="table table-hover border rounded mb-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Company</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Location</th>
                    <th scope="col">Status</th>
                    <th scope="col">Posted on</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(vacancy, index) in vacancies" :key="vacancy.id"
                    data-bs-toggle="modal"
                    data-bs-target="#jobsVacancyModal"
                    role="button"
                    tabindex="index"
                    @click="setVacancy(vacancy)"
                >
                    <th scope="row">{{ count * (currentPage - 1) + index + 1 }}</th>
                    <td><a :href="vacancy.applicationLink === 'https://cryptojobslist.com/' ? vacancy.link : vacancy.applicationLink" target="_blank">{{ vacancy.name }}</a></td>
                    <td><a :href="vacancy.company.website" target="_blank">{{ vacancy.company.name}}</a></td>
                    <td>{{ vacancy.salary.replaceAll(' ','') }}</td>
                    <td>{{ vacancy.location }}</td>
                    <td>{{ vacancy.status === 'relevant' ? '🟢' : '🔴' }}</td>
                    <td>{{ vacancy.postedOn }}</td>
                </tr>
            </tbody>
        </table>
        <Pagination v-if="jobsVacancy.pages > 0" :page="currentPage" :pages="jobsVacancy.pages"
            @onPaginate="loadVacancyHandler" />
    </div>
    <VacancyModal :vacancyRow="vacancyRow"/>
</template>
    