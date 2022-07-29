<script setup>
import { toRef, ref } from "vue";
import HabrNav from "./HabrNav.vue";
import { useHabrCandidateStore } from "../../stores/habr";

const habrCandidate = useHabrCandidateStore();
let candidates = toRef(habrCandidate, "candidates");
let isLoading = ref(false);

const loadUserHandler = async () => {
  isLoading.value = true;
  await habrCandidate.get();
  isLoading.value = false;
};
</script>
<template>
  <div class="h4 pb-2 mb-4 text-success border-bottom border-success">
    Habr (Candidates)
  </div>
  <HabrNav />
  <div class="bord border border-secondary p-3 rounded mt-4">
    <table
      v-if="candidates.length"
      class="table table-hover border rounded mb-0"
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Status</th>
          <th scope="col">Offer</th>
          <th scope="col">Query</th>
          <th scope="col" class="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(candidate, index) in candidates" :key="candidate._id">
          <th scope="row">{{ index + 1 }}</th>
          <td>
            <a :href="candidate.conversations">{{ candidate.name }}</a>
          </td>
          <td>{{ candidate.status }}</td>
          <td>{{ candidate.offer }}</td>
          <td>{{ candidate.query }}</td>
          <td class="text-center">{{ candidate.isReceived ? "🟢" : "🔴" }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-3 d-flex justify-content-end">
      <button
        class="btn btn-success"
        type="button"
        :disabled="habrCandidate.isLoaded"
        @click="loadUserHandler"
      >
        <span
          v-if="isLoading"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        {{ isLoading ? "Loading..." : "Load users" }}
      </button>
    </div>
  </div>
</template>
