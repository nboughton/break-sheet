<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';

import { useBreakStore } from 'src/stores/break-store';

import { create } from 'src/lib/create';

import { MP } from './components/models';

const app = useBreakStore();

onBeforeMount(() => {
  if (app.characters.length == 0) {
    app.characters.push(create.character());
  }

  app.characters.forEach((c, i) => {
    if (!app.characters[i].mp) {
      app.characters[i].mp = <MP>{
        name: 'MP TOTAL',
        subtitle: 'Resource for spell casting',
        base: 0,
        mods: [],
        injuries: '',
      };
    }
  });
});
</script>
