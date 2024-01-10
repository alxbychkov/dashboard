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
  <header class="p-3 bg-dark text-white sticky-top">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-between"
      >
        <RouterLink
          to="/"
          class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
        >
          <img src="../assets/logo.png" alt="Logo" />
        </RouterLink>

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
@media (max-width: 575px) {
  header.p-3 {
    padding-bottom: 0.25rem !important;
  }
}
</style>
