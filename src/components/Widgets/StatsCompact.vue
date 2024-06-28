<template>
  <div class="row items-center justify-between q-px-md" v-if="$q.screen.lt.sm">
    <div class="col text-bold text-h6 q-pl-sm"><q-icon name="mdi-sword" />+{{ app.char.attacks.base }}</div>

    <div class="col text-bold text-h6">
      <q-icon name="mdi-shield" />{{ +app.char.defense.base + modTotal(app.char.defense.mods) }}
    </div>

    <div class="col text-bold text-h6">
      <q-icon name="mdi-heart" color="red" />{{ +app.char.hearts.base + modTotal(app.char.hearts.mods) }}
    </div>

    <div class="col text-bold text-h6 q-pr-sm"><q-icon name="mdi-run" />{{ app.char.speed.selected }}</div>
  </div>

  <div class="row justify-between items-center q-px-md">
    <div class="col text-bold text-h6" v-if="$q.screen.gt.xs">
      <q-icon name="mdi-sword" />+{{ app.char.attacks.base }}
    </div>

    <div class="col text-bold text-h6" v-if="$q.screen.gt.xs">
      <q-icon name="mdi-shield" />{{ +app.char.defense.base + modTotal(app.char.defense.mods) }}
    </div>

    <div v-for="(a, i) in app.char.aptitudes" :key="i" class="col text-bold text-center">
      {{ +a.base + a.trait + modTotal(a.mods) }} {{ a.name }}
    </div>

    <div class="col text-bold text-h6" v-if="$q.screen.gt.xs">
      <q-icon name="mdi-heart" color="red" />{{ +app.char.hearts.base + modTotal(app.char.hearts.mods) }}
    </div>

    <div class="col text-bold text-h6" v-if="$q.screen.gt.xs">
      <q-icon name="mdi-run" />{{ app.char.speed.selected }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { modTotal } from 'src/lib/util';
import { useBreakStore } from 'src/stores/break-store';

const app = useBreakStore();
</script>
