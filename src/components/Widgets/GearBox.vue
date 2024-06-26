<template>
  <div class="column">
    <title-bar title="GEAR" />
    <q-input class="row q-mb-sm" v-model="app.char.inventory.worn" label="WORN OUTFIT" autogrow />
    <section-header v-model="app.char.inventory" />

    <div class="row">
      <div class="col-shrink q-mr-sm">
        <calc-stat-box :value="value" />
      </div>
      <div class="col">
        <mod-box v-model="app.char.inventory.mods" title="Additional Slots" />
      </div>
    </div>

    <div class="row items-center q-mt-sm">
      <div class="col-shrink text-h6">SLOTS ({{ app.char.inventory.slots.length }} filled)</div>
      <q-separator class="col" />
      <q-btn class="col-shrink" icon="mdi-plus-circle" flat rounded dense @click="app.char.inventory.slots.push('')" />
    </div>

    <div class="row items-center" v-for="(slot, i) in app.char.inventory.slots" :key="i">
      <q-input class="col" v-model="app.char.inventory.slots[i]" label="ITEM" dense />
      <q-btn class="col-shrink" icon="mdi-delete" flat dense rounded @click="deleteSlot(i)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useQuasar } from 'quasar';
import { useBreakStore } from 'src/stores/break-store';

import { modTotal } from 'src/lib/util';

import TitleBar from './TitleBar.vue';
import SectionHeader from './SectionHeader.vue';
import CalcStatBox from './CalcStatBox.vue';
import ModBox from './ModBox.vue';

const app = useBreakStore();

const value = computed((): number => +app.char.inventory.base + modTotal(app.char.inventory.mods));

const $q = useQuasar();
const deleteSlot = (i: number) =>
  $q
    .dialog({
      title: 'Remove Item?',
      cancel: true,
    })
    .onOk(() => app.char.inventory.slots.splice(i, 1));
</script>
