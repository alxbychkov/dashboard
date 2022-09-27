<script setup>
import { onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const user = useUserStore();

const route = useRoute();

const navLinks = [
  {
    href: "/",
    name: "Home",
    logo: "/src/assets/icons/home.png",
  },
  {
    href: "/github",
    name: "Github",
    logo: "/src/assets/icons/github.png",
  },
  {
    href: "/habr",
    name: "Habr",
    logo: "/src/assets/icons/habr.png",
  },
  {
    href: "/jobs",
    name: "Jobs",
    logo: "/src/assets/icons/job.png",
  },
  {
    href: "/about",
    name: "About",
    logo: "/src/assets/icons/info.png",
  }
];

const isParentNav = (value) => {
  return route.meta.parent && route.meta.parent === value.toLowerCase();
};

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
      <li v-for="link in navLinks" class="nav-item" :key="link.name">
        <RouterLink
          :to="link.href"
          class="nav-link py-3 border-bottom rounded-0"
          :class="isParentNav(link.name) && 'router-link-active'"
          aria-current="page"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          :title="link.name"
        >
          <div class="sidebar-logo">
            <img :src="link.logo" :alt="link.name" />
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
