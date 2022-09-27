<script setup>
import { useHabrQueryStore } from "../../../stores/habr";
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { onBeforeUnmount, onMounted } from "@vue/runtime-core";
import * as bootstrap from "bootstrap";
import { ref } from "vue";

const habrQuery = useHabrQueryStore();

const props = defineProps({
  query: Object,
});

const updateQueryHandler = () => {
  habrQuery.update(props.query);
  closeModal();
};

const deleteQueryHandler = () => {
  const { _id } = { ...props.query };
  habrQuery.delete({ _id });
  closeModal();
};

const addQueryHandler = () => {
  const { query_id, name, salary, filter } = { ...props.query };
  habrQuery.add({ query_id, name, salary, filter });
  closeModal();
};

const setQuery = () => {
  props.query.isActive = !props.query.isActive;
};

let editorText = null;

const readyQuillHandler = (content) => {
  editorText = content;
};

const showEditorContent = () => {
  editorText.setText(props.query.text || '');
};

const clearEditorContent = () => {
  editorText.setText('');
};

const closeModal = () => {
  bootstrap.Modal.getInstance(habrQueryModal).hide();
  clearEditorContent();
};

onMounted(() => {
  habrQueryModal.addEventListener('shown.bs.modal', showEditorContent);
  habrQueryModal.addEventListener('hidden.bs.modal', clearEditorContent);
});

onBeforeUnmount(() => {
  habrQueryModal.removeEventListener('shown.bs.modal', showEditorContent);
  habrQueryModal.removeEventListener('hidden.bs.modal', clearEditorContent);
});
</script>
<template>
  <div class="modal fade" id="habrQueryModal" tabindex="-1" aria-labelledby="habrQueryModalLabel" aria-hidden="true"
    ref="habrQueryModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="habrQueryModalLabel">
            {{ query._id ? "Update query" : "New query" }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <form>
            <input type="hidden" v-model="query._id" />
            <input type="text" class="form-control mb-2" placeholder="Query_id" v-model="query.query_id" />
            <input type="text" class="form-control mb-2" placeholder="Name" v-model="query.name" />
            <input type="text" class="form-control mb-2" placeholder="Salary" v-model="query.salary" />
            <input type="text" class="form-control mb-2" placeholder="Filter" v-model="query.filter" />
            <QuillEditor toolbar="minimal" contentType="text" v-model:content="query.text" placeholder="Message text..."
              @ready="readyQuillHandler" />
            <div v-if="query.isActive !== ''" class="form-check form-switch form-check-reverse mt-2">
              <input class="form-check-input" type="checkbox" id="isActiveQuery" @change="setQuery"
                :checked="query.isActive" />
              <label class="form-check-label me-2" for="isActiveQuery">Active:
              </label>
            </div>
          </form>
        </div>
        <div v-if="query._id" class="modal-footer">
          <button type="button" class="btn btn-danger" @click="deleteQueryHandler">
            Delete
          </button>
          <button type="button" class="btn btn-success" @click="updateQueryHandler">
            Update
          </button>
        </div>
        <div v-else class="modal-footer">
          <button type="button" class="btn btn-primary" @click="addQueryHandler">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.ql-toolbar {
  border-radius: 0.375rem 0.375rem 0 0;
}

.ql-container {
  border-radius: 0 0 0.375rem 0.375rem;
}

.ql-editor {
  height: 300px;
}
</style>
