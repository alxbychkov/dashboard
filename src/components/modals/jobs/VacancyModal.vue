<script setup>
import * as bootstrap from "bootstrap";
import { onMounted, ref, toRef } from "vue";
import { useJobsRecepientStore, useJobsVacancyStore } from "../../../stores/jobs";
import Loader from "../../Loader.vue";

const INITIAL_RECEPIENT = {
  fullname: '',
  email: '',
  phone: '',
  location: '',
  github: '',
  linkedin: '',
  letter: '',
  salary: '',
}

const isSending = ref(false);
const information = ref('');

const jobsRecepient = useJobsRecepientStore();
const jobsVacancy = useJobsVacancyStore();

const recepients = toRef(jobsRecepient, "recepients");
const activeRecepient = ref(INITIAL_RECEPIENT);

const props = defineProps({
  vacancyRow: Object
});

const applyVacancyHandler = async () => {
  const questions = {}

  Object.values({...props.vacancyRow.questions}).forEach((obj, i) => {
    const key = `question${i+1}`;
    questions[key] = obj.answer;
  });

  const appliedArray = {
      vacancyId: props.vacancyRow.id,
      companyId: props.vacancyRow.companyId,
      url: props.vacancyRow.link,
      recepient: {
        fullName: activeRecepient.value.fullname,
        email: activeRecepient.value.email,
        phoneNumber: activeRecepient.value.phone,
        location: activeRecepient.value.location,
        github: activeRecepient.value.github,
        linkedin: activeRecepient.value.linkedin,
        salaryExpectations: activeRecepient.value.salary,
        message: activeRecepient.value.letter,
      },
      questions,
  };
 
  isSending.value = true;
  const response = await jobsVacancy.apply(appliedArray);
  isSending.value = false;

  closeModal();
};

const closeModal = () => {
    bootstrap.Modal.getInstance(jobsVacancyModal).hide();
};

onMounted(async () => {
  await jobsRecepient.get();
  activeRecepient.value = recepients.value[0];
});
</script>
<template>
  <div class="modal fade" id="jobsVacancyModal" tabindex="-1" aria-labelledby="jobsVacancyModalLabel" aria-hidden="true"
    ref="jobsVacancyModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="jobsVacancyModalLabel">
            {{ vacancyRow.name }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <form>
            <input type="hidden" v-model="vacancyRow.id" />

            <div class="input-group mb-3">
                <input type="text" aria-label="Fullname" class="form-control" placeholder="Fullname" v-model="activeRecepient.fullname" disabled>
                <input type="email" aria-label="Email" class="form-control" placeholder="Email" v-model="activeRecepient.email" disabled>
            </div>
            <div class="input-group mb-3">
                <input type="phone" aria-label="Phone" class="form-control" placeholder="Phone" v-model="activeRecepient.phone" disabled>
                <input type="text" aria-label="Location" class="form-control" placeholder="Location" v-model="activeRecepient.location" disabled>
            </div>

            <div v-for="(question) in vacancyRow.questions" class="input-group mb-3" :key="question.id">
              <div class="rounded border p-2 bg-light w-100 mb-3">{{ question.question }}</div>
              <textarea class="form-control rounded" aria-label="Answer" placeholder="Answer" v-model="question.answer"></textarea>
            </div>

            <div class="rounded border mb-3 p-2 bg-light">
              {{ activeRecepient.letter }}
            </div>

            <div class="input-group mb-3">
                <input type="text" aria-label="Github" class="form-control" placeholder="Github" v-model="activeRecepient.github" disabled>
                <input type="text" aria-label="Linkedin" class="form-control" placeholder="Linkedin" v-model="activeRecepient.linkedin" disabled>
            </div>
            <div class="input-group mb-3">
                <input type="text" aria-label="Salary" class="form-control" placeholder="Salary" v-model="vacancyRow.salary" disabled>
            </div>
          </form>
        </div>
        <div v-if="vacancyRow.applicationLink === 'https://cryptojobslist.com/'" class="modal-footer">
          <button type="button" class="btn btn-danger" @click="applyVacancyHandler" :disabled="vacancyRow.status !== 'relevant'">
            <span v-if="isSending" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Apply
          </button>

        </div>
      </div>
    </div>
  </div>
</template>