<script setup>
import { toRef, ref } from "vue";
import JobsNav from "./JobsNav.vue";
import Pagination from "../../components/Pagination.vue";
import { useJobsCompanyStore } from "../../stores/jobs";

const jobsCompany = useJobsCompanyStore();
const companies = toRef(jobsCompany, "companies");
const currentPage = toRef(jobsCompany, "page");

let isLoading = ref(false);
const count = ref(10);

const changeCountHandler = (value) => {
    count.value = value;
};

const loadCompanyHandler = async (page) => {
    isLoading.value = true;
    await jobsCompany.get(page, count.value);
    isLoading.value = false;
};

const reverseSocial = (json) => {
    const html = [];
    const social = JSON.parse(json);
    if (social.length) {
        social.forEach(s => {
            switch (Object.entries(s)[0][0]) {
                case 'twitter':
                    html.push(`<a href="https://twitter.com/${Object.entries(s)[0][1]}"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="mr-2 text-blue-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></a>`);
                    break;
                case 'discord':
                    html.push(`<a href="${Object.entries(s)[0][1]}"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" class="mr-2 text-blue-400 dark:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path></svg></a>`);
                    break;
                case 'telegram':
                    html.push(`<a href="${Object.entries(s)[0][1]}"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="telegram" height="1em" width="1em"><circle cx="12" cy="12" r="12" fill="#039be5"/><path fill="#fff" d="m5.491 11.74 11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z"/></svg></a>`);
                    break;
            }
        });
    }

    if (html.length) return html.join(' ');

    return '';
}
</script>
<template>
    <div class="h2 pb-2 mb-4 text-success border-bottom border-success">
        Jobs (Companies)
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
            <button class="btn btn-success" type="button" :disabled="jobsCompany.isLoaded"
                @click="loadCompanyHandler(1)">
                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ isLoading ? "Loading..." : "Load companies" }}
            </button>
        </div>
        <table v-if="companies.length" class="table table-hover border rounded mb-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Link(cryptojobs)</th>
                    <th scope="col">Social</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(company, index) in companies" :key="company.id">
                    <th scope="row">{{ count * (currentPage - 1) + index + 1 }}</th>
                    <td><a :href="company.website" target="_blank">{{ company.name }}</a></td>
                    <td><a :href="company.link" target="_blank">cryptojobslist.com</a></td>
                    <td class="social-wrapper" v-html="reverseSocial(company.social)"></td>
                    <td>{{ company.status === 'relevant' ? '🟢' : '🔴' }}</td>
                </tr>
            </tbody>
        </table>
        <Pagination v-if="jobsCompany.pages > 0" :page="currentPage" :pages="jobsCompany.pages"
            @onPaginate="loadCompanyHandler" />
    </div>
</template>
<style scoped>
.social-wrapper {
    /* display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px; */
}
.social-wrapper a {
    display: inline-flex;
    width: 16px;
}
</style>
    