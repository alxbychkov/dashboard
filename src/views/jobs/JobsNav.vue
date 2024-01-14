<script setup>
import { RouterLink } from "vue-router";

const links = [
  {
    id: 1,
    name: "Overview",
    href: "/jobs",
  },
  {
    id: 2,
    name: "Vacancies",
    href: "/jobs/vacancies",
  },
  {
    id: 3,
    name: "Companies",
    href: "/jobs/companies",
  },
  {
    id: 4,
    name: "Questions",
    href: "/jobs/questions",
  },
  {
    id: 5,
    name: "Recepients",
    href: "/jobs/recepients",
  },
];
</script>
<template>
  <ul class="nav nav-pills border border-secondary p-3 rounded">
    <li v-for="link in links" class="nav-item" :key="link.id">
      <RouterLink :to="link.href" class="nav-link" active-class="active">
        {{ link.name }}
      </RouterLink>
    </li>
  </ul>
</template>
