<script setup>
import { useHabrManagerStore } from "../../../stores/habr";

const habrManager = useHabrManagerStore();

const props = defineProps({
  manager: Object,
});

const updateManagerHandler = (value) => {
  habrManager.updateManager(props.manager);
  closeModal();
};

const deleteManagerHandler = (value) => {
  habrManager.deleteManager(props.manager._id);
  closeModal();
};

const addManagerHandler = (value) => {
  props.manager.isActive = false;
  props.manager._id = new Date().getTime();
  habrManager.addManager(props.manager);
  closeModal();
};

const closeModal = () => {
  bootstrap.Modal.getInstance(habrModal).hide();
};

const setManager = () => {
  props.manager.isActive = !props.manager.isActive;
};
</script>
<template>
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
