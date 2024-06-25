<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';

import { useBreakStore } from 'src/stores/break-store';

import { create } from 'src/lib/create';

const app = useBreakStore();

onBeforeMount(() => {
  if (app.characters.length == 0) {
    app.characters.push(create.character());
  }
});
</script>
