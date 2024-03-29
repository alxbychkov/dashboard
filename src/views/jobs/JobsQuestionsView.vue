<script setup>
import { toRef, ref, onMounted } from "vue";
import JobsNav from "./JobsNav.vue";
import Pagination from "../../components/Pagination.vue";
import { useJobsQuestionStore } from "../../stores/jobs";
import QuestionModal from "../../components/modals/jobs/QuestionModal.vue";

const INITIAL_QUESTION = {
    id: '',
    question: '',
    answer: ''
}

const jobsQuestion = useJobsQuestionStore();
const questions = toRef(jobsQuestion, "questions");
const questionRow = ref(INITIAL_QUESTION);
const currentPage = toRef(jobsQuestion, "page");

let isLoading = ref(false);
const count = ref(10);

const changeCountHandler = (value) => {
    count.value = value;
};

const loadQuestionHandler = async (page) => {
    isLoading.value = true;
    await jobsQuestion.get(page, count.value);
    isLoading.value = false;
};

const setQuestion = (value = INITIAL_QUESTION) => {
  questionRow.value = { ...value };
};

onMounted(() => {});
</script>
<template>
    <div class="h2 pb-2 mb-4 text-success border-bottom border-success">
        Jobs (Questions)
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
            <button class="btn btn-success" type="button" :disabled="jobsQuestion.isLoaded"
                @click="loadQuestionHandler(1)">
                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ isLoading ? "Loading..." : "Load questions" }}
            </button>
        </div>
        <table v-if="questions.length" class="table table-hover border rounded mb-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Question</th>
                    <th scope="col">Answer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(question, index) in questions" :key="question.id"
                    data-bs-toggle="modal"
                    data-bs-target="#jobsQuestionModal"
                    role="button"
                    tabindex="index"
                    @click="setQuestion(question)"
                >
                    <th scope="row">{{ count * (currentPage - 1) + index + 1 }}</th>
                    <td>{{ question.question }}</td>
                    <td>{{ question.answer }}</td>
                </tr>
            </tbody>
        </table>
        <Pagination v-if="jobsQuestion.pages > 0" :page="currentPage" :pages="jobsQuestion.pages"
            @onPaginate="loadQuestionHandler" />
    </div>
    <QuestionModal :questionRow="questionRow" />
</template>
<style scoped>
tbody tr td:nth-child(2) {
    max-width: 650px;
}
</style>
    