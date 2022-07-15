<script setup>
import { onBeforeMount, onMounted } from "vue";
import HabrNav from "./HabrNav.vue";
import Loader from "../../components/Loader.vue";
import { useHabrManagerStore, useHabrQueryStore } from "../../stores/habr";

const DAILY_LOG_LINK = "https://habr.atcon.ru/scarper/logs/";

const habrManager = useHabrManagerStore();
const habrQuery = useHabrQueryStore();

onBeforeMount(async () => {
  habrManager.isLoaded || (await habrManager.get());
  habrQuery.isLoaded || (await habrQuery.get());
});

onMounted(async () => {});
</script>
<template>
  <div class="h4 pb-2 mb-4 text-success border-bottom border-success">Habr</div>
  <HabrNav />
  <div class="bord border border-secondary p-3 rounded mt-4">
    <div class="mb-3 d-flex justify-content-end">
      <button class="btn btn-success me-1" disabled>Start daily</button>
      <button class="btn btn-danger" disabled>Stop daily</button>
    </div>
    <div class="card">
      <div class="card-header">Active manager:</div>
      <div v-if="!habrManager.isLoaded" class="card-body">
        <Loader />
      </div>
      <div v-else-if="!habrManager.managers.length" class="card-body">
        <h5 class="card-title text-center">
          Couldn't load managers: (server error)... 😔
        </h5>
      </div>
      <div v-else-if="habrManager.getActive.length" class="card-body">
        <h5
          v-for="manager in habrManager.getActive"
          class="card-title"
          :key="manager._id"
        >
          💼 {{ manager.name }} ({{ manager.login }})
        </h5>
      </div>
      <div v-else class="card-body">
        <h5 class="card-title text-center">No active managers... 😐</h5>
      </div>
    </div>
    <div class="card mt-2">
      <div class="card-header">Active queries:</div>
      <div class="card-body">
        <Loader v-if="!habrQuery.queries.length" />
        <ul v-else-if="habrQuery.getActive.length" class="list-group mb-3">
          <li
            v-for="query in habrQuery.getActive"
            class="list-group-item d-flex justify-content-between align-items-center"
            :key="query._id"
          >
            <h5 class="card-title">{{ query.name }}</h5>
            <span>✅</span>
          </li>
        </ul>
        <h5 v-else class="card-title text-center">No active queries... 😢</h5>
        <RouterLink to="/habr/query" class="btn btn-primary float-end">
          All queries
        </RouterLink>
      </div>
    </div>
    <div class="card mt-2">
      <div class="card-header">Daily logs:</div>
      <div class="card-body">
        <iframe :src="DAILY_LOG_LINK" frameborder="0" width="100%"></iframe>
      </div>
    </div>
  </div>
</template>
