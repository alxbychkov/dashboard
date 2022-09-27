<script setup>
import { onBeforeMount, onMounted } from "vue";
import JobsNav from "./JobsNav.vue";
import Loader from "../../components/Loader.vue";

const DAILY_LOG_LINK = "https://habr.atcon.ru/cryptojobslist/logs/";

onBeforeMount(async () => {});

onMounted(async () => {});
</script>
<template>
  <div class="h4 pb-2 mb-4 text-success border-bottom border-success">Jobs</div>
  <JobsNav />
  <div class="bord border border-secondary p-3 rounded mt-4">
    <div class="card">
      <div class="card-header">Daily logs:</div>
      <div class="card-body">
        <iframe :src="DAILY_LOG_LINK" frameborder="0" width="100%"></iframe>
      </div>
    </div>
  </div>
</template>
