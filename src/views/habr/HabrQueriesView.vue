<script setup>
import { toRef, ref, onBeforeMount } from "vue";
import HabrNav from "./HabrNav.vue";
import Loader from "../../components/Loader.vue";
import { useHabrQueryStore } from "../../stores/habr";
import QueryModal from "../../components/modals/habr/QueryModal.vue";

const INITIAL_QUERY = {
  _id: "",
  query_id: "",
  name: "",
  salary: "",
  filter: "",
  text: "",
  isActive: "",
};

const habrQuery = useHabrQueryStore();
const queries = toRef(habrQuery, "queries");

const query = ref(INITIAL_QUERY);

const setQuery = (value = INITIAL_QUERY) => {
  query.value = { ...value };
};

onBeforeMount(async () => {
  habrQuery.isLoaded || (await habrQuery.get());
});
</script>
<template>
  <div class="h2 pb-2 mb-4 text-success border-bottom border-success">
    Habr (Queries)
  </div>
  <HabrNav />
  <div class="bord border border-secondary p-3 rounded mt-4">
    <Loader v-if="!habrQuery.isLoaded" />
    <table
      v-else-if="queries.length"
      class="table table-striped table-success table-hover border rounded mb-0"
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Link</th>
          <th scope="col" class="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(query, index) in queries"
          :key="query._id"
          data-bs-toggle="modal"
          data-bs-target="#habrQueryModal"
          @click="setQuery(query)"
        >
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ query.name }}</td>
          <td>
            <a :href="`https://career.habr.com/?${query.filter}`" target="_blank">{{ query.query_id }}</a>
          </td>
          <td class="text-center">{{ query.isActive ? "🟢" : "🔴" }}</td>
        </tr>
      </tbody>
    </table>
    <h5 v-else class="card-title text-center">
      No queries (something went wrong) 🍄
    </h5>
    <div class="mt-3 d-flex justify-content-end">
      <button
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#habrQueryModal"
        @click="setQuery()"
      >
        New query
      </button>
    </div>
  </div>
  <QueryModal :query="query" />
</template>
