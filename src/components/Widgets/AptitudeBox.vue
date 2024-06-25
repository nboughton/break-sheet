<template>
  <div class="column q-mb-md">
    <!--TITLE ROW-->
    <section-header v-model="model" />

    <!--TRACK ROW-->
    <div class="row items-center no-wrap">
      <div class="col-sm-2 q-pa-sm q-mr-sm text-center text-h4 calc-value">{{ value }}</div>

      <div class="col-grow">
        <div class="row items-center">
          <!--TRAIT LINE-->
          <span class="col-shrink q-pr-sm">TRAIT</span>
          <q-btn-toggle
            class="col"
            v-model="model.mods"
            :options="[
              { label: '-2', value: -2 },
              { label: '-1', value: -1 },
              { label: '0', value: 0 },
              { label: '+1', value: 1 },
              { label: '+2', value: 2 },
            ]"
            toggle-color="black"
            toggle-text-color="white"
            dense
            spread
            unelevated
          />
        </div>

        <div class="row items-center justify-start">
          <aptitude-track :boxes="track" />
        </div>

        <div class="row">
          <q-input v-model="model.traits" label="Bonuses/Penalties" dense autogrow borderless />
        </div>
      </div>
    </div>
    <q-separator />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Aptitude } from 'src/components/models';

import SectionHeader from 'src/components/Widgets/SectionHeader.vue';
import AptitudeTrack from 'src/components/Widgets/AptitudeTrack.vue';

const model = defineModel<Aptitude>({ required: true });

const value = computed((): number => +model.value.base + model.value.mods);

const track = computed((): boolean[] => {
  const t = new Array(20).fill(false);
  for (let i = 0; i < value.value && i < 20; i++) {
    t[i] = true;
  }
  return t;
});
</script>

<style scoped>
.calc-value {
  border: 2px solid black;
  border-radius: 30%;
}
</style>
