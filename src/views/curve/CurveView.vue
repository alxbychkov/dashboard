<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import CurveNav from "./CurveNav.vue";
import Loader from "../../components/Loader.vue";

const DAILY_LOG_LINK = "http://5.35.82.91:4000/curve";
const frame = ref(null);

const updateLinkHandler = () => {
  frame.value.src+='';
};

onBeforeMount(async () => {});

onMounted(async () => {});
</script>
<template>
  <div class="h2 pb-2 mb-4 text-success border-bottom border-success">Curve.fi</div>
  <CurveNav />
  <div class="bord border border-secondary p-3 rounded mt-4">
    <div class="card">
      <div class="card-header">
        <a
          href="https://curve.fi/#/ethereum/pools?hideSmallPools=false&sortBy=rewardsCrv"
          target="_blank"
          class="link-icon"
          >🏊 Curve.fi pools</a
        >
      </div>
    </div>
    <div class="card mt-2">
      <div class="card-header d-flex justify-content-between">Daily logs: <span role="button" @click="updateLinkHandler">🔄</span></div>
      <div class="card-body">
        <iframe :src="DAILY_LOG_LINK" frameborder="0" width="100%" ref="frame"></iframe>
      </div>
    </div>
  </div>
</template>
<style scoped>
.link-icon {
  text-decoration: none;
}
.link-icon::after {
  content: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDEyIDE2Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMSAxMGgxdjNjMCAuNTUtLjQ1IDEtMSAxSDFjLS41NSAwLTEtLjQ1LTEtMVYzYzAtLjU1LjQ1LTEgMS0xaDN2MUgxdjEwaDEwdi0zek02IDJsMi4yNSAyLjI1TDUgNy41IDYuNSA5bDMuMjUtMy4yNUwxMiA4VjJINnoiLz48L3N2Zz4=);
  margin-left: 5px;
  transform: scale(0.8);
  display: inline-block;
  filter: opacity(0.7);
}

.card-body iframe {
  min-height: 350px;
}
</style>
