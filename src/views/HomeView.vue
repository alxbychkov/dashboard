<script setup>
import { onBeforeMount, onMounted } from "vue";
import Loader from "../components/Loader.vue";
import { useProccessStore } from "../stores/server/useProccessStore";
import { useUserStore } from "../stores/userStore";

const proccessList = useProccessStore();
const user = useUserStore();

onBeforeMount(async () => {
  proccessList.isLoaded || (await proccessList.get());
});

const restartProccessHandler = (id) => {
  proccessList.restart(id);
};

const reloadProccessHandler = (id) => {
  proccessList.reload(id);
};

const stopProccessHandler = (id) => {
  proccessList.stop(id);
};

onMounted(async () => {});
</script>
<template>
  <div class="h2 pb-2 mb-4 text-success border-bottom border-success">Home</div>
  <div class="bord border border-secondary p-sm-3 p-1 rounded mt-4">
    <div class="card">
      <div class="card-header">Proccess status:</div>
      <div v-if="!proccessList.isLoaded" class="card-body">
        <Loader />
      </div>
      <div v-else-if="!proccessList.list || !proccessList.list.length" class="card-body">
        <h5 class="card-title text-center">
          Couldn't load proccesses: (server error)... 😔
        </h5>
      </div>
      <div v-else-if="proccessList.list" class="card-body">
        <ul class="list-group mb-3">
          <li
            v-for="list in proccessList.list"
            class="list-group-item d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column"
            :key="list.pid"
          >
            <h5 class="card-title" style="min-width: 25%">
              🖥️ {{ list.name }} (<span
                :class="
                  list.status === 'online' ? 'text-success' : 'text-danger'
                "
                ><i>{{ list.status }}</i></span
              >)
            </h5>
            <div>
              (CPU: {{ list.monit.cpu }} Memory: {{ list.monit.memory }})
            </div>
            <div v-if="user.user.name !== 'admin1'">
              <button
                class="btn btn-success me-1"
                :disabled="list.status === 'online'"
                @click="restartProccessHandler(list.name)"
              >
                Start
              </button>
              <button
                class="btn btn-info me-1 text-white"
                :disabled="list.status === 'stopped'"
                @click="reloadProccessHandler(list.name)"
              >
                Restart
              </button>
              <button
                class="btn btn-danger"
                :disabled="list.status === 'stopped'"
                @click="stopProccessHandler(list.name)"
              >
                Stop
              </button>
            </div>
          </li>
        </ul>
        <div class="mb-3 d-flex justify-content-end">
          <button class="btn btn-secondary" @click="proccessList.refresh()">
            Refresh
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media (max-width: 575px) {
  .list-group-item {
    gap: 10px;
    padding: 5px;
  }
  .card-body {
    padding: 5px;
  }
  h5 span i {
    display: none;
  }
  h5 span.text-success::after {
    content: '🟢';
  }
  h5 span.text-danger::after {
    content: '🔴';
  }
}
</style>
