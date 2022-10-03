<script setup>
import * as bootstrap from "bootstrap";
import { onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const user = useUserStore();

const route = useRoute();

const navLinks = [
  {
    href: "/",
    name: "Home",
    logo: "/images/icons/home.png",
  },
  {
    href: "/github",
    name: "Github",
    logo: "/images/icons/github.png",
  },
  {
    href: "/habr",
    name: "Habr",
    logo: "/images/icons/habr.png",
  },
  {
    href: "/jobs",
    name: "Jobs",
    logo: "/images/icons/job.png",
  },
  {
    href: "/about",
    name: "About",
    logo: "/images/icons/info.png",
  },
];

const isParentNav = (value) => {
  return route.meta.parent && route.meta.parent === value.toLowerCase();
};

onMounted(() => {
  setTimeout(function () {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    if (tooltipTriggerList.length) {
      console.log(tooltipTriggerList);
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl, "");
      });
    }
  }, 0);
});
</script>
<template>
  <aside
    v-if="user.isAuth"
    class="d-flex flex-sm-column flex-row flex-shrink-0 bg-dark sidebar"
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
    <ul
      class="nav nav-pills nav-flush flex-sm-column mb-auto text-center flex-row"
    >
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
  width: 4.5rem;
  z-index: 1000;
}

.sidebar-logo img {
  width: 24px;
  height: 24px;
  filter: invert(1);
}

.nav-link.router-link-active {
  background-color: grey;
}

@media (max-width: 575px) {
  .sidebar {
    width: 100%;
    top: 92px;
    right: 0;
    bottom: unset;
    filter: opacity(0.9);
  }
}
</style>
