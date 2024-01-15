<script setup>
import { toRef, ref } from "vue";
import JobsNav from "./JobsNav.vue";
import { useJobsRecepientStore } from "../../stores/jobs";

const jobsRecepient = useJobsRecepientStore();
const recepients = toRef(jobsRecepient, "recepients");

const isLoading = ref(false);
const isLoaded = ref(false);

const loadRecepientHandler = async (page) => {
    isLoading.value = true;
    await jobsRecepient.get(page);
    isLoading.value = false;
    isLoaded.value = true;
};

const updateRecepientHandler = async (recepient) => {
    await jobsRecepient.update(recepient);
}

</script>
<template>
    <div class="h2 pb-2 mb-4 text-success border-bottom border-success">
        Jobs (Recepients)
    </div>
    <JobsNav />
    <div class="bord border border-secondary p-3 rounded mt-4 overflow-auto">
        <div class="mb-3 d-flex justify-content-end">
            <button class="btn btn-success" type="button" :disabled="jobsRecepient.isLoaded"
                @click="loadRecepientHandler(1)">
                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ isLoading ? "Loading..." : "Load recepients" }}
            </button>
        </div>
        <div v-if="recepients && recepients.length" class="border rounded mb-3 p-2">
            <div v-for="(recepient, index) in recepients" :key="recepient.id">
                <h4 class="mb-1">#{{ index + 1 }}</h4>
                <form>
                    <div class="input-group mb-3">
                        <input type="text" aria-label="Fullname" class="form-control" placeholder="Fullname" v-model="recepient.fullname">
                        <input type="email" aria-label="Email" class="form-control" placeholder="Email" v-model="recepient.email" disabled>
                    </div>
                    <div class="input-group mb-3">
                        <input type="phone" aria-label="Phone" class="form-control" placeholder="Phone" v-model="recepient.phone">
                        <input type="text" aria-label="Location" class="form-control" placeholder="Location" v-model="recepient.location">
                    </div>
                    <div class="input-group mb-3">
                        <textarea class="form-control" aria-label="Cover letter" v-model="recepient.letter" placeholder="Cover letter"></textarea>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" aria-label="Github" class="form-control" placeholder="Github" v-model="recepient.github">
                        <input type="text" aria-label="Linkedin" class="form-control" placeholder="Linkedin" v-model="recepient.linkedin">
                    </div>
                    <div class="input-group mb-3">
                        <input type="file" class="form-control" aria-label="CV" placeholder="CV" disabled>
                        <input type="text" aria-label="Salary" class="form-control" placeholder="Salary" v-model="recepient.salary">
                    </div>
                    <div class="input-group mb-3">
                        <input type="file" class="form-control" aria-label="Video" placeholder="Video" disabled>
                    </div>
                    <div class="input-group">
                        <button type="submit" class="btn btn-info ms-auto" @click.prevent="updateRecepientHandler(recepient)">Update</button>
                    </div>
                </form>
            </div>
        </div>
        <h5 v-if="isLoaded && (!recepients || !recepients.length)" class="card-title text-center">
            No recepients (something went wrong) 🤷
        </h5>
    </div>
</template>
    