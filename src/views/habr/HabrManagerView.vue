<script setup>
import { onMounted, onBeforeUnmount, onBeforeMount, ref } from "vue";
import HabrNav from "./HabrNav.vue";
import Loader from "../../components/Loader.vue";
import { useHabrStore } from "../../stores/useHabrStore.js";

const habr = useHabrStore();
const managers = ref([]);

const updateManagers = () => {
  managers.value = habr.managers.values;
};

const manager = ref({
  _id: "",
  query_id: "",
  name: "",
  login: "",
  password: "",
  isActive: "",
  tmp: "",
});

const updateManagerHandler = (value) => {
  console.log("update: ", manager.value);
};

const deleteManagerHandler = (value) => {
  habr.deleteManager(manager.value._id);
  updateManagers();
  bootstrap.Modal.getInstance(habrModal).hide();
};

const addManagerHandler = (value) => {
  manager.value.isActive = false;
  console.log("add: ", manager.value);
};

const showModalHandler = (value = "") => {
  if (value instanceof Event) {
    return false;
  }
  if (value instanceof Object) {
    manager.value = { ...value };
  } else if (value === "") {
    manager.value = {
      _id: "",
      query_id: "",
      name: "",
      login: "",
      password: "",
      isActive: "",
      tmp: "",
    };
  }
};

const setManager = () => {
  manager.value.isActive = !manager.value.isActive;
};

onBeforeMount(() => {
  updateManagers();
});

onMounted(() => {
  habrModal.addEventListener("shown.bs.modal", showModalHandler);
});

onBeforeUnmount(() => {
  habrModal.removeEventListener("shown.bs.modal", showModalHandler);
});
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
          @click="showModalHandler(manager)"
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
        @click="showModalHandler('')"
      >
        New manager
      </button>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="habrModal"
    tabindex="-1"
    aria-labelledby="habrModalLabel"
    aria-hidden="true"
    ref="habrModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="habrModalLabel">
            {{ manager._id ? "Update manager" : "New manager" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            ref="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <input type="hidden" v-model="manager._id" />
            <input
              type="text"
              class="form-control mb-2"
              placeholder="Query_id"
              v-model="manager.query_id"
            />
            <input
              type="text"
              class="form-control mb-2"
              placeholder="Name"
              v-model="manager.name"
            />
            <input
              type="email"
              class="form-control mb-2"
              placeholder="Login"
              v-model="manager.login"
            />
            <input
              type="text"
              class="form-control mb-2"
              placeholder="Password"
              v-model="manager.password"
            />
            <div
              v-if="manager.isActive !== ''"
              class="form-check form-switch form-check-reverse"
            >
              <input
                class="form-check-input"
                type="checkbox"
                id="isActiveManager"
                @change="setManager"
                :checked="manager.isActive"
              />
              <label class="form-check-label me-2" for="isActiveManager"
                >Active:
              </label>
            </div>
          </form>
        </div>
        <div v-if="manager._id" class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteManagerHandler"
          >
            Delete
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="updateManagerHandler"
          >
            Update
          </button>
        </div>
        <div v-else class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="addManagerHandler"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
