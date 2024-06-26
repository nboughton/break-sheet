<template>
  <div class="column">
    <title-bar title="XP" />
    <div class="row">
      <q-input class="col" v-model.number="app.char.xp.current" label="CURRENT XP" />
      <q-input class="col" v-model.number="app.char.xp.toNext" label="XP FOR NEXT RANK" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreakStore } from 'src/stores/break-store';

import TitleBar from './TitleBar.vue';

const app = useBreakStore();
</script>
