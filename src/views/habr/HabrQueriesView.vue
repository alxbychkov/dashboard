<script setup>
import { onMounted, ref } from "vue";
import axios from "../../utils/axios/habr.js";
import HabrNav from "./HabrNav.vue";
import Loader from "../../components/Loader.vue";

const queries = ref([]);

onMounted(async () => {
    const queriesResponse = await axios.get("query");
    queries.value = queriesResponse.data.queries;
});
</script>
<template>
    <div class="h4 pb-2 mb-4 text-success border-bottom border-success">Habr (Queries)</div>
    <HabrNav />
    <div class="bord border border-secondary p-3 rounded mt-4">
        <table v-if="queries.length" class="table table-striped table-success table-hover border rounded mb-0">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Link</th>
                    <th scope="col" class="text-center">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(query, index) in queries" :key="query._id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ query.name }}</td>
                    <td><a :href="query.filter">{{ query.query_id }}</a></td>
                    <td class="text-center">{{ query.isActive ? '🟢' : '🔴' }}</td>
                </tr>
            </tbody>
        </table>
        <Loader v-else />
        <div class="mt-3 d-flex justify-content-end">
            <button class="btn btn-success">New query</button>
        </div>
    </div>
</template>