<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
</script>

<template>
  <Navbar />
  <Sidebar />
  <main class="main">
    <div class="container">
      <RouterView />
    </div>
  </main>
  <Footer />
</template>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

body,
#app {
  min-height: 100vh;
}

.main {
  margin-left: 4.5rem;
  padding: 50px 20px;
}
</style>
