<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import axios from "../../utils/axios/habr.js";
import HabrNav from "./HabrNav.vue";
import Loader from "../../components/Loader.vue";
import { useHabrStore } from "../../stores/useHabrStore.js";

const habr = useHabrStore();

const activeManagers = ref([]);
const activeQueries = ref([]);

onBeforeMount(async () => {
  await habr.getManagers();
  await habr.getQueries();
});

onMounted(async () => {
  activeManagers.value = habr.managers.filter(
    (m) => m.isActive
  );

  activeQueries.value = habr.queries.filter(
    (q) => q.isActive
  );
});
</script>
<template>
  <div class="h4 pb-2 mb-4 text-success border-bottom border-success">Habr</div>
  <HabrNav />
  <div class="bord border border-secondary p-3 rounded mt-4">
    <div class="card">
      <div class="card-header">Active manager:</div>
      <div v-if="activeManagers.length" class="card-body">
        <h5 v-for="manager in activeManagers" class="card-title" :key="manager._id">
          💼 {{ manager.name }} ({{ manager.login }})
        </h5>
      </div>
      <div v-else class="card-body">
        <Loader />
      </div>
    </div>
    <div class="card mt-2">
      <div class="card-header">Active queries:</div>
      <div class="card-body">
        <ul v-if="activeQueries.length" class="list-group mb-3">
          <li v-for="query in activeQueries" class="list-group-item d-flex justify-content-between align-items-center"
            :key="query._id">
            <h5 class="card-title">{{ query.name }}</h5>
            <span>✅</span>
          </li>
        </ul>
        <Loader v-else />
        <RouterLink to="/habr/query" class="btn btn-primary float-end">
          All queries
        </RouterLink>
      </div>
    </div>
    <div class="card mt-2">
      <div class="card-header">Daily logs:</div>
      <div class="card-body">
        <h5 class="card-title">Logs</h5>
      </div>
    </div>
  </div>
</template>
