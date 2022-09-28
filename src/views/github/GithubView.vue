<script setup>
import { onMounted } from "vue";
import GithubNav from "./GithubNav.vue";

onMounted(async () => { });
</script>
<template>
  <div class="h2 pb-2 mb-4 text-success border-bottom border-success">Github</div>
  <GithubNav />
  <div class="bord border border-secondary p-3 rounded mt-4">
    <div class="card">
      <div class="card-header"></div>
      <div class="card-body">
        <h5 class="card-title text-center"></h5>
      </div>
    </div>
  </div>
</template>
    