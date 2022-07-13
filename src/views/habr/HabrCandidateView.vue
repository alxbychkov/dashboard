<script setup>
import { toRef } from "vue";
import HabrNav from "./HabrNav.vue";
import Loader from "../../components/Loader.vue";
import { useHabrCandidateStore } from "../../stores/habr";

const habrCandidate = useHabrCandidateStore();
let candidates = toRef(habrCandidate, "isLoaded");

const loadUserHandler = () => {
  candidates = !candidates;
  setTimeout(() => {
    candidates = !candidates;
  }, 2000);
};
</script>
<template>
  <div class="h4 pb-2 mb-4 text-success border-bottom border-success">
    Habr (Candidates)
  </div>
  <HabrNav />
  <div class="bord border border-secondary p-3 rounded mt-4">
    <div class="mt-3 d-flex justify-content-end">
      <button
        class="btn btn-success"
        type="button"
        :disabled="candidates.isLoaded"
        @click="loadUserHandler"
      >
        <span
          v-if="candidates.isLoaded"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        {{ candidates.isLoaded ? "Loading..." : "Load users" }}
      </button>
    </div>
  </div>
</template>
