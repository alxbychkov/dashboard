<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";
import { useUserStore } from "./stores/userStore";

const user = useUserStore();

</script>

<template>
  <Navbar />
  <Sidebar />
  <main class="main">
    <div class="container">
      <div v-if="user.isLoading" class="d-flex justify-content-center">
        <div
          class="spinner-grow"
          style="width: 3rem; height: 3rem"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <RouterView v-else />
    </div>
  </main>
</template>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

body,
#app {
  min-height: 100vh;
}

aside + .main {
  margin-left: 4.5rem;
}
.main {
  padding: 50px 20px;
}
</style>
