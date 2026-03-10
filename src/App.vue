<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from 'vue';

import { useBreakStore } from 'src/stores/break-store';
import { useQuasar } from 'quasar';

import { create } from 'src/lib/create';

const app = useBreakStore();
const $q = useQuasar();

onBeforeMount(() => {
  if (app.characters.length == 0) {
    app.characters.push(create.character());
  }
});

watch(
  () => app.conf.dark,
  () => (app.conf.dark !== undefined ? $q.dark.set(app.conf.dark) : $q.dark.set(false))
);
</script>
