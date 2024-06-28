<template>
  <div class="column q-mb-md">
    <section-header base-type="number" v-model="app.char.defense" icon="mdi-shield" />

    <div class="row">
      <div class="col-shrink q-mr-sm">
        <calc-stat-box :value="value" />
      </div>

      <div class="col">
        <mod-box v-model="app.char.defense.mods" />
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

const app = useBreakStore();

const value = computed((): number => +app.char.defense.base + modTotal(app.char.defense.mods));
</script>
