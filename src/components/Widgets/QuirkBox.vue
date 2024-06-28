<template>
  <div class="column q-mb-sm">
    <title-bar title="QUIRK" />

    <q-input class="row" v-model="app.char.quirk" autogrow outlined />
  </div>
</template>

<script setup lang="ts">
import { useBreakStore } from 'src/stores/break-store';

import TitleBar from './TitleBar.vue';

const app = useBreakStore();
</script>
