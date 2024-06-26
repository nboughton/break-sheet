<template>
  <div class="column q-mb-md">
    <!--TITLE ROW-->
    <section-header v-model="model" />

    <!--TRACK ROW-->
    <div class="row items-start no-wrap">
      <div class="col-shrink stat-container">
        <calc-stat-box :value="value" />
      </div>

      <div class="col">
        <div class="row items-center">
          <!--TRAIT LINE-->
          <span class="col-shrink q-pr-sm">TRAIT</span>
          <q-btn-toggle
            class="col"
            v-model="model.trait"
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

        <aptitude-track :boxes="track" />

        <mod-box v-model="model.mods" />
      </div>
    </div>
    <q-separator />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Aptitude } from 'src/components/models';

import { modTotal } from 'src/lib/util';

import SectionHeader from 'src/components/Widgets/SectionHeader.vue';
import AptitudeTrack from 'src/components/Widgets/AptitudeTrack.vue';
import CalcStatBox from 'src/components/Widgets/CalcStatBox.vue';
import ModBox from 'src/components/Widgets/ModBox.vue';

const model = defineModel<Aptitude>({ required: true });

const value = computed((): number => +model.value.base + model.value.trait + modTotal(model.value.mods));

const track = computed((): boolean[] => {
  const t = new Array(20).fill(false);
  for (let i = 0; i < value.value && i < 20; i++) {
    t[i] = true;
  }
  return t;
});
</script>

<style scoped>
.stat-container {
  margin-top: 13px;
}
</style>
