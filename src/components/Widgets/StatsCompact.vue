<template>
  <div class="row justify-evenly items-center q-mt-sm">
    <div class="col text-bold text-center text-h6" v-if="$q.screen.gt.xs">
      <q-icon name="mdi-sword" />+{{ app.char.attacks.base }}
    </div>

    <div class="col text-bold text-center text-h6" v-if="$q.screen.gt.xs">
      <q-icon name="mdi-shield" />{{ +app.char.defense.base + modTotal(app.char.defense.mods) }}
    </div>

    <div v-for="(a, i) in app.char.aptitudes" :key="i" class="col">
      <stat-box :name="a.name" :value="+a.base + a.trait + modTotal(a.mods)" />
    </div>

    <div class="col text-bold text-center text-h6" v-if="$q.screen.gt.xs">
      <q-icon name="mdi-heart" color="red" />{{ +app.char.hearts.base + modTotal(app.char.hearts.mods) }}
    </div>

    <div class="col text-bold text-center text-h6" v-if="$q.screen.gt.xs">
      <q-icon name="mdi-run" />{{ app.char.speed.selected }}
    </div>
  </div>

  <div class="row items-center justify-evenly" v-if="$q.screen.lt.sm">
    <div class="col text-bold text-center text-h6"><q-icon name="mdi-sword" />+{{ app.char.attacks.base }}</div>

    <div class="col text-bold text-center text-h6">
      <q-icon name="mdi-shield" />{{ +app.char.defense.base + modTotal(app.char.defense.mods) }}
    </div>

    <div class="col text-bold text-center text-h6">
      <q-icon name="mdi-heart" color="red" />{{ +app.char.hearts.base + modTotal(app.char.hearts.mods) }}
    </div>

    <div class="col text-bold text-center text-h6"><q-icon name="mdi-run" />{{ app.char.speed.selected }}</div>
  </div>
</template>

<script setup lang="ts">
import { useBreakStore } from 'src/stores/break-store';

import { modTotal } from 'src/lib/util';

import StatBox from './StatBox.vue';

const app = useBreakStore();
</script>
