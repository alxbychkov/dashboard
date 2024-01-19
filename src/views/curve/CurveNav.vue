<script setup>
import { RouterLink } from "vue-router";

const links = [
  {
    id: 1,
    name: "Overview",
    href: "/curve",
  }
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
