<template>
  <div class="row q-mb-xs">
    <q-input class="col-grow" label="Weapon" v-model="model.name" />
    <q-input
      class="col"
      input-class="text-center text-h6"
      label="Wpn Bonuses"
      type="number"
      v-model.number="model.bonuses"
    />
    <q-input
      class="col"
      input-class="text-center text-h6"
      label="Extra Dmg"
      type="number"
      v-model.number="model.extra"
    />
    <q-input
      class="col atk-bonus"
      input-class="text-center text-h6"
      label="Atk Bonus"
      readonly
      :model-value="atkBonus"
      filled
    />
    <q-btn class="col-shrink q-ml-xs" icon="mdi-delete" flat dense rounded @click="emit('delete')" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Weapon } from '../models';

import { useBreakStore } from 'src/stores/break-store';

const model = defineModel<Weapon>({ required: true });

const emit = defineEmits(['delete']);

const app = useBreakStore();

const atkBonus = computed((): number => model.value.bonuses + +app.char.attacks.base);
</script>

<style scoped>
.atk-bonus {
  border: 2px solid black;
  border-radius: 5px;
}
</style>
