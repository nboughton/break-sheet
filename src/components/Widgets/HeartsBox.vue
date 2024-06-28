<template>
  <div class="column q-mb-md">
    <section-header base-type="number" v-model="app.char.hearts" icon="mdi-heart" />

    <div class="row no-wrap">
      <div class="col-shrink q-mr-sm">
        <calc-stat-box :value="value" />
      </div>

      <div class="col">
        <hearts-track :hearts="track" />
        <mod-box v-model="app.char.hearts.mods" />
        <q-input v-model="app.char.hearts.injuries" label="Injuries" autogrow dense />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useBreakStore } from 'src/stores/break-store';

import { modTotal } from 'src/lib/util';

import SectionHeader from './SectionHeader.vue';
import CalcStatBox from './CalcStatBox.vue';
import ModBox from './ModBox.vue';
import HeartsTrack from './HeartsTrack.vue';

const app = useBreakStore();

const value = computed((): number => +app.char.hearts.base + modTotal(app.char.hearts.mods));

const track = computed((): boolean[] => {
  const t = new Array(10).fill(false);
  for (let i = 0; i < value.value && i < 10; i++) {
    t[i] = true;
  }
  return t;
});
</script>
