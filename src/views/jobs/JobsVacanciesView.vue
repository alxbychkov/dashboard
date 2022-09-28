<script setup>
import { toRef, ref } from "vue";
import JobsNav from "./JobsNav.vue";
import Pagination from "../../components/Pagination.vue";
import { useJobsVacancyStore } from "../../stores/jobs";

const jobsVacancy = useJobsVacancyStore();
const vacancies = toRef(jobsVacancy, "vacancies");
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
</script>
<template>
    <div class="h2 pb-2 mb-4 text-success border-bottom border-success">
        Jobs (Vacancies)
    </div>
    <JobsNav />
    <div class="bord border border-secondary p-3 rounded mt-4">
        <div class="mb-3 d-flex justify-content-between">
            <div class="btn-group" role="group" aria-label="Count candidates">
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
                    <th scope="col">Location</th>
                    <th scope="col">Posted on</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(vacancy, index) in vacancies" :key="vacancy.id">
                    <th scope="row">{{ count * (currentPage - 1) + index + 1 }}</th>
                    <td>{{ vacancy.name }}</td>
                    <td><a href="#">{{ vacancy.company_id }}</a></td>
                    <td>{{ vacancy.location }}</td>
                    <td>{{ vacancy.postedOn }}</td>
                </tr>
            </tbody>
        </table>
        <Pagination v-if="jobsVacancy.pages > 0" :page="currentPage" :pages="jobsVacancy.pages"
            @onPaginate="loadVacancyHandler" />
    </div>
</template>
    