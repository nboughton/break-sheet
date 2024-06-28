<template>
  <div class="column q-mb-sm">
    <title-bar title="SOCIAL BONDS & REPUTATIONS" />

    <q-input class="row" v-model="app.char.bonds" autogrow outlined />
  </div>
</template>

<script setup lang="ts">
import { useBreakStore } from 'src/stores/break-store';

import TitleBar from './TitleBar.vue';

const app = useBreakStore();
</script>
