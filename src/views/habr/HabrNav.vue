<script setup>
import { RouterLink } from "vue-router";

const links = [
  {
    name: "Overview",
    href: "/habr",
  },
  {
    name: "Queries",
    href: "/habr/query",
  },
  {
    name: "Managers",
    href: "/habr/manager",
  },
  {
    name: "Candidates",
    href: "/habr/candidates",
  },
];
</script>
<template>
  <ul class="nav nav-pills border border-secondary p-3 rounded">
    <li v-for="link in links" class="nav-item" :key="links.name">
      <RouterLink :to="link.href" class="nav-link" active-class="active">
        {{ link.name }}
      </RouterLink>
    </li>
  </ul>
</template>
