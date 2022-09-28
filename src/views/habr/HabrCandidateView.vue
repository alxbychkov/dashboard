<script setup>
import { toRef, ref } from "vue";
import HabrNav from "./HabrNav.vue";
import { useHabrCandidateStore } from "../../stores/habr";
import Pagination from "../../components/Pagination.vue";

const habrCandidate = useHabrCandidateStore();
const candidates = toRef(habrCandidate, "candidates");
const currentPage = toRef(habrCandidate, "page");

let isLoading = ref(false);
const count = ref(10);

const changeCountHandler = (value) => {
  count.value = value;
};

const loadUserHandler = async (page) => {
  isLoading.value = true;
  await habrCandidate.get(page, count.value);
  isLoading.value = false;
};
</script>
<template>
  <div class="h4 pb-2 mb-4 text-success border-bottom border-success">
    Habr (Candidates)
  </div>
  <HabrNav />
  <div class="bord border border-secondary p-3 rounded mt-4">
    <div class="mb-3 d-flex justify-content-between">
      <div class="btn-group" role="group" aria-label="Count candidates">
        <button
          type="button"
          class="btn btn-outline-secondary"
          :class="count === 10 ? 'btn-warning' : ''"
          @click="changeCountHandler(10)"
        >
          10
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          :class="count === 50 ? 'btn-warning' : ''"
          @click="changeCountHandler(50)"
        >
          50
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          :class="count === 100 ? 'btn-warning' : ''"
          @click="changeCountHandler(100)"
        >
          100
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          :class="count === 500 ? 'btn-warning' : ''"
          @click="changeCountHandler(500)"
        >
          500
        </button>
      </div>
      <button
        class="btn btn-success"
        type="button"
        :disabled="habrCandidate.isLoaded"
        @click="loadUserHandler(1)"
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
    <table
      v-if="candidates.length"
      class="table table-hover border rounded mb-3"
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
          <th scope="row">{{ count * (currentPage - 1) + index + 1 }}</th>
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
    <Pagination
      v-if="habrCandidate.pages > 0"
      :page="currentPage"
      :pages="habrCandidate.pages"
      @onPaginate="loadUserHandler"
    />
  </div>
</template>
