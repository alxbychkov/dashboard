<script setup>
import { useHabrQueryStore } from "../../../stores/habr";

const habrQuery = useHabrQueryStore();

const props = defineProps({
  query: Object,
});

const updateQueryHandler = (value) => {
  habrQuery.update(props.query);
  closeModal();
};

const deleteQueryHandler = (value) => {
  habrQuery.delete(props.query._id);
  closeModal();
};

const addQueryHandler = (value) => {
  props.query.isActive = false;
  props.query._id = new Date().getTime();
  habrQuery.add(props.query);
  closeModal();
};

const closeModal = () => {
  bootstrap.Modal.getInstance(habrQueryModal).hide();
};

const setQuery = () => {
  props.query.isActive = !props.query.isActive;
};
</script>
<template>
  <div
    class="modal fade"
    id="habrQueryModal"
    tabindex="-1"
    aria-labelledby="habrQueryModalLabel"
    aria-hidden="true"
    ref="habrQueryModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="habrQueryModalLabel">
            {{ query._id ? "Update query" : "New query" }}
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
            <input type="hidden" v-model="query._id" />
            <input
              type="text"
              class="form-control mb-2"
              placeholder="Query_id"
              v-model="query.query_id"
            />
            <input
              type="text"
              class="form-control mb-2"
              placeholder="Name"
              v-model="query.name"
            />
            <input
              type="text"
              class="form-control mb-2"
              placeholder="Salary"
              v-model="query.salary"
            />
            <input
              type="text"
              class="form-control mb-2"
              placeholder="Filter"
              v-model="query.filter"
            />
            <div
              v-if="query.isActive !== ''"
              class="form-check form-switch form-check-reverse"
            >
              <input
                class="form-check-input"
                type="checkbox"
                id="isActiveQuery"
                @change="setQuery"
                :checked="query.isActive"
              />
              <label class="form-check-label me-2" for="isActiveQuery"
                >Active:
              </label>
            </div>
          </form>
        </div>
        <div v-if="query._id" class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteQueryHandler"
          >
            Delete
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="updateQueryHandler"
          >
            Update
          </button>
        </div>
        <div v-else class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="addQueryHandler"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
