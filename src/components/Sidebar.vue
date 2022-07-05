<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/userStore";

const user = useUserStore();

onMounted(() => {
  const tooltipTriggerList = Array.from(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
</script>
<template>
  <aside
    v-if="user.isAuth"
    class="d-flex flex-column flex-shrink-0 bg-dark sidebar"
    style="width: 4.5rem"
  >
    <a
      href="/"
      class="d-block p-3 link-dark text-decoration-none"
      data-bs-toggle="tooltip"
      data-bs-placement="right"
    >
      <svg class="bi pe-none" width="40" height="32">
        <use xlink:href="#bootstrap"></use>
      </svg>
      <span class="visually-hidden">Icon-only</span>
    </a>
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li class="nav-item">
        <RouterLink
          to="/"
          class="nav-link py-3 border-bottom rounded-0"
          aria-current="page"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Home"
        >
          <div class="sidebar-logo">
            <img src="../assets/icons/home.png" alt="Home" />
          </div>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/github"
          class="nav-link py-3 border-bottom rounded-0"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Github"
        >
          <div class="sidebar-logo">
            <img src="../assets/icons/github.png" alt="Github" />
          </div>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/habr"
          class="nav-link py-3 border-bottom rounded-0"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Habr"
        >
          <div class="sidebar-logo">
            <img src="../assets/icons/habr.png" alt="Habr" />
          </div>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/about"
          class="nav-link py-3 border-bottom rounded-0"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="About"
        >
          <div class="sidebar-logo">
            <img src="../assets/icons/info.png" alt="Info" />
          </div>
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>
<style scoped>
.sidebar {
  position: fixed;
  top: 72px;
  left: 0;
  bottom: 0;
}
.sidebar-logo img {
  width: 24px;
  height: 24px;
  filter: invert(1);
}

.nav-link.router-link-active {
  background-color: grey;
}
</style>
