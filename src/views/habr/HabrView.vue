<script setup>
import { onMounted, ref } from "vue";
import axios from "../../utils/axios/habr.js";
import HabrNav from "./HabrNav.vue";

const activeManagers = ref([]);
const activeQueries = ref([]);

onMounted(async () => {
  const managersResponse = await axios.get("manager");
  activeManagers.value = managersResponse.data.managers.filter(
    (m) => m.isActive
  );

  const queriesResponse = await axios.get("query");
  activeQueries.value = queriesResponse.data.queries.filter((q) => q.isActive);
  console.log(activeQueries.value);
});
</script>
<template>
  <div class="h4 pb-2 mb-4 text-success border-bottom border-success">Habr</div>
  <HabrNav />
  <div class="bord border border-secondary p-3 rounded mt-4">
    <div class="card">
      <div class="card-header">Active manager:</div>
      <div class="card-body">
        <h5
          v-for="manager in activeManagers"
          class="card-title"
          :key="manager._id"
        >
          💼 {{ manager.name }} ({{ manager.login }})
        </h5>
      </div>
    </div>
    <div class="card mt-2">
      <div class="card-header">Active queries:</div>
      <div class="card-body">
        <ul class="list-group mb-3">
          <li
            v-for="query in activeQueries"
            class="list-group-item d-flex justify-content-between align-items-center"
            :key="query._id"
          >
            <h5 class="card-title">{{ query.name }}</h5>
            <span>✅</span>
          </li>
        </ul>
        <a href="#" class="btn btn-primary">All queries</a>
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

<style></style>
