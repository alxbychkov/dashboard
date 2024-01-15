<script setup>
import * as bootstrap from "bootstrap";
import { onMounted, ref } from "vue";
import { useJobsQuestionStore } from "../../../stores/jobs";

const jobsQuestion = useJobsQuestionStore();

const props = defineProps({
  questionRow: Object
});

const updateQuestionHandler = () => {
  jobsQuestion.update(props.questionRow);
  closeModal();
};

const closeModal = () => {
    bootstrap.Modal.getInstance(jobsQuestionModal).hide();
};

</script>
<template>
  <div class="modal fade" id="jobsQuestionModal" tabindex="-1" aria-labelledby="jobsQuestionModalLabel" aria-hidden="true"
    ref="jobsQuestionModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="jobsQuestionModalLabel">
            Update question
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <form>
            <input type="hidden" v-model="questionRow.id" />
            <div class="rounded border mb-2 p-2 bg-light">{{ questionRow.question }}</div>
            <textarea class="form-control" placeholder="Answer" v-model="questionRow.answer"></textarea>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" @click="updateQuestionHandler" :disabled="!questionRow.answer">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>