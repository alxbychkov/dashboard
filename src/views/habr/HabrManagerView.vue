<script setup>
import { ref, toRef } from "vue";
import HabrNav from "./HabrNav.vue";
import Loader from "../../components/Loader.vue";
import ManagerModal from "../../components/modals/habr/ManagerModal.vue";
import { useHabrManagerStore } from "../../stores/habr";

const INITIAL_MANAGER = {
  _id: "",
  query_id: "",
  name: "",
  login: "",
  password: "",
  isActive: "",
  tmp: "",
};

const habrManager = useHabrManagerStore();

const managers = toRef(habrManager, "managers");

const manager = ref(INITIAL_MANAGER);

const setManager = (value = INITIAL_MANAGER) => {
  manager.value = { ...value };
};
</script>
<template>
  <div class="h4 pb-2 mb-4 text-success border-bottom border-success">
    Habr (Managers)
  </div>
  <HabrNav />
  <div class="bord border border-secondary p-3 rounded mt-4">
    <table
      v-if="managers.length"
      class="table table-striped table-success table-hover border rounded mb-0"
    >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Login</th>
          <th scope="col" class="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="manager in managers"
          :key="manager._id"
          data-bs-toggle="modal"
          data-bs-target="#habrModal"
          @click="setManager(manager)"
        >
          <th scope="row">💼</th>
          <td>{{ manager.name }}</td>
          <td>{{ manager.login }}</td>
          <td class="text-center">{{ manager.isActive ? "🟢" : "🔴" }}</td>
        </tr>
      </tbody>
    </table>
    <Loader v-else />
    <div class="mt-3 d-flex justify-content-end">
      <button
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#habrModal"
        @click="setManager()"
      >
        New manager
      </button>
    </div>
  </div>
  <ManagerModal :manager="manager" />
</template>
