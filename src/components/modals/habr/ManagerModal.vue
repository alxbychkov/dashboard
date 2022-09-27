<script setup>
import * as bootstrap from "bootstrap";
import { ref } from "vue";
import { useHabrManagerStore } from "../../../stores/habr";

const habrManager = useHabrManagerStore();

const props = defineProps({
  manager: Object,
});

const updateManagerHandler = () => {
  habrManager.update(props.manager);
  closeModal();
};

const deleteManagerHandler = () => {
  const { _id } = { ...props.manager };
  habrManager.delete({ _id });
  closeModal();
};

const addManagerHandler = () => {
  const { query_id, name, login, password } = { ...props.manager };
  habrManager.add({ query_id, name, login, password });
  closeModal();
};

const closeModal = () => {
    bootstrap.Modal.getInstance(habrManagerModal).hide();
};

const setManager = () => {
  props.manager.isActive = !props.manager.isActive;
};

</script>
<template>
  <div class="modal fade" id="habrManagerModal" tabindex="-1" aria-labelledby="habrManagerModalLabel" aria-hidden="true"
    ref="habrManagerModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="habrManagerModalLabel">
            {{ manager._id ? "Update manager" : "New manager" }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <form>
            <input type="hidden" v-model="manager._id" />
            <input type="text" class="form-control mb-2" placeholder="Query_id" v-model="manager.query_id" />
            <input type="text" class="form-control mb-2" placeholder="Name" v-model="manager.name" />
            <input type="email" class="form-control mb-2" placeholder="Login" v-model="manager.login" />
            <input type="text" class="form-control mb-2" placeholder="Password" v-model="manager.password" />
            <div v-if="manager.isActive !== ''" class="form-check form-switch form-check-reverse">
              <input class="form-check-input" type="checkbox" id="isActiveManager" @change="setManager"
                :checked="manager.isActive" />
              <label class="form-check-label me-2" for="isActiveManager">Active:
              </label>
            </div>
          </form>
        </div>
        <div v-if="manager._id" class="modal-footer">
          <button type="button" class="btn btn-danger" @click="deleteManagerHandler">
            Delete
          </button>
          <button type="button" class="btn btn-success" @click="updateManagerHandler">
            Update
          </button>
        </div>
        <div v-else class="modal-footer">
          <button type="button" class="btn btn-primary" @click="addManagerHandler">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
