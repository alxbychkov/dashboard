<script setup>
import { onMounted, ref } from "vue";
import axios from "../utils/axios/habr.js";

const managers = ref([]);
const queries = ref([]);

onMounted(async () => {
  const managersResponse = await axios.get("manager");
  managers.value = managersResponse.data.managers;
  console.log(managers.value);

  const queriesResponse = await axios.get("query");
  queries.value = queriesResponse.data.queries;
  console.log(queries.value);
});
</script>
<template>
  <div class="h4 pb-2 mb-4 text-success border-bottom border-success">Habr</div>
  <ul class="nav nav-pills border border-secondary p-3 rounded">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="#">Overview</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Managers</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Queries</a>
    </li>
    <li class="nav-item">
      <a class="nav-link">Candidates</a>
    </li>
  </ul>
</template>

<style></style>
