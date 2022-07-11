<script setup>
import { onMounted, ref } from "vue";
import axios from "../../utils/axios/habr.js";
import HabrNav from "./HabrNav.vue";
import Loader from "../../components/Loader.vue";
import { useHabrStore } from "../../stores/useHabrStore.js";

const habr = useHabrStore();
const managers = ref([]);


onMounted(async () => {
    // const managersResponse = await axios.get("manager");
    managers.value = habr.managers;
});
</script>
<template>
    <div class="h4 pb-2 mb-4 text-success border-bottom border-success">Habr (Managers)</div>
    <HabrNav />
    <div class="bord border border-secondary p-3 rounded mt-4">
        <table v-if="managers.length" class="table table-striped table-success table-hover border rounded mb-0">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Login</th>
                    <th scope="col" class="text-center">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="manager in managers" :key="manager._id">
                    <th scope="row">💼</th>
                    <td>{{ manager.name }}</td>
                    <td>{{ manager.login }}</td>
                    <td class="text-center">{{ manager.isActive ? '🟢' : '🔴' }}</td>
                </tr>
            </tbody>
        </table>
        <Loader v-else />
        <div class="mt-3 d-flex justify-content-end">
            <button class="btn btn-success">New manager</button>
        </div>
    </div>
</template>