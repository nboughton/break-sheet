<template>
  <div class="column q-mb-sm">
    <title-bar title="Aptitudes" />
    <aptitude-box v-for="(apt, i) in app.char.aptitudes" :key="i" v-model="app.char.aptitudes[i]" />
  </div>
</template>

<script setup lang="ts">
import { useBreakStore } from 'src/stores/break-store';

import TitleBar from './Widgets/TitleBar.vue';
import AptitudeBox from './Widgets/AptitudeBox.vue';

const app = useBreakStore();
</script>
