<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const user = useUserStore();
const router = useRouter();

const logout = () => {
  user.logout();
  localStorage.removeItem("auth");
  router.push("/login");
};
</script>

<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <RouterLink
          to="/"
          class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
        >
          <img src="../assets/logo.png" alt="Logo" />
        </RouterLink>

        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <!-- <li>
            <RouterLink to="/" class="nav-link px-2 text-white"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/about" class="nav-link px-2 text-white"
              >About</RouterLink
            >
          </li> -->
        </ul>

        <div class="text-end">
          <RouterLink
            v-if="!user.isAuth"
            to="/login"
            class="btn btn-outline-light me-2"
            >Login</RouterLink
          >
          <button v-else class="btn btn-warning" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
/* .router-link-active {
  opacity: 0.5;
} */
</style>
