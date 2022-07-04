<script setup>
import { RouterLink } from "vue-router";
defineProps({});
</script>

<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <RouterLink to="/" class="nav-link px-2 text-white"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/about" class="nav-link px-2 text-white"
              >About</RouterLink
            >
          </li>
        </ul>

        <div class="text-end">
          <RouterLink to="/login" class="btn btn-outline-light me-2"
            >Login</RouterLink
          >
          <RouterLink to="/register" class="btn btn-warning"
            >Register</RouterLink
          >
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
.router-link-active {
  opacity: 0.5;
}
</style>
