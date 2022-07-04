<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <div class="container">
    <RouterView />
  </div>
</template>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>
