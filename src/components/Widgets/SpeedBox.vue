<template>
  <div class="column q-mb-md">
    <section-header base-type="string" v-model="app.char.speed" icon="mdi-run" />

    <div class="row">
      <q-option-group class="col" v-model="app.char.speed.selected" :options="speeds" />

      <q-separator vertical class="q-mx-md" />

      <q-input class="col" v-model="app.char.speed.mods" label="Bonuses/Penalties" autogrow />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreakStore } from 'src/stores/break-store';

import SectionHeader from './SectionHeader.vue';

const app = useBreakStore();

const speeds: { label: string; value: string | number }[] = [
  { label: 'SLOW - 0 Areas', value: 'Slow' },
  { label: 'AVERAGE - 1 Area', value: 'Average' },
  { label: 'FAST - 2 Areas', value: 'Fast' },
  { label: 'V. FAST - +2 Areas', value: 'Very Fast' },
];
</script>
