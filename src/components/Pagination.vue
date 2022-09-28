<script setup>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";

const props = defineProps({
  page: Number,
  pages: Number,
});

const emit = defineEmits(["onPaginate"]);

const COLS = 7;
const START_COL = Math.trunc(COLS / 2);

const prev = computed(() => {
  return props.page - 1;
});

const next = computed(() => {
  return props.page + 1;
});

const pagination = computed(() => {
  if (props.page >= COLS) {
    return Array.from(new Array(COLS).keys()).map(
      (i) => i + (props.page - START_COL)
    );
  }

  return Array.from(new Array(COLS).keys()).map((i) => i + 1);
});

onMounted(() => {});

const pageHandler = (page) => {
  emit("onPaginate", page);
};
</script>
<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="prev > 0 ? '' : 'disabled'">
        <a class="page-link" :href="prev" @click.prevent="pageHandler(prev)"
          >Previous</a
        >
      </li>

      <li
        v-for="number in pagination"
        class="page-item"
        :class="number === props.page ? 'active' : ''"
        :aria-current="number === props.page ? 'page' : ''"
        :key="number"
      >
        <a
          class="page-link"
          :href="number"
          @click.prevent="pageHandler(number)"
        >
          {{ number }}
        </a>
      </li>

      <li class="page-item" :class="next <= props.pages ? '' : 'disabled'">
        <a class="page-link" href="#" @click.prevent="pageHandler(next)"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>
